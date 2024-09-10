import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import Razorpay from 'razorpay';


dotenv.config({
    path: './env'
});

export const payment = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`App is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`App connection failed !! ${error}`);
})