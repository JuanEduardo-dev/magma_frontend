"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from "@heroui/react";
import { Save } from "lucide-react";
import type { DynamicForm, FormStatus } from "../types";

// Importar SurveyJS Creator con CSS (según documentación oficial)
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { DefaultLight, DefaultDark } from "survey-core/themes";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

interface FormCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: {
    title: string;
    description: string;
    schema: string;
    status: FormStatus;
  }) => void;
  editingForm: DynamicForm | null;
}

// Configuración del Creator en español
const creatorOptions = {
  showLogicTab: false,
  showTranslationTab: false,
  showEmbeddedSurveyTab: false,
  showJSONEditorTab: true,
  isAutoSave: false,
  showSurveyTitle: false,
};

export function FormCreatorModal({
  isOpen,
  onClose,
  onSave,
  editingForm,
}: FormCreatorModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("draft");
  const [creator, setCreator] = useState<SurveyCreator | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  const initCreator = useCallback(() => {
    const newCreator = new SurveyCreator(creatorOptions);

    // Configurar idioma y textos
    newCreator.locale = "es";

    // Detectar y aplicar tema según dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");
    newCreator.theme = isDarkMode ? DefaultDark : DefaultLight;

    // Cargar schema existente si estamos editando
    if (editingForm) {
      try {
        newCreator.JSON = JSON.parse(editingForm.schema);
      } catch {
        newCreator.JSON = {};
      }
    } else {
      // Schema vacío para nuevo formulario
      newCreator.JSON = {
        pages: [
          {
            name: "page1",
            elements: [],
          },
        ],
      };
    }

    setCreator(newCreator);
  }, [editingForm]);

  useEffect(() => {
    if (isOpen) {
      // Cargar datos del formulario si estamos editando
      if (editingForm) {
        setTitle(editingForm.title);
        setDescription(editingForm.description);
        setStatus(editingForm.status);
      } else {
        setTitle("");
        setDescription("");
        setStatus("draft");
      }
      setActiveTab("info");

      // Inicializar creator con un pequeño delay para asegurar que el modal está montado
      const timer = setTimeout(() => {
        initCreator();
      }, 100);

      return () => clearTimeout(timer);
    }
    return () => {
      setCreator(null);
    };
  }, [isOpen, editingForm, initCreator]);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    const schema = creator ? JSON.stringify(creator.JSON) : "{}";

    onSave({
      title: title.trim(),
      description: description.trim(),
      schema,
      status,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white dark:bg-zinc-950 max-h-[95vh]",
        header: "border-b border-zinc-200 dark:border-zinc-800",
        body: "p-0",
        footer: "border-t border-zinc-200 dark:border-zinc-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {editingForm ? "Editar formulario" : "Crear nuevo formulario"}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            {editingForm
              ? "Modifica la información y estructura del formulario"
              : "Define la información básica y diseña la estructura del formulario"}
          </p>
        </ModalHeader>
        <ModalBody>
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            classNames={{
              base: "w-full",
              tabList: "bg-zinc-100 dark:bg-zinc-900 p-1 mx-6 mt-4 rounded-lg",
              cursor: "bg-white dark:bg-zinc-800",
              tab: "px-4 py-2",
            }}
          >
            <Tab key="info" title="Información básica">
              <div className="p-6 space-y-6">
                <Input
                  label="Título del formulario"
                  placeholder="Ej: Solicitud de vacaciones"
                  value={title}
                  onValueChange={setTitle}
                  isRequired
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />

                <Textarea
                  label="Descripción"
                  placeholder="Describe brevemente el propósito del formulario..."
                  value={description}
                  onValueChange={setDescription}
                  minRows={3}
                  classNames={{
                    inputWrapper:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                />

                <Select
                  label="Estado"
                  selectedKeys={[status]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as FormStatus;
                    if (value) setStatus(value);
                  }}
                  classNames={{
                    trigger:
                      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                  }}
                >
                  <SelectItem key="draft">Borrador</SelectItem>
                  <SelectItem key="published">Publicado</SelectItem>
                  <SelectItem key="archived">Archivado</SelectItem>
                </Select>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Siguiente paso:</strong> Ve a la pestaña
                    &quot;Diseñador&quot; para agregar campos y configurar la
                    estructura de tu formulario.
                  </p>
                </div>
              </div>
            </Tab>
            <Tab key="designer" title="Diseñador">
              <div className="h-[calc(95vh-220px)] min-h-[500px]">
                {creator && <SurveyCreatorComponent creator={creator} />}
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            startContent={<Save className="w-4 h-4" />}
            onPress={handleSave}
            isDisabled={!title.trim()}
          >
            {editingForm ? "Guardar cambios" : "Crear formulario"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
