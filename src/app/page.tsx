import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

export default function Home() {
  // Redirigir a la primera página de la app (peticiones)
  redirect(ROUTES.REQUESTS);
}
