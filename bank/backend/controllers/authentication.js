const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../utils/prisma");

const prisma = require("../utils/prisma");

exports.user = async (req, res) => {
    // res.cookie("CSRF-TOKEN", req.csrfToken(), { secure: false });
    return res.status(200).json({
        user: {
            id: req.user.id,
            name: req.user.name,
            address: req.user.address,
            phoneNumber: req.user.phoneNumber,
            role: req.user.role
        }
    });
}

exports.login = async (req, res) => {
    if(!req.body.phoneNumber || !req.body.password){
        return res.status(401).json({ message: "Credentials cannot be empty"});
    }

    try {
        const user = await prisma.users.findUnique({where:{phoneNumber:req.body.phoneNumber}});

        if(!user)
            return res.status(401).json({message: "Couldn't find your phone number. Try again or create a new account."});
        
        const isPasswordSame = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordSame) 
            return res.status(401).json({ message: "Wrong password."});
        
        
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        // res.cookie("CSRF-TOKEN", req.csrfToken(), { secure: false });

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}


exports.register = async (req, res) => {
    if(!req.body.phoneNumber || !req.body.password|| !req.body.address || !req.body.name || !req.body.role ){
        return res.status(401).json({ message: "Credentials cannot be empty"});

    }
    try {
        const user = await prisma.users.findUnique({ where: {phoneNumber: req.body.phoneNumber}});
        
        if(user)
            return res.status(401).json({message: "Phone Number is already registered. Try another"});


        if(req.body.password.length < 5)
            return res.status(411).json({message: "Use 5 characters or more for your password"});

        if(req.body.role !== "1" && req.body.role !== "0")
            return res.status(411).json({message: "Role should be either 1 or 0"});

        if(req.body.phoneNumber.length !== 10 )
            return res.status(411).json({message: "This phone number format is not recognised. Phone number should be 10 digits"});
        
        const hash = await bcrypt.hash(req.body.password, 12);

        await prisma.users.create({
            data: {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                password: hash,
                role: req.body.role
            }
        });

        // res.cookie("CSRF-TOKEN", req.csrfToken(), { secure: false });
        return res.status(200).json({ message: "Account created successfully, Continue to login." });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie("token", {maxAge: 0});
    return res.status(200).json({data: {message: "Logout successful!"}})
}

exports.resetPassword = async (req, res, next) => {
    try {
        console.log(req.body.oldpassword);
        const result = await bcrypt.compare(req.body.oldpassword, req.user.password)
        
        if(!result){
            return res.status(411).json({message: "Old password didnt match. Try again."})
        }

        const hash = await bcrypt.hash(req.body.password, 12);

        await prisma.users.update({
            where: { id: req.user.id },
            data: { password: hash }
        });

        res.clearCookie("token", {maxAge: 0});

        return res.status(200).json({message: "Password is changed!"});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}
