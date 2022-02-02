import {cacheMongoose} from "../cacheMongoose";
import {CallbackError, Model, Schema} from "mongoose";
import {IUser} from "../../interfaces";
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    }
}, {versionKey: false});

//
// UserScheme.virtual('likes', {
//     ref: 'Like',
//     localField: '_id',
//     foreignField: 'likee',
//     count: true,
// });
//
// UserSchema.virtual('liked', {
//     ref: 'Like',
//     localField: '_id',
//     foreignField: 'likee',
//     count: true,
// });
//
UserSchema.set('toJSON', {
    virtuals: true
});

// UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    } else {
    }

    bcrypt
        .genSalt(12)
        .then((salt: any) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash: any) => {
            user.password = hash;
            next();
        })
        .catch((err: CallbackError | undefined) => {
            console.log(err);
            next(err);
        });
});
const UserModel: Model<IUser> = cacheMongoose.model("User", UserSchema);
export default UserModel
