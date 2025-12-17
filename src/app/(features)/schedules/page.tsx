import { SchedulesPage } from "@/features/schedules";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function HorariosRoute() {
  return (
    <MainLayout title="Horarios">
      <SchedulesPage />
    </MainLayout>
  );
}
