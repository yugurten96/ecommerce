const express = require("express");
const {User} = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//get all users
router.get("/", async (req, res) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success : false})
    }
    res.send(userList)
})
//get user bu id
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(500).json({message: "there is no user with the given id"})
    }
    res.status(200).send(user)
})

router.post("/", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.apartment,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save();
    if(!user) {
        return res.status(404).send("the user can not be created!")

    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('user not found')
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id
            },
            secret,
            {expiresIn: '1d'}
        )
        res.status(200).send({user: user.email, token})
    } else {
        res.status(400).send('wrong password')
    }

})



module.exports = router;