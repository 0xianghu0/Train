var arr = [];//用于保存弹幕数据的数组；
    var start = true;//用于判断是否需要开启弹幕
    $(document).ready(function(){
        var showscreen = $("#container");//弹幕墙的div
        var showHeight = showscreen.height();//弹幕墙div的高度
        var showWidth = showscreen.width();//弹幕墙div的宽度
        //点击发射按钮事件
        $("#sent").click(function(){
            var text = $("#message").val();//获取用户输入的待发送弹幕
            $("#message").val("");//清空弹幕发送区
            arr.push(text);//将数据存入实现定义好的用于保存弹幕数据的数组
            var send_div=$("<div>"+text+"</div>");
            showscreen.append(send_div);
            // var send_text=$("<div>+text+</div>");//新建div弹幕条
            // var send_div = document.createElement("div");
            // var inner = document.createTextNode(text);
            // send_div.appendChild(inner);
            // document.getElementById("container").appendChild(send_div)//把弹幕挂在墙上
            move_text(send_div);
        })
        //按回车发送
         $("input").keydown(function(event){
             if(event.keyCode == 13){
                  $("#sent").trigger("click");//trigger触发被选元素的指定事件类型，触发#send事件的click类型
             }
         })

         if(start==false){
             start = true;
             $("#clear").html("关闭弹幕");
             run();
         }
         //关闭/开启弹幕按钮点击事件
        $("#clear").click(function(){
            if(start == true){
                start = false;
                $("#clear").html("开启弹幕");
                showscreen.empty();
            }else if(start == false){
                start = true;
                $("#clear").html("关闭弹幕");
                run()
            }
        });
         var topMin = showscreen.offset().top;
         var topMax = topMin+showHeight;
         var top = topMin;
         var move_text = function(obj){
             obj.css({
                 display:"inline",
                 position:"absolute"
             })
             var begin = showscreen.width() - obj.width();  //一开始的起点
             top+=50;

             if(top > topMax-50){
                 top = topMin;
             }
             //console.log("showscreenWidth"+showscreen.width());
             //console.log("objWidth",obj.width());

             obj.css({
                 left:begin,
                 top:top,
                 color:getRandomColor()
             });

             var time = 20000 + 10000*Math.random();
             obj.animate({
                 left:"-"+begin+"px"
             },time,function(){
                 obj.remove();
             });
         };
        var getRandomColor = function(){
            return '#'+('00000'+(Math.random()*0xffffff <<0).toString(16)).substr(-6);
        }

        var run = function(){
            if(start == true){
                if(arr.length > 0){
                    var n = Math.floor(Math.random()* arr.length + 1)-1;
                    var textObj = $("<div>"+arr[n]+"</div>");
                    showscreen.append(textObj);
                    //console.log("loop:"+textObj.html());
                    move_text(textObj);
                }
            }
            setTimeout(run,3000);
        }

        jQuery.fx.interval = 50;
        run();
})
