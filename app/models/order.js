/**
 * Created by ryan on 2017/2/10.
 */
// 订单明细
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrderDetailSchema = new Schema({
  id: Schema.Types.ObjectId,
  seatid:{type:String,unique:[true,'已经被预定']},
  username:{type:String, required:[true,"用户名称不能为空"]},
  booktime: {type: Date, default: Date.now }
});

mongoose.model('OrderDetail', OrderDetailSchema);
