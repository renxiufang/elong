/**
 * Created by Administrator on 2016/8/29.
 */
function opacityBanner() {
    this.oUl = document.getElementById('ban_ul');
    this.aLi = this.oUl.getElementsByTagName('li');
    this.oOl = document.getElementById('dots');
    this.aLio = this.oOl.getElementsByTagName('li');
    this.data = null;
    this.step = 0;
    this.timer = null;
    this.init();
}
opacityBanner.prototype = {
    constructor: opacityBanner,
    init: function () {
        var _this = this;
        // 1.获取并解析数据
        this.getData();
        // 2.绑定数据
        // 3.延迟加载
        // 4.自动播放
        // 5.焦点自动
        // 6.移入移出
        // 7.焦点切换
    },
    getData: function () {
        var _this = this;
        var xml = new XMLHttpRequest();
        xml.open('get','json/data2.txt', false);
        xml.onreadystatechange = function () {
            if (xml.status == 4 && /^2\d{2}$/.test(xml.status)) {
                _this.data = utils.jsonParse(xml.responseText)
            }
        };
        xml.send();
        console.log(this.data)
    }

};
