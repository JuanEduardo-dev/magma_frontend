export interface Department {
  id: string;
  name: string;
  members: DepartmentMember[];
}

export interface DepartmentMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface UserForDepartment {
  id: string;
  name: string;
  avatar?: string;
}
