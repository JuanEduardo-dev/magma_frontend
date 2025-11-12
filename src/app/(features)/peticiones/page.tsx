import { PeticionesPage } from "@/features/peticiones";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function PeticionesRoute() {
  return (
    <MainLayout title="Peticiones">
      <PeticionesPage />
    </MainLayout>
  );
}
