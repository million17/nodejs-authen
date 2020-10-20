const {User} = require('../model/User');
const {ROLE} = require ('../constant/constant');

const bcrypt = require('bcrypt')

/**
 * Find User By Email
 * @param body
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const findUserByEmail = async (body) => {
    return await User.findOne({
        where: {
            email: body.email,
        },
    });
}

/**
 * Register
 * @param body
 * @returns {Promise<boolean>}
 */
const register = async (body) => {
    let user = await findUserByEmail(body);
    if (user === null) {
        bcrypt.hash(body.password, 10, async (err, hash) => {
            if (err) {
                return next(err);
            }
            await User.create({
                username: body.username,
                email: body.email,
                role: ROLE.ROLE_USER,
                password: hash,
            });
        })
        return true;
    } else {
        return false;
    }
}

/**
 * Sign In
 * @param req
 * @returns {Promise<boolean>}
 */
const signIn = async (req) => {
    let user = await findUserByEmail(req.body);
    if (user === null) {
        return false;
    } else {
        let comparePass = await bcrypt.compare(req.body.password, user.password);
        // let comparePass = (req.body.password === user.password) ? true : false;
        if (comparePass === false) {
            return false;
        } else {
            req.session.user = user;
            return true;
        }
    };
};

/**
 * Check Logging
 * @param req
 * @returns {Promise<boolean>}
 */
const isLogging = async (req) => {
    if(req.session && req.session.user) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    isLogging,
    signIn,
    register,
    findUserByEmail
}