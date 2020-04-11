/**
 * Checks if all given variables are defined
 * @param variables The variables to check
 * @returns {boolean}
 */
export const allDefined = (...variables) => {
    for(const variable of variables) {
        if(variable === undefined) {
            return false;
        }
    }
    return true;
};