var filterDiff = {
    diff: ['26']
}
var filterType = {
    type: ['ex']
}
var filterBand = {
    band: ['ppp','ro','ag','hhw','pp','mo','ras']
}
var $resultDiv = $("#result");
var strHtml = "选歌结果：<br>";
var maxSong = 276;
var room_id;
var room_created = 0;
var firstLoad = true;
var firstLoadComp = true;
var timeStamp;
$(document).ready(function (){
	//var reloadDataFileName = "song_list.json?" + new Date().getTime();
	//$.getJSON(reloadDataFileName,function(data){})
	//var reloadDataFileName = "song_list_comp.json?" + new Date().getTime();
	//$.getJSON(reloadDataFileName,function(data){})
})


//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}


Array.prototype.remove = function(val) {
var index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};


function filterData(data, filter){
    return data.filter(item => {
        var isIn = true
        for(var key in filter) {
            if(filter[key].indexOf(item[key]) < 0){
                isIn = false
                break
            }
        }
        return isIn
    })
}

function checkIfNull(data){
  if(!$("#in24").prop("checked") && !$("#in25").prop("checked") && !$("#in26").prop("checked") && !$("#in27").prop("checked") && !$("#in28").prop("checked")){
    toastr.error("请至少选择一个难度");
    $("#in24").prop("checked",true);
    filterDiff.diff.push('24');
  }
  if(!$("#slex").prop("checked") && !$("#slsp").prop("checked") && !$("#slfull").prop("checked")){
    toastr.error("请至少选择一个种类");
    $("#slex").prop("checked",true);
    filterType.type.push('ex');
  }
  if(!$("#slppp").prop("checked") && !$("#slro").prop("checked") && !$("#slag").prop("checked")&& !$("#slpp").prop("checked")&& !$("#slhhw").prop("checked")&& !$("#slmo").prop("checked")&& !$("#slras").prop("checked")){
    toastr.error("请至少选择一个乐队");
    $("#slppp").prop("checked",true);
    filterBand.band.push('ppp');
  }
  //console.log(data);
 if(data.length == 0){
  toastr.error("该条件下无歌曲可供选择！");
  strHtml = "";
  
}
}

function conBandName(shortname){
  if(shortname == "ro")return "Roselia";
  if(shortname == "ppp")return "Poppin' Party";
  if(shortname == "pp")return "Pastel＊Palettes";
  if(shortname == "ag")return "Afterglow";
  if(shortname == "hhw")return "Hello, Happy World!";
  if(shortname == "ras")return "RAISE A SUILEN";
  if(shortname == "gg")return "Glitter*Green";
  if(shortname == "rimi")return "牛込りみ";
  if(shortname == "saaya")return "山吹沙綾";
  if(shortname == "arisa")return "市ヶ谷有咲";
  if(shortname == "otae")return "花園たえ";
  if(shortname == "gbpsp")return "GBP！スペシャルバンド";
  if(shortname == "ayaxmocaxlisaxkanonxtsugu")return "彩×モカ×リサ×花音×つぐみ";
  if(shortname == "pppxykn")return "Poppin'Party×友希那";
  if(shortname == "ksmxranxayaxyknxkkr")return "香澄×蘭×彩×友希那×こころ";
  if(shortname == "hhwxranxaya")return "ハロハピ×蘭×彩";
  if(shortname == "roxran")return "Roselia×蘭";
  if(shortname == "agxkkr")return "Afterglow×こころ";
  if(shortname == "pppxgg")return "Poppin' Party × Glitter*Green";
  if(shortname == "mo")return "Morfonica";
}
function conType(shortname){
  if(shortname == "ex")return "EXPERT";
  if(shortname == "sp")return "SPECIAL";
  if(shortname == "full")return "FULL";
}

$(function(){$("#in24").click(function(){ if(!$("#in24").prop("checked")){filterDiff.diff.remove('24');}else{filterDiff.diff.push('24')};})})
$(function(){$("#in25").click(function(){ if(!$("#in25").prop("checked")){filterDiff.diff.remove('25');}else{filterDiff.diff.push('25')};})})
$(function(){$("#in26").click(function(){ if(!$("#in26").prop("checked")){filterDiff.diff.remove('26');}else{filterDiff.diff.push('26')};})})
$(function(){$("#in27").click(function(){ if(!$("#in27").prop("checked")){filterDiff.diff.remove('27');}else{filterDiff.diff.push('27')};})})
$(function(){$("#in28").click(function(){ if(!$("#in28").prop("checked")){filterDiff.diff.remove('28');}else{filterDiff.diff.push('28')};})})

$(function(){$("#slex").click(function(){ if(!$("#slex").prop("checked")){filterType.type.remove('ex');}else{filterType.type.push('ex')};})})
$(function(){$("#slsp").click(function(){ if(!$("#slsp").prop("checked")){filterType.type.remove('sp');}else{filterType.type.push('sp')};})})
$(function(){$("#slfull").click(function(){ if(!$("#slfull").prop("checked")){filterType.type.remove('full');}else{filterType.type.push('full')};})})
	

$(function(){$("#slppp").click(function(){ if(!$("#slppp").prop("checked")){filterBand.band.remove('ppp');}else{filterBand.band.push('ppp')};})})
$(function(){$("#slro").click(function(){ if(!$("#slro").prop("checked")){filterBand.band.remove('ro');}else{filterBand.band.push('ro')};})})
$(function(){$("#slag").click(function(){ if(!$("#slag").prop("checked")){filterBand.band.remove('ag');}else{filterBand.band.push('ag')};})})
$(function(){$("#slpp").click(function(){ if(!$("#slpp").prop("checked")){filterBand.band.remove('pp');}else{filterBand.band.push('pp')};})})
$(function(){$("#slhhw").click(function(){ if(!$("#slhhw").prop("checked")){filterBand.band.remove('hhw');}else{filterBand.band.push('hhw')};})})
$(function(){$("#slmo").click(function(){ if(!$("#slmo").prop("checked")){filterBand.band.remove('mo');}else{filterBand.band.push('mo')};})})
$(function(){$("#slras").click(function(){ if(!$("#slras").prop("checked")){filterBand.band.remove('ras');}else{filterBand.band.push('ras')};})})
	
	
	
	
	
	
        $(function(){
            $("#btnGetSong").click(function(){
              var dataFileName;
              if($("#rateOfficial").prop("checked")){
				  if(firstLoad){
					  dataFileName = "song_list.json?" + new Date().getTime();
					  fileWithtimeStamp = dataFileName;
					  firstLoad = false;
				  }else{
					  dataFileName = fileWithtimeStamp;
				  }
			  }
			  if($("#rateUnofficial").prop("checked")){
				  if(firstLoadComp){
					  dataFileName = "song_list_comp.json?" + new Date().getTime();
					  fileWithtimeStamp = dataFileName;
					  firstLoadComp = false;
				  }else{
					  dataFileName = fileWithtimeStamp;
				  }
			  }

              $("#getSong").attr("disabled","true");
              $("#random").removeClass("hidden");
                $.getJSON(dataFileName,function(data){
                    $resultDiv.empty();//清空内容 

                    var newTempData = filterData(data, filterDiff);
                    var newData = filterData(newTempData, filterType);
					var newNewData = filterData(newData, filterBand);
                    checkIfNull(newNewData); 

                    while(strHtml == "选歌结果：<br>"){
                      randomID = randomNum(1,maxSong);
                    $.each(newNewData,function(infoIndex,info){
                        if(info["id"] == randomID){
                          strHtml += "<h2>" + info["name"] + " ";
                          var bandNameFull = conBandName(info["band"]);
                          strHtml += "<small>"+ bandNameFull +"</small></h2><br>";
                          var typeFull = conType(info["type"]);
                          if(typeFull == "EXPERT")strHtml += "<h3>等级："+ typeFull + " <small class='diff-ex'>" + info["diff"] + "</small></h3><br>";
                          if(typeFull == "SPECIAL")strHtml += "<h3>等级："+ typeFull + " <small class='diff-sp'>" + info["diff"] + "</small></h3><br>";
                          if(typeFull == "FULL")strHtml += "<h3>等级："+ typeFull + " <small class='diff-full'>" + info["diff"] + "</small></h3><br>";
                        }
                    })
                  }
                    $resultDiv.html(strHtml);//显示处理后的数据
			if(room_id > 99999 && room_id < 1000000){
            var xhr=null;
            try{
            xhr=new XMLHttpRequest();
            }catch(e){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.open("post","https://bang-dream.tech/room/write.php",true);
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            xhr.send("room_id="+room_id+"&write_content="+strHtml);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                    }else{
                    console.log("错误"+xhr.status);
                    }
                }
            }
			}
                    strHtml = "选歌结果：<br>";
                    $("#random").addClass("hidden");
                    $("#getSong").removeAttr("disabled");
                })
            })
        })
		
     $(function(){
        $("#btnJoinRoom").click(function(){		
			window.open("./room.html");
		})
	 });
		
$(function(){
	$('#createRoomBtn').click(function(){
		room_id = document.getElementById("roomID").value;
		if(room_id > 99999 && room_id < 1000000){
			var xhr=null;
            try{
            xhr=new XMLHttpRequest();
            }catch(e){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.open("post","https://bang-dream.tech/room/new_room.php",true);
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            xhr.send("room_id="+room_id);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
						toastr.success("创建成功:" + room_id);
						document.getElementById("toolbarroomid").innerHTML = "房间号：" + room_id;
						//toastr.warning("请勿关闭网页，关闭后房间自动删除");
						room_created = 1;
						document.getElementById("btnCreateRoom").disabled=true;
                    }else{
						toastr.error("failed:" + room_id);
                    }
                }
            }
			
		}else{
			toastr.error("error");
		}
	})
});
$(function () { 
  $("[data-toggle='popover']").popover();
});

$(function(){
	$('#randomID').click(function(){
		var rID = Math.round((new Date()).valueOf()).toString();
		rID = rID.substr(rID.length-6);
		document.getElementById("roomID").value = rID ;
	})
});
function removeRoom(){
	var xhr=null;
    try{
    xhr=new XMLHttpRequest();
    }catch(e){
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post","https://bang-dream.tech/room/del_room.php",true);
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send("room_id="+room_id);
}
