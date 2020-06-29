(function () {
  let d = document
  let includeCss = function (url) {
    let link = d.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    d.getElementsByTagName('head')[0].appendChild(link)
  }
  includeCss('static/Mdate/Mdate.css')
  let dateopts = {
    onSexSure: function () {}
  }
  let sexContentBox = ''
  let sexTag = ''
  let indexY = 1
  let sexScroll = null
  let MdatePlugin = null
  let Msex = function (el, opts) {
    let that = this;
    if (!opts) {
      opts = {}
    }
    that.options = opts; // 基本配置
    this.id = el
    this.selectorId = d.getElementById(this.id)
    this.acceptId = d.getElementById(opts.acceptId) || d.getElementById(this.id)
    this.dateBoxShow()
  }
  Msex.prototype = {
    constructor: Msex,
    dateBoxShow: function () {
      let that = this
      that.selectorId.onclick = function () {
        that.createDateBox()
        that.dateSure()
      }
    },
    createDateBox: function () {
      let that = this
      MdatePlugin = d.getElementById('MdatePlugin')
      if (!MdatePlugin) {
        sexContentBox = d.createElement('div')
        sexContentBox.id = 'MdatePlugin'
        d.body.appendChild(sexContentBox)
        MdatePlugin = d.getElementById('MdatePlugin')
      }
      MdatePlugin.setAttribute('class', 'slideIn')
      MdatePlugin.innerHTML = '' + '<section class="getDateBg"></section>' + '<section class="getDateBox" id="getDateBox">' + '<div class="choiceDateTitle">' + '<button id="dateCancel">取消</button>' + '<p id="dateTip">请选择性别</p>' + '<button id="dateSure" class="fr">完成</button>' + '</div>' + '<div class="dateContent">' + '<div class="checkeDate"></div>' + '<div id="sexwrapper">' + '<ul id="sexUl"></ul>' + '</div>' + '</div>' + '</div>' + '</section>'
      let sexUl = d.getElementById('sexUl')
      sexUl.innerHTML = '<li>&nbsp;</li><li>男</li><li>女</li><li>&nbsp;</li>'
      that.initScroll()
      that.refreshScroll()
    },
    initScroll: function () {
      sexScroll = new iScroll('sexwrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function () {
          indexY = Math.ceil(this.y / 40 * -1 + 1)
          sexTag = sexUl.getElementsByTagName('li')[indexY].innerText
        }
      })
    },
    refreshScroll: function () {
      let that = this
      let inputYear = that.acceptId.getAttribute('data-default');
      let index = 0;
      if (inputYear === '男') {
        index = -1;
      } else {
        index = 0;
      }
      sexScroll.refresh();
      sexScroll.scrollTo(0, index * 40, 300, true);
    },
    dateSure: function () {
      let that = this
      let sureBtn = d.getElementById('dateSure')
      let cancelBtn = d.getElementById('dateCancel')
      sureBtn.onclick = function () {
        that.options.onSexSure(sexTag);
        that.dateCancel()
      }
      cancelBtn.onclick = function () {
        that.dateCancel()
      }
    },
    dateCancel: function () {
      MdatePlugin.setAttribute('class', 'slideOut')
      setTimeout(function () {
        MdatePlugin.innerHTML = ''
      }, 400)
    }
  }
  if (typeof exports !== 'undefined') {
    exports.Msex = Msex
  } else {
    window.Msex = Msex
  }
})()
