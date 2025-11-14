import { RoleDetailPage } from "@/features/roles";
import { MainLayout } from "@/shared/layouts/MainLayout";

interface RolePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RolePage({ params }: RolePageProps) {
  const { id } = await params;
  return (
    <MainLayout title="Editar cargo">
      <RoleDetailPage roleId={id} />
    </MainLayout>
  );
}
