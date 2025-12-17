"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import type { Schedule } from "../types";

interface ScheduleCalendarProps {
  schedules: Schedule[];
  onSelectSchedule: (schedule: Schedule) => void;
}

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const diasSemana = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

const tipoColors: Record<string, string> = {
  fijo: "bg-blue-500",
  rotativo: "bg-purple-500",
  flexible: "bg-green-500",
  turnos: "bg-orange-500",
};

export function ScheduleCalendar({
  schedules,
  onSelectSchedule,
}: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Ajustar para que la semana empiece en lunes
  let startDay = firstDayOfMonth.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getSchedulesForDay = (day: number) => {
    const date = new Date(year, month, day);
    return schedules.filter((schedule) => {
      if (!schedule.vigenciaDesde) return false;
      const desde = new Date(schedule.vigenciaDesde);
      const hasta = schedule.vigenciaHasta
        ? new Date(schedule.vigenciaHasta)
        : new Date(2100, 0, 1);
      return date >= desde && date <= hasta && schedule.estado === "activo";
    });
  };

  const renderDays = () => {
    const days = [];

    // Días vacíos antes del primer día del mes
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
        />,
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        new Date().toDateString() === new Date(year, month, day).toDateString();
      const daySchedules = getSchedulesForDay(day);

      days.push(
        <div
          key={day}
          className={`h-24 border border-zinc-100 dark:border-zinc-800 p-1 overflow-hidden ${
            isToday
              ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              : "bg-white dark:bg-zinc-950"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-xs font-medium ${
                isToday
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {day}
            </span>
          </div>
          <div className="space-y-0.5 overflow-y-auto max-h-[60px]">
            {daySchedules.slice(0, 3).map((schedule) => (
              <button
                key={schedule.id}
                type="button"
                onClick={() => onSelectSchedule(schedule)}
                className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] text-white truncate ${
                  tipoColors[schedule.tipo] || "bg-zinc-500"
                } hover:opacity-80 transition-opacity`}
              >
                {schedule.nombreEmpleado}
              </button>
            ))}
            {daySchedules.length > 3 && (
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 pl-1">
                +{daySchedules.length - 3} más
              </span>
            )}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="bordered" size="sm" onPress={prevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-[180px] text-center">
              {meses[month]} {year}
            </h3>
            <Button isIconOnly variant="bordered" size="sm" onPress={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="flat" size="sm" onPress={goToToday}>
              Hoy
            </Button>
          </div>

          {/* Leyenda */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Leyenda:
            </span>
            <Chip
              size="sm"
              classNames={{
                base: "bg-blue-500",
                content: "text-white text-[10px]",
              }}
            >
              Fijo
            </Chip>
            <Chip
              size="sm"
              classNames={{
                base: "bg-purple-500",
                content: "text-white text-[10px]",
              }}
            >
              Rotativo
            </Chip>
            <Chip
              size="sm"
              classNames={{
                base: "bg-green-500",
                content: "text-white text-[10px]",
              }}
            >
              Flexible
            </Chip>
            <Chip
              size="sm"
              classNames={{
                base: "bg-orange-500",
                content: "text-white text-[10px]",
              }}
            >
              Turnos
            </Chip>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div className="p-2">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 mb-1">
          {diasSemana.map((dia) => (
            <div
              key={dia}
              className="h-8 flex items-center justify-center text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-7">{renderDays()}</div>
      </div>
    </div>
  );
}
