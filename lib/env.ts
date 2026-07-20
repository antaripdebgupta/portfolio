import { z } from "zod";

const envSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
});

const getEnv = () => {
  // During static generation / build time, GITHUB_TOKEN might not be present.
  // We only want to fail fast at runtime.
  const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

  const token = process.env.GITHUB_TOKEN;

  if (!token && !isBuildTime) {
    throw new Error("❌ GITHUB_TOKEN is missing. Please set it in your environment variables.");
  }

  return {
    GITHUB_TOKEN: token || "",
  };
};

export const env = getEnv();
