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
    java/
    node/
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

Copia `.env.example` como `.env` y ajusta los valores reales.

Variables importantes:

```text
MT_ARTIFACT_ONLY=1
API_PORT=8080
FRONTEND_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8080/api
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5434/cotiflow
SPRING_DATASOURCE_USERNAME=cotiflow_user
SPRING_DATASOURCE_PASSWORD=cotiflow_password
JWT_SECRET_KEY=...
```

## Base de datos

El launcher arranca API y Front. La base de datos debe estar disponible segun `SPRING_DATASOURCE_URL`.

Para cliente final hay que definir uno de estos caminos:

```text
1. PostgreSQL local/instalado.
2. PostgreSQL levantado por Docker.
3. PostgreSQL portable empaquetado aparte.
```

El launcher no compila codigo fuente.

## Logs

En modo standalone, los logs quedan en:

```text
data/logs/api.out.log
data/logs/api.err.log
data/logs/front.out.log
data/logs/front.err.log
```

Ademas la API puede escribir su log interno en el valor de `LOG_FILE_NAME`.

## Detener

Ejecutar:

```text
stop-MT-Cotiza-Client.bat
```
