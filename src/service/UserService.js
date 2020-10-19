const {User} = require('../model/User');
import {ROLE} from '../constant/constant';
const bcrypt = require('bcrypt')

const findUserByEmail = async (body) => {
    return await User.findOne({
        where: {
            email: body.email,
        },
    });
}

export const register = async (body) => {
    let user = await findUserByEmail(body);
    if (user === null) {
        bcrypt.hash(body.password, 10, async (err, hash) => {
            if(err) {return next(err);}
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