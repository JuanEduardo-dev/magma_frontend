import { InventoryPage } from "@/features/inventory";
import { MainLayout } from "@/shared/layouts/MainLayout";

export default function Page() {
  return (
    <MainLayout title="Inventario / Activos">
      <InventoryPage />
    </MainLayout>
  );
}
