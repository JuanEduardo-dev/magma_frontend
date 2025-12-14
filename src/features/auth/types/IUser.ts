export interface Company {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  permissions: string[];
  isActive: boolean;
  companies?: Company[];
  defaultCompanyId?: string | null;
  currentCompanyId?: string;
}
