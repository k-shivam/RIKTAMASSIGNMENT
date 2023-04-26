const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

const authenticateRoutes = require('../authmiddleware');


router.post('/addUsers',authenticateRoutes, async(req, res) =>{
    const {name, email, password, isAdmin}  = req.body || {};
    bcrypt.hash(password, 10, async(err, hash) =>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error');
        }else{
            const user = new Users({
                name, 
                email, 
                password: hash, 
                isAdmin:false
            });
            try{
                const user1 = await user.save();
                let token = jwt.sign({id:user1._id}, process.env.SECRET,{
                    expiresIn: 86400
                });
                res.status(200).send({auth: true, token: token})
            }catch(err){
                console.log(err)
                res.status(500).send('Internal server error')
            }
        }
    })
})

router.put('/editUser/:id',authenticateRoutes, async(req, res) =>{
    const { id } = req.params || {};
    const {name, email, isAdmin} = req.body || {};
    console.log(id, name, email, isAdmin)

    try{
        const updateUser = await Users.updateOne({
            _id: Object(id)
        },
        {
            "$set":{
                name,
                email,
                isAdmin
            }
        })

        res.status(200).send('User updated');
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
})


router.post('/register', async(req, res) =>{
    const {name, email, password, isAdmin}  = req.body || {};
    bcrypt.hash(password, 10, async(err, hash) =>{
        if(err){
            console.log(err)
            res.status(500).send('Internal server error');
        }else{
            const user = new Users({
                name, 
                email, 
                password: hash, 
                isAdmin
            });
            try{
                const user1 = await user.save();
                let token = jwt.sign({id:user1._id, isAdmin: user.isAdmin}, process.env.SECRET,{
                    expiresIn: 86400
                });
                res.status(200).send({auth: true, token: token})
            }catch(err){
                console.log(err)
                res.status(500).send('Internal server error')
            }
        }
    })
})


router.post('/logout', async(req, res) =>{
    res.status(200).send({message:'User Logged Out Successfully'});
})


router.post('/login', async(req, res) =>{
    const {email, password} = req.body || {};
    try{
        const user = await Users.findOne({email});
        if(!user){
            res.status(401).send('Invalid Email or Password');
        }else{
            bcrypt.compare(password, user.password, (err, result) =>{
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }else if(!result){
                    res.status(401).send('Invalid Email or Password');
                }else{
                    const token = jwt.sign({email, isAdmin: user.isAdmin}, 'secret');
                    res.status(200).send({token});
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router;
