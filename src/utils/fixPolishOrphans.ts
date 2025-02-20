// Fixes Polish orphans by replacing specific spaces with non-breaking spaces.
export default function fixPolishOrphans(text: string) {
  if (!text) return text;
  const shortWords = ["z", "w", "i", "na", "o", "że"];
  let fixedText = text;
  shortWords.forEach((word) => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    const re = new RegExp(`\\s(${word}|${capitalizedWord})\\s`, "g");
    fixedText = fixedText.replace(re, (match, p1) => {
      return p1.charAt(0) === p1.charAt(0).toUpperCase()
        ? ` ${capitalizedWord}\u00A0`
        : ` ${word}\u00A0`;
    });
  });
  return fixedText;
}
