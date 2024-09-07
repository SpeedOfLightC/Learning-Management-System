import mongoose, { Schema } from 'mongoose';
import bcrypt, { genSalt } from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    subscription: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
},
    {
        timestamps: true,
    });

export const User = mongoose.model("User", userSchema);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await genSalt();

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}