# 🚀 Guía 01: Cómo Ejecutar la App y Verla en el Navegador

Esta guía te explica paso a paso cómo iniciar y probar **DisputeDesk** en tu computadora local (Windows / PowerShell).

---

## 1. Puesta en Marcha Rápida

### Paso 1: Abrir la terminal
Abre PowerShell o tu terminal preferida en la carpeta del proyecto:
```powershell
cd c:\Users\jamma\.gemini\antigravity\scratch\dispute-desk
```

### Paso 2: Iniciar el servidor local
Ejecuta el script de desarrollo:
```powershell
npm run dev
```

Verás una salida similar a esta:
```text
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1.4s
```

### Paso 3: Abrir tu navegador
Abre Chrome, Edge, Brave o tu navegador favorito e ingresa a:
👉 **[http://localhost:3000](http://localhost:3000)**

Para detener el servidor en cualquier momento, presiona `Ctrl + C` en la terminal.

---

## 2. Scripts Disponibles en `package.json`

El proyecto incluye varios scripts útiles para desarrollo y verificación:

| Comando | ¿Qué hace? |
| :--- | :--- |
| `npm run dev` | Inicia Next.js en modo desarrollo con recarga en caliente (*Hot Reload*). |
| `npm run build` | Compila y optimiza el proyecto para producción (verificación estricta de compilación). |
| `npm run start` | Levanta el servidor en modo producción una vez compilado con `npm run build`. |
| `npm test` | Ejecuta las pruebas unitarias y de integración usando **Vitest**. |
| `npm run test:watch` | Ejecuta Vitest en modo observador (se re-ejecuta al guardar cambios en código). |
| `npm run paypal:token` | Prueba la obtención del token OAuth2 contra el Sandbox de PayPal (usa `scripts/paypal-token.mjs`). |
| `npm run paypal:disputes` | Consulta la lista de disputas activas en tu cuenta Sandbox (`scripts/list-disputes.mjs`). |
| `npm run paypal:order` | Crea una orden de prueba en el Sandbox de PayPal (`scripts/create-order.mjs`). |
| `npm run check:llm` | Verifica la conexión con el modelo de IA (Gemini / OpenAI), comprobando JSON y multimodalidad (`scripts/check-llm.mjs`). |

---

## 3. Variables de Entorno (`.env.local`)

Para probar llamadas reales al Sandbox de PayPal o a tu proveedor de IA, crea un archivo `.env.local` en la raíz del proyecto (basado en `.env.example`):

```bash
# PayPal Sandbox
PAYPAL_ENV=sandbox
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID=tu_client_id_aqui
PAYPAL_CLIENT_SECRET=tu_client_secret_aqui

# Modo de datos (auto | live | demo)
DATA_MODE=auto

# Proveedor de Inteligencia Artificial
LLM_PROVIDER=gemini
LLM_API_KEY=tu_api_key_de_google_ai_studio
LLM_MODEL_PRIMARY=gemini-2.5-flash
LLM_VISION=auto

# Límites de seguridad del Agente
MAX_AGENT_STEPS=6
MAX_LLM_CALLS_PER_ANALYSIS=12
ANALYSIS_TIMEOUT_MS=60000
DAILY_ANALYSIS_CAP=15
```

> [!TIP]
> **Modo Demo automático:** Si no configuras las claves de PayPal o del LLM, la aplicación funciona automáticamente en **Modo Demo**, cargando casos sintéticos y análisis en caché para que puedas navegarla sin restricciones.

---

## 4. Solución de Problemas Comunes en Windows

1. **Error: `'next' no se reconoce como un comando interno o externo`**:
   - **Causa:** La carpeta `node_modules/.bin` no tenía los ejecutables de Windows generados.
   - **Solución:** Ya se crearon los shims (`node_modules/.bin/next.cmd` y `next`). Si alguna vez vuelve a ocurrir, puedes ejecutar directamente: `node ./node_modules/next/dist/bin/next dev`.

2. **Error: `Port 3000 is already in use` o `listen EADDRINUSE :::3000`**:
   - **Causa:** Un proceso anterior de Node.js quedó congelado o en segundo plano ocupando el puerto 3000.
   - **Solución rápida en PowerShell:**
     ```powershell
     # 1. Encontrar el PID del proceso
     netstat -ano | findstr :3000

     # 2. Terminar el proceso por su PID (ejemplo PID 3284)
     taskkill /F /PID <NUMERO_PID>

     # 3. Relanzar el servidor
     npm run dev
     ```
   - **Alternativa:** También puedes ejecutar Next.js en otro puerto libre:
     ```powershell
     npx next dev -p 3001
     ```
     Y abrir en su lugar: `http://localhost:3001`.

