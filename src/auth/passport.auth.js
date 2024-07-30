import passport from "passport";
import LocalStrategy from 'passport-local';
import userModel from '../models/user.model.js';
import { isValidPassword } from '../utils.js';


const initPassport = () => {
    const verifyLogin = async(req, username, password, done) => {
        const user = await userModel.findOne({email: username});

        if(!user){
            return done('Usuario o contraseña incorrecto', false);
        }

        if(user !== null && isValidPassword(user, password)) {
            const login = await userModel.findByIdAndUpdate(
                user._id,
                {$set: {last_connection: true, last_connection_date: new Date()}},
                {new: true}
            )
            return done(null, login)
        }else{
            return done('error en passport local', false)
        }
    }

    passport.use('loginAuth', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pass'
    }, verifyLogin))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            done(null, await userModel.findById(id).lean())
        } catch (err) {
            done(err.message)
        }
    })
}

export default initPassport