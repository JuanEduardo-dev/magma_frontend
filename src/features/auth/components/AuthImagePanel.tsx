import Image from "next/image";
import { Logo } from "@/shared/components/common/Logo";

export default function AuthImagePanel() {
  return (
    <div className="relative h-full w-full bg-primary brightness-110 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />

      {/* Logo en el top */}
      <div className="relative z-10 pt-20 px-8 flex justify-center">
        <Logo width={386} height={40} color="#FFFFFF" />
      </div>

      {/* Fire image en el bottom con transparencia */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Image
          src="/images/fire.png"
          alt="Fire decoration"
          width={600}
          height={400}
          className="w-full h-auto object-cover opacity-10"
          style={{ transform: "translateY(20%)" }}
        />
      </div>
    </div>
  );
}
