import { DepartmentDetailPage } from "@/features/departments/pages/DepartmentDetailPage";
import { MainLayout } from "@/shared/layouts/MainLayout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DepartmentDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <MainLayout title="Departamentos">
      <DepartmentDetailPage departmentId={id} />
    </MainLayout>
  );
}
