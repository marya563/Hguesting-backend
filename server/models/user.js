import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: { type: String, required:  true },
  lastname: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type:String,required:true,default:"user"},
});

export default mongoose.model("User", userSchema);