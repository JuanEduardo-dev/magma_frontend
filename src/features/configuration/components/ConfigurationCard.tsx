"use client";

import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";

interface ConfigurationCardProps {
  option: {
    id: string;
    title: string;
    description: string;
    icon: string | ReactElement;
    href: string;
  };
}

export function ConfigurationCard({ option }: ConfigurationCardProps) {
  const router = useRouter();
  const isReactElement = typeof option.icon !== "string";

  return (
    <Card
      isPressable
      onPress={() => router.push(option.href)}
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors w-full shadow-none"
    >
      <CardBody className="p-6 overflow-hidden">
        <div className="flex gap-4 items-center w-full">
          {/* Left - Icon */}
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              {isReactElement ? (
                option.icon
              ) : (
                <Image
                  src={typeof option.icon === "string" ? option.icon : ""}
                  alt={option.title}
                  width={28}
                  height={28}
                  className="text-primary"
                  loading="eager"
                  decoding="sync"
                />
              )}
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
