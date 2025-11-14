"use client";

import { useState, useRef } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { Mail } from "lucide-react";
import uploadIcon from "@/assets/icons/upload-file.svg";
import Image from "next/image";

export function GeneralConfigurationTab() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No functionality - just UI
  };

  const handlePhotoDrop = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault?.();
    setIsDragging(false);

    const files = "dataTransfer" in e ? e.dataTransfer.files : e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);

      setPhotoName(file.name);
    }
  };

  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título y descripción */}
      <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Información personal
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Aquí puedes modificar tu información personal.
        </p>
      </div>

      {/* Nombre completo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre*
          </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="John"
            value={nombre}
            onValueChange={setNombre}
            variant="bordered"
            labelPlacement="outside"
            isRequired
          />
          <Input
            placeholder="Doe"
            value={apellido}
            onValueChange={setApellido}
            variant="bordered"
            labelPlacement="outside"
            isRequired
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Correo electrónico*
          </p>
        </div>

        <div className="md:col-span-2">
          <Input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onValueChange={setEmail}
            startContent={<Mail className="w-5 h-5 text-gray-400" />}
            variant="bordered"
            labelPlacement="outside"
            isRequired
          />
        </div>
      </div>

      {/* Foto de perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Foto de perfil*
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Aquí puedes cambiar tu foto de perfil
          </p>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center gap-2">
          {photoPreview ? (
            <>
              <Image
                src={photoPreview}
                alt="Profile preview"
                width={128}
                height={128}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shadow"
              />
              <Button
                size="sm"
                color="danger"
                isIconOnly
                aria-label="Remove photo"
                onPress={removePhoto}
                className="w-8 h-8 p-0 text-white bg-red-500 hover:bg-red-600 rounded-full shadow"
              >
                X
              </Button>
            </>
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 text-sm font-medium border border-zinc-200 dark:border-zinc-800 shadow">
              foto
            </div>
          )}
        </div>

        {/* Upload Zone */}
        <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full shadow-none">
          <CardBody className="p-8">
            <button
              type="button"
              className={`w-full h-20 flex flex-col justify-center items-center transition-colors cursor-pointer ${
                isDragging ? "border-primary bg-primary/5" : ""
              }`}
              onClick={handleAreaClick}
            >
              {photoPreview ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                    {photoName}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5 max-w-xs text-center">
                  <Image
                    src={uploadIcon}
                    alt="Upload"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                    Puedes subir o arrastrar tu foto aquí para actualizarla en
                    formato PNG o JPG.
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoDrop}
              />
            </button>
          </CardBody>
        </Card>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-4">
        <Button color="primary" type="submit" size="lg" radius="sm">
          Actualizar datos
        </Button>
        <Button variant="bordered" size="lg" radius="sm" color="primary">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
