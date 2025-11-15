import { DepartmentsPage } from "@/features/departments";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function Departments() {
  return (
    <MainLayout title="Departamentos">
      <DepartmentsPage />
    </MainLayout>
  );
}
