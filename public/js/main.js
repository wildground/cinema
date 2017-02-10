/**
 * Created by ryan on 2017/2/9.
 */
$(function () {

  var socket = io();

     socket.on("reserve",function (data) {
       $("#"+data.id).css("background-color","red").attr("disabled",true);

     });
  var currentSeat="";
  $("body").click(function (event) {
    if( event.target.tagName.toLowerCase()=="button")
    {
      currentSeat=event.target.id;
      $('#confirm').modal('toggle');
    }
  });

  $("#btnConfirm").click(function () {
     $.ajax({},function (err,data) {

     })
    }
  );
});
