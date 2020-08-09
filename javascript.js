dictionary = {
    "band": {
        "ro": "Roselia",
        "ppp": "Poppin'Party",
        "pp": "Pastel*Palettes",
        "ag": "Afterglow",
        "hhw": "Hello, Happy World",
        "ras": "RAISE A SUILEN",
        "mo": "Morfonica",
        "rimi": "牛込りみ",
        "saaya": "山吹沙綾",
        "arisa": "市ヶ谷有咲",
        "otae": "花園たえ",
        "ayaxmocaxlisaxkanonxtsugu": "彩×モカ×リサ×花音×つぐみ",
        "pppxykn": "Poppin'Party×友希那",
        "ksmxranxayaxyknxkkr": "香澄×蘭×彩×友希那×こころ",
        "hhwxranxaya": "ハロハピ×蘭×彩",
        "roxran": "Roselia×蘭",
        "agxkkr": "Afterglow×こころ",
        "pppxgg": "Poppin‘Party × Glitter*Green",
		"ksmxag": "香澄×Afterglow",
		"pppxayaxkkr": "Poppin'Party×彩×こころ"
    },
    "level": {
        "ex": "EXPERT",
        "sp": "SPECIAL",
        "full": "FULL"
    },
	"type": {
        "og": "原创",
        "co": "翻唱"
    }
}

filterData = { 
	band:  ["ppp", "ro", "pp", "hhw", "ag", "ras", "mo", "other"],
	diff:  ["26"],
	level: ["ex", "sp", "full"],
	type:  ["og", "co"],
}
finalData = {
	band:  "",
	diff:  "",
	level: "",
	type:  "",
	mode:  "random",
	data: "",
	time: 0
}

$(function () { 
  $("[data-toggle='popover']").popover();
});

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}	
};

var filOption = new Vue({
  el: '#filter-options',
  data: {
    diffFil: [
		{"diffId": "in24", "diffNum": "24"},
		{"diffId": "in25", "diffNum": "25"},
		{"diffId": "in26", "diffNum": "26", "diffDef": "checked"},
		{"diffId": "in27", "diffNum": "27"},
		{"diffId": "in28", "diffNum": "28"},
		{"diffId": "in29", "diffNum": "29"}

	],
	levelFil: [
		{"lvId": "slex",   "lvName": "EXPERT"  , "lvShortName": "ex"},
		{"lvId": "slsp",   "lvName": "SPECIAL" , "lvShortName": "sp"},
		{"lvId": "slfull", "lvName": "FULL"    , "lvShortName": "full"}
	],
	bandFil: [
		{"bandId": "ppp",   "bandName": "Poppin'Party"},
		{"bandId": "ro",   "bandName": "Roselia"},
		{"bandId": "ag",   "bandName": "Afterglow"},
		{"bandId": "pp", "bandName": "Pastel＊Palettes"},
		{"bandId": "hhw", "bandName": "Hello, Happy World!"},
		{"bandId": "mo", "bandName": "Morfonica"},
		{"bandId": "ras", "bandName": "RAISE A SUILEN"},
		{"bandId": "other", "bandName": "Others"}
	],
	typeFil: [
		{"typeId": "og",   "typeName": "原创"},
		{"typeId": "co",   "typeName": "翻唱"}
	]
    },
	methods: {
		filterDiff: function(event, data){
			var el = event.currentTarget;
			if(el.checked){
				filterData.diff.push(data.toString());
			}else{
				filterData.diff.remove(data.toString());
			}
		},
		filterLevel: function(event, data){
			var el = event.currentTarget;
			if(el.checked){
				filterData.level.push(data.toString());
			}else{
				filterData.level.remove(data.toString());
			}
		},
		filterBand: function(event, data){
			var el = event.currentTarget;
			if(el.checked){
				filterData.band.push(data.toString());
			}else{
				filterData.band.remove(data.toString());
			}
		},
		filterType: function(event, data){
			var el = event.currentTarget;
			if(el.checked){
				filterData.type.push(data.toString());
			}else{
				filterData.type.remove(data.toString());
			}
		}
    }
})

var randomApp = new Vue({
	el: '#random',
	data: {
		seen: false
	}
})

var resultApp = new Vue({
	el: '#result',
	data: {
		seen: false,
		songName: "SONG",
		bandName: "BAND",
		level: "EXPERT",
		diffNum: "00",
		typeName: "原创"
	}
})



var btnRandom = new Vue({	
	el: '#btnRandomBar',
	methods: {
		randomSong: function (){
			randomApp.seen = true;
			finalData.band = "";
			finalData.diff = "";
			finalData.level = "";
			finalData.type = "";
			finalData.data = "";
			var timeStamp = new Date().getTime();
			if(filterData.band.length == 0){
				toastr.warning("未选中乐队条件，恢复默认");
				$("#filBand").find("input").trigger("click");
			}
			
			if(filterData.diff.length == 0){
				toastr.warning("未选中难度条件，恢复默认");
				$("input#in26").trigger("click");
			}
			
			if(filterData.level.length == 0){
				toastr.warning("未选中等级条件，恢复默认");
				$("#filLevel").find("input").trigger("click");
			}
			
			if(filterData.type.length == 0){
				toastr.warning("未选中类型条件，恢复默认");
				$("#filType").find("input").trigger("click");
			}
			
			filterData.band.forEach(function(bandName){
				finalData.band += bandName + ",";
			});
			finalData.band = finalData.band.substring(0, finalData.band.lastIndexOf(','));
			
			filterData.diff.forEach(function(diffName){
				finalData.diff += diffName + ",";
			});
			finalData.diff = finalData.diff.substring(0, finalData.diff.lastIndexOf(','));
			
			filterData.level.forEach(function(levelName){
				finalData.level += levelName + ",";
			});
			finalData.level = finalData.level.substring(0, finalData.level.lastIndexOf(','));
			
			filterData.type.forEach(function(typeName){
				finalData.type += typeName + ",";
			});
			finalData.type = finalData.type.substring(0, finalData.type.lastIndexOf(','));
			finalData.time = timeStamp;
			
			if($('input#useComp').prop('checked')){
				finalData.data = "comp";
			}
			
			$.get("//api.mocabot.xyz/api", finalData)
			.done(function(res){
				randomApp.seen = false;
				if(res.msg == "error"){
					toastr.error("筛选条件有误！");
					return;
				}
				resultApp.songName = res.result[0].name;
				resultApp.bandName = dictionary.band[res.result[0].band];
				resultApp.level = dictionary.level[res.result[0].level];
				lvColorClass = "diff-" + res.result[0].level;
				$('#diffBorder').removeClass("diff-ex").removeClass("diff-sp").removeClass("diff-full");
				$('#diffBorder').addClass(lvColorClass)
				resultApp.diffNum = res.result[0].diff;
				resultApp.typeName = dictionary.type[res.result[0].type];
				resultApp.seen = true;
				window.location.href= "#result";
			});
		}
	}
	
})