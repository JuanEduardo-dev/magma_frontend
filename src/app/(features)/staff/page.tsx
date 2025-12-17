import { MainLayout } from "@/shared/layouts/MainLayout";
import { StaffPage } from "@/features/staff";

export default function StaffRoute() {
  return (
    <MainLayout title="Personal">
      <StaffPage />
    </MainLayout>
  );
}
