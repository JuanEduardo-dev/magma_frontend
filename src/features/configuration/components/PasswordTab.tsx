"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Lock, Eye, EyeOff } from "lucide-react";

export function PasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No functionality - just UI
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título y descripción */}
      <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Cambia tu contraseña
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Por favor, ingresa tu contraseña actual para cambiar tu contraseña.
        </p>
      </div>

      {/* Contraseña actual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña actual*
          </p>
        </div>

        <div className="md:col-span-2">
          <Input
            type={showCurrent ? "text" : "password"}
            placeholder="Ingresa tu contraseña actual"
            value={currentPassword}
            onValueChange={setCurrentPassword}
            startContent={<Lock className="w-5 h-5 text-gray-400" />}
            endContent={
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="focus:outline-none"
              >
                {showCurrent ? (
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
        </div>
      </div>

      {/* Nueva contraseña */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nueva contraseña*
          </p>
        </div>

        <div className="md:col-span-2">
          <Input
            type={showNew ? "text" : "password"}
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onValueChange={setNewPassword}
            startContent={<Lock className="w-5 h-5 text-gray-400" />}
            endContent={
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="focus:outline-none"
              >
                {showNew ? (
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
          <p className="text-xs text-gray-500 mt-2">
            Recuerda incluir 5 caracteres especiales
          </p>
        </div>
      </div>

      {/* Confirmar nueva contraseña */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar la nueva contraseña*
          </p>
        </div>

        <div className="md:col-span-2">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            startContent={<Lock className="w-5 h-5 text-gray-400" />}
            endContent={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="focus:outline-none"
              >
                {showConfirm ? (
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
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-4">
        <Button color="primary" type="submit" size="lg">
          Actualizar constraseña
        </Button>
        <Button variant="bordered" size="lg" color="primary">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
