import { DmsPage } from "@/features/dms";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function DmsRoute() {
  return (
    <MainLayout title="DMS / Formularios">
      <DmsPage />
    </MainLayout>
  );
}
