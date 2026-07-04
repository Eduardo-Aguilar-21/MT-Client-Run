# MT-Cotiza - Inicio en un clic

Esta carpeta controla el arranque local de API + Front.

## Estructura

- `start-MT-Cotiza-Client.bat`: inicio en un clic.
- `stop-MT-Cotiza-Client.bat`: detiene servicios.
- `MT-Cotiza-Client-Run.ps1`: orquestador.
- `docker-compose.yml`: orquesta servicios cuando hay Docker.
- `.env`: variables de entorno.
- `build/`
  - `api/`: JAR de la API.
  - `front/`: frontend standalone de Next.js.
- `data/`
  - `db/`, `uploads/`, `logs/`.

## Arranque recomendado (cliente)

Por defecto este paquete estÃ¡ configurado para **arrancar sin Docker** (solo con artefactos ya compilados).

1. Doble click en `start-MT-Cotiza-Client.bat` (modo silencioso, sin consola).
2. Al levantar, abre automáticamente `http://localhost:3000` (o el puerto definido por `FRONTEND_PORT`).

> Si quieres forzar modo Docker, cambia en `.env`: `MT_ARTIFACT_ONLY=0`.

## Modo rÃ¡pido (para uso diario)

Por defecto el script usa `MT_FAST_START=1`:
- Reutiliza artefactos si estÃ¡n disponibles y al dia.
- No recompila backend/frontend si no cambiaron fuentes.
- Esto evita esperas largas todos los dÃ­as.

Opciones:
- `.env` `MT_FAST_START=1|0` (default `1`)
- `.env` `MT_FORCE_REBUILD=1` (fuerza recompilacion completa)
- `.env` `MT_CLEAN_DATA=1|0` (default `0`, para no borrar DB local entre arranques)

### MT_ARTIFACT_ONLY

Este archivo funciona para distribuciÃ³n al cliente:

- `MT_ARTIFACT_ONLY=1` (default): no usa Docker para levantar. Arranca **solo** con artefactos existentes.
  - Requiere `build/api/*.jar`
  - Requiere `build/front/server.js` y su Ã¡rbol (`public`, `.next/static`, etc.)
- `MT_ARTIFACT_ONLY=0`: usa Docker para compilar/levantar si estÃ¡ disponible.

## Entrega de actualizaciones (sin nada extra para el cliente)

Para cada actualizaciÃ³n, el cliente debe reemplazar Ãºnicamente:

1. `MT-Client-Run/build/api/`
   - `*.jar` de la API nueva.

2. `MT-Client-Run/build/front/`
   - `server.js`
   - `package.json`
   - `.next/static/` (si cambiÃ³ frontend)
   - `public/` (si cambiÃ³)

3. `MT-Client-Run/.env` (solo si cambian URLs, puertos o secrets).

4. `MT-Client-Run/data/db/` y `MT-Client-Run/data/uploads/`
   - Solo si tÃº entregas datos nuevos/correcciones para producciÃ³n local.

Notas importantes:
- No hace falta incluir cÃ³digo fuente de `MT-Cotiza-Client-API` ni `MT-Cotiza-Client-Front`.
- El cliente no debe correr compilaciones ni bajar imÃ¡genes desde cero.

## Modo sin Docker

El script intenta este modo solo si Docker no estÃ¡ disponible y ya existen:
- `build/api` con un `.jar` vÃ¡lido
- `build/front/server.js`
- Java y Node disponibles (`runtime\java\bin\java.exe`, `runtime\node\node.exe` o instalados en el equipo)

Si quieres que el cliente no instale nada adicional, empaqueta en:
- `runtime\java\bin\java.exe` (JRE/JDK 17)
- `runtime\node\node.exe` (Node 20)

Nota: en modo sin Docker se requiere base de datos externa (no levanta PostgreSQL de Docker).

## Detener

- Doble click en `stop-MT-Cotiza-Client.bat`.

## Puertos

- API: `http://localhost:8080`
- Front: `http://localhost:3000`
- DB (con Docker): `5434`

