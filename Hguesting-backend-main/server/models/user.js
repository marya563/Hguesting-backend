import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String,
  },
  password: { type: String,
   },
  profilePic: {type: String},
role: {type:String,default:"client"},
});

export default mongoose.model("User", userSchema);