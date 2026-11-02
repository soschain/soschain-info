#!/usr/bin/env bash
set -Eeuo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

env_file="${SOSCHAIN_FTP_ENV_FILE:-.ftp.env}"
if [[ ! -f "$env_file" ]]; then
  echo "Missing FTPS configuration: $env_file" >&2
  exit 1
fi

set -a
source "$env_file"
set +a

: "${FTP_HOST:?FTP_HOST is required}"
: "${FTP_USER:?FTP_USER is required}"
: "${FTP_PASSWORD:?FTP_PASSWORD is required}"
: "${FTP_REMOTE_DIR:?FTP_REMOTE_DIR is required}"

ftp_port="${FTP_PORT:-21}"
remote_root="/${FTP_REMOTE_DIR#/}"
remote_root="${remote_root%/}"
base_url="ftp://${FTP_HOST}:${ftp_port}${remote_root}/"
public_url="${SOSCHAIN_PUBLIC_URL:-https://soschain.app}"
public_url="${public_url%/}"
deployment_id="$(date -u +%Y%m%dT%H%M%SZ)-$$"
curl_common=(
  --fail
  --silent
  --show-error
  --tls-max 1.2
  --ssl-reqd
  --user "${FTP_USER}:${FTP_PASSWORD}"
)
pending_uploads=()

cleanup() {
  local status=$?
  for temp_path in "${pending_uploads[@]:-}"; do
    [[ -n "$temp_path" ]] || continue
    curl "${curl_common[@]}" --quote "DELE ${temp_path}" --output /dev/null "$base_url" 2>/dev/null || true
  done
  exit "$status"
}
trap cleanup EXIT

if (( $# > 0 )); then
  files=("$@")
else
  files=(
    index.html
    es.html
    en.html
    script.js
    styles.css
    site-shell.css
    overview.css
    information-materials.css
    typography-scale.css
    diptico.html
    diptico-en.html
    diptico.css
    presentacion.html
    presentacion.css
    presentacion-print.css
    opciones-iconos.html
    opciones-iconos.css
    assets/soschain-logo.svg
    assets/soschain-network-hero-v1.png
    assets/soschain-video-2025-en.jpg
    docs/index.html
    docs/SOSChain-information-ES.pdf
    docs/SOSChain-information-EN.pdf
    docs/previews/SOSChain-information-ES-page-1.png
    docs/previews/SOSChain-information-ES-page-2.png
    docs/previews/SOSChain-information-ES-page-3.png
    docs/previews/SOSChain-information-EN-page-1.png
    docs/previews/SOSChain-information-EN-page-2.png
    docs/previews/SOSChain-information-EN-page-3.png
  )
fi

for file in "${files[@]}"; do
  target_path="${file#./}"
  if [[ ! -f "$file" ]]; then
    echo "Refusing to deploy missing file: $file" >&2
    exit 1
  fi

  temp_path="${target_path}.upload-${deployment_id}"
  pending_uploads+=("$temp_path")
  local_hash="$(shasum -a 256 "$file" | awk '{print $1}')"

  # The public target is untouched until the complete temporary upload has
  # been read back and verified.
  curl "${curl_common[@]}" --ftp-create-dirs --upload-file "$file" "${base_url}${temp_path}"
  remote_hash="$(curl "${curl_common[@]}" "${base_url}${temp_path}" | shasum -a 256 | awk '{print $1}')"
  if [[ "$remote_hash" != "$local_hash" ]]; then
    echo "Remote verification failed before replacing: $target_path" >&2
    exit 1
  fi

  # Raiola supports replacing an existing file with RNFR/RNTO. This rename is
  # atomic, so Apache always sees either the previous complete file or the new
  # complete file—never a truncated index.html.
  curl "${curl_common[@]}" \
    --quote "RNFR ${temp_path}" \
    --quote "RNTO ${target_path}" \
    --output /dev/null \
    "$base_url"

  if [[ -n "$public_url" ]]; then
    public_hash="$(curl --fail --silent --show-error "${public_url}/${target_path}?deployment=${deployment_id}" | shasum -a 256 | awk '{print $1}')"
    if [[ "$public_hash" != "$local_hash" ]]; then
      echo "Public verification failed after replacing: $target_path" >&2
      exit 1
    fi
  fi

  echo "Published atomically: $target_path"
done

echo "Deployment complete: ${#files[@]} files"
