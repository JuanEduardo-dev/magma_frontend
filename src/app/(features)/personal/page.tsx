import { MainLayout } from "@/shared/layouts/MainLayout";
import { PersonalPage } from "@/features/personal";

export default function PersonalRoute() {
  return (
    <MainLayout title="Personal">
      <PersonalPage />
    </MainLayout>
  );
}
