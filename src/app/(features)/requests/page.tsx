import { PeticionesPage } from "@/features/requests";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function PeticionesRoute() {
  return (
    <MainLayout title="Peticiones">
      <PeticionesPage />
    </MainLayout>
  );
}
