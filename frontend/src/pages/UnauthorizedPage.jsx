"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>Acceso No Autorizado</CardTitle>
          <CardDescription>
            No tienes permisos para acceder a esta sección
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button className="w-full" onClick={() => navigate("/dashboard")}>
            Volver al Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
