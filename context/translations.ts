export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Nav
    'nav.brand': 'DisputeDesk',
    'nav.agent': 'AI Agent',
    'nav.home': 'Home',
    'nav.inbox': 'Disputes Inbox',
    'nav.insights': 'Insights',
    'nav.orders': 'Sandbox Orders',
    'nav.about': 'About',
    'nav.docs': 'Docs & Eval',
    'nav.auth': 'Sign In',
    'nav.out': 'Sign Out',
    'nav.guard': 'Agent Guard: Active',

    // Sandbox Banner
    'banner.title': 'SANDBOX ENVIRONMENT:',
    'banner.text': 'Connected to PayPal Sandbox APIs. No real money or live customer funds are involved.',

    // Home Page
    'home.badge': 'PayPal AI Hackathon 2026',
    'home.hero.title': 'Autonomous Evidence Defense for PayPal Disputes',
    'home.hero.subtitle':
      'A human-approved AI agent that reads merchant evidence, cross-checks buyer claims against ground-truth carrier data, and drafts airtight dispute responses.',
    'home.hero.cta.inbox': 'Launch Disputes Inbox',
    'home.hero.cta.orders': 'Test Sandbox Orders',
    'home.stats.disputes': 'Active Disputes Handled',
    'home.stats.accuracy': 'Extraction Accuracy',
    'home.stats.injection': 'Prompt Injection Defense',
    'home.stats.guard': 'Zero Hallucinations Guard',

    'home.pillars.title': 'How DisputeDesk Protects Merchants',
    'home.pillars.subtitle': 'Combining read-only bounded AI reasoning with verifiable human-in-the-loop approval.',

    'home.p1.title': '1. Multimodal Document Reading',
    'home.p1.desc':
      'Extracts tracking numbers, delivery dates, and shipping addresses from merchant PDFs and invoices. Every data point is matched character-by-character with the text layer.',

    'home.p2.title': '2. Bounded Claim Check',
    'home.p2.desc':
      'Deconstructs the buyer complaint and matches each claim against hard evidence. Code determines whether claims are Contradicted, Supported, or Unverifiable.',

    'home.p3.title': '3. Grounded Drafting & Verification',
    'home.p3.desc':
      'The LLM drafts responses strictly using placeholders like {{fact:F1}}. Our verifier rejects any draft containing numbers or dates not backed by a verified fact.',

    'home.p4.title': '4. Human Approval Gateway',
    'home.p4.desc':
      'The AI loop has zero write permissions. The merchant reviews the trace, edits the draft, and clicks Approve & Submit before anything reaches the PayPal API.',

    'home.demo.title': 'Live Sandbox Dispute Cases',
    'home.demo.subtitle': 'Explore synthetic cases modeling real PayPal dispute scenarios.',
    'home.demo.viewAll': 'View all cases in AG Grid →',

    // Inbox
    'inbox.title': 'Disputes Inbox',
    'inbox.subtitle': 'Resolve merchant disputes with verifiable evidence, grounded drafting, and human approval.',
    'inbox.mode': 'Mode: Auto (Sandbox + Demo Data)',
    'inbox.kpi.active': 'Active Disputes',
    'inbox.kpi.action': 'Action Required',
    'inbox.kpi.atRisk': 'Total At Risk',
    'inbox.kpi.verified': 'Evidence Verification',
    'inbox.kpi.actionNeeded': 'Needs response',
    'inbox.kpi.textLayer': 'Text-layer cited',
    'inbox.casesTitle': 'Pending Merchant Cases',
    'inbox.poweredBy': 'Powered by AG Grid Community • Click any dispute to inspect case evidence',
    'inbox.analyze': '⚡ Analyze Case',
    'inbox.notice': 'Notice: All mock cases are labeled Demo data. Real sandbox disputes appear automatically when seeded in your PayPal Business developer account.',

    // Case View
    'case.back': '← Disputes Inbox',
    'case.analyze': 'Analyze with AI',
    'case.reanalyze': 'Re-Analyze with AI',
    'case.thinking': 'Thinking & Reading Documents...',
    'case.approve': '✓ Approve & Submit',
    'case.summary': 'Case Summary',
    'case.gross': 'Gross Disputed:',
    'case.status': 'Status:',
    'case.due': 'Response Due:',
    'case.buyerMessage': 'Buyer Message (Untrusted Data)',
    'case.facts': 'Grounded Facts & Text-Layer Quotes',
    'case.verifiable': '100% Verifiable',
    'case.defense': 'Defense Strength & Recommendation',
    'case.recommended': 'Recommended Action:',
    'case.claims': 'Buyer Claim Check vs Merchant Evidence',
    'case.draft': 'Grounded Draft Response (Tokens Replaced)',
    'case.trace': 'Agent Reasoning Trace',
    'case.trace.cached': 'Cached sample analysis',
    'case.trace.live': 'Live run',
    'case.trace.bounded': 'Bounded by max 6 steps • Read-only tools • Safe Execution',
    'case.readyTitle': 'Ready for AI Investigation',
    'case.readyDesc':
      'Click "Analyze with AI" to launch the bounded agent loop. It will read the dispute, inspect documents, cross-check claims, and build a verifiable evidence package.',
    'case.launch': '⚡ Launch Investigation',

    // Approve Dialog
    'dialog.badge': '⚠️ Sandbox Approval',
    'dialog.title': 'Human Review & Evidence Submission',
    'dialog.hil':
      'Human-In-The-Loop Verification: Nothing is submitted to PayPal without your explicit approval. Please review the response draft below. You may edit the wording directly.',
    'dialog.noteLabel': 'Response Note to PayPal Dispute Center',
    'dialog.summary': 'Package Summary:',
    'dialog.cancel': 'Cancel',
    'dialog.submit': 'Approve & Submit Evidence',
    'dialog.submitting': 'Submitting to PayPal...',

    // Auth / Out
    'auth.title': 'Merchant Authentication & Sandbox Session',
    'auth.subtitle': 'Manage your merchant session, connect Sandbox developer credentials, or sign out.',
    'auth.status.signedIn': 'Active Merchant Session',
    'auth.status.signedOut': 'Signed Out / Guest Mode',
    'auth.account': 'Current Account',
    'auth.role': 'Merchant Role',
    'auth.mode': 'Operating Mode',
    'auth.btn.signin': 'Sign In as Sandbox Merchant',
    'auth.btn.signout': 'Sign Out (Ruta Out)',
    'auth.switch': 'Switch Credentials',
    'auth.notice': 'Credentials remain strictly inside local session storage and server environment.',

    // About
    'about.title': 'About DisputeDesk',
    'about.subtitle': 'A submission for the PayPal AI Hackathon 2026.',
    'about.mission.title': 'Our Mission',
    'about.mission.text':
      'Small merchants lose millions annually to disputed transactions, not because they are fraudulent sellers, but because gathering multi-source shipping proofs before tight deadlines is exhausting. DisputeDesk automates verifiable defense with total transparency.',
    'about.tech.title': 'Technology Stack',
  },
  es: {
    // Nav
    'nav.brand': 'DisputeDesk',
    'nav.agent': 'Agente IA',
    'nav.home': 'Inicio',
    'nav.inbox': 'Bandeja de Disputas',
    'nav.insights': 'Métricas',
    'nav.orders': 'Órdenes Sandbox',
    'nav.about': 'Acerca de',
    'nav.docs': 'Docs y Eval',
    'nav.auth': 'Iniciar Sesión',
    'nav.out': 'Cerrar Sesión (Out)',
    'nav.guard': 'Guardia de IA: Activa',

    // Sandbox Banner
    'banner.title': 'ENTORNO SANDBOX:',
    'banner.text': 'Conectado a las APIs de PayPal Sandbox. No se maneja dinero real ni fondos de clientes en vivo.',

    // Home Page
    'home.badge': 'PayPal AI Hackathon 2026',
    'home.hero.title': 'Defensa Autónoma con Evidencias para Disputas de PayPal',
    'home.hero.subtitle':
      'Un agente de IA aprobado por humanos que lee la evidencia del comerciante, contrasta los reclamos del comprador contra datos reales de transporte y redacta respuestas irrefutables.',
    'home.hero.cta.inbox': 'Ir a la Bandeja de Disputas',
    'home.hero.cta.orders': 'Probar Órdenes Sandbox',
    'home.stats.disputes': 'Disputas Activas Gestionadas',
    'home.stats.accuracy': 'Precisión de Extracción',
    'home.stats.injection': 'Defensa Contra Inyección de Prompt',
    'home.stats.guard': 'Cero Alucinaciones en Datos',

    'home.pillars.title': 'Cómo DisputeDesk Protege a los Comerciantes',
    'home.pillars.subtitle': 'Combinando razonamiento acotado de solo lectura con aprobación humana obligatoria.',

    'home.p1.title': '1. Lectura Multimodal de Documentos',
    'home.p1.desc':
      'Extrae números de tracking, fechas de entrega y direcciones de facturas y guías PDF. Cada dato se valida carácter por carácter contra la capa de texto del archivo.',

    'home.p2.title': '2. Contraste de Afirmaciones (Claim Check)',
    'home.p2.desc':
      'Desglosa el reclamo del comprador y lo empareja con la evidencia física. El código determina si cada reclamo queda Contradicho, Respaldado o No Comprobable.',

    'home.p3.title': '3. Redacción Fundamentada con Marcadores',
    'home.p3.desc':
      'El modelo redacta respuestas usando únicamente marcadores como {{fact:F1}}. Nuestro verificador rechaza cualquier borrador con números o fechas no respaldadas.',

    'home.p4.title': '4. Pasarela de Aprobación Humana',
    'home.p4.desc':
      'La IA tiene cero permisos de escritura. El comerciante revisa la traza, edita el borrador y hace clic en Aprobar y Enviar antes de que nada toque la API de PayPal.',

    'home.demo.title': 'Casos de Disputa en Sandbox',
    'home.demo.subtitle': 'Explora casos sintéticos que modelan escenarios reales de disputas en PayPal.',
    'home.demo.viewAll': 'Ver todos los casos en AG Grid →',

    // Inbox
    'inbox.title': 'Bandeja de Disputas',
    'inbox.subtitle': 'Resuelve disputas de comerciantes con evidencia comprobable, redacción fundamentada y aprobación humana.',
    'inbox.mode': 'Modo: Automático (Sandbox + Datos Demo)',
    'inbox.kpi.active': 'Disputas Activas',
    'inbox.kpi.action': 'Requieren Acción',
    'inbox.kpi.atRisk': 'Total en Riesgo',
    'inbox.kpi.verified': 'Verificación de Evidencia',
    'inbox.kpi.actionNeeded': 'Requiere respuesta',
    'inbox.kpi.textLayer': 'Cita textual verificada',
    'inbox.casesTitle': 'Casos Pendientes del Comerciante',
    'inbox.poweredBy': 'Potenciado por AG Grid Community • Haz clic en cualquier disputa para inspeccionar evidencias',
    'inbox.analyze': '⚡ Analizar Caso',
    'inbox.notice': 'Aviso: Todos los casos de prueba están etiquetados como Datos Demo. Las disputas reales de sandbox aparecen automáticamente cuando se generan en tu cuenta de desarrollador de PayPal.',

    // Case View
    'case.back': '← Bandeja de Disputas',
    'case.analyze': 'Analizar con IA',
    'case.reanalyze': 'Re-Analizar con IA',
    'case.thinking': 'Pensando y Leyendo Documentos...',
    'case.approve': '✓ Aprobar y Enviar',
    'case.summary': 'Resumen del Caso',
    'case.gross': 'Monto en Disputa:',
    'case.status': 'Estado:',
    'case.due': 'Fecha Límite:',
    'case.buyerMessage': 'Mensaje del Comprador (Dato No Confiable)',
    'case.facts': 'Hechos Fundamentados y Citas Textuales',
    'case.verifiable': '100% Comprobable',
    'case.defense': 'Solidez de la Defensa y Recomendación',
    'case.recommended': 'Acción Recomendada:',
    'case.claims': 'Contraste de Reclamos vs Evidencia',
    'case.draft': 'Borrador Fundamentado (Marcadores Sustituidos)',
    'case.trace': 'Traza de Razonamiento del Agente',
    'case.trace.cached': 'Análisis de muestra en caché',
    'case.trace.live': 'Ejecución en vivo',
    'case.trace.bounded': 'Acotado a máx 6 pasos • Herramientas de solo lectura • Ejecución Segura',
    'case.readyTitle': 'Listo para la Investigación con IA',
    'case.readyDesc':
      'Haz clic en "Analizar con IA" para iniciar el bucle del agente. Leerá la disputa, inspeccionará documentos, contrastará afirmaciones y armará la evidencia verificable.',
    'case.launch': '⚡ Iniciar Investigación',

    // Approve Dialog
    'dialog.badge': '⚠️ Aprobación en Sandbox',
    'dialog.title': 'Revisión Humana y Envío de Evidencia',
    'dialog.hil':
      'Verificación Humana Obligatoria: Nada se envía a PayPal sin tu aprobación explícita. Por favor revisa el borrador abajo. Puedes editar el texto directamente.',
    'dialog.noteLabel': 'Nota de Respuesta para el Centro de Disputas de PayPal',
    'dialog.summary': 'Resumen del Paquete:',
    'dialog.cancel': 'Cancelar',
    'dialog.submit': 'Aprobar y Enviar Evidencia',
    'dialog.submitting': 'Enviando a PayPal...',

    // Auth / Out
    'auth.title': 'Autenticación del Comerciante y Sesión Sandbox',
    'auth.subtitle': 'Gestiona tu sesión de comerciante, credenciales de PayPal Sandbox o cierra sesión (Ruta Out).',
    'auth.status.signedIn': 'Sesión Activa de Comerciante',
    'auth.status.signedOut': 'Sesión Cerrada / Modo Invitado',
    'auth.account': 'Cuenta Actual',
    'auth.role': 'Rol del Comerciante',
    'auth.mode': 'Modo de Operación',
    'auth.btn.signin': 'Iniciar Sesión en Sandbox',
    'auth.btn.signout': 'Cerrar Sesión (Ruta Out)',
    'auth.switch': 'Cambiar Credenciales',
    'auth.notice': 'Las credenciales se mantienen seguras en el almacenamiento local y entorno del servidor.',

    // About
    'about.title': 'Acerca de DisputeDesk',
    'about.subtitle': 'Proyecto para el PayPal AI Hackathon 2026.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text':
      'Los pequeños comerciantes pierden millones al año en disputas comerciales no por ser fraudulentos, sino porque recopilar pruebas de envío dispersas antes de plazos estrictos es agotador. DisputeDesk automatiza una defensa verificable con total transparencia.',
    'about.tech.title': 'Pila Tecnológica',
  },
};

