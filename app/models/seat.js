// 影院座位
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SeatSchema = new Schema({
  id: Schema.Types.ObjectId,
  name:String
});

mongoose.model('Seat', SeatSchema);

