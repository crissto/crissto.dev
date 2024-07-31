import posthog from "posthog-js";
import { useMemo } from "react";

const usePosthog = () => {
  return useMemo(() => {
    if (
      typeof window === "undefined" ||
      !process.env.NEXT_PUBLIC_POSTHOG_API_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_URL
    ) {
      return null;
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_URL,
    });
    return posthog;
  }, []);
};

export default usePosthog;
