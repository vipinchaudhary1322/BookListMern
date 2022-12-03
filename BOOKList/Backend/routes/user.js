const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const users = require('../model/users')
const { body, validationResult } = require('express-validator')
var jwt = require('jsonwebtoken');
router.use(express.json())

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await users.findOne({ email: email })
        if (!data) {
            return res.status(400).json({ message: "USER NOT REGISTERED" })
        } else {
            bcrypt.compare(password, data.password, async function (err, result) {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                        data: data._id
                    }, process.env.SECRET);

                    return res.status(200).json({ message: "Success", token })
                } else {
                    res.json({ message: "Incorrect Password" })

                }
            });
        }

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})



router.post('/register', body('email').isEmail(), body('password').isLength(min = 6, max = 16), async (req, res) => {
    const { email, password } = req.body
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).json({ message: error.array() })
        }
        const data = await users.findOne({ email: email })
        if (data) {
            return res.status(500).json({
                message: "email is already registered"
            })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            const data = await users.create({
                email,
                password: hash
            })
            res.status(200).json({
                status: "success",
                message: "Registeration successfull"
            })
        });


    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

})

module.exports = router;