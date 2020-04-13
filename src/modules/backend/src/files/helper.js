/**
 * Parses the given filename
 * @param filename
 */
export const parseFilename = (filename) => {
    // First lowercase the filename
    filename = filename.toLowerCase();

    // Remove all whitespaces
    filename = filename.replace(/\s/g,'');

    return filename;
};