const user = require("../src/models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const { sendEmail } = require("../src/services/email.service");
const { getOtpHtml, generateOTP } = require("../src/utils/utils");
const Otp = require("../src/models/otp.model");


const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please enter all fields"
            });
        }
        const normalizedEmail = email.toLowerCase();
        console.log("Normalized Email:", normalizedEmail);
        console.log("Is Valid:", validator.isEmail(normalizedEmail));
        if(!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }
        const userExists = await user.findOne({
            $or: [
                {username:username},
                {email:normalizedEmail}
            ]
        })
        if (userExists) {
            return res.status(409).json({
                message: "Email/Username already associated with another account, try logging in instead."
            })
        }

        const hashed = await bcrypt.hash(password, 10);

        const userDetails = await user.create({username, email: normalizedEmail, password:hashed, isVerified:false});

        res.status(201).json({
            message: "Registration success! Please verify your email",
            user: {
                username: userDetails.username,
                email: userDetails.email,
                isVerified: userDetails.isVerified
            }
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const normalizedEmail = email?.toLowerCase();
        const userExists = await user.findOne({
            $or: [
                {email: normalizedEmail},
                {username: username}
            ]
        });
        if (!userExists) {
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }
        const isValid = await bcrypt.compare(password, userExists.password);
        if (!isValid) {
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }
        if (!userExists.isVerified){
            return res.status(403).json({
                message: "Email not verified. Please verify your email.",
                user: {
                    username: userExists.username,
                    email: userExists.email,
                    isVerified: userExists.isVerified
                }
            })
        }

        const token = jwt.sign(
            {
                id: userExists._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        res.status(200).json({
            message: "Logged in!"
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    };
}

const logoutUser = (req, res) => {
    console.log("Logout route hit");
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });

    res.status(200).json({
        message: "Logged out successfully!"
    });
}

const getCurrentUser = (req, res) => {
    res.status(200).json({
        authenticated: true,
        userId: req.userId,
        user: req.user
    });
};

const sendOtp = async (req, res) => {

    const {email, purpose} = req.body;
    if (!email || !purpose) {
        return res.status(400).json({
            message: "Email and purpose are required."
        })
    }
    const normalizedEmail = email.toLowerCase();

    try {

        const currentUser = await user.findOne({
            $or:[
                {email: normalizedEmail},
                {pendingEmail: normalizedEmail}
            ]
        })

        if (!currentUser) {
            return res.status(404).json({
                message:"User doesn't exist!"
            })
        }

        if (purpose==='register') {
            if (currentUser.isVerified){
                return res.status(400).json({
                    message: "Email is already verified."
                });
            }
        }
        else if (purpose==='email_change' ) {
            if (currentUser.pendingEmail===null) {
                return res.status(400).json({
                    message: "Email is already updated!"
                })
            }
        }
        else if (purpose==='forgot_password') {
            
        }
        else {
            return res.status(400).json({
                message: "Invalid request"
            })
        }
        
        const otp = generateOTP();

        const hashedOtp = await bcrypt.hash(otp, 10);

        await Otp.deleteMany({
            email: normalizedEmail,
            purpose
        });

        await Otp.create({
            email: normalizedEmail,
            otp: hashedOtp,
            purpose: purpose,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        })
        
        await sendEmail(
            normalizedEmail,
            "Verify your FinTrack Account",
            getOtpHtml(otp)
        );

        return res.status(200).json({
            message: "OTP sent successfully!"
        });

    } catch (error) {
        console.log(error);
        await Otp.deleteMany({ email: normalizedEmail });

        return res.status(500).json({
            message: "Failed to send verification email."
        });
    }
};

const verifyOtp = async (req, res) => {
    
    try {
        const { email, otp, purpose } = req.body;

        if (!email || !otp || !purpose) {
            return res.status(400).json({
                message: "Email, OTP and purpose are required."
            });
        }

        const normalizedEmail = email.toLowerCase();

        const currentUser = await user.findOne({
            $or:[
                {email: normalizedEmail},
                {pendingEmail: normalizedEmail}
            ]
        });

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const otpDoc = await Otp.findOne({
            email: normalizedEmail,
            purpose
        });

        if (!otpDoc) {
            return res.status(400).json({
                message: "OTP not found or expired."
            });
        }

        if (otpDoc.expiresAt < Date.now()) {
            await Otp.deleteOne({
                _id: otpDoc._id
            });

            return res.status(400).json({
                message: "OTP has expired."
            });
        }

        const isValidOtp = await bcrypt.compare(
            otp,
            otpDoc.otp
        );

        if (!isValidOtp) {
            return res.status(400).json({
                message: "Invalid OTP."
            });
        }

        //Purpose flow

        if(purpose==='register'){
            if (currentUser.isVerified) {
                return res.status(400).json({
                    message: "Email already verified."
                });
            }

            currentUser.isVerified = true;
            await currentUser.save();

            const token = jwt.sign(
                {
                    id: currentUser._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none"
            });

            await Otp.deleteOne({
                _id: otpDoc._id
            });

            return res.status(200).json({
                message: "Email verified successfully.",
                user: {
                    username: currentUser.username,
                    email: currentUser.email,
                    isVerified: currentUser.isVerified
                }
            });
        }

        else if (purpose==='email_change'){
            if (!currentUser.pendingEmail) {
                return res.status(400).json({
                    message: "Email already updated."
                });
            }
            if (currentUser.pendingEmail!==normalizedEmail) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }
            currentUser.email = currentUser.pendingEmail;
            currentUser.pendingEmail = null;
            await currentUser.save();

            await Otp.deleteOne({
                _id: otpDoc._id
            });

            return res.status(200).json({
                message: "Email updated successfully.",
                user: {
                    username: currentUser.username,
                    email: currentUser.email,
                    isVerified: currentUser.isVerified
                }
            });
        }
        else if (purpose==='forgot_password') {
            await Otp.deleteOne({
                _id: otpDoc._id
            });
            const resetToken = jwt.sign(
                {email: normalizedEmail, purpose},
                process.env.JWT_SECRET,
                { expiresIn: "10m"}
            )
            return res.status(200).json({
                message: "OTP verified successfully, create a new password!",
                email: normalizedEmail,
                resetToken
            })
        }
        else {
            return res.status(400).json({
                message: "Invalid request"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateUsername = async (req, res) => {
    const { newUsername, password } = req.body;
    
    if (!newUsername || !password) {
        return res.status(400).json({
            message: "New username and password are required!"
        })
    }
    try {
        const userDetails = await user.findById(req.user.id)
        const checkExistingUser = await user.findOne({
            username: newUsername
        })

        if (!userDetails) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        if (req.user.username===newUsername) {
            return res.status(400).json({
                message: "Current username and new username should be different!"
            })
        }
        if (checkExistingUser) {
            return res.status(400).json({
                message: "User with this username already exists!"
            })
        }
        
        const isValid = await bcrypt.compare(password, userDetails.password);
        if(!isValid){
            return res.status(401).json({
                message: "Invalid password!"
            })
        }
        userDetails.username = newUsername;
        await userDetails.save();
        return res.status(200).json({
            message: "Username updated succesfully!"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Some error occured!"
        })
    }
}

const updateEmail = async (req, res) => {
    const { newEmail, password } = req.body;
    if ( !newEmail || !password ) {
        return res.status(400).json({
            message: "New email address and password are required!"
        })
    }
    const normalized = newEmail.toLowerCase();
    try {
        const userDetails = await user.findById(req.user.id)
        const checkExistingUser = await user.findOne({
            email: normalized
        })

        if (!userDetails) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        if (req.user.email===normalized) {
            return res.status(400).json({
                message: "Current email and new email should be different!"
            })
        }
        if (checkExistingUser) {
            return res.status(400).json({
                message: "User with this email already exists!"
            })
        }
        
        const isValid = await bcrypt.compare(password, userDetails.password);
        if(!isValid){
            return res.status(401).json({
                message: "Invalid password!"
            })
        }
        userDetails.pendingEmail = normalized;
        await userDetails.save();
        return res.status(200).json({
            message: "Please verify your email!",
            email: normalized
        })
    } catch(error){
        return res.status(500).json({
            message: "Some error occured!"
        })
    }
}

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword){
        return res.status(400).json({
            message: "The current and new password is required"
        });
    }
    try {
        const userDetails = await user.findById(req.user.id);
        if (!userDetails){
            return res.status(404).json({
                message: "User not found!"
            });
        }
        const isValid = await bcrypt.compare(currentPassword, userDetails.password);
        if (!isValid) {
            return res.status(400).json({
                message: "Your entered password doesn't match the current password!"
            });
        }
        if (currentPassword===newPassword) {
            return res.status(400).json({
                message: "Your entered password and new password cannot be the same!"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        userDetails.password = hashedPassword;
        await userDetails.save();
        return res.status(200).json({
            message: "Password changed successfully!"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Some error occured!"
        });
    }
}

const forgotPassword = async (req,res) => {
    const { resetToken, newPassword } = req.body;
    if ( !resetToken || !newPassword ) {
        return res.json({
            message: "Reset token and new password are required!"
        })
    }
    
    try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        
        if (decoded.purpose!=='forgot_password'){
            return res.json({
                message: "Invalid reset token!"
            })
        }

        const userDetails = await user.findOne({
            email: decoded.email
        })

        if(!userDetails){
            return res.status(404).json({
                message: "User not found!"
            });
        }

        const isSame = await bcrypt.compare(newPassword, userDetails.password)

        if (isSame) {
            return res.status(400).json({
                message: "Your entered password and new password cannot be the same!"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        userDetails.password = hashedPassword;
        await userDetails.save();

        return res.status(200).json({
            message: "Password changed successfully!"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Some error occured!"
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    sendOtp, 
    verifyOtp,
    updateUsername,
    updateEmail,
    updatePassword,
    forgotPassword
};