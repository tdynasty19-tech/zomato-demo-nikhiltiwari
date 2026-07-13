const razorpay = require("../Config/razorpay");


const CreatePayment = async(req,res)=>{

    try{

        const {amount} = req.body;


        const options={

            amount: amount * 100, 
            currency:"INR",

            receipt:"bitebox_order_"+Date.now()

        };


        const order = await razorpay.orders.create(options);


        res.status(200).json({

            success:true,

            order

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports={
    CreatePayment
}