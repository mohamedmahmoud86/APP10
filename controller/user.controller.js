const User = require('../models/user.model')


const register = async (req,res)=>{
    try{
        const userData = new User(req.body)
        await userData.save()
        emailSetting(userData.email, "test email")
        res.status(500).send({
            apiStatus:true,
            data:userData,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}
const addAge =  async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const age = req.body
        user.age.push(age)
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data:user,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}
const login = async(req,res)=>{
    try{
        let user = await User.loginUser(req.body.email,name, req.body)
        const token = await user.generateToken()
        res.status(200).send({ apiStatus:true, data:{user, token}, message:"logged in" })
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message:"cannot login" })
    }
}
const logOut = async(req,res)=>{
    try{  
        req.user.tokens = req.user.tokens.filter(singleToken=>{
            return singleToken.token != req.token
        })
        req.user.save()
        res.send({apiStatus:true, data:"", message:"logged out from this device"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}

const me = async(req,res)=>{ res.send(req.user) }

const addPImg = async(req, res)=>{
    res.status(200).send({data:'uploaded'})
}
module.exports = { register, login, logOut, me, addPImg}