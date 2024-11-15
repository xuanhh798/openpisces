import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verify token validity
    const verifyToken = async () => {
      try {
        console.log("Verifying token...");
        const response = await fetch("/api/auth/verify-token", {
          credentials: "include",
        });
        console.log("Token verification response:", response.status);

        if (response.ok) {
          console.log("Token verified successfully");
          setIsAuthenticated(true);
        } else {
          console.log("Token verification failed");
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
          setIsAuthenticated(false);
          router.push("/");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return { isAuthenticated, isLoading };
}
