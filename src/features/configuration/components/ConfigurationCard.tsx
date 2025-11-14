"use client";

import { Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ConfigurationOption } from "../types";

interface ConfigurationCardProps {
  option: ConfigurationOption;
}

export function ConfigurationCard({ option }: ConfigurationCardProps) {
  const router = useRouter();
  const iconSrc =
    typeof option.icon === "string" ? option.icon : option.icon.src;

  return (
    <Card
      isPressable
      onPress={() => router.push(option.href)}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors w-full shadow-none"
    >
      <CardBody className="p-6 overflow-hidden">
        <div className="flex gap-4 items-center w-full">
          {/* Left - Icon */}
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Image
                src={iconSrc}
                alt={option.title}
                width={28}
                height={28}
                className="text-primary"
                style={{
                  filter:
                    "invert(24%) sepia(89%) saturate(3571%) hue-rotate(351deg) brightness(95%) contrast(92%)",
                }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {option.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 wrap-break-word">
              {option.description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
