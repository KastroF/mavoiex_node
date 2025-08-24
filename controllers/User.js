const User = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signUp = async (req, res) => {
  
  
    try{
      
      console.log(req.body); 
      
      const useer = await User.findOne({email: req.body.email});
      
      if(useer){
        
        if(req.body.type === "google"){
          
           res.status(201).json({status: 0, user: useer, token: jwt.sign(
            { userId: useer._id },
             process.env.CODETOKEN
          )}); 
      
            
        }else{
            
          res.status(200).json({status: 1, message: "Adresse Email déjà utilisée"});
          
        }
        
        
        
      }else{
        
      

        
        let newUser; 
        
        if(req.body.type === "google"){
          
           newUser = new User({
            name: req.body.name, 
            email: req.body.email, 
        
      })
            
        }else{
          
          const hash = await bcrypt.hash(req.body.password, 10);
            
           newUser = new User({
            name: req.body.name, 
            email: req.body.email, 
            password: hash
      })
        }
      

      
      newUser.save().then(async (userr) => {
        
            const user = await User.findOne({_id: userr._id}); 
        
              
        
            res.status(201).json({status: 0, user, token: jwt.sign(
            { userId: user._id },
            process.env.CODETOKEN
          )}); 
      
      }, (err) => {
          
         console.log(err); 
         res.status(505).json({err})
          
      })
      
      
    }
      
      /*  
      
              token: jwt.sign(
            { userId: user._id },
            "JxqKuulLNPCNfytiyqtsygygfRJYTjgkbhilaebAqetflqRfhhouhpb"
          ),
      
      */
    
      
    }catch(err){
      
        console.log(err); 
        res.status(505).json({err})
    }
}


exports.signIn = async (req, res) =>     {
  
      console.log(req.body); 
    
  
  
    try{
      
        const user = await User.findOne({email: req.body.email}); 
      
        if(user){
          
          if(req.body.type === "google"){
            
              res.status(201).json({status: 0, user, token: jwt.sign(
                { userId: user._id },
                process.env.CODETOKEN
              )});   
              
          }else{
            
              const compare = await bcrypt.compare(user.password, req.body.password); 
              
              if(!compare){
                
                  res.status(200).json({status: 1, message: "Mot de passe incorrect"})
              
              }else{
                
                res.status(201).json({status: 0, user, token: jwt.sign(
                { userId: user._id },
                process.env.CODETOKEN
              )});  
                  
              }
          }
          
        }else{
          
            if(req.body.type === "google"){
              
              let  newUser = new User({
                      name: req.body.name, 
                      email: req.body.email, 

                })
              
              
                    newUser.save().then(async (userr) => {
        
            const user = await User.findOne({_id: userr._id}); 
        
              
        
              res.status(201).json({status: 0, user, token: jwt.sign(
                    { userId: user._id },
                    process.env.CODETOKEN
                  )}); 

              }, (err) => {

                 console.log(err); 
                 res.status(505).json({err})

              })

                
            }else{
              
               res.status(200).json({status: 1, message: "Utilisateur introuvable"})
              
            }
          
           
        }
      
    }catch(err){
      
        console.log(err); 
        res.status(505).json({err})
    }
    
}


// Exemple avec Express.js
exports.addFcmToken =  async (req, res) => {
  
  const userId = req.auth.userId;
  const { token, deviceId } = req.body;

  const user = await User.findById(userId);

  console.log(req.body)
  // Supprimer les doublons pour ce device
  user.fcmTokens = user.fcmTokens ? user.fcmTokens : [];
  user.fcmTokens = user.fcmTokens.filter(t => t.deviceId !== deviceId);

  // Ajouter le nouveau token
  user.fcmTokens.push({ token, deviceId });
  
  console.log(user);

  await user.save();

  res.status(201).json({ success: true, status: 0 });
}


exports.removeFcmToken = async (req, res) => {
  
  
  const userId = req.auth.userId;
  const { deviceId } = req.body;
  
  console.log(deviceId);

  await User.findByIdAndUpdate(userId, {
    $pull: { fcmTokens: { deviceId } },
  });

  res.status(201).json({ success: true });
};
