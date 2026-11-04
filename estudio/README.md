# 📚 Centro de Estudio — DisputeDesk

¡Bienvenido a tu centro de documentación y estudio de **DisputeDesk**! 

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

---

## 💡 Resumen Rápido en 3 Puntos

1. **¿Qué es?** Un agente de IA que asiste a comerciantes en disputas de PayPal. Lee documentos reales (facturas, guías de envío, chats), extrae hechos comprobables, contrasta lo que reclama el comprador y redacta una respuesta oficial **sin inventar datos**.
2. **El toque clave (Human-in-the-loop):** El agente **nunca** envía nada a PayPal por su cuenta. Genera la propuesta y un humano revisa, edita y da clic explícito en **"Approve & Submit"**.
3. **Entorno 100% seguro:** Funciona exclusivamente contra el **Sandbox** de PayPal; si detecta URLs de producción, el sistema se detiene inmediatamente.

