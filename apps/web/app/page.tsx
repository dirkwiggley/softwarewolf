"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSecurity } from "./SecurityContext"; // Ensure your relative or aliased path is correct

import { ImageWrapCard } from '@softwarewolf/ui/image-wrap-card';

export default function RootPage() {
  const router = useRouter();
  const { userProfile, loading } = useSecurity();

  // Isolate the exact primitive variable needed for the layout router switch
  const userRole = userProfile?.role || 'GUEST';

  useEffect(() => {
    // Prevent premature navigation hooks execution during the background verification loop
    if (loading) return;

    switch (userRole) {
      case "ADMIN":
      case "MANAGER":
        router.replace("/admin-hub");
        break;
      case "USER":
        router.replace("/home");
        break;
      case "GUEST":
      default:
        router.replace("/login");
        break;
    }
  }, [userRole, loading, router]); // Optimized dependencies prevent wasteful re-runs

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-400">
      <div className="text-sm font-medium tracking-wider uppercase animate-pulse">
        Verifying security context...
      </div>
    </div>
  );
}
