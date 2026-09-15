/** Conserva el texto original y sus saltos naturales de línea. */
export function HighlightText({ text, phrase }: { text: string; phrase: string }) {
  const index = text.indexOf(phrase);
  if (index < 0 || !phrase) return <>{text}</>;
  return <>{text.slice(0, index)}<mark className="scroll-marker">{phrase}</mark>{text.slice(index + phrase.length)}</>;
}
