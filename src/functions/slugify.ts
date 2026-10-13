export const slugify = (input: string) => {
  return (
    input
      .normalize("NFD") // Decompose accented characters into base and diacritic
      // .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/\p{Diacritic}/gu, "") // Remove diacritics
      .toLowerCase() // Convert to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/[^a-z0-9\s-]/g, "") // Remove all non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, "-")
  ); // Replace spaces with hyphens
};
