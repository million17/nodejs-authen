const {VALIDATOR} = require('../constant/constant');
const {raiseErr} = require('./common');

/**
 * Register Validator
 * @param req
 * @returns {Promise<*>}
 */
const registerValidator = async (req) => {
    !req.check('email', `email ${VALIDATOR.REQUIRED}`).isEmpty();
    req.check('email', `email ${VALIDATOR.INVALID}`).isEmail();
    !req.check('username', `username ${VALIDATOR.REQUIRED}`).isEmpty();
    !req.check('password', `password ${VALIDATOR.REQUIRED}`).isEmpty();
    req.check('password', `password ${VALIDATOR.LENGTH}`).isLength({min: 6});
    !req.check('password_confirmation', `password_confirmation ${VALIDATOR.REQUIRED}`).isEmpty();
    req.check('password_confirmation', `password_confirmation ${VALIDATOR.LENGTH}`).isLength({min: 6});

    //check for err
    return await raiseErr(req);
}

/**
 * Login Validator
 * @param req
 * @returns {Promise<*>}
 */
const loginValidator = async (req) => {
    !req.check('email', `email ${VALIDATOR.REQUIRED}`).isEmpty();
    req.check('email', `email ${VALIDATOR.INVALID}`).isEmail();
    !req.check('password', `password ${VALIDATOR.REQUIRED}`).isEmpty();
    req.check('password', `password ${VALIDATOR.LENGTH}`).isLength({min: 6});

    //check for err
    return await raiseErr(req);

}

module.exports = {
    loginValidator,
    registerValidator,
}