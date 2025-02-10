export default function fixPolishOrphans(text: string) {
  const shortWords = ["z", "w", "i", "na", "o"];
  let fixedText = text;
  shortWords.forEach((w) => {
    const re = new RegExp(`\\s${w}\\s`, "gi");
    fixedText = fixedText.replace(re, ` ${w}\u00A0`);
  });
  return fixedText;
}
