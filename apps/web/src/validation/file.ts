export type ImageValidationOptions = {
  maxMB?: number;
  allowed?: string[];
};

const DEFAULT_ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export function validateImageFile(
  file: File,
  opts: ImageValidationOptions = {},
): { ok: boolean; error?: string } {
  const allowed = opts.allowed ?? DEFAULT_ALLOWED;
  const maxMB = opts.maxMB ?? 5; // 5MB default

  if (!allowed.includes(file.type)) {
    return { ok: false, error: "Unsupported file type" };
  }
  const maxBytes = maxMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { ok: false, error: `File too large (max ${maxMB}MB)` };
  }
  return { ok: true };
}
