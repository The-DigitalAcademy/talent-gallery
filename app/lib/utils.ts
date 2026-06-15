export function slugify(text: string) {
    return text
        .toString()                     // Cast to string if necessary
        .normalize('NFD')               // Split accented characters into base letters and diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics / accents
        .toLowerCase()                  // Convert to lowercase
        .trim()                         // Trim leading and trailing whitespace
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')       // Remove all non-word characters except hyphens
        .replace(/\-\-+/g, '-');        // Replace multiple consecutive hyphens with a single one
}