import { RolesManagementPage } from "@/features/roles";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function RolesPage() {
  return (
    <MainLayout title="Gestión de cargos">
      <RolesManagementPage />
    </MainLayout>
  );
}
