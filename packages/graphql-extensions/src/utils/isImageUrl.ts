export const isImageUrl = (fileUrl: string): boolean => {
  if (!fileUrl) return false;

  const imageExtensions: string[] = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']; // Add more if needed

  for (const extension of imageExtensions) {
    if (fileUrl.toLowerCase().endsWith(extension)) {
      return true;
    }
  }

  return false;
};
