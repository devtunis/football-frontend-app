export function generateUsername(name) {
  const cleanName = name.trim().toLowerCase().replace(/\s+/g, "_");
  const random = Math.floor(100 + Math.random() * 9000);
  return `${cleanName}_${random}`;
}
