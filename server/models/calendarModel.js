const mongoose = require('mongoose');


const calendarSchema = new mongoose.Schema({
    day: { type: Number, required: true, min: 1, max: 31 },
    checked: { type: Boolean, default: false },
    canceled : {type : Boolean , default : false },
    pending: { type: Boolean, default: false },
}, {
  timestamps: true
});
module.exports = calendarSchema



