// src/hooks/useUserRole.js
import { useState, useEffect } from "react";

export function useUserRole() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(true); // no se usa, pero lo dejamos fijo
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const rolExtraido = payload.rol?.replace("ROLE_", "").toLowerCase();
        setUser({ correo: payload.sub });
        setRole(rolExtraido);
      } catch (err) {
        console.error("Token inválido", err);
      }
    }

    setIsLoaded(true);
  }, []);

  return {
    user,
    role,
    onboardingComplete,
    isLoaded,
    setRole,
  };
}
