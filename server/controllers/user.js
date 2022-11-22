import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import multer from "multer";
import UserModal from "../models/user.js";


const secret = process.env.secret;
const BASE_URL = process.env.BASE_URL;

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
    res.status(200).json("user deleted");
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

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.secret,
      {
        expiresIn: "1h",
      }
    );

   
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      role,
      password: hashedPassword,
      firstname: `${firstName}`,
      lastname: `${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
    console.log("esss")
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
/*
export const forgetPass = async (req, res) => {
*/
// image upload start here
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/images/users");
  },
  filename: async (req, file, callback) => {
    // const ext= file.mimetype.split('/')[1];
    console.log(req);
    const user = await UserModal.findById(req.body.username)
    user.hasImage=true
    user.save()
    callback(null, `${req.body.username}.jpg`);
  },
});
const uploadd = multer({
  storage: multerConfig,
});
export const uploadImage = uploadd.single("photo");

export const upload = (req, res) => {
  res.status(200).json({
    succes: "success",
  });
};

// image upload ends here

export const updateProfile= async (req,res)=>{
  const {userid}=req.body
  const user = await UserModal.findById(userid)
  const{firstname,lastname}=req.body
  user.firstname=firstname;
  user.lastname=lastname;
  user.save()
  return res.status(200).json(user)
}

export const updateUser = async (req, res) => {
  try{
    const user = await UserModal.findById(req.params.id)
        if(req.body.firstname)
        user.firstname =req.body.firstname
        if(req.body.lastname)
        user.lastname =req.body.lastname
      

      await user.save()
      res.json(user)

  }catch(err){
      res.send('Error '+ err)
  
}}
export const addUserr = async (req, res) => {
  try{
      const ite =  new UserModal({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
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

