/**
 * Created by Administrator on 2016/8/29.
 */
//导航菜单
tabChange('nav');
function tabChange(id) {
    var oNav = document.getElementById(id);
    var oUl = oNav.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        (function (index) {
            aLi[index].onmouseover = function () {
                if (utils.hasClass(aLi[index], 'on')) {
                    return;
                }
                aLi[index].className = 'lihover';
            };
            aLi[index].onmouseout = function () {
                utils.removeClass(aLi[index], 'lihover');
            };
            aLi[index].onclick = function () {
                for (var i = 0; i < aLi.length; i++) {
                    utils.removeClass(aLi[i], 'on');
                }
                aLi[index].className = 'on';
                console.log(aLi[index].className)
            };
        })(i);
    }
}
//轮播图
bannerChange('ban_ul');
function bannerChange(id) {
    var oUl = document.getElementById(id);
    var aLi = oUl.getElementsByTagName('li');
    var oOl = document.getElementById('dots');
    var aLio = oOl.getElementsByTagName('li');
    var step = 0;
    var timer = null;
    clearInterval(timer);
    timer = setInterval(autoMove, 1600);
    function autoMove() {
        if (step >= aLi.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aLi.length; i++) {
            if (i === step) {
                utils.css(aLi[i], 'zIndex', 1);
                animate(aLi[i], {opacity: 1}, 900, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        animate(siblings[i], {opacity: 0});
                    }
                });
                continue;
            }
            utils.css(aLi[i], 'zIndex', 0)
        }
        bannerTip();
    }

    function bannerTip() {
        for (var i = 0; i < aLio.length; i++) {
            aLio[i].className = i === step ? 'on' : null;
        }
    }

    oUl.onmouseover = function () {
        clearInterval(timer);
    };
    oUl.onmouseout = function () {
        timer = setInterval(autoMove, 1600);
    };
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLio.length; i++) {
            aLio[i].index = i;
            aLio[i].onclick = function () {
                step = this.index;
                setBanner();
            }
        }
    }
}
//轮播图上面的图层 里面
titleTab('title_tab1', 'bb_box1');
titleTab('title_tab2', 'bb_box2');
function titleTab(id, context) {
    var oTab = document.getElementById(id);
    var oDiv = document.getElementById(context);
    var aA = oTab.getElementsByTagName('a');
    var aDiv = utils.getByClass('tt1_body1', oDiv);
    var aI = oTab.getElementsByTagName('i');
    for (var i = 0; i < aA.length; i++) {
        (function (index) {
            aA[index].onclick = function () {
                for (var i = 0; i < aA.length; i++) {
                    utils.removeClass(aA[i], 'on_a');
                    utils.removeClass(aDiv[i], 'change');
                    utils.removeClass(aI[i], 'on');
                }
                utils.addClass(aA[index], 'on_a');
                utils.addClass(aDiv[index], 'change');
                utils.addClass(aI[index], 'on');
            };
        })(i)
    }
}
//轮播图上面的图层
overTab('floatTab');
function overTab(id) {
    var oDiv = document.getElementById(id);
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var aLi = utils.getByClass('tt_T1');
    var aDiv = utils.getByClass('tt_T2');
    var aI = oUl.getElementsByTagName('i');
    for (var i = 0; i < aLi.length; i++) {
        (function (index) {
            aLi[index].onclick = function () {
                for (var i = 0; i < aLi.length; i++) {
                    utils.removeClass(aLi[i], 'show');
                    utils.removeClass(aI[i], 'show');
                    utils.removeClass(aDiv[i], 'on');
                }
                utils.addClass(aLi[index], 'show');
                utils.addClass(aI[index], 'show');
                utils.addClass(aDiv[index], 'on');
            };
        })(i)
    }
}
//热门推荐
hotBox();
function hotBox() {
    var oUl = document.getElementById('hotUl');
    var aLi = oUl.getElementsByTagName('li');
    var childA = null;
    var childD = null;
    var siblings = null;
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.width = i === 3 ? '174px' : '171px';
        aLi[i].trueWidth = i === 3 ? 174 : 171;
        (function (index) {
            aLi[index].onmouseover = function () {
                childA = utils.getChildren(aLi[index], 'a')[0];
                childD = utils.getChildren(childA, 'div')[0];
                utils.css(childD, 'display', 'none');
                siblings = utils.siblings(aLi[index]);
                for (var i = 0; i < siblings.length; i++) {
                    animate(siblings[i], {width: 133}, 300);
                }
                animate(aLi[index], {width: 402}, 300);
            };
            aLi[index].onmouseout = function () {
                utils.css(childD, 'display', 'block');
                for (var i = 0; i < siblings.length; i++) {
                    animate(siblings[i], {width: siblings[i].trueWidth}, 200);
                }
                animate(aLi[index], {width: aLi[index].trueWidth}, 200);
            }
        })(i);
    }
}
//选项卡
tabChangeList('domestic', 'body_dom'); //目的地指数 国内
tabChangeList('overseas', 'body_dom'); //目的地指数 海外
tabChangeList('plane', 'tab_ticket');  //超值特价票 机票
tabChangeList('train', 'tab_ticket');  //超值特价票 火车票
tabChangeList('bottom', 'bottom_info');  //底部导航
function tabChangeList(id, className) {
    var oBox = document.getElementById(id);
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var aDiv = utils.getByClass(className, oBox);
    for (var i = 0; i < aLi.length; i++) {
        (function (index) {
            aLi[index].onmouseover = function () {
                if (utils.hasClass(aLi[index], 'on')) {
                    return;
                }
                aLi[index].className = 'lihover';
            };
            aLi[index].onmouseout = function () {
                utils.removeClass(aLi[index], 'lihover');
            };
            aLi[index].onclick = function () {
                for (var i = 0; i < aLi.length; i++) {
                    utils.removeClass(aLi[i], 'on');
                    utils.removeClass(aDiv[i], 'show');
                }
                aLi[index].className = 'on';
                utils.addClass(aDiv[index], 'show');
            };
        })(i);
    }
}

//鼠标移入效果
mouseOver('guide_left');
function mouseOver(id) {
    var oBox = document.getElementById(id);
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var aSpan = oUl.getElementsByTagName('span');
    var oOl = oBox.getElementsByTagName('ol')[0];
    var aLis = oOl.getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        (function (index) {
            aLi[index].onmouseover = function () {
                for (var i = 0; i < aLi.length; i++) {
                    utils.removeClass(aLi[i], 'on');
                    utils.removeClass(aSpan[i], 'show');
                    utils.removeClass(aLis[i], 'show');
                }
                utils.addClass(aLi[index], 'on');
                utils.addClass(aSpan[index], 'show');
                utils.addClass(aLis[index], 'show');
            }
        })(i);
    }
}