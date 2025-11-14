import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true, 
        },
        tel: {
            type: String,
            required: [true, "Please add a telephone number"],
            maxlength: [20, "Telephone number cannot be more than 20 characters"],
        },
        role: {
            type: String,
            enum: ['member', 'admin'], 
            default: 'member', 
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            select: false, 
        },
    },
    {
        timestamps: true, 
        collection: 'users' 
    }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User