const {VALIDATOR} = require('../constant/constant');
const {raiseErr} = require("./common");

/**
 * Post Validator
 * @param req
 * @returns {Promise<null|*>}
 */
const postValidator = async (req) => {
    !req.check('title', `title ${VALIDATOR.REQUIRED}`).isEmpty();
    !req.check('content', `content ${VALIDATOR.REQUIRED}`).isEmpty();
    !req.check('poster', `poster ${VALIDATOR.REQUIRED}`).isEmpty();

    //check validator
    return await raiseErr(req);

}

module.exports = postValidator;