var dataList,controlIndex,timer,len,root=window.player,audio=root.audioManager;function getData(t){$.ajax({url:t,post:"GET",success:function(t){len=(dataList=t).length,controlIndex=new root.controlIndex(len),bindEvent(),bindTouch(),$("body").trigger("playChange",0)},error:function(){}})}function bindEvent(){$("body").on("playChange",function(t,o){root.render(dataList[o]),root.renderList(dataList),audio.getAudio(dataList[o].audio),root.pro.renderAllTime(dataList[o].duration),$(".song-list").removeClass("active"),$(".song-list").eq(o).addClass("active"),"play"==audio.status&&(audio.play(),rotated(0)),$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ(0deg)",trnasition:"none"})}),$(".prev").on("click",function(){var t=controlIndex.prev();$("body").trigger("playChange",t),root.pro.start(0),"pause"==audio.status&&(audio.pause(),root.pro.stop())}),$(".next").on("click",function(){var t=controlIndex.next();$("body").trigger("playChange",t),root.pro.start(0),"pause"==audio.status&&(audio.pause(),root.pro.stop())}),$(".play").on("click",function(){"pause"==audio.status?(audio.play(),root.pro.start(),rotated($(".img-box").attr("data-deg"))):(audio.pause(),root.pro.stop(),clearInterval(timer)),$(".play").toggleClass("playing")}),$(".list").on("click",function(){$(".list-mask").show()}),$(".close-btn").on("click",function(){$(".list-mask").hide()}),$(".list-mask").on("click",function(){$(".list-mask").hide()}),$(".list-box ul").on("click",function(t){t.stopPropagation()}),$(".list-box ul").on("click",".song-list",function(){var t=+$(this).attr("data");$("body").trigger("playChange",t),root.pro.start(0),$(".list-mask").hide(),controlIndex=new root.controlIndex(len,t)})}function rotated(t){clearInterval(timer),t=+t,timer=setInterval(function(){t+=1,$(".img-box").attr("data-deg",t),$(".img-box").css({transform:"rotateZ("+t+"deg)",trnasition:"all 1s ease-out"})},200)}function bindTouch(){var n=$(".pro-wrap").offset().left,r=$(".pro-wrap").offset().width;$(".spot").on("touchstart",function(){root.pro.stop()}).on("touchmove",function(t){var o=(t.changedTouches[0].clientX-n)/r;0<o&&o<1&&root.pro.upDate(o)}).on("touchend",function(t){var o=(t.changedTouches[0].clientX-n)/r;if(0<o&&o<1){var a=o*dataList[controlIndex.index].duration;$(".play").addClass("playing"),audio.playTo(a),audio.play(),audio.status="play",root.pro.start(o)}})}getData("../mock/data.json");