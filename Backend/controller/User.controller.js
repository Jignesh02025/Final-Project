import User from "../model/model.user.js"
import bcryptjs from 'bcryptjs'
export const Singup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        const hasPassword = await bcryptjs.hash(password, 10);
        const newuser = new User({
            fullname: fullname,
            email: email,
            password: hasPassword,
        });
        await newuser.save();
        res.status(201).json({ message: "New User Created" });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "User not Created" })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user =await User.findOne({ email });
         console.log(user.password)
        const ismatch = await bcryptjs.compare(password, user.password);
        if (!user || !ismatch) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        } else {
            res.status(200). json({
                message: "Login Successfull", user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }
            });
        }
    } 
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Serever Error" })
    }
};
