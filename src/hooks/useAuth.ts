import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  console.log("auth test");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      router.push("/");
      return;
    }

    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
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
  }, [router]);

  return { isAuthenticated, isLoading };
}
