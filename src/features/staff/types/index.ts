export type EmploymentStatus = "active" | "suspended" | "terminated";

export interface Employee {
  id: string;
  photo?: string;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  employmentStatus: EmploymentStatus;
  dni: string;
  hireDate: string;
}
