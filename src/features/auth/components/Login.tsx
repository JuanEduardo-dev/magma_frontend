"use client";

import { Button, Checkbox, Input, Link } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple redirect to dashboard - no authentication logic
    router.push(ROUTES.REQUESTS);
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-600 dark:text-white leading-tight text-center">
          Ingresa tus credenciales para acceder al sistema ERP.
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Input */}
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="@gmail"
          value={email}
          onValueChange={setEmail}
          startContent={<Mail className="w-5 h-5 text-gray-400" />}
          variant="bordered"
          labelPlacement="outside"
          isRequired
        />

        {/* Password Input */}
        <Input
          type={showPassword ? "text" : "password"}
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          value={password}
          onValueChange={setPassword}
          startContent={<Lock className="w-5 h-5 text-gray-400" />}
          endContent={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          }
          variant="bordered"
          labelPlacement="outside"
          isRequired
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-2">
          <Checkbox
            isSelected={rememberMe}
            onValueChange={setRememberMe}
            size="sm"
            classNames={{
              wrapper: "before:border-black after:bg-black",
            }}
          >
            <span className="text-sm font-semibold">Recordar contraseña</span>
          </Checkbox>
          <Link
            href="#"
            size="sm"
            className="text-sm font-semibold text-blue-600"
          >
            Olvidé mi contraseña
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-black text-white mt-4"
          size="lg"
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
}
