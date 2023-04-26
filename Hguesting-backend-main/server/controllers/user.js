import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import multer from "multer";
import user from "../models/user.js";
import UserModal from "../models/user.js";
import path from 'path';

const secret = process.env.secret;
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;
const GMAIL_USER = process.env.GMAIL_USER;

export const getUsers = async (req, res) => {
  try {   

    const users = await UserModal.find();    
    res.status(200).json(users);
} catch (error) {
 
    res.status(404).json({ message: error.message });
}}

export const deleteUser = async (req, res) => {
  try {   

     await UserModal.findByIdAndDelete(req.params.id);    
    res.status(200).json("user deleted");
} catch (error) {

    res.status(404).json({ message: error.message });
}
}

export const updateUserById = async (req, res) => {
  try {   

     await UserModal.findByIdAndUpdate(req.params.id,req.body)    
    res.status(200).json("user changed");
} catch (error) {

    res.status(404).json({ message: error.message });
}
}


/* export const activateAccount = async (req, res) => {
  const { licensekey, userid } = req.body;
  const license_key = await licensekeyModal.findOne({
    license_key: licensekey,
  });
  if (!license_key)
    return res.status(400).json({ message: "this license key is invalid" });
  if (!license_key.isActivated) {
    const user = await UserModal.findOne({ _id: userid });
    var today = new Date();
    today.setDate(today.getDate() + license_key.duration);
    user.active_until = today;
    user.role = license_key.type;
    user.save();
    license_key.isActivated = true;
    license_key.save();
    return res.status(200).json(user);
  } else {
    return res
      .status(400)
      .json({ message: "this license key is already used" });
  }
}; */

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "Email adress doesn't exist !" });
      
     
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password !" });

  /*  const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      {
        expiresIn: "1h",
      }
    ); */
    res.status(200).json({email: oldUser.email, id: oldUser._id});
    console.log(oldUser);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};


export const signup = async (req, res) => {
  const { email, password, firstname, lastname, role ,profilePic} = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      role,
      
      password: hashedPassword,
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      profilePic: `${profilePic}`,
    });

    
  /*  const token = jwt.sign({ email: result.email, id: result._id },secret, {
      expiresIn: "1h",
    });
*/
    res.status(201).json({ result /*, token*/ });
    console.log("esss")
  } catch (error) {
    res.status(500).json(error.message);

    console.log(error);
  }
};
/*
export const forgetPass = async (req, res) => {
*/


export const addUserr = async (req, res) => {
  try{
      const ite =  new UserModal({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        profilePic :`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  })

      await ite.save()
      res.json(ite)

  }catch(err){
      res.send('Error '+ err)
  
}}
export const getByIdUserrrr = async (req, res) => {
  try {   

    const ite = await UserModal.findById(req.params.id);    
    res.status(200).json(ite);
} catch (error) {
 
    res.status(404).json({ message: error.message });
}}


export const updateUser = async (req, res) => {
  try {
    const { firstname, email, lastname, password} = req.body;

    const updatedUser = await UserModal.findByIdAndUpdate(req.params.id, {
      firstname,
      lastname,
      email,
      password,
    });

    return res.status(201).json({
      status:"updated",
      msg: "L'utilisateur a été modifié avec succès",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
/*export const updateUserrById = async (req, res) => {
  try {
    let foundUser = await UserModal.findOne({ _id: req.params.id });


    let updatedUser = await UserModal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...updateImages,
          email: req.body.email ? req.body.email : foundUser.email,
         // profilePic: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
          firstname: req.body.firstname ? req.body.firstname : foundUser.firstname,
          lastname: req.body.lastname ? req.body.lastname : foundUser.lastname,
          password: req.body.password ? req.body.password : foundUser.password,
          //role: req.body.role ? req.body.role : foundUser.role,
        
        },
      },
      { new: true, upsert: true },
    );

    res.status(200).send(
      updatedUser
    );
  } catch (error) {
    res.status(500).json({
      message: "ghalta",
    });
  }
};

*/
export const uploadImage = async (req, res) => {
  const { userId } = req.params;

  if (req.file && req.file.path) {
    const fileUrl = path.basename(req.file.path);
    console.log("image path",fileUrl)
    const updatedUser = await UserModal.findByIdAndUpdate(userId, {
      profilePic: fileUrl
    });

    return res.json({
      status: "ok",
      success: true,
      url: fileUrl,
      user: updatedUser
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "File not found"
    });
  }
};

export const getImage = async (req, res) => {
  const {imageName } = req.params;
  res.sendFile(`/Users/macmini9/Documents/maria:fedi:backend/Hguesting-backend-main/server/uploads/${imageName}`);
};



export const forgotPassword = async (req, res) => {
  const user = await UserModal.findOne({email: req.body.email})

  if (user) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      const token = generateResetToken(randomNumber);

      const success = await sendEmail({
          from: process.env.GMAIL_USER,
          to: req.body.email,
          subject: "Password reset - Code : " ,
          html:
              "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : #f822c6'>" +
              randomNumber +
              "</b></p>",
      }).catch((error) => {
          console.log(error)
          return res.status(500).send({
              message: "Error : email could not be sent"
          })
      });

      if (success) {
          console.log(token)
          return res.status(200).send({
              message: "Reset email has been sent to : " + user.email+"with code" +randomNumber,
              token: token
          })
      } else {
          return res.status(500).send({
              message: "Email could not be sent"
          })
      }
  } else {
      return res.status(404).send({message: "User does not exist"});
  }
};

export const verifyResetCode = async (req, res) => {
  const {resetCode, token} = req.body;

  try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.resetCode !== resetCode) {
          return res.status(200).send({message: "Success"});
      } else {
          return res.status(403).send({message: "Invalid reset code"});
      }
  } catch (error) {
      return res.status(500).send({error});
  }
}

export const resetPassword = async (req, res) => {
  const {
      email,
      password,
  } = req.body;

  try {
      await UserModal.findOneAndUpdate({email},
          {
              $set: {
                  password: await bcrypt.hash(password, 10),
              },
          }
      )
      res.status(200).send({message: "Success"});
  } catch (error) {
      res.status(500).send({error});
  }
}

function generateResetToken(resetCode) {
  return jwt.sign(
      {resetCode},
      process.env.JWT_SECRET, {
          expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
      }, {}
  )
}

async function sendEmail(mailOptions) {
  let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
      },
  });

  await transporter.verify(function (error) {
      if (error) {
          console.log(error);
          console.log("Server not ready");
      } else {
          console.log("Server is ready to take our messages");
      }
  })

  await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
          return false;
      } else {
          console.log("Email sent: " + info.response);
          return true;
      }
  });

  return true
}