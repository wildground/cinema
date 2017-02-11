var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Seat = mongoose.model('Seat'),
  OrderDetail=mongoose.model('OrderDetail');
module.exports = function (app) {
  app.use('/', router);
};

//初始化场次数据
router.post('/initalData',function (req,res) {
  Seat.remove().then(d=>{
    let inserts=[];
    for(let i=0;i<400;i++)
    {
      let save=i=>{
        let seat=new Seat();
        seat.name=i;
        seat.isReserved=false;
        return seat.save();
      };
      inserts.push(save(i));
    }
    Promise.all(inserts).then(d=>res.json(getOutput("done"))).catch(err=>res.json(getError(err)));
  });
});

router.get('/', function (req, res, next) {
  Seat.find(function (err, seats) {
    if (err) return next(err);
    seats
    res.render('index', {
      title: 'oneline booking',
      seats: seats
    });
  });
});

router.post("/reserve",function (req,res) {
  if(!req.body.username||!req.body.ids)
    res.json(getError({message:"invalid param"}));
   let promises= req.body.ids.map(id=>{
    let order=new OrderDetail();
    order.username=req.body.username;
    order.seatid=id;
    return order.save().then(d=>
      Seat.findOneAndUpdate({_id:order.seatid},{isReserved:true}).exec()
    );
  });
  Promise.all(promises).then(d=>{
    req.app.get("io").sockets.emit("reserve",{ids:req.body.ids});
    res.json(getOutput(true));
  }).catch(err=>{
    if(err.code&&err.code==11000)
    {
      let removes=req.body.ids.map(id=>
        OrderDetail.findOneAndRemove({username:req.body.username,seatid:id}).exec()
      );
      Promise.all(removes).then(d=> res.json(getError({message:"座位已经被锁定，请重新选择"}))).catch(err=>console.error(err));
      return;
    }
    res.json(getError(err));
  });

});


function getOutput(data) {
  return {
    code:200,
    message:null,
    data:data
  };
}

function getError(err) {
  return {
    code:500,
    message:err.message,
    data:null
  };
}
