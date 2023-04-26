import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
import userRouter from "./routes/user.js";
import HotelRouter from './routes/hotel.js'
import CarRouter from "./routes/Car.js"
import roomserviceRouter from "./routes/roomservice.js";
import RclientRouter from "./routes/Rclient.js"
import bodyParser from 'body-parser';
import {dirname} from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({  extended: true }))
app.use(express.static(path.join(__dirname, 'uploads')));
const CONNECTION_URL = process.env.CONNECTION_URL;
app.use('/Hotel', HotelRouter)
app.use("/roomservice", roomserviceRouter);
app.use("/user", userRouter);
app.use("/Car", CarRouter);
app.use("/Rclient", RclientRouter);
const PORT = process.env.PORT|| 3001;

app.get('/uploads/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `./uploads/${req.params.id}`));
});
app.get('/uploads2/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `./uploads2/${req.params.id}`));
});

/*app.post('/Rclient/getOrderId', (req, res) => {
 
 const options = {
  finalprice : req.body.finalprice,
  currency:"INR",
  payment_capture: "1"

 }
 
 });*/

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
}));


