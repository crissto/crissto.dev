"use client";

import usePosthog from "@/lib/usePosthog";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePosthog();

  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview");
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
