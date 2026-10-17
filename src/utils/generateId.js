export function generateId(length = 7) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const sexyChars = ["X", "Z", "V", "K", "Y", "1", "7", "Λ", "9", "0"];

  return Array.from({ length }, () => {
    const pool = Math.random() < 0.65 ? sexyChars : chars;
    return pool[Math.floor(Math.random() * pool.length)];
  }).join("");
}
 