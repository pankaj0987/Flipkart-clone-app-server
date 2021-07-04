const User= require("../model/userSchema")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.login = async (req,res)=>{
    const {email,password}=req.body;

    try {
        const userExist=await User.findOne({email})
        if(userExist.role==="user"){
    
            if(await bcrypt.compare(password,userExist.password)){
                const {_id,firstName,role,lastName,email,phone}=userExist;
                const token=jwt.sign({_id:_id,role},process.env.JWTSECRET,{expiresIn:"1 day"})
                res.status(201).json({
                    token:token,
                    user:{_id,firstName,lastName,email,phone}
                })

            }else{

                res.status(401).json({error:"ivalid cridentials"})
            }
           
        }else{

            res.status(401).json({error:"ivalid cridentials"})
        }
    } catch (error) {
        res.status(401).json({error:"ivalid cridentials"})
    }
}
exports.adminLogin = async (req,res)=>{
    
    const {email,password}=req.body;
    try {
        const userExist=await User.findOne({email})
        if(userExist){
            if(userExist.role==="admin"){

                if(await bcrypt.compare(password,userExist.password)){
                    const {_id,firstName,role,lastName,email,phone}=userExist;
                    const token=jwt.sign({_id:_id,role},process.env.JWTSECRET,{expiresIn:'24h'})
                    return res.status(201).json({
                        token:token,
                        user:{_id,firstName,lastName,email,phone}
                    })
    
                }
                return res.status(401).json({message:"ivalid cridentials"})
                
            }
            return res.status(401).json({message:"invalid credientials"})
    
           
        }
         return res.status(401).json({message:"ivalid cridentials"})
        
    } catch (error) {
     console.log(error)   
    }
}
exports.register=async (req,res)=>{

    const {firstName,lastName,email,phone,password}=req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(422).json({error:"please fill all the feild"});
    }
    
    try{
        const userExist=await User.findOne({email:email})
    
        if(userExist) return res.status(422).json({error:"email already exist"}); 
        
        const hash_password=await bcrypt.hash(password,10);
       
        if(req.body.role!==undefined){
            
            const role=req.body.role;
            const user=new User({firstName,lastName,email,role,phone,password:hash_password});
            const userregister=await user.save()
            if(userregister){
                return res.status(201).json({message:"User succesfully register"});
                    }
            else{
                return res.status(500).json({error:"failed to register"})
                }
        }else{
            const user=new User({firstName,lastName,email,password:hash_password});
            const userregister=await user.save()
            if(userregister){
            
                return res.status(201).json({message:"User succesfully register"});
                    }
            else{
               
                return res.status(500).json({error:"failed to register"})
                }
        }
        
    
        
            
    
    }
    catch(error){
        console.log(error)
    }

}

exports.updateUser=async (req,res)=>{
    try{
        const {user}=req.body;
        const updated=await User.findOneAndUpdate({_id:user._id},user,{new:true})
        if(updated){
            const finduser=await User.findOne({_id:user._id}).select('_id firstName lastName phone email')
            if(finduser){
                return res.status(201).json({user:finduser});
            }
            
        }
        return res.status(401).json({error:"Something went wrong"});
    }
    catch(error){
        return res.status(501).json({error:"Something went wrong"});
    }

}