export interface Role {
  id: string;
  name: string;
  userCount: number;
}

export interface RoleWithUsers extends Role {
  assignedUsers: string[];
}

export interface UserForAssignment {
  id: string;
  name: string;
  avatar?: string;
}

export interface SubModulePermission {
  name: string;
  viewOwn: boolean;
  viewGlobal: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Permission {
  module: string;
  viewOwn: boolean;
  viewGlobal: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  subModules?: SubModulePermission[];
}

export interface RoleDetail {
  id: string;
  name: string;
  permissions: Permission[];
}
