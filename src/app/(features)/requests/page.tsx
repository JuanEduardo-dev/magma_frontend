import { RequestsPage } from "@/features/requests";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function RequestsRoute() {
  return (
    <MainLayout title="Peticiones">
      <RequestsPage />
    </MainLayout>
  );
}
