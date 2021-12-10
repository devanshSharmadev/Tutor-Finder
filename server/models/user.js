
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  
  accounttype: { type: String, required: true },

  ProfileDP: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },

  Pin: [String],

  educationStatus: { type: String},
  AboutYou: { type: String },

  Educated: { type: String },
  TeachesUpto: { type: String },
  TeachingExperience: { type: String},

  TutoringTitle: { type: String},
  TutoringExperience: { type: String},

  likes : {type:[Object],default:[]},

  Totallikes:{type:Number,default:0},

  AverageLikes:{type:Number,default:0},

  comments: { type: [String], default: [] },

  connectId:{type: Number, required: true},

  //lastdate:Date,

  lastupdate:Date,
  
  payment:{type:Boolean,default:false},

  id: { type: String },
  
});

module.exports=mongoose.model("User", userSchema);
