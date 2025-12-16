"use client";

import { Card, CardBody } from "@heroui/react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
}

export function MetricsCard({ title, value, icon, trend }: MetricsCardProps) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
      <CardBody className="flex flex-col gap-3 p-6">
        <div className="flex items-start justify-between">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{title}</p>
          {icon && (
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {value}
          </h3>
          {trend && (
            <span
              className={`text-xs ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
