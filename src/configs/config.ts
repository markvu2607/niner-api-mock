import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envVarsSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.number().default(8000),
});

const validatedEnvVars = envVarsSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
});

if (validatedEnvVars.success === false) {
  throw new Error(
    `Config validation error: ${validatedEnvVars.error.flatten().fieldErrors}`
  );
}

const config = {
  nodeEnv: validatedEnvVars.data.NODE_ENV,
  port: validatedEnvVars.data.PORT,
};

export default config;
