export interface Company {
  id: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  companyId?: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  permissions: string[];
  companies?: Company[];
  defaultCompanyId?: string | null;
}

export interface SwitchCompanyRequest {
  companyId: string;
}

export interface SwitchCompanyResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  permissions: string[];
  companies?: Company[];
  defaultCompanyId?: string | null;
}
