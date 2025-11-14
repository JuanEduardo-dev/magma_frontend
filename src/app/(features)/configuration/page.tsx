import ConfigurationPage from "@/features/configuration/pages/ConfigurationPage";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function ConfiguracionRoute() {
  return (
    <MainLayout title="Configuración">
      <ConfigurationPage />
    </MainLayout>
  );
}
