import AccountManagementPage from "@/features/configuration/pages/AccountManagementPage";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function GestionCuentaRoute() {
  return (
    <MainLayout title="Gestión de cuenta">
      <AccountManagementPage />
    </MainLayout>
  );
}
