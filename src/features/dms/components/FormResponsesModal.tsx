"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";
import { Download, Eye, Calendar, User } from "lucide-react";
import type { DynamicForm, FormResponse } from "../types";

interface FormResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: DynamicForm | null;
  responses: FormResponse[];
}

export function FormResponsesModal({
  isOpen,
  onClose,
  form,
  responses,
}: FormResponsesModalProps) {
  if (!form) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
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
            Respuestas: {form.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
            {responses.length} respuesta{responses.length !== 1 ? "s" : ""}{" "}
            recibida{responses.length !== 1 ? "s" : ""}
          </p>
        </ModalHeader>
        <ModalBody>
          {responses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Eye className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Sin respuestas aún
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Este formulario no ha recibido respuestas todavía.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Resumen */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {responses.length}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total respuestas
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {responses.length > 0
                      ? formatDate(responses[0].submittedAt).split(",")[0]
                      : "-"}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Última respuesta
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    100%
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Tasa completado
                  </p>
                </div>
              </div>

              {/* Tabla de respuestas */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <Table
                  aria-label="Tabla de respuestas"
                  classNames={{
                    wrapper: "bg-transparent shadow-none",
                    th: "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400",
                  }}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>ENVIADO POR</TableColumn>
                    <TableColumn>FECHA</TableColumn>
                    <TableColumn>DATOS</TableColumn>
                    <TableColumn align="end">ACCIONES</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {responses.map((response) => (
                      <TableRow key={response.id}>
                        <TableCell>
                          <Chip size="sm" variant="flat">
                            #{response.id}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-900 dark:text-zinc-100">
                              {response.submittedBy}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-600 dark:text-zinc-400">
                              {formatDate(response.submittedAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {Object.keys(response.data).length} campos
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="light"
                            startContent={<Eye className="w-4 h-4" />}
                          >
                            Ver detalle
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Detalle expandido de última respuesta */}
              {responses.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                    Última respuesta recibida
                  </h4>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                    <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                      {JSON.stringify(responses[0].data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="bordered"
            startContent={<Download className="w-4 h-4" />}
            isDisabled={responses.length === 0}
          >
            Exportar CSV
          </Button>
          <Button variant="bordered" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
