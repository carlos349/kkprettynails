const mongoose = require('mongoose');
const { Schema } = mongoose;

const closedDatesSchema = new Schema ({
    services: {
        type: Array
    },
    client: {
        type:String
    },
    employe: {
        type: String
    },
    design: {
        type: Number
    },
    comision: {
        type: Number
    },
    totalLocal: {
        type:Number
    },
    total: {
        type: Number
    },
    descuento: {
        type: Number
    },
    date: {
        type: Date,
            default: Date.now
    }
})

module.exports = closedDates = mongoose.model('endingdates', closedDatesSchema)