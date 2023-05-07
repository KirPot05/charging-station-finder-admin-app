export function capitalize(text) {
  if (typeof text !== "string" || text?.trim() === "") return;

  return text[0].toUpperCase() + text.slice(1);
}
