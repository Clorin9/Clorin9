export const historicalParks = [
  { id: "fslopez", short: "Mcal. F. S. López", name: "Parque Industrial Mariscal Francisco Solano López", character: "Oficial", department: "Central", city: "Capiatá", surface: 41.3326, resolution: "923/2014", companies: 1, administrator: "Ministerio de Industria y Comercio", activity: "Maquila · autopartes", occupied: "46.100 m²", available: "20 ha", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 58, top: 44 } },
  { id: "tosa", short: "TOSA", name: "Terminal Occidental S.A. (TOSA)", character: "Privado", department: "Presidente Hayes", city: "Nueva Asunción", surface: 1100, resolution: "03/2015", companies: 7, administrator: "Terminal Occidental Sociedad Anónima", activity: "Industrial · logística · servicios", occupied: "94,06 ha", available: "449,21 ha", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 39, top: 36 } },
  { id: "algesa", short: "ALGESA", name: "Parque Industrial Almacenes Generales S.A. — ALGESA", character: "Privado", department: "Alto Paraná", city: "Ciudad del Este", surface: 31.5, resolution: "1599/2017", companies: 5, administrator: "Almacenes Generales S.A.", activity: "Textil · fertilizantes · manufactura", occupied: "80 % del inmueble", available: "6,3 ha libres de obras civiles", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 76, top: 52 } },
  { id: "iruna", short: "Iruña", name: "Iruña Emprendimientos Inmobiliarios S.A.", character: "Privado", department: "Alto Paraná", city: "Ciudad del Este", surface: 15, resolution: "1600/2017", companies: 16, administrator: "Iruña Emprendimientos Inmobiliarios S.A.", activity: "Maquila · centro de distribución logística", occupied: "41.250 m²", available: "65.447,97 m²", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 82, top: 56 } },
  { id: "santamonica", short: "Santa Mónica", name: "Parque Industrial Santa Mónica S.A.", character: "Privado", department: "Alto Paraná", city: "Hernandarias", surface: 30, resolution: "11/2018", companies: 4, administrator: "Santa Mónica S.A.", activity: "Textil · fertilizantes · manufactura", occupied: "No conciliado en la fuente", available: "No publicado", status: "Habilitado", sourceState: "Revisión pendiente", position: { left: 78, top: 45 } },
  { id: "pradera", short: "Pradera Alta", name: "Parque Industrial Pradera Alta", character: "Mixto", department: "Itapúa", city: "Hohenau", surface: 20, resolution: "24/2022", companies: 2, administrator: "Consejo de Desarrollo Industrial del Municipio de Hohenau", activity: "Alimentos · cadena agrícola", occupied: "Dato desactualizado", available: "No publicado", status: "Habilitado", sourceState: "Actualización pendiente", position: { left: 63, top: 79 } },
  { id: "megalog", short: "Megalog", name: "Parque Industrial Megalog S.A.", character: "Privado", department: "Central", city: "Luque", surface: 4.5, resolution: "446/2022", companies: 1, administrator: "Megalog S.A.", activity: "Logística farmacéutica · dispositivos médicos", occupied: "No publicado", available: "No publicado", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 64, top: 48 } },
  { id: "duotec", short: "Duotec", name: "Parque Industrial Duotec", character: "Privado", department: "Central", city: "Limpio", surface: 8.8, resolution: "414/2025", companies: 0, administrator: "Duotec S.A. (Tecnoedil S.A. y Marex S.A.)", activity: "Logística · industrial · comercial · tecnología", occupied: "0 ha declaradas", available: "No publicado", status: "Habilitado", sourceState: "Actualización pendiente", position: { left: 62, top: 38 } },
  { id: "ptitp", short: "PTI Taiwán–Paraguay", name: "Parque Tecnológico Inteligente Taiwán–Paraguay", character: "Privado", department: "Alto Paraná", city: "Minga Guazú", surface: 40, resolution: "131/2025", companies: 5, administrator: "Paraguay Synthetic Co. Corp.", activity: "Servicios · plástico · textil · tecnología", occupied: "No publicado", available: "No publicado", status: "Habilitado", sourceState: "Histórico declarado", position: { left: 72, top: 61 } },
];

export const demoProjects = [
  { id: "proy-001", name: "Ampliación logística regional", promoter: "Promotor demostrativo A", parkId: "tosa", sector: "Logística", investment: 12500000, stage: "Prefactibilidad", progress: 38, milestone: "Validación de servicios", due: "2026-12-15" },
  { id: "proy-002", name: "Centro de manufactura liviana", promoter: "Promotor demostrativo B", parkId: "algesa", sector: "Manufactura", investment: 7800000, stage: "Evaluación", progress: 62, milestone: "Cierre de matriz técnica", due: "2026-11-30" },
  { id: "proy-003", name: "Nodo tecnológico piloto", promoter: "Promotor demostrativo C", parkId: "ptitp", sector: "Tecnología", investment: 4200000, stage: "Perfil", progress: 20, milestone: "Definición de alcance", due: "2027-02-20" },
];

export const demoDocuments = [
  { id: "doc-001", parkId: "algesa", name: "Ficha institucional histórica", category: "Institucional", status: "Revisado", version: 2, updated: "2026-10-20" },
  { id: "doc-002", parkId: "tosa", name: "Plano de ubicación demostrativo", category: "Cartografía", status: "Pendiente", version: 1, updated: "2026-10-18" },
  { id: "doc-003", parkId: "duotec", name: "Matriz de requisitos", category: "Evaluación", status: "En revisión", version: 3, updated: "2026-10-21" },
];

export const evaluationCriteria = [
  { id: "territorial", group: "Territorio", label: "Localización, acceso y compatibilidad territorial" },
  { id: "legal", group: "Jurídico", label: "Propiedad, habilitación y documentos institucionales" },
  { id: "environment", group: "Ambiente", label: "Condicionantes ambientales y gestión de impactos" },
  { id: "infrastructure", group: "Infraestructura", label: "Energía, agua, saneamiento, conectividad y vialidad" },
  { id: "market", group: "Mercado", label: "Demanda, posicionamiento y estrategia comercial" },
  { id: "financial", group: "Finanzas", label: "CAPEX, OPEX, fuentes de ingresos y sensibilidad" },
];

export const initialEvaluations = Object.fromEntries(
  historicalParks.map((park, parkIndex) => [
    park.id,
    Object.fromEntries(evaluationCriteria.map((criterion, criterionIndex) => [criterion.id, (parkIndex + criterionIndex) % 3 === 0 ? "Cumple" : (parkIndex + criterionIndex) % 3 === 1 ? "Pendiente" : "Sin evidencia"])),
  ]),
);

export const paraguayDepartments = ["Todos", "Alto Paraná", "Central", "Itapúa", "Presidente Hayes"];
export const parkCharacters = ["Todos", "Oficial", "Privado", "Mixto"];

