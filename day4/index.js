var arr = [];
var start = true;

$(document).ready(function () {
    var showscreen = $("#container");
    var showHeight = showscreen.height();
    var showWidth = showscreen.width();

    $("#sent").click(function () {
        var text = $("#message").val();
        $("#message").val("");
        arr.push(text);
        var send_div = $("<div>" + text + "</div>");
        showscreen.append(send_div);
        move_text(send_div);
    })

    $("input").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#sent").trigger("click");
        }
    })

    if (start == false) {
        start = true;
        $("#clear").html("关闭弹幕");
        run();
    }

    $("#clear").click(function () {
        if (start == true) {
            start = false;
            $("#clear").html("开启弹幕");
            showscreen.empty();
        } else if (start == false) {
            start = true;
            $("#clear").html("关闭弹幕");
            run()
        }
    });
    var topMin = showscreen.offset().top;
    var topMax = topMin + showHeight;
    var top = topMin;
    var move_text = function (obj) {
        obj.css({
            display: "inline",
            position: "absolute"
        })
        var begin = showscreen.width() - obj.width();
        top += 50;

        if (top > topMax - 50) {
            top = topMin;
        }

        obj.css({
            left: begin,
            top: top,
            color: getRandomColor()
        });

        var time = 20000 + 10000 * Math.random();
        obj.animate({
            left: "-" + begin + "px"
        }, time, function () {
            obj.remove();
        });
    };
    var getRandomColor = function () {
        return '#' + ('00000' + (Math.random() * 0xffffff << 0).toString(16)).substr(-6);
    }

    var run = function () {
        if (start == true) {
            if (arr.length > 0) {
                var n = Math.floor(Math.random() * arr.length + 1) - 1;
                var textObj = $("<div>" + arr[n] + "</div>");
                showscreen.append(textObj);
                move_text(textObj);
            }
        }
        setTimeout(run, 3000);
    }

    jQuery.fx.interval = 50;
    run();
})
