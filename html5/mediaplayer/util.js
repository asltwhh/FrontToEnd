function drag(node, callback) {
  // 鼠标起始位置
  var startPoint = { x: 0, y: 0 };
  // node初始位置
  var nodePoint = { x: 0, y: 0 };
  node.onmousedown = function (e) {
    e = e || event;
    startPoint.x = e.clientX;
    startPoint.y = e.clientY;
    nodePoint.x = node.offsetLeft;
    nodePoint.y = node.offsetTop;

    node.setCapture && node.setCapture();

    document.onmousemove = function (e) {
      e = e || event;
      //   只改变x轴的偏移量即可
      var L = nodePoint.x + (e.clientX - startPoint.x);
      //   var T = nodePoint.y + (e.clientY - startPoint.y);
      if (L < 0) {
        L = 0;
      } else if (L > node.parentNode.offsetWidth - node.offsetWidth) {
        L = node.parentNode.offsetWidth - node.offsetWidth;
      }
      node.style.left = L + "px";
      // 如果callback存在并且callback中存在move函数，则调用move
      // move负责修改已播放的进度条的宽度
      if (callback && typeof callback["move"] === "function") {
        callback["move"].call(node);
      }
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      document.releaseCapture && document.releaseCapture();
    };
    return false;
  };
}

function addClass(node, className) {
  var reg = new RegExp("\\b" + className + "\\b");
  if (!reg.test(node.className)) {
    node.className += " " + className;
  }
}
function removeClass(node, className) {
  if (node.className) {
    var reg = new RegExp("\\b" + className + "\\b");
    var classes = node.className;
    node.className = classes.replace(reg, "");
    if (/^\s*$/g.test(node.className)) {
      node.removeAttribute("class");
    }
  } else {
    node.removeAttribute("class");
  }
}

function changeDataForm(seconds) {
  // seconds是number类型
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);
  return addZero(h) + ":" + addZero(m) + ":" + addZero(s);
}

function addZero(time) {
  return time < 10 ? "0" + time : time;
}
