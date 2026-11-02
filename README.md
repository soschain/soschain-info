# SOSChain.info

Web pública estática en español para explicar SOSChain, los casos de uso de emergencia y la aportación de señales aisladas para salud pública.

## Vista local

```bash
npm run serve
```

Abrir `http://localhost:8090`.

La presentación informativa está en `http://localhost:8090/presentacion.html`. Tiene fondo blanco y un botón para guardarla como PDF.

El documento informativo está en `http://localhost:8090/diptico.html`. Consta de tres páginas A4 horizontales independientes; cada página puede ampliarse proporcionalmente a A3 horizontal.

La edición inglesa está en `http://localhost:8090/diptico-en.html` y conserva las mismas tres páginas A4 horizontales.

La página pública de información está en `https://soschain.app/docs/` y enlaza los PDF en español e inglés.

Las páginas informativas principal e inglesa muestran también una vista previa de las tres páginas del PDF en sus secciones `#informacion` y `#information`.

## Pruebas

```bash
npm test
```

La web distingue los reportes estadísticos anónimos de cualquier historia personal o gemelo digital. La persona decide si quiere enviar un reporte voluntario a Fundación UNID o a otra organización participante. Los enlaces de acceso apuntan a los entornos de pruebas de SOSChain Personal y Professional.
