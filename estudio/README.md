# 📚 Centro de Estudio — Tally-Ho Dispute Engine

¡Bienvenido a tu centro de documentación y estudio de **Tally-Ho**! 

Esta carpeta contiene todo lo que necesitas saber, entender y dominar sobre el proyecto: desde cómo ponerlo en marcha en tu máquina hasta cómo funciona su arquitectura de Inteligencia Artificial para el **PayPal AI Hackathon (Devpost 2026)**.

---

## 🗺️ Mapa de Contenidos

| Archivo | ¿Qué aprenderás aquí? |
| :--- | :--- |
| **[`01_COMO_EJECUTAR.md`](./01_COMO_EJECUTAR.md)** | **Puesta en marcha:** Comandos para levantar el servidor en Windows, cómo abrir el navegador en `localhost:3000`, scripts de prueba y solución de errores típicos. |
| **[`02_QUE_ES_DISPUTEDESK.md`](./02_QUE_ES_DISPUTEDESK.md)** | **El Producto y el Negocio:** Qué problema resuelve a los comerciantes de PayPal, por qué los jueces valoran este enfoque, los premios a los que aspiramos ($5,000+) y la propuesta de valor. |
| **[`03_ARQUITECTURA_Y_TECNOLOGIAS.md`](./03_ARQUITECTURA_Y_TECNOLOGIAS.md)** | **Stack Técnico:** Next.js 14 (App Router), Tailwind CSS, AG Grid Community, adaptador agnóstico de IA (Gemini / OpenAI), estructura de carpetas y flujo de datos. |
| **[`04_LAS_5_CAPACIDADES_DE_IA.md`](./04_LAS_5_CAPACIDADES_DE_IA.md)** | **El Núcleo de IA (Deep Dive):** 1. Lectura multimodal y citas verificadas, 2. Bucle de agente acotado con herramientas, 3. Contraste de afirmaciones (*Claim Check*), 4. Redacción con marcadores `{{fact:Fx}}`, 5. Evaluación empírica. |
| **[`05_REGLAS_DE_ORO_Y_SEGURIDAD.md`](./05_REGLAS_DE_ORO_Y_SEGURIDAD.md)** | **Reglas Inquebrantables:** *Sandbox Only*, aprobación humana obligatoria (*Human-in-the-loop*), prohibición de probabilidades inventadas, etiquetado de datos demo y manejo de secretos. |
| **[`06_CRONOGRAMA_Y_FASES.md`](./06_CRONOGRAMA_Y_FASES.md)** | **Plan de Acción (Día a Día):** De la Fase 0 (Spike inicial) a la Fase 4 (Despliegue en Render, grabación del video de 2:45 min y entrega final en Devpost). |
| **[`07_ACTUALIZACION_TALLY_HO.md`](./07_ACTUALIZACION_TALLY_HO.md)** | **Última Actualización:** Cambio de marca a Tally-Ho, Dispute Engine, ficha del creador Jamar Masias (@3m3r4l), nuevo Footer global, motor `lib/ai.ts` y las 16 pruebas unitarias. |
| **[`08_QUE_FALTA_HACER.md`](./08_QUE_FALTA_HACER.md)** | **🎯 Checklist Final:** Pasos exactos que te quedan: prueba visual, subida a GitHub, despliegue en Vercel, grabación del video de 2:30 min y ficha en Devpost. |

---

## 🚀 Nuevas Funcionalidades de la Plataforma (Fase 2)

DisputeDesk evolucionó a un ecosistema tripartito completo para Comerciantes, Compradores y Administradores:

### 1. 🏪 Portal de Comerciantes (`/merchant`)
- **Bóveda de Evidencia (*Evidence Vault*):** Carga y almacenamiento de pruebas de entrega (PDF/JPG), guías de FedEx/USPS, facturas de almacén y políticas de devolución.
- **Cola de Disputas de la Tienda:** Casos asignados a la tienda sandbox que requieren evidencia para no perder por omisión, con cálculo de capital en riesgo y elegibilidad para *Seller Protection*.
- **Configuración de Tienda PayPal Sandbox:** Monitoreo en vivo de webhooks (`CUSTOMER.DISPUTE.CREATED`, `CUSTOMER.DISPUTE.RESOLVED`) y activación de auto-extracción de guías.

### 2. 🛡️ Control de Acceso Ejecutivo de Administrador (`/admin`)
- **Acceso Protegido y Exclusivo:** Ya **NO** aparece en el Home público por ser confidencial. Cuenta con una pestaña dedicada y una puerta de seguridad con credenciales.
- **Credenciales Autorizadas para Demo / Hackathon:**
  - **Correo:** `admin@disputedesk.ai`
  - **Contraseña:** `Admin2026!`
  - *(Incluye botón de 1 clic para autocompletar credenciales en la demo).*
- **Panel Ejecutivo:** KPIs de victoria (91.4%), capital protegido ($1,420.50 USD), auditoría de guardrails (máx. 6 pasos, bloqueo de Sandbox, filtro anti-alucinaciones) y cola de urgencias.

### 3. 👤 Portal Transparente del Cliente (`/portal`)
- **Acceso para Compradores:** Permite a los clientes ver el estado real de sus reclamaciones con total claridad.
- **Transparencia Verificable:** Muestra el reclamo enfrentado con las pruebas oficiales de transportistas (guías de FedEx/USPS, firmas y GPS).

### 4. 🔴 Stream de Resolución en Vivo (`LiveResolutionTicker`)
- Componente interactivo en `/disputes` con indicador verde animado mostrando eventos del agente autónomo en tiempo real.

### 5. 🔐 Conexión con PayPal Sandbox (`/auth`)
- Soporte para perfiles de **Comerciante**, **Cliente** y **Administrador Ejecutivo**.

---

## 🛠️ Solución a Errores Comunes de Frontend en Windows

### Error: "listen EADDRINUSE: address already in use :::3000"
Ocurre cuando un proceso previo de Node.js se quedó colgado en segundo plano ocupando el puerto 3000.

#### ¿Cómo solucionarlo en PowerShell?
1. **Identificar el proceso ocupando el puerto:**
   ```powershell
   netstat -ano | findstr :3000
   ```
   (El último número de la fila es el **PID**, por ejemplo `3284`).

2. **Cerrar forzosamente el proceso congelado:**
   ```powershell
   taskkill /F /PID <NUMERO_PID>
   ```

3. **Reiniciar el servidor de desarrollo:**
   ```powershell
   npm run dev
   ```

---

### Error de TypeScript en el IDE: "Could not find declaration file for module 'next/link'"
Ocurre si el servidor de lenguaje del editor no indexa automáticamente los módulos de Next.js.

- **Solución implementada:** Se añadieron las referencias explícitas en `next-env.d.ts` y `tsconfig.json` hacia `types/declarations.d.ts`.
- Si el editor muestra el error en caché, presiona `Ctrl + Shift + P` en el editor y selecciona **"TypeScript: Restart TS Server"**.

---

## 🧪 Comandos de Verificación Rápida

| Comando | Propósito | Estado Actual |
| :--- | :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000` | ✅ Activo |
| `npx vitest run` | Ejecuta las 13 pruebas unitarias automáticas | ✅ 13/13 Pasando |
| `npx tsc --noEmit` | Valida todos los tipos TypeScript del proyecto | ✅ 0 Errores |
| `npx next build` | Compila las 13 rutas para producción | ✅ Exit 0 |

---

## 💡 Resumen Rápido en 3 Puntos

1. **¿Qué es?** Un agente de IA que asiste a comerciantes en disputas de PayPal. Lee documentos reales (facturas, guías de envío, chats), extrae hechos comprobables, contrasta lo que reclama el comprador y redacta una respuesta oficial **sin inventar datos**.
2. **El toque clave (Human-in-the-loop):** El agente **nunca** envía nada a PayPal por su cuenta. Genera la propuesta y un humano revisa, edita y da clic explícito en **"Approve & Submit"**.
3. **Entorno 100% seguro:** Funciona exclusivamente contra el **Sandbox** de PayPal; si detecta URLs de producción, el sistema se detiene inmediatamente.
