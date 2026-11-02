// Flow contract: the Spanish SOSChain public site explains emergency coordination and isolated public-health statistics without linking people, histories, or Digital Twins.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const englishHtml = await readFile(new URL('../en.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');
const siteShellCss = await readFile(new URL('../site-shell.css', import.meta.url), 'utf8').catch(() => '');
const typographyScaleCss = await readFile(new URL('../typography-scale.css', import.meta.url), 'utf8').catch(() => '');
const overviewCss = await readFile(new URL('../overview.css', import.meta.url), 'utf8').catch(() => '');
const presentation = await readFile(new URL('../presentacion.html', import.meta.url), 'utf8').catch(() => '');
const leaflet = await readFile(new URL('../diptico.html', import.meta.url), 'utf8').catch(() => '');
const englishLeaflet = await readFile(new URL('../diptico-en.html', import.meta.url), 'utf8').catch(() => '');
const leafletCss = await readFile(new URL('../diptico.css', import.meta.url), 'utf8').catch(() => '');
const iconOptions = await readFile(new URL('../opciones-iconos.html', import.meta.url), 'utf8').catch(() => '');
const iconOptionsCss = await readFile(new URL('../opciones-iconos.css', import.meta.url), 'utf8').catch(() => '');
const publicDocsIndex = await readFile(new URL('../docs/index.html', import.meta.url), 'utf8').catch(() => '');
const spanishCongressPdf = await readFile(new URL('../docs/SOSChain-three-congress-panels-ES.pdf', import.meta.url)).catch(() => Buffer.alloc(0));
const englishCongressPdf = await readFile(new URL('../docs/SOSChain-three-congress-panels-EN.pdf', import.meta.url)).catch(() => Buffer.alloc(0));
const congressMaterialsCss = await readFile(new URL('../congress-materials.css', import.meta.url), 'utf8').catch(() => '');
const officialVideoPoster = await readFile(new URL('../assets/soschain-video-2025-en.jpg', import.meta.url)).catch(() => Buffer.alloc(0));

test('is a Spanish SOSChain site with official branding and separate portal access', () => {
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<title>SOSChain \| Información y coordinación cuando importa<\/title>/);
  assert.match(html, /assets\/soschain-logo\.svg/);
  assert.match(html, /https:\/\/personal-st\.soschain\.app\/es/);
  assert.match(html, /https:\/\/professional-st\.soschain\.app\/es/);
  assert.match(html, /SOSChain opera en el espacio europeo de datos de confianza Global Data Care/i);
  assert.match(html, /Servicio de índice proporcionado por Fundación UNID \(beta\)/i);
  assert.doesNotMatch(html, /Servicio para personas proporcionado por Fundación UNID/i);
  assert.match(html, /Sitio web desarrollado por[\s\S]*?Connectech\.info/i);
  assert.match(englishHtml, /SOSChain operates within Global Data Care, a trusted European data space/i);
  assert.match(englishHtml, /Website developed by[\s\S]*?Connectech\.info/i);
  assert.match(html, /<span class="contact-email">&gt;contact&#64;soschain\.app&lt;<\/span>/i);
  assert.match(englishHtml, /<span class="contact-email">&gt;contact&#64;soschain\.app&lt;<\/span>/i);
  assert.doesNotMatch(html, /mailto:contact@soschain\.app/i);
  assert.doesNotMatch(englishHtml, /mailto:contact@soschain\.app/i);
  assert.doesNotMatch(html, /contact@connectech\.info|contact&#64;connectech\.info/i);
  assert.doesNotMatch(englishHtml, /contact@connectech\.info|contact&#64;connectech\.info/i);
  assert.doesNotMatch(html, /infraestructura regional operada por/i);
  assert.doesNotMatch(englishHtml, /regional infrastructure operated by/i);
});

test('provides complete Spanish and English entry pages with one verified beta account menu', () => {
  assert.match(html, /class="account-toggle"/);
  assert.match(html, /class="account-menu"/);
  assert.match(html, /Personal \(beta\)/);
  assert.match(html, /Professional \(beta\)/);
  assert.match(html, /<select id="language-select"[^>]*aria-label="Idioma">[\s\S]*?<option value="index\.html" selected>Español<\/option>[\s\S]*?<option value="en\.html">English<\/option>[\s\S]*?<\/select>/i);
  assert.match(englishHtml, /<html lang="en">/);
  assert.match(englishHtml, /Create your Unified Health Card/i);
  assert.match(englishHtml, /Your family can follow your journey through the hospital/i);
  assert.match(englishHtml, /Three situations where SOSChain helps/i);
  assert.match(englishHtml, /<select id="language-select"[^>]*aria-label="Language">[\s\S]*?<option value="index\.html">Español<\/option>[\s\S]*?<option value="en\.html" selected>English<\/option>[\s\S]*?<\/select>/i);
  const spanishNavigation = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/i)?.[0] ?? '';
  const englishNavigation = englishHtml.match(/<nav class="site-nav"[\s\S]*?<\/nav>/i)?.[0] ?? '';
  const spanishAccountMenu = html.match(/<div class="account-menu"[\s\S]*?<\/div>\s*<\/div>/i)?.[0] ?? '';
  const englishAccountMenu = englishHtml.match(/<div class="account-menu"[\s\S]*?<\/div>\s*<\/div>/i)?.[0] ?? '';
  assert.doesNotMatch(spanishNavigation, /language-link|font-control/i);
  assert.doesNotMatch(englishNavigation, /language-link|font-control/i);
  assert.match(spanishAccountMenu, /class="account-settings"[\s\S]*class="account-setting language-control"[\s\S]*class="account-setting font-control"/i);
  assert.match(englishAccountMenu, /class="account-settings"[\s\S]*class="account-setting language-control"[\s\S]*class="account-setting font-control"/i);
  for (const locale of ['es', 'en']) {
    assert.match(locale === 'es' ? html : englishHtml, new RegExp(`https://personal-st\\.soschain\\.app/${locale}`));
    assert.match(locale === 'es' ? html : englishHtml, new RegExp(`https://professional-st\\.soschain\\.app/${locale}`));
  }
  assert.match(script, /accountToggle/);
  assert.match(script, /accountMenu/);
  assert.match(script, /languageSelect[\s\S]*addEventListener\('change'[\s\S]*window\.location\.href\s*=\s*event\.target\.value/i);
  assert.match(script, /if \(year\) year\.textContent/);
  assert.match(siteShellCss, /\.reveal[\s\S]*?opacity:\s*1/);
  assert.match(
    siteShellCss,
    /@media\s*\(max-width:\s*760px\)[\s\S]*?\.account-menu\s*\{[^}]*position:\s*fixed[^}]*right:\s*16px[^}]*left:\s*16px/i,
  );
});

test('presents unnumbered portal choices with a direct try action', () => {
  assert.match(html, /<p class="section-label">SOSChain<\/p><h2>Personal y Professional<\/h2>/i);
  assert.match(englishHtml, /<p class="section-label">SOSChain<\/p><h2>Personal and Professional<\/h2>/i);
  assert.doesNotMatch(html, /<p class="section-label">SOSChain \(beta\)<\/p>/i);
  assert.doesNotMatch(englishHtml, /<p class="section-label">SOSChain \(beta\)<\/p>/i);
  const spanishAccess = html.match(/<div class="access-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i)?.[1] ?? '';
  const englishAccess = englishHtml.match(/<div class="access-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i)?.[1] ?? '';
  assert.doesNotMatch(spanishAccess, /<span>0[12]<\/span>/);
  assert.doesNotMatch(englishAccess, /<span>0[12]<\/span>/);
  assert.equal((spanishAccess.match(/<small>Probar /g) ?? []).length, 2);
  assert.equal((englishAccess.match(/<small>Try /g) ?? []).length, 2);
  assert.doesNotMatch(spanishAccess, /Abrir versión/i);
  assert.doesNotMatch(englishAccess, /Open version/i);
  assert.match(siteShellCss, /\.access-option\s*\{[^}]*grid-template-columns:\s*1fr/i);
});

test('writes every visible beta label in lowercase and between parentheses', () => {
  for (const page of [html, englishHtml, leaflet]) {
    assert.doesNotMatch(page, />[^<]*\bBeta\b[^<]*</);
    assert.doesNotMatch(page, />[^<]*(?<!\()\bbeta\b(?!\))[^<]*</i);
  }
  assert.match(html, /SOSChain Personal \(beta\)/);
  assert.match(html, /SOSChain Professional \(beta\)/);
  assert.match(englishHtml, /SOSChain Personal \(beta\)/);
  assert.match(englishHtml, /SOSChain Professional \(beta\)/);
});

test('keeps Spanish and English headings free of final full stops', () => {
  for (const page of [html, englishHtml]) {
    const headings = [...page.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
      .map(([, content]) => content.replace(/<[^>]+>/g, '').trim());
    assert.ok(headings.length > 0);
    assert.deepEqual(headings.filter(heading => heading.endsWith('.')), []);
  }
});

test('closes with a concrete card action instead of an empty preparedness slogan', () => {
  assert.match(html, /Tu información de emergencia, disponible en cualquier lugar e idioma<\/h2>/i);
  assert.match(html, /Configura tus contactos y decide qué información podrán solicitar los profesionales autorizados\./i);
  assert.match(html, />Crear o gestionar mi tarjeta\s*</i);
  assert.doesNotMatch(html, /Prepararse hoy puede ahorrar tiempo mañana/i);
  assert.doesNotMatch(html, /salud pública mejor informada/i);

  assert.match(englishHtml, /Your emergency information, available anywhere and in any language<\/h2>/i);
  assert.match(englishHtml, /Set up your contacts and decide what information authorised professionals may request\./i);
  assert.match(englishHtml, />Create or manage my card\s*</i);
  assert.doesNotMatch(englishHtml, /Preparing today can save time tomorrow/i);
});

test('opens with the unified health card story on a white default presentation', () => {
  assert.match(html, /Crea tu Tarjeta de Salud Unificada/i);
  assert.match(html, /Crea la tarjeta/i);
  assert.match(html, /Tu índice de salud/i);
  assert.match(html, /Prepara datos para emergencias/i);
  assert.match(html, /persona dependiente/i);
  assert.match(html, /persona o un animal/i);
  assert.match(html, /dataset\.theme=t\|\|'light'/);
  assert.match(css, /data-theme="light"[^}]*--page:#fff/);
});

test('shows the congress patent note beside the unified identifier and uses legible step numbers', () => {
  assert.match(html, /Un identificador de salud unificado para una persona o un animal<sup>\*<\/sup>/i);
  assert.match(html, /class="hero-patent-note"[^>]*>\* Patentes relacionadas: US 11,636,776 · 11,960,454 · 12,057,202 · 12,183,439/i);
  assert.match(englishHtml, /unified health identifier for a person or an animal<sup>\*<\/sup>/i);
  assert.match(overviewCss, /\.overview-card\s*>\s*span\s*\{[^}]*font-size:\s*clamp\(3\.8rem,\s*6vw,\s*5\.25rem\)/is);
  const overviewNumberRule = overviewCss.match(/\.overview-card\s*>\s*span\s*\{([^}]*)\}/is)?.[1] ?? '';
  assert.doesNotMatch(overviewNumberRule, /(?:^|;)\s*(?:width|height|border-radius|background)\s*:/i);
});

test('uses plain public-health language that can be understood from age 9 to 99', () => {
  assert.match(html, /reportes anónimos/i);
  assert.match(html, /Se comparan estadísticas, no personas/i);
  assert.match(html, /no se usan para identificar ni seguir a nadie/i);
  assert.doesNotMatch(html, /Señales SOSChain/i);
  assert.doesNotMatch(html, /No se cruzan personas|clave común/i);
});

test('fits the complete SOSChain logo inside the top navigation bar', () => {
  assert.match(siteShellCss, /\.site-header \.brand\s*\{[^}]*height:\s*64px[^}]*overflow:\s*visible/is);
  assert.match(siteShellCss, /\.site-header \.brand img\s*\{[^}]*height:\s*58px[^}]*object-fit:\s*contain/is);
  assert.match(siteShellCss, /\.site-footer \.footer-brand\s*\{[^}]*height:\s*92px[^}]*overflow:\s*visible/is);
  assert.match(siteShellCss, /\.site-footer \.footer-brand img\s*\{[^}]*height:\s*92px[^}]*object-fit:\s*contain/is);
});

test('explains the three emergency outcomes in plain Spanish', () => {
  assert.match(html, /La persona no responde/i);
  assert.match(html, /Solo está el QR del animal/i);
  assert.match(html, /La familia espera noticias/i);
  assert.match(html, /llamada privada[^<]*contactos de emergencia/i);
  assert.match(html, /recibir comunicaciones y llamadas/i);
  assert.match(html, /Un policía, un profesional sanitario o un socorrista/i);
  assert.match(englishHtml, /A police officer, healthcare professional or first responder/i);
});

test('places three icon-led permission choices beside the access heading without filler copy', () => {
  for (const scope of ['Por país', 'Por organización', 'Por e-mail profesional']) assert.match(html, new RegExp(scope, 'i'));
  assert.match(html, /organizaciones están verificadas/i);
  assert.match(html, /cada empleador acredita/i);
  assert.match(html, /Tu familia puede seguir tu recorrido por el hospital/i);
  assert.match(html, /class="permission-hero reveal"[\s\S]*class="permission-intro"[\s\S]*class="permission-panel"/i);
  assert.match(englishHtml, /class="permission-hero reveal"[\s\S]*class="permission-intro"[\s\S]*class="permission-panel"/i);
  assert.equal((html.match(/class="permission-panel"/g) ?? []).length, 1);
  assert.equal((html.match(/class="permission-scope"/g) ?? []).length, 3);
  assert.equal((html.match(/class="permission-icon"/g) ?? []).length, 3);
  assert.equal((englishHtml.match(/class="permission-icon"/g) ?? []).length, 3);
  assert.doesNotMatch(html, /Eliges dónde das permiso|En todos los casos eliges|<article class="permission-scope">\s*<span>[123]<\/span>/i);
  assert.doesNotMatch(englishHtml, /You choose where permission applies|In every case|<article class="permission-scope">\s*<span>[123]<\/span>/i);
  assert.match(overviewCss, /\.permission-hero\s*\{[^}]*grid-template-columns:/is);
  assert.equal((html.match(/class="trust-chain reveal"/g) ?? []).length, 1);
  assert.equal((html.match(/class="care-panel reveal"/g) ?? []).length, 1);
  assert.match(html, /Urgencias[\s\S]*Pruebas[\s\S]*Planta/i);
  assert.match(englishHtml, /Your family can follow your journey through the hospital/i);
  assert.doesNotMatch(html, /Tu familia puede seguir tu atención/i);
  assert.match(overviewCss, /@media\s*\(max-width:\s*980px\)[\s\S]*?\.permission-scopes\s*\{[^}]*grid-template-columns:\s*repeat\(3/is);
});

test('presents voluntary reports without three repetitive contribution cards', () => {
  assert.match(html, /<h2>Envía un reporte voluntario sin compartir tu identidad<\/h2>/i);
  assert.match(englishHtml, /<h2>Send a voluntary report without sharing your identity<\/h2>/i);
  assert.match(html, /<a href="#salud-publica">Reportes voluntarios<\/a>/i);
  assert.match(html, /<p class="section-label">Reportes voluntarios<\/p>/i);
  assert.match(englishHtml, /<a href="#public-health">Voluntary reports<\/a>/i);
  assert.match(englishHtml, /<p class="section-label">Voluntary reports<\/p>/i);
  assert.doesNotMatch(html, /<p class="section-label">Salud pública<\/p>/i);
  assert.doesNotMatch(englishHtml, /<p class="section-label">Public health<\/p>/i);
  assert.doesNotMatch(html, /Resultado clínico certificado/i);
  assert.doesNotMatch(html, /Registro clínico que tú eliges aportar/i);
  assert.doesNotMatch(html, /Síntomas o test hecho en casa/i);
  assert.doesNotMatch(englishHtml, /Certified clinical result|A clinical record you choose|Symptoms or a home test/i);
  assert.match(html, /reporte voluntario/i);
  assert.match(html, /Fundación UNID/i);
  assert.match(html, /otras organizaciones participantes/i);
  assert.match(html, /La persona elige si quiere enviarlo/i);
  assert.doesNotMatch(html, /class="contribution-paths"|class="contribution-path reveal"/i);
  assert.doesNotMatch(englishHtml, /class="contribution-paths"|class="contribution-path reveal"/i);
});

test('places the single optionality notice directly before the report summary', () => {
  for (const page of [html, englishHtml]) {
    const notice = page.indexOf('<div class="voluntary reveal">');
    const summary = page.indexOf('<div class="report-summary reveal">');
    assert.ok(notice >= 0 && notice < summary);
    assert.equal((page.match(/class="voluntary reveal"/g) ?? []).length, 1);
  }
  assert.match(html, /<div class="voluntary reveal"><strong>Siempre es opcional\.<\/strong><span>La persona elige si quiere enviarlo, qué información aportar y a qué organización participante dirigirlo\.<\/span><\/div>/);
});

test('explains aggregate comparison with official data without person matching', () => {
  assert.match(html, /reportes anónimos[^<]*se agrupan/i);
  assert.match(html, /Se comparan con estadísticas oficiales/i);
  assert.match(html, /zona, fecha aproximada y código clínico/i);
  assert.match(html, /Se comparan estadísticas, no personas/i);
  assert.match(html, /epidemias y pandemias/i);
});

test('keeps public-health reports and their privacy explanation in one compact section', () => {
  assert.equal((html.match(/<section class="section contribution"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<section class="section (?:collective|privacy)"/i);
  assert.equal((html.match(/class="report-summary/g) ?? []).length, 1);
  assert.match(html, /Cada reporte recibe un código nuevo/i);
  for (const excluded of ['Nombre', 'número de tarjeta', 'Historia clínica completa', 'Identidad de la clínica', 'profesional', 'Texto libre', 'archivos']) {
    assert.match(html, new RegExp(excluded, 'i'));
  }
  assert.match(html, /no permite unirlo con reportes anteriores/i);
  assert.match(html, /SOSChain no crea un gemelo digital/i);
  assert.doesNotMatch(html, /ResearchStudy/i);
});

test('provides accessible theme, text-size and mobile navigation controls', () => {
  assert.match(html, /id="font-size-select"/);
  assert.match(html, /<option value="s">S<\/option>/);
  assert.match(html, /<option value="m" selected>M<\/option>/);
  assert.match(html, /<option value="l">L<\/option>/);
  assert.match(html, /class="theme-toggle"/);
  assert.match(html, /class="menu-toggle"/);
  assert.match(script, /localStorage\.setItem\('soschain-font-size'/);
  assert.match(script, /localStorage\.setItem\('soschain-theme'/);
});

test('scales the complete typography system for small, medium and large text', () => {
  assert.match(html, /typography-scale\.css/);
  assert.match(englishHtml, /typography-scale\.css/);
  assert.match(typographyScaleCss, /--body-size:\s*1\.125rem;[\s\S]*--small-size:\s*\.875rem/);
  assert.match(typographyScaleCss, /html\[data-font-size="s"\]\s*\{[^}]*font-size:\s*13px[^}]*--body-size:\s*1\.125rem[^}]*--small-size:\s*\.875rem/i);
  assert.match(typographyScaleCss, /html\[data-font-size="m"\]\s*\{[^}]*font-size:\s*14px[^}]*--body-size:\s*1\.125rem[^}]*--small-size:\s*\.875rem/i);
  assert.match(typographyScaleCss, /html\[data-font-size="l"\]\s*\{[^}]*font-size:\s*15px[^}]*--body-size:\s*1\.125rem[^}]*--small-size:\s*\.875rem/i);
  assert.match(typographyScaleCss, /html\[data-theme="light"\]\s*\{[^}]*--ink:\s*#3f4750[^}]*--muted:\s*#66717c/i);
  assert.match(typographyScaleCss, /\.hero-copy\s*>\s*p:not\(\.hero-kicker\)\s*\{[^}]*font-size:\s*var\(--body-size\)/i);
  assert.match(typographyScaleCss, /\.button\s*\{[^}]*font-size:\s*var\(--body-size\)/i);
  assert.doesNotMatch(typographyScaleCss, /font-size:\s*clamp\([^;}]*px/);
});

test('uses a product-native narrative hero rather than the Connectech AI image', () => {
  assert.doesNotMatch(html, /soschain-network-hero-v1\.png/i);
  assert.doesNotMatch(englishHtml, /soschain-network-hero-v1\.png/i);
  assert.match(html, /class="hero-story/);
  assert.match(html, /class="story-card/);
  assert.match(html, /class="story-index/);
  assert.match(html, /class="story-call/);
  assert.match(siteShellCss, /\.hero-story\s*\{/);
  assert.match(siteShellCss, /\.story-card\s*\{[^}]*transform:\s*none/is);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /--body-size:/);
});

test('uses the hero card for secure real-time notifications instead of a dense data list', () => {
  assert.match(html, /Notificaciones seguras de nuevos datos disponibles en tiempo real/i);
  assert.match(englishHtml, /Secure notifications of new data available in real time/i);
  assert.match(html, /<article class="story-card">[\s\S]*class="story-index"[\s\S]*<\/article>/i);
  assert.match(englishHtml, /<article class="story-card">[\s\S]*class="story-index"[\s\S]*<\/article>/i);
  const spanishStoryCard = html.match(/<article class="story-card">([\s\S]*?)<\/article>/i)?.[1] ?? '';
  const englishStoryCard = englishHtml.match(/<article class="story-card">([\s\S]*?)<\/article>/i)?.[1] ?? '';
  assert.doesNotMatch(spanishStoryCard, /story-card-id|story-avatar|Identificador SOSChain|Otros identificadores asociados/i);
  assert.doesNotMatch(englishStoryCard, /story-card-id|story-avatar|SOSChain identifier|Other linked identifiers/i);
  assert.doesNotMatch(spanishStoryCard, /story-qr/i);
  assert.doesNotMatch(englishStoryCard, /story-qr/i);
  const spanishStoryIndex = html.match(/<section class="story-index">([\s\S]*?)<\/section>/i)?.[1] ?? '';
  const englishStoryIndex = englishHtml.match(/<section class="story-index">([\s\S]*?)<\/section>/i)?.[1] ?? '';
  assert.doesNotMatch(spanishStoryIndex, /<ul>|Datos para emergencias|Información clínica autorizada/i);
  assert.doesNotMatch(englishStoryIndex, /<ul>|Emergency data|Authorised clinical information/i);
});

test('keeps the patent note with the main card explanation and out of the footer', () => {
  assert.equal((html.match(/Patentes relacionadas: US 11,636,776/g) ?? []).length, 1);
  assert.equal((englishHtml.match(/Related patents: US 11,636,776/g) ?? []).length, 1);
  const spanishFooter = html.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/i)?.[1] ?? '';
  const englishFooter = englishHtml.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/i)?.[1] ?? '';
  assert.doesNotMatch(spanishFooter, /Patentes relacionadas/i);
  assert.doesNotMatch(englishFooter, /Related patents/i);
});

test('includes a white congress presentation derived from the same story', () => {
  assert.match(presentation, /class="slide cover"/);
  assert.match(presentation, /Tu información,[\s\S]*cuando más importa/i);
  assert.match(presentation, /¿Qué problema resuelve\?/i);
  assert.match(presentation, /Epidemias y pandemias/i);
  assert.match(presentation, /Se comparan estadísticas\. No se cruzan personas/i);
  assert.match(presentation, /Fundación UNID/i);
  assert.match(presentation, /reporte voluntario/i);
  assert.match(presentation, /window\.print\(\)/);
});

test('includes three independent landscape A4 congress pages that scale proportionally to A3', () => {
  assert.match(leaflet, /<title>SOSChain — Materiales para congreso — Octubre 2026<\/title>/);
  assert.match(leaflet, /class="sheet page-one"/);
  assert.match(leaflet, /class="sheet page-two"/);
  assert.match(leaflet, /class="sheet page-three"/);
  assert.equal((leaflet.match(/class="sheet page-/g) ?? []).length, 3);
  assert.match(leafletCss, /@page\s*\{[^}]*size:\s*A4 landscape/i);
  assert.match(leafletCss, /width:\s*297mm/);
  assert.match(leafletCss, /height:\s*210mm/);
  assert.doesNotMatch(leafletCss, /grid-template-columns:\s*1fr 1fr/);
  assert.match(leafletCss, /--distance-copy:\s*18pt/);
});

test('includes a complete English edition of the three congress pages', () => {
  assert.match(englishLeaflet, /<title>SOSChain — Congress materials — October 2026<\/title>/);
  assert.match(englishLeaflet, /<html lang="en">/);
  assert.equal((englishLeaflet.match(/class="sheet page-/g) ?? []).length, 3);
  assert.match(englishLeaflet, /Create your Unified Health Card/i);
  assert.match(englishLeaflet, /You stay in control/i);
  assert.match(englishLeaflet, /Three situations where SOSChain helps/i);
  assert.match(englishLeaflet, /Private calls/i);
  assert.match(englishLeaflet, /Related patents: US 11,636,776 · 11,960,454 · 12,057,202 · 12,183,439/i);
  assert.doesNotMatch(englishLeaflet, /Página|Crea tu|Tú mantienes|Llamadas privadas/i);
});

test('publishes both three-page congress PDFs from one bilingual docs page', () => {
  assert.match(publicDocsIndex, /<html lang="en">/);
  assert.match(publicDocsIndex, /SOSChain congress materials/i);
  assert.match(publicDocsIndex, /href="SOSChain-three-congress-panels-ES\.pdf"/);
  assert.match(publicDocsIndex, /href="SOSChain-three-congress-panels-EN\.pdf"/);
  assert.match(publicDocsIndex, /Español/);
  assert.match(publicDocsIndex, /English/);
  for (const pdf of [spanishCongressPdf, englishCongressPdf]) {
    assert.ok(pdf.length > 100_000);
    assert.equal(pdf.subarray(0, 4).toString('ascii'), '%PDF');
  }
});

test('embeds the matching congress PDF inside each public information page', () => {
  assert.match(html, /<a href="#congreso">Materiales para congreso<\/a>/i);
  assert.match(html, /<section class="section congress-materials" id="congreso">/i);
  const spanishCongressSection = html.match(/<section class="section congress-materials" id="congreso">[\s\S]*?<\/section>/i)?.[0] ?? '';
  assert.equal((spanishCongressSection.match(/class="congress-pdf-page"/g) ?? []).length, 3);
  assert.match(spanishCongressSection, /src="docs\/previews\/SOSChain-congress-ES-page-1\.png"[^>]*alt="Página 1 de 3/i);
  assert.match(spanishCongressSection, /src="docs\/previews\/SOSChain-congress-ES-page-3\.png"[^>]*alt="Página 3 de 3/i);
  assert.match(html, /href="docs\/SOSChain-three-congress-panels-ES\.pdf"[^>]*>Abrir PDF completo/i);

  assert.match(englishHtml, /<a href="#congress">Congress materials<\/a>/i);
  assert.match(englishHtml, /<section class="section congress-materials" id="congress">/i);
  const englishCongressSection = englishHtml.match(/<section class="section congress-materials" id="congress">[\s\S]*?<\/section>/i)?.[0] ?? '';
  assert.equal((englishCongressSection.match(/class="congress-pdf-page"/g) ?? []).length, 3);
  assert.match(englishCongressSection, /src="docs\/previews\/SOSChain-congress-EN-page-1\.png"[^>]*alt="Page 1 of 3/i);
  assert.match(englishCongressSection, /src="docs\/previews\/SOSChain-congress-EN-page-3\.png"[^>]*alt="Page 3 of 3/i);
  assert.match(englishHtml, /href="docs\/SOSChain-three-congress-panels-EN\.pdf"[^>]*>Open full PDF/i);

  assert.doesNotMatch(spanishCongressSection, /<iframe/i);
  assert.doesNotMatch(englishCongressSection, /<iframe/i);
  assert.match(congressMaterialsCss, /\.congress-pdf-preview\s*\{[^}]*grid-template-columns:\s*repeat\(3/is);
});

test('shows the official 2025 English SOSChain video on both information pages', () => {
  for (const page of [html, englishHtml]) {
    assert.match(page, /class="soschain-video-player"[^>]*data-video-id="L8AFQC2NttM"/);
    assert.match(page, /src="assets\/soschain-video-2025-en\.jpg"/);
    assert.match(page, /https:\/\/www\.youtube\.com\/watch\?v=L8AFQC2NttM/);
    assert.doesNotMatch(page, /<iframe/i);
  }
  assert.ok(officialVideoPoster.length > 10_000);
  assert.match(html, /<section class="section video-material" id="video-2025">/i);
  assert.match(html, /data-caption-language="es"/i);
  assert.doesNotMatch(html, /Vídeo oficial en inglés con subtítulos en español · 2025/i);
  assert.match(englishHtml, /<section class="section video-material" id="video-2025-en">/i);
  assert.match(englishHtml, /Official English video · 2025/i);
  assert.match(congressMaterialsCss, /\.soschain-video-player,\s*\.soschain-video-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/is);
  assert.match(script, /youtube-nocookie\.com\/embed\/\$\{videoId\}/);
  assert.match(script, /cc_lang_pref=\$\{encodeURIComponent\(captionLanguage\)\}/);
});

test('opens with three numbered steps for the card, index and emergency data', () => {
  assert.match(leaflet, /Crea tu Tarjeta de Salud Unificada/i);
  assert.match(leaflet, /identificador de salud unificado/i);
  assert.match(leaflet, /personas o animales/i);
  assert.match(leaflet, /Un identificador de salud unificado para personas o animales\.<\/p>\s*<a class="site-domain" href="https:\/\/soschain\.app">soschain\.app<\/a>/i);
  assert.match(leafletCss, /\.site-domain\s*\{[^}]*color:\s*var\(--orange-brand\)/is);
  assert.match(leafletCss, /\.page-one \.logo\s*\{[^}]*transform:\s*translateY\(-2\.7mm\)/is);
  assert.match(leaflet, /asociar[^<]*otros identificadores de salud/i);
  assert.match(leaflet, /índice[^<]*libro/i);
  assert.match(leaflet, /organizaciones verificadas[^<]*pueden actualizar/i);
  assert.match(leaflet, /copia de seguridad[^<]*Fundación UNID/i);
  assert.equal((leaflet.match(/class="step-number"/g) ?? []).length, 3);
  for (const number of ['1', '2', '3']) assert.match(leaflet, new RegExp(`class="step-number"[^>]*>${number}<`));
  assert.doesNotMatch(leaflet, /(?:^|>)0[123](?:<|$)/m);
  assert.doesNotMatch(leaflet, /class="flow-arrow"/);
  assert.doesNotMatch(leaflet, /soschain-network-hero-v1\.png/i);
  assert.doesNotMatch(leaflet, /recibes una notificación/i);
});

test('combines control, permission scopes, verified roles and the care journey on page two', () => {
  assert.match(leaflet, /Tú mantienes el control/i);
  assert.equal((leaflet.match(/class="permission-panel"/g) ?? []).length, 1);
  assert.match(leaflet, /por país/i);
  assert.match(leaflet, /por organización/i);
  assert.match(leaflet, /por e-mail profesional/i);
  assert.match(leaflet, /roles profesionales[^<]*verificados/i);
  assert.match(leaflet, /organizaciones verificadas[^<]*espacio de datos/i);
  assert.match(leaflet, /urgencias[^<]*pruebas[^<]*planta/i);
  assert.match(leaflet, /familiares[^<]*personas relacionadas[^<]*autorizadas/i);
});

test('uses the third page for three concrete situations and makes private calls explicit', () => {
  assert.match(leaflet, /Tres situaciones en las que SOSChain ayuda/i);
  assert.equal((leaflet.match(/class="scenario-card/g) ?? []).length, 3);
  assert.match(leaflet, /policía o un profesional sanitario atiende a una persona/i);
  assert.match(leaflet, /no responde o está desorientada/i);
  assert.match(leaflet, /mediante el identificador SOSChain[\s\S]*?el profesional puede iniciar una[\s\S]*?llamada privada[\s\S]*?contactos de emergencia/i);
  assert.match(leaflet, /datos para emergencias/i);
  assert.match(leaflet, /QR SOSChain del animal/i);
  assert.match(leaflet, /sin revelar los números de teléfono/i);
  assert.match(leaflet, /familia espera noticias/i);
  assert.match(leaflet, /recibir[\s\S]*?comunicaciones y llamadas/i);
  assert.doesNotMatch(leaflet, /En una emergencia, conecta a las personas/i);
  assert.doesNotMatch(leaflet, /→/);
});

test('uses narrative scenes on every brochure page and makes the animal QR scene unmistakable', () => {
  const pageOne = leaflet.match(/<section class="sheet page-one"[\s\S]*?<section class="sheet page-two"/)?.[0] ?? '';
  const pageTwo = leaflet.match(/<section class="sheet page-two"[\s\S]*?<section class="sheet page-three"/)?.[0] ?? '';
  const pageThree = leaflet.match(/<section class="sheet page-three"[\s\S]*?<\/section>\s*<\/main>/)?.[0] ?? '';

  assert.equal((pageOne.match(/class="narrative-icon/g) ?? []).length, 3);
  assert.equal((pageTwo.match(/class="narrative-icon/g) ?? []).length, 7);
  assert.equal((pageThree.match(/class="narrative-icon/g) ?? []).length, 3);
  assert.equal((leaflet.match(/class="narrative-icon/g) ?? []).length, 13);
  assert.match(pageThree, /class="[^\"]*dog-body[^\"]*"/);
  assert.match(pageThree, /class="[^\"]*dog-ear[^\"]*"/);
  assert.match(pageThree, /class="[^\"]*qr-tag[^\"]*"/);
  assert.match(pageThree, /class="[^\"]*scan-lines[^\"]*"/);
});

test('keeps page-one icons clean and places the final service and patent details together', () => {
  const pageOne = leaflet.match(/<section class="sheet page-one"[\s\S]*?<section class="sheet page-two"/)?.[0] ?? '';
  const pageThree = leaflet.match(/<section class="sheet page-three"[\s\S]*?<\/section>\s*<\/main>/)?.[0] ?? '';

  assert.doesNotMatch(pageOne, /<circle class="scene-warm"/);
  assert.match(pageOne, /Parte del espacio de datos[\s\S]*Patentes relacionadas: US 11,636,776 · 11,960,454 · 12,057,202 · 12,183,439/);
  assert.match(pageOne, /Servicio de Fundación UNID para personas · \(beta\)/);
  assert.doesNotMatch(pageOne, /<strong>Fase beta<\/strong>/i);
  assert.doesNotMatch(pageThree, /class="patent-note"/);
  assert.match(leafletCss, /\.care-panel\s*\{[^}]*background:\s*var\(--orange-soft\)/i);
});

test('uses blue as the main system, restores only the soft orange card background and avoids heavy display weights', () => {
  assert.match(leafletCss, /--accent-blue:/);
  assert.match(leafletCss, /--orange-soft:\s*#fff0e8/i);
  assert.match(leafletCss, /\.step-card:nth-child\(3\)[^}]*background:\s*var\(--orange-soft\)/i);
  assert.match(leafletCss, /\.scenario-card:nth-child\(3\)[^}]*background:\s*var\(--orange-soft\)/i);
  assert.doesNotMatch(leafletCss, /--orange:/);
  assert.doesNotMatch(leafletCss, /#ff5818/i);
  assert.doesNotMatch(leafletCss, /font-weight:\s*(?:8\d\d|9\d\d)/i);
});

test('keeps the four code-native icon families as the comparison sheet used for selection', () => {
  assert.match(iconOptions, /SOSChain \| Opciones de iconos/);
  assert.equal((iconOptions.match(/class="icon-family/g) ?? []).length, 4);
  for (const name of ['Línea clínica', 'Duotono', 'Pictograma sólido', 'Escena narrativa']) {
    assert.match(iconOptions, new RegExp(name, 'i'));
  }
  assert.equal((iconOptions.match(/<svg /g) ?? []).length, 12);
  assert.doesNotMatch(iconOptions, /<img\b/i);
  assert.match(iconOptionsCss, /@page\s*\{[^}]*size:\s*A4 landscape/i);
  assert.match(iconOptionsCss, /width:\s*297mm/);
  assert.match(iconOptionsCss, /height:\s*210mm/);
});
