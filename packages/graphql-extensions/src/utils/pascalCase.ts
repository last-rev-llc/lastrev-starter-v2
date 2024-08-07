export const pascalCase = (str: string): string => {
  if (!str) return str;
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return match.toUpperCase();
  });
};
