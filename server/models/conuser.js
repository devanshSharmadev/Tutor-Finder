var mongoose = require('mongoose');

const conuserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    ContactNumber: { type: Number, required: true },

    connectId:{type: Number, required: true},
  
    id: { type: String },
  });

  module.exports=mongoose.model("ConUser", conuserSchema);