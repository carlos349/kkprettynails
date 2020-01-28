const mongoose = require('mongoose');
const { Schema } = mongoose; 


const cashFundSchema = new Schema({
    userRegister:{
        type:String
    },
    amount: {
        type: Number
    },
    quantity: {
        type: Number
    },
    validator: {
        type: Boolean
    }
})

module.exports = cashFund = mongoose.model('cashfund', cashFundSchema)