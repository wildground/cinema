/**
 * Created by ryan on 2017/2/9.
 */
$(function () {

  var socket = io();
     socket.on("reserve",function (data) {
       data.ids.forEach(function (id) {
         $("#"+id).addClass("reserve").attr("disabled",true);
       })
     });
  var currentSeat=[];
  $("#seats").click(function (event) {
    if( event.target.tagName.toLowerCase()=="button")
    {
      if(currentSeat.includes(event.target.id))
      {
        currentSeat= currentSeat.filter(function (element) {
          return element!=event.target.id;
        });
        $("#"+event.target.id).removeClass("selected");
      }
      else {
        currentSeat.push(event.target.id);
        $("#" + event.target.id).addClass("selected");
      }
        if(currentSeat.length==0)
          $('#btnConfirm').attr("disabled",true);
        else
          $('#btnConfirm').removeAttr("disabled");

    }});

  $("#btnConfirm").click(function (event) {
     event.preventDefault();
     var data=JSON.stringify({
       username:$('#username').val(),
       ids: currentSeat
     });
     $.ajax({
       url: '/reserve',
       type: 'post',
       contentType:"application/json",
       dataType: 'json',
       data: data
     }).done(function (data) {
        if(data.code==500)
          alert(data.message);
        else
       {
         currentSeat=[];
         alert("约定成功")
       }
     })
    }
  );
});
