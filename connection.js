

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title : {type: String, required: true},
    year : {type : Number, min:1000, max:3000, required: true},
    rating : {type : Number, default: 4,validate(value) {
      if (value < 0) throw new Error("Negative number aren't real.");
    },}
});

const movieModel = mongoose.model("movieModel", movieSchema);

module.exports = movieModel;



