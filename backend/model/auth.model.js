import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
}, {
    timestamp: true
});

const User = mongoose.model('User', authSchema);

export default User;