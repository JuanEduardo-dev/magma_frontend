export type FormStatus = "draft" | "published" | "archived";

export interface DynamicForm {
  id: string;
  title: string;
  description: string;
  schema: string; // JSON string del schema de SurveyJS
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
  responsesCount: number;
  createdBy: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, unknown>;
  submittedAt: string;
  submittedBy: string;
}
