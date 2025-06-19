import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";//bearer token used to make token
import bcrypt from "bcrypt"; 


// A JWT token has 3 parts, separated by dots (.):

// Copy code
// xxxxx.yyyyy.zzzzz
// 1️⃣ Header (Base64-encoded JSON)

// 2️⃣ Payload (Base64-encoded JSON)

// 3️⃣ Signature (For verifying integrity)


const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true,

        },
        coverImage:{
            type:String // cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
            
        ],
        password:{
            type:String,
            required:[true,'Password is required']

        },
        refreshToken:{
            type:String
        }


    },
    {
        timestamps:true
    }
)

//method to encrypt the pass using hooks
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password=bcrypt.hash(this.password,10)
    next()
})

//custom methods using hooks
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema)
