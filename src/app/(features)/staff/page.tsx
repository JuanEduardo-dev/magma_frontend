import { MainLayout } from "@/shared/layouts/MainLayout";
import { PersonalPage } from "@/features/staff";

export default function PersonalRoute() {
  return (
    <MainLayout title="Personal">
      <PersonalPage />
    </MainLayout>
  );
}
