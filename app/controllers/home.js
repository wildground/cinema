
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Seat = mongoose.model('Seat'),
  OrderDetail=mongoose.model('OrderDetail');
var app;
module.exports = function (app) {
  app.use('/', router);
};

router.post('/initalData',function (req,res) {
  Seat.remove().then(d=>{
    let inserts=[];
    for(let i=0;i<400;i++)
    {
      let save=i=>{
        let seat=new Seat();
        seat.name=i;
        return seat.save();
      };
      inserts.push(save(i));
    }
    Promise.all(inserts).then(d=>res.json(getOutput("done"))).catch(err=>res.json(getError(err)));
  });
});

router.get("/test",function (req,res,next) {
  let seat=new Seat();
  seat.username="username";
  req.app.get("io").sockets.emit("reserve",{id:"bbbbb"});
  seat.save().then(d=>res.json(getOutput(d))).catch(err=>getError(err));
});

router.get("/testupdate",function (req,res) {
  var query = { id: '589c17465fe09d038858a77d' };
  Seat.findById('589c17465fe09d038858a77d',(err,seat)=>{
    if(err)
      res.json(err);
    if(!seat.username)
    {
      seat.username="ryan";
      seat.save().then(d=>res.json(getOutput(d))).catch(err=>res.json( getError(err)));
    }

  });
  //Seat.findOneAndUpdate(query,{username:"ryan"}).exec().then(d=>res.json(getOutput(d))).catch(err=>getError(err));
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
  if(!req.body.username||!req.body.id)
    res.json(getError("invalid param"));

  let order=new OrderDetail();
  order.username=req.body.username;
  order.seatid=req.body.id;
  order.save(d=>{
    if(d&&d.code&&d.code==11000)
    {
      res.json(getError({message:"座位已经被锁定"}));
      return;
    }
    else
    req.app.get("io").sockets.emit("reserve",{id:req.body.id});
    res.json(getOutput(d));
  }).catch(err=>{
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
