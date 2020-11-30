const {isLogging, signIn} = require('../service/UserService');
const {loginValidator} = require("../validate/UserValidator");

const express = require('express')
const router = new express.Router();

const {register} = require('../service/UserService');
const {registerValidator} = require('../validate/UserValidator');

/**
 * Register User
 */
router.post('/user', async (req, res) => {
    try {
        let validator = await registerValidator(req);
        if (!!validator) {
            return res.send({message: validator});
        } else {
            let registed = await register(req.body);
            if (registed === true) {
                return res.send({message: "Register Successfully !"});
            } else {
                return res.send({message: "Email has been used."})
            }
        }
    } catch (err) {
        return res.status(500).send({message: "Server Error !"});
    }
})

/**
 * Login
 */
router.post("/login", async (req, res) => {
    try {
        console.log(req.session)
        let isLogged = await isLogging(req);
        if (isLogged === true) {
            return res.send({message: 'You are logged in.'});
        }
        let validator = await loginValidator(req);
        if (validator !== null) {
            return res.send({message: validator});
        }
        let signIned = await signIn(req);
        if (signIned === true) {
            return res.send({message: 'Sign In Successfully.'});
        } else {
            return res.send({message: 'Email or Password is incorrect'});
        }
    } catch (err) {
        return res.status(500).send({message: `Server Error !`})
    }
})

router.get("/logout", async (req, res) => {
    try {
        let isLogged = await isLogging(req);
        if (isLogged === false) {
            return res.send({message: 'You are not logged in'})
        }
        req.session.user = null;
        return res.send({message: 'Sign Out successfully'})
    } catch (err) {
        return res.status(500).send({message: 'Server Error !'});
    }
})

module.exports = router;