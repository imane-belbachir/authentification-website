import express, { request, response } from 'express'
const router = express.Router();
import { User } from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import transporter from '../models/mailTransporter.js';
import nodemailer from 'nodemailer'
import { validateEmail } from '../models/mailTransporter.js';
router.post('/signup', async (Request, response) => {
    try {
        if (
            !Request.body.name ||
            !Request.body.email ||
            !Request.body.password
        ) {
            return response.status(400).send("please fill all the fields");
        }
        {
            const newUser = {
                name: Request.body.name,
                email: Request.body.email,
                password: Request.body.password
            }
            const user = await User.create(newUser);
            return response.status(201).send(user)
        }
    } catch (error) {
        if(error.name == "ValidationError" ){
            return response.status(400).send("email wrong");
        }
       if (error.code == 11000) {
          if(error.keyValue.email){
            return response.status(400).send("email already exist");
          }
          if(error.keyValue.name){
            return response.status(400).send("name already exist");
          }
        }
    }
})
router.post('/login', async(req,res) =>{
    const name = req.body.name;
    const password = req.body.password;
    try {
        if(!name || !password) {
            return res.status(400).send("please fill all the fields");
        }
        const user = await User.findOne({name:name});
        if(!user) {
            return res.status(400).send("user not found");
        }
        if(user.password != password){
            return res.status(400).send("password is incorrect");
        }
       return res.status(200).send(user);
    } catch (error) {
        
    }
})
router.post('/forgetpassword' , async (req, res) => {
    const email = req.body.email;
    if(!email){ return res.status(400).send('please fill all fields'); }
    try {
        if(!validateEmail(email)){return res.status(400).send('invalide email'); }
        const user = await User.findOne({email:email});
        if(!user){return res.status(400).send('user not found'); }
        const token = jwt.sign({name : user.name , password : user.password}, 'secretKey',{expiresIn: '1h'});
        const resetLink = `http://localhost:5173/resetpassword/${token}`;
        const mailOptions = {
            from: 'the80sgirl23@gmail.com',
            to : email,
            subject : 'reset password',
            html: `<h1>Click on the link below to reset your password </h1>
            <a href=${resetLink}> reset password</a>`
        }
        transporter.sendMail(mailOptions,(err , info) =>{
            if(err){
                console.log(err);
                return res.status(400).send('error sending mail'); }
                console.log(info.response);
            return res.status(200).send('mail sent');
        })
    } catch (error) {
        console.log(error); 
        return res.status(404).send('catch error');
    }
})
router.post('/resetpassword/:token', async(req, res) => {
    const { token } = req.params;
        const { password } = req.body;
    try {
       
        const decodedToken = jwt.verify(token, 'secretKey');
        const name = decodedToken.name;
        const response = await User.findOneAndUpdate({name:name}, {password:password} ,{new:true})
        
        if(!response){return res.status(400).send('user not found');}

        return res.status(200).send('password updated');
    } catch (error) {
        console.log(error); 
        return res.status(404).send('catch error');  
    }


})
/*router.post('/users', async(Req,res) =>{
    try {
        const users = await User.find({});
        if(!users) {console.log("error here")
            return;
        } 
        return response.status(200).json(users);

      } catch (error) {
          console.log(error.message);
          return response.status(500).send({message: error.message});  
      }
})*/
router.post('/users', async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        console.log("No users found");
        return res.status(404).json({ message: "Users not found" });
      }
      return res.status(200).json(users);  // Use res instead of response
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });  // Use res instead of response
    }
  });
  

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await Book.findById(id);
        return response.status(200).json(user);
    } catch (error) {
       console.log(error.message);
       return response.status(500).send({message: error.message});
    }
})

router.put('/:id', async (request, response) => {
    try {
       if(
        !request.body.name ||
        !request.body.email ||
        !request.body.password
       ){
        return response.status(400).json({message: 'Please fill in all fields'});
       } 
      const { id } = request.params;
      const user = await User.findByIdAndUpdate(id, request.body, {new: true});
      if(!user){
        return response.status(404).json({message: 'User not found'});
      }
      return response.status(200).send({message: 'User updated successfully'});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});  
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return response.status(404).json({message: 'user not found'});
          }
          return response.status(200).send({message: 'user deleted successfully'});
          
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});   
    }
})
export default router