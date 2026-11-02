# SOSChain.info

Web pública estática bilingüe para explicar SOSChain, los casos de uso de emergencia y la aportación de señales aisladas para salud pública. El inglés es el idioma predeterminado; el navegador abre español para las variantes `es-*`, y la elección manual queda guardada.

## Vista local

```bash
npm run serve
```

Abrir `http://localhost:8090`.

La presentación informativa está en `http://localhost:8090/presentacion.html`. Tiene fondo blanco y un botón para guardarla como PDF.

El documento informativo está en `http://localhost:8090/diptico.html`. Consta de tres páginas A4 horizontales independientes; cada página puede ampliarse proporcionalmente a A3 horizontal.

La edición inglesa está en `http://localhost:8090/diptico-en.html` y conserva las mismas tres páginas A4 horizontales.

La página pública de información está en `https://soschain.app/docs/` y enlaza los PDF en español e inglés.

La página inglesa principal (`/`) y la española (`/es.html`) muestran también una vista previa de las tres páginas del PDF en `#information` y `#informacion`.

## Publicación

La publicación por FTPS se realiza siempre con sustitución atómica:

```bash
npm run deploy
```

El script sube y verifica cada archivo con un nombre temporal antes de renombrarlo sobre el archivo público. Nunca se debe subir `index.html` directamente, porque durante una transferencia directa Raiola puede servir su página predeterminada. Para publicar solo archivos concretos: `npm run deploy -- index.html site-shell.css`.

## Pruebas

```bash
npm test
```

La web distingue los reportes estadísticos anónimos de cualquier historia personal o gemelo digital. La persona decide si quiere enviar un reporte voluntario a Fundación UNID o a otra organización participante. Los enlaces de acceso apuntan a los entornos de pruebas de SOSChain Personal y Professional.
