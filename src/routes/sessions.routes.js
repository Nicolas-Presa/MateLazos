import { Router } from "express";
import initPassport from '../auth/passport.auth.js';
import passport from 'passport';
import userModel from "../models/user.model.js";


initPassport();
const router = Router();

router.post('/login', passport.authenticate('loginAuth', {failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    try{
        res.redirect('/addProduct')
    }catch(err){
        res.status(500).send({status: 'error', payload: err.message});
    }
})

router.get('/faillogin', async(req, res) => {
    res.status(400).send('El mail no existe o faltan campos obligatorios');
})

router.get('/logout', async(req, res) => {
    try{
        const userEmail = req.user.email
        req.session.destroy(async (err) => {
            if(err){
                res.status(500).send({ status: 'ERR', payload: err.message })
            }else{
                const user = await userModel.findOne({email: userEmail});

                const loguot = await userModel.findByIdAndUpdate(
                    user._id,
                    {$set: {last_connection: false}},
                    {new: true}
                )
                res.redirect('/login')
            }
        })
    }catch(err){
        res.status(500).send({ status: 'ERR', payload: err.message })
    }
})

export default router