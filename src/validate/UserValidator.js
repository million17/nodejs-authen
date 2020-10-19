import {VALIDATOR } from '../constant/constant';
const raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if(!errors.isEmpty()) {
        let err = errors.array();
        let firstErr = err.map(error => error.msg)[0];
        return firstErr;
    }
    return null;
}

export const registerValidator = async (req) => {
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