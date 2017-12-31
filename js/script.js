$(document).ready(function () {
     'use strict';

   var clientID = "m46x2vr2wd9fzaoierocnmztlbhtsuo";
   var names = ["AkiraLaine", "brianamarie132", "brunofin", "comster404", "cretetion", "ESL_SC2","habathcx", "iseptimusi", "KrisVos130", "noobs2ninjas", "OgamingSC2", "RobotCaleb", "storbeck"];
   var nopersonlogo = "https://konikodes.com/fcc/img/noperson.png";
   var nologo = "https://konikodes.com/fcc/img/nologo.png";


   
   // FCC Status Check
    $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=m46x2vr2wd9fzaoierocnmztlbhtsuo?",
    headers: {"Client-ID": "m46x2vr2wd9fzaoierocnmztlbhtsuo"},
    dataType: "JSON",
    success: function(fccstat){

   if (fccstat.stream === null){
   $("#fccStatus").html("Free Code Camp is Currently Offline");
}   
  else{
   $("#fccStatus").html("Free Code Camp is Currently Online");
}  

var getData = function (user) {
    var getStatus = function () {
        //Main ajax function that request for streams/user.
        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + user
            , dataType: "json"
            , headers: {
                'Client-ID': 'm46x2vr2wd9fzaoierocnmztlbhtsuo'
            }
            //Check Account Closed
            , statusCode: {
                404: function (xhr)
                  {
    console.log(user + " has no account");             
         logo = 'https://konikodes.com/fcc/img/nologo.png';
	 $(".noaccount").prepend("<div class ='row'>" + "<div class='col-sm-4'>" +
    "<img src='" + nopersonlogo + "'>" + "</div>" + "<div class='col-sm-4'>" + user + "</div>" + "<div class='col-sm-4'>" + "Account Closed" + "</div></div>");
            }
            }
            //Users
            , success: function (data) {
                if (!data.stream) {
                    //if user offline this secondary Ajax function is used for channels/user.
                    $.ajax({
                        url: 'https://api.twitch.tv/kraken/channels/' + user
                        , dataType: "json"
                        , headers: {
                            'Client-ID': 'm46x2vr2wd9fzaoierocnmztlbhtsuo'
                        }
                      
                      //Check Account Closed
            , statusCode: {
                404: function (xhr) {
    console.log(user + " has no account");             
         logo = 'https://konikodes.com/fcc/img/nologo.png';
	 $(".noaccount").prepend("<div class ='row'>" + "<div class='col-sm-4'>" +
    "<img src='" + nopersonlogo + "'>" + "</div>" + "<div class='col-sm-4'>" + user + "</div>" + "<div class='col-sm-4'>" + "Account Closed" + "</div></div>");
            }
            }            
                        , success: function (data) {
                            //User Offline
                          var logo = data.logo;
						  // User Offline
						   if (logo === null){
                           logo = nologo;
}
    	$(".offline").prepend("<div class ='row'>" + "<div class='col-sm-4'>" + "<img src='" + logo + "'>"  +  "</div>" + "<div class='col-sm-4'>" + user + "</div>" + "<div class='col-sm-4'>" + "is currently Offline" + "</div></div>");     
},
 }); 
}
                //User OnLine
           else {
          if (data.stream) {
          var name = data.stream.channel.display_name;
          var logo = data.stream.channel.logo;
          var stream = data.stream.game;
          var status = data.stream.channel.status;
         $(".online").prepend("<div class ='row'>" + "<div class='col-sm-2'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-sm-3'>" + name + "</div>" + "<div class='col-sm-7'>" + status + "</div></div>");
}

                }
            }
        });
    } 
    getStatus();
}; // 

$(document).ready(function () {
var i = 0;
    for (i = 0; i < names.length; i++) {
                getData(names[i]);

    };
});
}
});

   // Show Buttons
   
$("#showOn").click(function(){
    $(".offline").hide();
	$(".noaccount").hide();
	$(".online").show();
})
$("#showOff").click(function(){
    $(".online").hide();
	$(".noaccount").hide();
	$(".offline").show();
})
$("#showAll").click(function(){
    $(".online").show();
	$(".offline").show();
	$(".noaccount").show();
});
});
