# MT-Cotiza Client Run

Launcher local para ejecutar MT-Cotiza Client desde artefactos ya compilados.

## Regla principal

Esta carpeta no debe compilar el backend ni el frontend en la maquina del cliente.

El cliente solo debe recibir/copiar artefactos en:

```text
build/api/
build/front/
```

Luego ejecuta:

```text
start-MT-Cotiza-Client.bat
```

## Estructura esperada

```text
MT-Client-Run/
  start-MT-Cotiza-Client.bat
  stop-MT-Cotiza-Client.bat
  MT-Cotiza-Client-Run.ps1
  MT-Cotiza-Client-Run-Start-Silent.vbs
  .env
  build/
    api/
      core-spring-monolith-0.0.1-SNAPSHOT.jar
    front/
      server.js
      package.json
      .next/
      public/
      node_modules/
  data/
    db/
    uploads/
    logs/
  runtime/
    java/       java portable para ejecutar la API
    node/       node portable para ejecutar el Front
    postgres/   PostgreSQL portable
```

## Actualizar API

Compilar fuera de Run, desde `MT-Cotiza-Client-API`:

```bash
bash mvnw clean package
```

En Windows puedes usar:

```bat
mvnw.cmd clean package
```

Copiar el JAR generado:

```text
MT-Cotiza-Client-API/target/core-spring-monolith-0.0.1-SNAPSHOT.jar
```

a:

```text
MT-Client-Run/build/api/
```

## Actualizar Front

Compilar fuera de Run, desde `MT-Cotiza-Client-Front`:

```bash
npm run build:run
```

Copiar TODO el contenido de:

```text
MT-Cotiza-Client-Front/dist/run-front/
```

a:

```text
MT-Client-Run/build/front/
```

Incluye `node_modules` si aparece dentro de `dist/run-front`; ese es el standalone minimo de Next, no el `node_modules` del repo fuente.

## Configuracion

Si `.env` no existe, el launcher lo crea desde `.env.example`. Para produccion, revisa y ajusta `.env` antes de entregar la carpeta.

Variables importantes:

```text
MT_ARTIFACT_ONLY=1
RUN_DB_MODE=portable
API_PORT=8080
FRONTEND_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8080/api
POSTGRES_DB=cotiflow
POSTGRES_USER=cotiflow_user
POSTGRES_PASSWORD=cotiflow_password
POSTGRES_PORT=5434
JWT_SECRET_KEY=...
```

## Base de datos

Por defecto Run administra PostgreSQL portable dentro de la carpeta Run:

```text
RUN_DB_MODE=portable
```

Los archivos de la base quedan dentro de:

```text
MT-Client-Run/data/db/
```

El launcher usa el PostgreSQL portable incluido en `runtime/postgres/bin`, inicializa `data/db` si hace falta, espera a que responda `pg_isready`, y luego arranca API y Front desde los artefactos de `build/`.

Si excepcionalmente quieres usar Docker o una DB externa, cambia:

```text
RUN_DB_MODE=docker
# o
RUN_DB_MODE=external
```

Para `external`, ajusta `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` y `SPRING_DATASOURCE_PASSWORD`.

El launcher no compila codigo fuente. Para dejar el Run portable antes de entregarlo, ejecuta:

```text
prepare-MT-Cotiza-Client-Run-Runtime.bat
```

Ese script descarga y coloca Node en `runtime/node` y Java JRE en `runtime/java`. Maven no se incluye porque no se necesita para correr; solo se usa fuera del Run para compilar el JAR.


## Limpieza de prueba

Para reiniciar la base local y logs durante pruebas, ejecuta:

```text
clean-MT-Cotiza-Client-Run.bat
```

Esto conserva `build/`, `runtime/` y `data/uploads/`.

## Backup y restauracion

Para crear un backup de la base local, primero asegúrate de que Run esté iniciado y ejecuta:

```text
backup-MT-Cotiza-Client-Run.bat
```

El archivo se guarda en:

```text
data/backups/cotiflow-AAAAMMDD-HHMMSS.backup
```

Para restaurar el último backup disponible, detén la aplicación y ejecuta:

```text
restore-MT-Cotiza-Client-Run.bat
```

También puedes arrastrar un archivo `.backup` sobre `restore-MT-Cotiza-Client-Run.bat` para restaurar un backup específico.


### Arranque rápido con limpieza integrada

Para evitar teclear manualmente los comandos de limpieza, usa:

```text
start-MT-Cotiza-Client-Run-Fast.bat --clean
```

Esto ejecuta:

- Detiene procesos `java`, `node` y `postgres`.
- Borra `data\\db` y `data\\logs`.
- Arranca el launcher en modo silencioso.

Opciones:

```text
start-MT-Cotiza-Client-Run-Fast.bat --clean      Limpieza + arranque
start-MT-Cotiza-Client-Run-Fast.bat --noclean    Arranque directo
start-MT-Cotiza-Client-Run-Fast.bat              Arranque con confirmación
```

## Logs

El arranque silencioso escribe el log principal en:

```text
data/logs/run.log
```

En modo standalone, los logs quedan en:

```text
data/logs/api.out.log
data/logs/api.err.log
data/logs/front.out.log
data/logs/front.err.log
```

Ademas la API escribe su log interno en `data/logs/cotiflow.log`. El launcher fuerza `UPLOAD_DIR` y `LOG_FILE_NAME` a rutas absolutas dentro de `MT-Client-Run/data`.

## Detener

Ejecutar:

```text
stop-MT-Cotiza-Client.bat
```
