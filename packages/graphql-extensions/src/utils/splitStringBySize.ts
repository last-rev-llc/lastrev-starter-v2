export const splitStringBySize = (input: string, maxSize = 2500): string[] => {
  if (input.length <= maxSize) {
    return [input];
  }

  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < input.length) {
    let endIndex = Math.min(startIndex + maxSize, input.length);
    let whitespaceIndex = input.lastIndexOf(' ', endIndex);

    if (whitespaceIndex <= startIndex) {
      whitespaceIndex = endIndex;
    }

    chunks.push(input.slice(startIndex, whitespaceIndex));
    startIndex = whitespaceIndex + (whitespaceIndex === endIndex ? 0 : 1); // Move past the whitespaces
  }

  return chunks;
};
