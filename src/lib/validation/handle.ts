import { z } from "zod";

export const HANDLE_ERROR =
  "3–30 characters: lowercase letters, numbers, _ and .";

export const handleSchema = z
  .string()
  .regex(/^[a-z0-9_.]{3,30}$/, HANDLE_ERROR);
