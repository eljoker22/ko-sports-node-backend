const mongoose = require('mongoose');

// User structure
/**
 * {
 *  username: string,
 *  email: string,
 *  password: string,
 *  avatar: string,
 *  plan: string,
 *  paymentMethod: string,
 *  emailConfermation: bolean,
 *  codeConfermation: number,
 *  tokenForgotPassword: string,
 * }
 */

const userSchema = new mongoose.Schema({
    username: { type: String, require: [true, 'must provide username'], trim: true },
    email: { type: String, require: [true, 'must provide email'], trim: true, unique: true },
    password: { type: String, require: true },
    avatar: { type: String, trim: true },
    plan: { type: String, default: 'free' },
    paymentMethod: { type: String },
    subscriptionId: {type: String},
    emailConfermation: { type: Boolean, default: false },
    codeConfermation: { type: Number, default: null },
    tokenForgotPassword: { type: String }
})

module.exports = mongoose.model('User', userSchema);