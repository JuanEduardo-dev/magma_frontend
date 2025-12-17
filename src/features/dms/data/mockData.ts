import type { DynamicForm, FormResponse } from "../types";

// Schema de ejemplo para un formulario de solicitud de vacaciones
const vacationRequestSchema = JSON.stringify({
  title: "Solicitud de Vacaciones",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "employeeName",
          title: "Nombre del empleado",
          isRequired: true,
        },
        {
          type: "text",
          name: "department",
          title: "Departamento",
          isRequired: true,
        },
        {
          type: "text",
          name: "startDate",
          title: "Fecha de inicio",
          inputType: "date",
          isRequired: true,
        },
        {
          type: "text",
          name: "endDate",
          title: "Fecha de fin",
          inputType: "date",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "vacationType",
          title: "Tipo de vacaciones",
          choices: ["Vacaciones anuales", "Días personales", "Licencia médica"],
          isRequired: true,
        },
        {
          type: "comment",
          name: "comments",
          title: "Comentarios adicionales",
        },
      ],
    },
  ],
});

// Schema de ejemplo para evaluación de desempeño
const performanceEvalSchema = JSON.stringify({
  title: "Evaluación de Desempeño",
  pages: [
    {
      name: "page1",
      title: "Información General",
      elements: [
        {
          type: "text",
          name: "evaluatedEmployee",
          title: "Empleado evaluado",
          isRequired: true,
        },
        {
          type: "text",
          name: "evaluator",
          title: "Evaluador",
          isRequired: true,
        },
        {
          type: "text",
          name: "evaluationPeriod",
          title: "Período de evaluación",
          isRequired: true,
        },
      ],
    },
    {
      name: "page2",
      title: "Competencias",
      elements: [
        {
          type: "rating",
          name: "teamwork",
          title: "Trabajo en equipo",
          rateMax: 5,
          isRequired: true,
        },
        {
          type: "rating",
          name: "communication",
          title: "Comunicación",
          rateMax: 5,
          isRequired: true,
        },
        {
          type: "rating",
          name: "problemSolving",
          title: "Resolución de problemas",
          rateMax: 5,
          isRequired: true,
        },
        {
          type: "rating",
          name: "punctuality",
          title: "Puntualidad",
          rateMax: 5,
          isRequired: true,
        },
      ],
    },
    {
      name: "page3",
      title: "Observaciones",
      elements: [
        {
          type: "comment",
          name: "strengths",
          title: "Fortalezas observadas",
        },
        {
          type: "comment",
          name: "areasToImprove",
          title: "Áreas de mejora",
        },
        {
          type: "comment",
          name: "generalComments",
          title: "Comentarios generales",
        },
      ],
    },
  ],
});

// Schema de ejemplo para encuesta de satisfacción
const satisfactionSurveySchema = JSON.stringify({
  title: "Encuesta de Satisfacción Laboral",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "radiogroup",
          name: "overallSatisfaction",
          title: "¿Qué tan satisfecho estás con tu trabajo actual?",
          choices: [
            "Muy satisfecho",
            "Satisfecho",
            "Neutral",
            "Insatisfecho",
            "Muy insatisfecho",
          ],
          isRequired: true,
        },
        {
          type: "checkbox",
          name: "satisfactionAspects",
          title:
            "¿Qué aspectos te satisfacen más? (selecciona todos los que apliquen)",
          choices: [
            "Salario",
            "Ambiente laboral",
            "Oportunidades de crecimiento",
            "Beneficios",
            "Flexibilidad horaria",
            "Relación con compañeros",
          ],
        },
        {
          type: "rating",
          name: "workLifeBalance",
          title: "Califica tu balance vida-trabajo",
          rateMax: 10,
          isRequired: true,
        },
        {
          type: "boolean",
          name: "recommendCompany",
          title: "¿Recomendarías esta empresa como lugar de trabajo?",
          isRequired: true,
        },
        {
          type: "comment",
          name: "suggestions",
          title: "¿Tienes alguna sugerencia para mejorar?",
        },
      ],
    },
  ],
});

// Schema de ejemplo para registro de incidentes
const incidentReportSchema = JSON.stringify({
  title: "Reporte de Incidentes",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "reporterName",
          title: "Nombre del reportante",
          isRequired: true,
        },
        {
          type: "text",
          name: "incidentDate",
          title: "Fecha del incidente",
          inputType: "date",
          isRequired: true,
        },
        {
          type: "text",
          name: "incidentTime",
          title: "Hora del incidente",
          inputType: "time",
          isRequired: true,
        },
        {
          type: "text",
          name: "location",
          title: "Ubicación",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "incidentType",
          title: "Tipo de incidente",
          choices: [
            "Accidente laboral",
            "Fallo de equipo",
            "Problema de seguridad",
            "Conflicto interpersonal",
            "Otro",
          ],
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "severity",
          title: "Severidad",
          choices: ["Baja", "Media", "Alta", "Crítica"],
          isRequired: true,
        },
        {
          type: "comment",
          name: "description",
          title: "Descripción detallada del incidente",
          isRequired: true,
        },
        {
          type: "comment",
          name: "actionsTaken",
          title: "Acciones tomadas",
        },
      ],
    },
  ],
});

export const initialForms: DynamicForm[] = [
  {
    id: "1",
    title: "Solicitud de Vacaciones",
    description: "Formulario para solicitar días de vacaciones o permisos",
    schema: vacationRequestSchema,
    status: "published",
    createdAt: "2025-11-15",
    updatedAt: "2025-12-01",
    responsesCount: 24,
    createdBy: "Admin Sistema",
  },
  {
    id: "2",
    title: "Evaluación de Desempeño",
    description: "Evaluación trimestral de competencias y objetivos",
    schema: performanceEvalSchema,
    status: "published",
    createdAt: "2025-10-01",
    updatedAt: "2025-11-20",
    responsesCount: 45,
    createdBy: "RRHH",
  },
  {
    id: "3",
    title: "Encuesta de Satisfacción Laboral",
    description: "Encuesta anónima sobre el ambiente y condiciones de trabajo",
    schema: satisfactionSurveySchema,
    status: "draft",
    createdAt: "2025-12-10",
    updatedAt: "2025-12-10",
    responsesCount: 0,
    createdBy: "Admin Sistema",
  },
  {
    id: "4",
    title: "Reporte de Incidentes",
    description:
      "Formulario para reportar incidentes de seguridad o accidentes",
    schema: incidentReportSchema,
    status: "published",
    createdAt: "2025-09-05",
    updatedAt: "2025-12-05",
    responsesCount: 8,
    createdBy: "Seguridad",
  },
];

export const initialResponses: FormResponse[] = [
  {
    id: "r1",
    formId: "1",
    data: {
      employeeName: "Juan Pérez",
      department: "Desarrollo",
      startDate: "2025-12-20",
      endDate: "2025-12-31",
      vacationType: "Vacaciones anuales",
      comments: "Vacaciones de fin de año",
    },
    submittedAt: "2025-12-01T10:30:00",
    submittedBy: "Juan Pérez",
  },
  {
    id: "r2",
    formId: "1",
    data: {
      employeeName: "María García",
      department: "Marketing",
      startDate: "2025-12-23",
      endDate: "2025-12-27",
      vacationType: "Días personales",
      comments: "",
    },
    submittedAt: "2025-12-05T14:15:00",
    submittedBy: "María García",
  },
  {
    id: "r3",
    formId: "4",
    data: {
      reporterName: "Carlos López",
      incidentDate: "2025-12-10",
      incidentTime: "09:45",
      location: "Oficina piso 3",
      incidentType: "Fallo de equipo",
      severity: "Media",
      description: "La impresora del área dejó de funcionar",
      actionsTaken: "Se reportó a soporte técnico",
    },
    submittedAt: "2025-12-10T10:00:00",
    submittedBy: "Carlos López",
  },
];
