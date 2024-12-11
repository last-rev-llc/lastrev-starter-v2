export const unCamelCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between capital letters followed by lowercase
    .toLowerCase() // Convert to lower case
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
