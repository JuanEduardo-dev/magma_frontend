"use client";

import { Card, CardBody } from "@heroui/react";
import Login from "../components/Login";
import AuthImagePanel from "../components/AuthImagePanel";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-5xl shadow-xl">
        <CardBody className="p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* Left side - Image Panel (hidden on mobile) */}
            <div className="hidden md:block">
              <AuthImagePanel />
            </div>

            {/* Right side - Login Form */}
            <div className="flex items-center justify-center p-8 md:p-12">
              <Login />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
