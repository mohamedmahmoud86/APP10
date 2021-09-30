const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email format')
        }
    }, 
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error( 'not egy number')
        }
    }, 
    age:{
        type:Number,
        validate(value){
            if(value<21) throw new Error(' not avaliable')
        }
    }, 
    image:{
        type:String,
        trim:true
    }, 
    status:{
        type:Boolean,
        default: false
    },
    tokens:[ { token: {type:String, required:true} } ]
}, 
{timestamps:true}
)

userSchema.virtual('myPosts',{
    ref:"Post",
    localField:"_id",
    foreignField:"userId"
})



//login
userSchema.statics.loginUser = async(email, name) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Invalid email')
    
    if(!isValidPass) throw new Error('invalid name')
    return user
}
const jwt = require('jsonwebtoken')
//generate token
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User', userSchema)

module.exports = User