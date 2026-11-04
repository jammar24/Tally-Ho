# 💼 Guía 02: Qué es DisputeDesk y el Reto del Hackathon

En este documento entenderás el propósito del producto, el problema de la vida real que soluciona y la estrategia para ganar el **PayPal AI Hackathon**.

---

## 1. El Problema Real de los Comerciantes

Cuando un comprador abre una disputa en PayPal (por ejemplo: *"No recibí mi paquete"* o *"El producto es diferente a lo descrito"*):
1. **Poco tiempo:** El comerciante tiene un plazo estricto (generalmente 10 a 20 días) para responder con pruebas contundentes.
2. **Información dispersa:** Las pruebas están en diferentes plataformas: la factura en el sistema contable (PDF), el número de guía en la empresa de mensajería (FedEx, DHL, Servientrega), los acuerdos en capturas de chat de WhatsApp o correos.
3. **Pérdida de dinero:** Muchos comerciantes pierden casos válidos simplemente por **presentar pruebas incompletas, tarde o de forma desordenada**.

---

## 2. La Solución: DisputeDesk

**Tagline Oficial:**  
> *"A human-approved AI agent that reads a merchant's real evidence and answers PayPal disputes with data it can prove."*  
> *(Un agente de IA aprobado por humanos que lee la evidencia real del comerciante y responde a las disputas de PayPal con datos que puede demostrar).*

DisputeDesk es un copiloto inteligente para comerciantes:
- **Inspecciona las disputas** directamente desde la API Sandbox de PayPal.
- **Lee documentos reales** del vendedor (PDFs, guías de despacho, chats) mediante visión/multimodalidad.
- **Extrae hechos verificables** (fechas de entrega, número de tracking, direcciones exactas, montos).
- **Contrasta las afirmaciones del comprador** (*Claim Check*): si el comprador dice *"nunca me llegó"*, pero la guía dice *"entregado con firma"*, el sistema marca la afirmación como **Contradicho**.
- **Redacta la respuesta oficial** con referencias exactas a las pruebas.
- **Requiere aprobación humana:** Muestra un panel transparente (*Trace Panel*) con todo lo que hizo el agente. El comerciante revisa, edita si desea, y da clic en **Aprobar y Enviar**.

---

## 3. Premios a los que Apuntamos en Devpost

El proyecto fue diseñado estratégicamente para competir por varias categorías:

| Categoría | Premio | Nuestra Ventaja Competitiva |
| :--- | :--- | :--- |
| **Most Impactful** | $5,000 | Resuelve un dolor financiero real de miles de comerciantes con métricas medidas de evaluación. |
| **Best Use of PayPal + AI / Agentic Commerce** | $5,000 c/u | Uso exhaustivo de la plataforma de desarrolladores de PayPal (OAuth, Disputes, Orders, Provide-Evidence) integrado con un agente reflexivo con herramientas de lectura acotadas. |
| **Best Use of AG Grid** | 1.º $5,000<br>2.º $2,000<br>3.º $1,000 | Uso de **AG Grid Community** en 3 vistas clave: Bandeja de Disputas, Matriz de Contraste de Afirmaciones (*Claim Table*) y Métricas/Insights. |
| **Best Use of Render** | Créditos cloud | Despliegue listo en la nube para que los jueces lo prueben sin instalar nada. |

---

## 4. Diferenciación: ¿Por qué NO es otro "chatbot genérico"?

1. **Sin alucinaciones:** El agente nunca inventa fechas ni números de rastreo. La redacción usa marcadores `{{fact:Fx}}` y el código de TypeScript inyecta los valores extraídos directamente de los documentos.
2. **Sin probabilidades ficticias:** No mostramos números vacíos como *"Tienes un 87% de ganar"*. En su lugar, el sistema calcula una **Solidez** fundamentada (*Strong*, *Moderate*, *Weak*, *Insufficient*) basada en hechos comprobados.
3. **Supervisión total (*Human-in-the-loop*):** La IA solo tiene herramientas de lectura. Las herramientas de envío a PayPal están reservadas exclusivamente al botón de confirmación humana.

