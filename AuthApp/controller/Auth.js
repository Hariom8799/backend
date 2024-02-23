const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config();

exports.signup = async (req,resp)=>{
    try{
        const {name,email,password,role} = req.body;

        // check user for this email
        const existingUser = await User.findOne({email});

        if(existingUser){
            return resp.status(400).json({
                success : false,
                message : "User already exists"
            })
        }

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return resp.status(500).json({
                success : false,
                message : "password did not able encrypt",
            })
        }

        const user = await User.create({name,email,password:hashedPassword,role});

        return resp.status(200).json({
            success : true,
            message : "user created successfully"
        })
    }
    catch(err){
        console.error(err);
        return resp.status(500).json({
            success : false,
            message : "something went wrong, please try again later",
        })

    }
} 

exports.login = async (req,resp)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return resp.status(400).json({
                success: false,
                message : "Please fill all the details "
            })
        }
        else{
            let user = await User.findOne({email});

            if(!user){
                return resp.status(401).json({
                    success : false,
                    message : "signUp first",
                })
            }
            const payload = {
                email : user.email,
                id : user._id,
                role : user.role
            }
            if(await bcrypt.compare(password,user.password )){

                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn : "2hr"
                });

                user = user.toObject();
                user.token = token;
                user.password = undefined;

                const options = {
                    expires : new Date(Date.now() +3*24*60*60*1000)
                }

                return resp.cookie("token",token,options).status(200).json({
                    success : true,
                    token,
                    user,
                    message : "user logged in successfully"
                })

            }
            else{
                return resp.status(403).json({
                    success : false,
                    message : "incorrect password"
                })
            }
        }
        
    }
    catch(err){
        console.error(err);
        return resp.status(500).json({
            success : false,
            message : "something went wrong, please try again later",
        })

    }
}