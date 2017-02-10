// 影院场次座位
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SeatSchema = new Schema({
  id: Schema.Types.ObjectId,
  name:String,
  isReserved:Boolean
});

mongoose.model('Seat', SeatSchema);

