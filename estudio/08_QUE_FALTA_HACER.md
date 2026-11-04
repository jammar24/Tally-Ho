# 📋 Guía 08: Hoja de Ruta — Qué Te Falta Hacer Ahora (Checklist Final)

¡Tu código, arquitectura, páginas y motor de inteligencia artificial ya están **100% listos y funcionando**! 

A continuación tienes la lista exacta, ordenada paso a paso, de las tareas que te quedan para completar tu participación y ganar en el **PayPal AI Hackathon 2026 (Devpost)**:

---

## 🎯 Resumen del Checklist

- [ ] **Paso 1:** Recorrido y prueba visual en tu navegador local (`localhost:3000`).
- [ ] **Paso 2:** (Opcional) Colocar tu propia clave de Gemini en `.env.local`.
- [ ] **Paso 3:** Subir el código a tu repositorio de GitHub (`@3m3r4l`).
- [ ] **Paso 4:** Desplegar el proyecto en la nube (Vercel o Render).
- [ ] **Paso 5:** Grabar el video de demostración de 2:30 minutos para los jueces.
- [ ] **Paso 6:** Completar la ficha de postulación en Devpost antes del cierre.

---

## 🖥️ Paso 1: Prueba Visual y Recorrido en Local (5 minutos)

Asegúrate de que el servidor esté activo con `npm run dev` y abre [http://localhost:3000](http://localhost:3000):

1. **Prueba el flujo del Comerciante:**
   - Entra a **Bandeja de Disputas (`/disputes`)**.
   - Haz clic en **`PP-D-7001`** (Item Not Received - $149.99).
   - Pulsa el botón **"⚡ Analyze with AI"** (o *"Re-Analyze"*). Verás cómo se cargan los hechos citados (`F1`, `F2`), la tabla de *Claim Check* y el borrador de respuesta.
   - Haz clic en **"✓ Approve & Submit"**, revisa el texto y confirma.
   - Visita el **Portal Comerciante (`/merchant`)** y revisa la *Bóveda de Evidencia* con los documentos indexados.
2. **Prueba el flujo del Cliente:**
   - Haz clic en el botón de conmutación de rol en el Navbar para cambiar a **`👤 Customer`** o ve directo a **[http://localhost:3000/portal](http://localhost:3000/portal)**.
   - Observa la comparación transparente entre la queja del comprador y la guía oficial de FedEx con firma confirmada.
3. **Prueba el Acceso Protegido de Administrador:**
   - Haz clic en el botón **`🔒 Admin`** en la esquina superior derecha o ve a **[http://localhost:3000/admin](http://localhost:3000/admin)**.
   - Pulsa **"Autocompletar e Iniciar Sesión"** (o ingresa `admin@disputedesk.ai` / `Admin2026!`).
   - Revisa el panel de métricas ($1,420.50 protegidos) y el control de guardrails.
4. **Revisa tu perfil de Desarrollador:**
   - Abre **[http://localhost:3000/about](http://localhost:3000/about)** y confirma que tu fotografía, biografía y enlace de GitHub se visualicen perfectamente.

---

## 🔑 Paso 2: (Opcional) Claves Reales en `.env.local`

El proyecto ya cuenta con el archivo `.env.local`. Si deseas que el agente realice llamadas en vivo a Google Gemini durante tu demostración:

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey) y genera una clave gratuita de API.
2. Abre tu archivo `.env.local` y colócala en:
   ```bash
   LLM_API_KEY=tu_clave_de_google_ai_studio_aqui
   ```
3. *(Opcional)* Si tienes credenciales de desarrollador de PayPal Sandbox, puedes colocarlas en `PAYPAL_CLIENT_ID` y `PAYPAL_CLIENT_SECRET`.

> [!NOTE]
> **Modo Demo Seguro:** Si decides dejar `LLM_API_KEY=` en blanco, **no hay ningún problema**. El motor `lib/ai.ts` activa automáticamente el respaldo a prueba de fallos (*Fail-Safe*), mostrando análisis realistas y citados sin depender de conexión externa.

---

## 🐙 Paso 3: Subir el Código a tu GitHub (`@3m3r4l`)

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# 1. Inicializar repositorio git (si no está inicializado)
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el commit oficial
git commit -m "feat: Tally-Ho Dispute Engine for PayPal AI Hackathon 2026"

# 4. Asegurar rama principal
git branch -M main

# 5. Conectar con tu repositorio en GitHub (crea el repo antes en github.com/new con el nombre tally-ho)
git remote add origin https://github.com/3m3r4l/tally-ho-dispute-engine.git

# 6. Subir el código
git push -u origin main
```

*(El archivo `.gitignore` ya protege automáticamente `.env.local` y `node_modules` para que nunca subas secretos).*

---

## ☁️ Paso 4: Despliegue en la Nube (Vercel en 2 minutos)

Tener un enlace público en vivo le suma puntos decisivos a tu proyecto ante el jurado de PayPal:

1. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** y selecciona tu repositorio `tally-ho-dispute-engine`.
3. En la sección **Environment Variables**, añade:
   - `PAYPAL_ENV` = `sandbox`
   - `PAYPAL_API_BASE` = `https://api-m.sandbox.paypal.com`
   - `DATA_MODE` = `auto`
   - *(Opcional)* `LLM_API_KEY` = tu clave de Gemini.
4. Haz clic en **"Deploy"**.
5. En ~60 segundos obtendrás tu URL pública (ejemplo: `https://tally-ho-dispute-engine.vercel.app`).

---

## 🎬 Paso 5: Grabación del Video de Demostración (Guion de 2:30 min)

La regla de Devpost exige un video de máximo 3 minutos. Aquí tienes la estructura ideal para impresionar a los jueces:

| Tiempo | Qué mostrar en pantalla | Qué decir / Explicar |
| :--- | :--- | :--- |
| **0:00 - 0:30** | Portada del proyecto / Home de Tally-Ho | *"Los pequeños comerciantes pierden millones de dólares cada año en disputas de PayPal, no por mala fe, sino porque recopilar pruebas de paquetería y redactar respuestas formales antes del plazo límite es abrumador. Presento Tally-Ho Dispute Engine."* |
| **0:30 - 1:15** | Entrar a `/disputes` y abrir `PP-D-7001`. Pulsar *"Analyze with AI"* | *"Tally-Ho actúa como un agente de IA autónomo. Lee la reclamación del comprador como dato no confiable, consulta la guía del transportista (FedEx) y detecta que el paquete sí fue entregado con firma. Extrae hechos irrefutables sin alucinar."* |
| **1:15 - 1:45** | Abrir diálogo de *"Approve & Submit"* | *"Seguridad Human-in-the-Loop: La IA nunca envía nada a PayPal a espaldas del vendedor. El comerciante revisa el borrador fundamentado con citas de evidencia y con un solo clic aprueba el envío oficial al Sandbox de PayPal."* |
| **1:45 - 2:15** | Mostrar `/portal`, `/merchant` y `/admin` | *"Tally-Ho incluye un ecosistema completo: un Portal Transparente para que el comprador vea la prueba del transportista sin intermediarios oscuros, un Merchant Hub para subir guías y un Dashboard de Administrador con métricas ejecutivas y candado de seguridad Sandbox."* |
| **2:15 - 2:30** | Página `/about` con tu tarjeta de desarrollador | *"Desarrollado con Next.js 14, modelos Gemini y las APIs oficiales de PayPal Sandbox. Soy Jamar Masias (@3m3r4l). ¡Muchas gracias!"* |

---

## 📝 Paso 6: Ficha de Postulación en Devpost

Al llenar el formulario en la plataforma del hackathon:
- **Project Title:** `Tally-Ho — Autonomous Evidence Defense Engine for PayPal Disputes`
- **Elevator Pitch:** *"An AI-powered dispute engine for PayPal merchants that autonomously reads evidence, cross-checks claims against carrier ground-truth, and drafts airtight responses with mandatory human approval."*
- **Technologies Used:** `Next.js 14`, `TypeScript`, `Google Gemini 2.5 Flash`, `PayPal Sandbox Disputes APIv1`, `Tailwind CSS`, `AG Grid`.
- **Links:** Enlace a tu repositorio de GitHub y enlace al despliegue en Vercel.
- **Video:** Enlace de YouTube o Loom.

