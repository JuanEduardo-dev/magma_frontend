import UsersManagementPage from "@/features/configuration/pages/UsersManagementPage";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function UsersManagementRoute() {
  return (
    <MainLayout title="Gestión de usuarios">
      <UsersManagementPage />
    </MainLayout>
  );
}
