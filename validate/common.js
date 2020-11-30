/**
 * Check error
 * @param req
 * @returns {Promise<null|*>}
 */
export const raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
        let err = errors.array();
        let firstErr = err.map(error => error.msg)[0];
        return firstErr;
    }
    return null;
}

