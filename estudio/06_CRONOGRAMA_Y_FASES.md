# 📅 Guía 06: Cronograma, Fases y Entregables

Para asegurar el éxito en el hackathon con tiempo de sobra para grabar y pulir la entrega, el proyecto sigue un cronograma por fases riguroso de 7 días de desarrollo activo + 2 días de margen antes del cierre oficial.

---

## 🗓️ Cronograma Oficial

*Fecha límite de entrega:* **Jueves 12 de noviembre de 2026, 12:00 pm PT (3:00 pm Ecuador, GMT-5)**.

| Fase | Fecha | Entregable Clave | Criterio de Aceptación ("Está lista cuando...") |
| :--- | :--- | :--- | :--- |
| **0. Spike y Preparación** | 3 Nov | Arquitectura base, scripts de PayPal, diagnóstico LLM e informe en `docs/SPIKE_REPORT.md`. | ✅ **Completada.** Token y orden sandbox funcionan; script `check-llm` valida JSON y visión; arquitectura híbrida (Plan B) aprobada. |
| **1. Datos y PayPal** | 4 Nov | `lib/paypal.ts`, rutas API, guardia Sandbox, datos demo en `data/demo-disputes.json`, generador de PDFs sintéticos con marcas de agua. | La bandeja devuelve disputas con origen; la guardia bloquea URLs que no sean sandbox; los 10 casos tienen documentos PDF listos. |
| **2a. IA: Documentos** | 5 Nov | Adaptador LLM, registro de hechos, extracción con cita textual verificada contra la capa de texto del PDF. | Un dato con cita inexistente se rechaza o marca `needs-human`; formatos inválidos son descartados. |
| **2b. IA: Agente Reflexivo** | 6 Nov | Bucle del agente con herramientas, traza visible, *Claim Check*, redacción con marcadores `{{fact:Fx}}` y cálculo de solidez. | Una oración con un número no proveniente de un marcador verificado es rechazada por el código; la solidez la calcula TypeScript. |
| **3. Interfaz de Usuario** | 7 Nov | Integración de **AG Grid Community**, vista de caso en 3 paneles (documentos, traza y borrador) y diálogo de aprobación. | Flujo interactivo completo navegable en `http://localhost:3000` con datos demo y sandbox en vivo. |
| **3b. Cierre y Evaluación** | 8 Nov | Ruta de envío real a `provide-evidence`, subida de archivos en memoria, script de evaluación (`npm run eval`). | `eval/results.json` generado con métricas reales. **Congelación definitiva de funcionalidades (MVP Freeze).** |
| **4. Despliegue y README** | 9 Nov | Despliegue del servicio web en **Render**, página `/docs` con resultados de evaluación, prueba en modo incógnito. | URL pública accesible sin autenticación; tiempos de respuesta medidos y documentados en el README. |
| **Video Demostrativo** | 10 Nov | Grabación y edición del video de 2:45 minutos en inglés, narrado y subido a YouTube público. | Video nítido, sin música con copyright ni logos no autorizados, siguiendo el guion estructurado. |
| **Envío Oficial** | 11 Nov | Llenado del formulario de **Devpost**, campos de herramientas utilizadas (*Tools used*), repositorio público con licencia MIT. | Confirmación visible de proyecto enviado en el panel de Devpost. |
| **Margen de Seguridad** | 12 Nov | Solo correcciones críticas de estabilidad previas al cierre de las 12:00 pm PT. | Proyecto entregado con anticipación. |

---

## 🎬 Guion del Video Demostrativo (2 minutos 45 segundos)

El video es uno de los componentes más evaluados por los jueces. Debe ser en **inglés**, conciso y directo al grano:

- **0:00 - 0:15:** *Introducción al problema.* Mostrar la bandeja de disputas con el banner de SANDBOX visible:  
  *"Merchants lose PayPal disputes because evidence is late, scattered or incomplete."*
- **0:15 - 0:30:** *Presentación de la solución.* Seleccionar una disputa y hacer clic en **"Analyze with AI"**:  
  *"DisputeDesk is an AI agent that works only from evidence it can prove."*
- **0:30 - 0:55:** *Traza del agente en vivo.* Mostrar los pasos en el panel lateral:  
  *"The agent decides which tools to call. It can read, but it cannot submit."*
- **0:55 - 1:15:** *Visor con citas resaltadas.* Mostrar la guía de transporte con el número de rastreo vinculado a su cita exacta:  
  *"It reads the merchant's documents; every extracted value links to its exact quote."*
- **1:15 - 1:35:** *Claim check.* Mostrar la tabla de afirmaciones:  
  *"It checks the buyer's claims against the evidence. Missing evidence is flagged, never made up."*
- **1:35 - 2:05:** *Aprobación humana y envío.* Abrir el modal de aprobación, revisar y confirmar:  
  *"A person approves every submission before it reaches the PayPal API."*
- **2:05 - 2:30:** *Resultados de evaluación.* Navegar a la página `/docs` y mostrar las métricas medidas del archivo `results.json`:  
  *"Zero hallucinations, 100% prompt injection resistance on our benchmark."*
- **2:30 - 2:45:** *Cierre.*  
  *"Built with PayPal Developer Platform, [AI Provider], AG Grid and Render. Sandbox only."*

---

## ✂️ Política de Prioridades (¿Qué recortar si falta tiempo?)

Si en algún momento el tiempo aprieta, se recortan elementos en este orden exacto (de menos a más importante):
1. Página secundaria de *Orders* (Órdenes).
2. Gráfico avanzado de analítica en *Insights* (se deja tabla simple).
3. Subida manual de archivos del usuario (quedan los documentos sintéticos de demo).
4. Procesamiento de imágenes (se dejan únicamente PDFs con capa de texto).

**Lo que NUNCA se recorta:**
- La aprobación humana obligatoria (*Human-in-the-loop*).
- El verificador de citas y marcadores.
- La traza visible del agente.
- La evaluación con métricas reales.
- El modo demo con caché para los jueces.
- El video demostrativo.

