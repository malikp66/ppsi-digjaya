export type QRCallback = (error: Error | null) => void;

function hashText(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function toCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: { size?: number } = {},
  callback?: QRCallback,
) {
  try {
    const size = options.size ?? 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    const modules = 21;
    const cell = size / modules;
    const seed = hashText(text);
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        const value = (seed >> ((x + y * modules) % 31)) & 1;
        ctx.fillStyle = value ? "#111827" : "#f9fafb";
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
    callback?.(null);
  } catch (error) {
    callback?.(error as Error);
  }
}
