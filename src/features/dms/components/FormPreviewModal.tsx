"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import type { DynamicForm } from "../types";

// Importar SurveyJS para renderizar con CSS (según documentación oficial)
import "survey-core/survey-core.css";
import { Model } from "survey-core";
import { DefaultLight, DefaultDark } from "survey-core/themes";
import { Survey } from "survey-react-ui";

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: DynamicForm | null;
}

export function FormPreviewModal({
  isOpen,
  onClose,
  form,
}: FormPreviewModalProps) {
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  useEffect(() => {
    if (isOpen && form) {
      try {
        const schema = JSON.parse(form.schema);
        const model = new Model(schema);

        // Configurar el modelo
        model.locale = "es";
        model.showCompletedPage = true;
        model.completedHtml =
          "<div class='sv-completed-page'><h3>¡Gracias por completar el formulario!</h3><p>Tu respuesta ha sido registrada.</p></div>";

        // Detectar y aplicar tema según dark mode
        const isDarkMode = document.documentElement.classList.contains("dark");
        model.applyTheme(isDarkMode ? DefaultDark : DefaultLight);

        // Manejar envío
        model.onComplete.add((sender) => {
          console.log("Respuesta del formulario:", sender.data);
          // Aquí se guardaría la respuesta en el estado local
        });

        setSurveyModel(model);
      } catch (error) {
        console.error("Error al parsear el schema:", error);
      }
    } else {
      setSurveyModel(null);
    }
  }, [isOpen, form]);

  if (!form) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white dark:bg-zinc-950",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        body: "py-6",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Vista previa: {form.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            Así verán los usuarios el formulario
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="min-h-[400px]">
            {surveyModel ? (
              <Survey model={surveyModel} />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
                Cargando formulario...
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
