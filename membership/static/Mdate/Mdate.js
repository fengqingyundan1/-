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
    beginYear: 2000,
    beginMonth: 1,
    beginDay: 1,
    endYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 1,
    endDay: new Date().getDate(),
    format: 'YMD',
    onDateSure: function () {}
  }
  let MdSelectId = ''
  let MdAcceptId = ''
  let dateContentBox = ''
  let datePlugs = ''
  let yearTag = ''
  let monthTag = ''
  let dayTag = ''
  let indexY = 1
  let indexM = 1
  let indexD = 1
  let initM = null
  let initD = null
  let yearScroll = null
  let monthScroll = null
  let dayScroll = null
  let Mdate = function (el, opts) {
    let that = this;
    if (!opts) {
      opts = {}
    }
    that.options = opts; // 基本配置
    this.id = el
    this.selectorId = d.getElementById(this.id)
    this.acceptId = d.getElementById(opts.acceptId) || d.getElementById(this.id)
    this.beginYear = opts.beginYear || dateopts.beginYear
    this.beginMonth = opts.beginMonth || dateopts.beginMonth
    this.beginDay = opts.beginDay || dateopts.beginDay
    this.endYear = opts.endYear || dateopts.endYear
    this.endMonth = opts.endMonth || dateopts.endMonth
    this.endDay = opts.endDay || dateopts.endDay
    this.format = opts.format || dateopts.format
    this.dateBoxShow()
  }
  Mdate.prototype = {
    constructor: Mdate,
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
        dateContentBox = d.createElement('div')
        dateContentBox.id = 'MdatePlugin'
        d.body.appendChild(dateContentBox)
        MdatePlugin = d.getElementById('MdatePlugin')
      }
      MdatePlugin.setAttribute('class', 'slideIn')
      that.createDateUi()
      let yearUl = d.getElementById('yearUl')
      let monthUl = d.getElementById('monthUl')
      let dayUl = d.getElementById('dayUl')
      yearUl.innerHTML = that.createDateYMD('year')
      that.initScroll()
      that.refreshScroll()
    },
    createDateUi: function () {
      let str = '' + '<section class="getDateBg"></section>' + '<section class="getDateBox" id="getDateBox">' + '<div class="choiceDateTitle">' + '<button id="dateCancel">取消</button>' + '<p id="dateTip">请选择出生日期</p>' + '<button id="dateSure" class="fr">完成</button>' + '</div>' + '<div class="dateContent">' + '<div class="checkeDate"></div>' + '<div id="yearwrapper">' + '<ul id="yearUl"></ul>' + '</div>' + '<div id="monthwrapper">' + '<ul id="monthUl"></ul>' + '</div>' + '<div id="daywrapper">' + '<ul id="dayUl"></ul>' + '</div>' + '</div>' + '</section>'
      MdatePlugin.innerHTML = str
    },
    createDateYMD: function (type) {
      let that = this
      let str = '<li>&nbsp;</li>'
      let beginNum = null, endNum = null, unitName = '年', dataStyle = 'data-year'
      if (type == 'year') {
        beginNum = that.beginYear
        endNum = that.endYear
      }
      if (type == 'month') {
        unitName = '月'
        dataStyle = 'data-month'
        beginNum = that.beginMonth
        endNum = 12
        if (yearTag != that.beginYear) {
          beginNum = 1
        }
        if (yearTag == dateopts.endYear) {
          endNum = that.endMonth
        }
      }
      if (type == 'day') {
        unitName = '日'
        dataStyle = 'data-day'
        beginNum = 1
        endNum = new Date(yearTag, monthTag, 0).getDate()
        if (yearTag == that.beginYear && monthTag == that.beginMonth) {
          beginNum = that.beginDay
        }
        if (yearTag == that.endYear && monthTag == that.endMonth) {
          endNum = that.endDay
        }
      }
      for (let i = beginNum; i <= endNum; i++) {
        str += '<li ' + dataStyle + '=' + i + '>' + that.dateForTen(i) + unitName + '</li>'
      }
      return str + '<li>&nbsp;</li>'
    },
    initScroll: function () {
      let that = this
      yearScroll = new iScroll('yearwrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function () {
          indexY = Math.ceil(this.y / 40 * -1 + 1)
          yearTag = yearUl.getElementsByTagName('li')[indexY].getAttribute('data-year')
          monthUl.innerHTML = that.createDateYMD('month')
          monthScroll.refresh()
          try {
            monthTag = monthUl.getElementsByTagName('li')[indexM].getAttribute('data-month')
          } catch (err) {
            return true
          }
          dayUl.innerHTML = that.createDateYMD('day')
          dayScroll.refresh()
          try {
            dayTag = dayUl.getElementsByTagName('li')[indexD].getAttribute('data-day')
          } catch (err) {
            return true
          }
        }
      })
      monthScroll = new iScroll('monthwrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function () {
          indexM = Math.ceil(this.y / 40 * -1 + 1)
          if (indexM == 1 && yearTag != that.beginYear) {
            monthTag = 1
          } else {
            monthTag = monthUl.getElementsByTagName('li')[indexM].getAttribute('data-month')
          }
          dayUl.innerHTML = that.createDateYMD('day')
          dayScroll.refresh()
          try {
            dayTag = dayUl.getElementsByTagName('li')[indexD].getAttribute('data-day')
          } catch (err) {
            return true
          }
        }
      })
      dayScroll = new iScroll('daywrapper', {
        snap: 'li',
        vScrollbar: false,
        onScrollEnd: function () {
          indexD = Math.ceil(this.y / 40 * -1 + 1)
          if (indexD == 1 && monthTag != that.beginMonth) {
            dayTag = 1
          } else {
            dayTag = dayUl.getElementsByTagName('li')[indexD].getAttribute('data-day')
          }
        }
      })
    },
    refreshScroll: function () {
      let that = this
      let initVal = that.acceptId.getAttribute('data-default');
      let initValArr = initVal != '' ? initVal.split(that.format) : [];
      let inputYear, inputMonth, inputDay;
      if (initValArr.length > 0) {
        inputYear = that.dateForTen2(initValArr[0]);
        inputMonth = that.dateForTen2(initValArr[1]);
        inputDay = that.dateForTen2(initValArr[2]);
      }
      inputYear = inputYear || that.beginYear;
      inputMonth = inputMonth || that.beginMonth;
      inputDay = inputDay || that.beginDay;
      initM = that.beginMonth;
      initD = that.beginDay;
      if (inputYear != that.beginYear && initM != 1) {
        initM = 1
      }
      if (inputMonth != that.beginMonth && initD != 1) {
        initD = 1
      }
      inputYear -= that.beginYear;
      inputMonth -= initM;
      inputDay -= initD;
      yearScroll.refresh();
      yearScroll.scrollTo(0, inputYear * 40, 300, true);
      monthScroll.scrollTo(0, inputMonth * 40, 300, true);
      dayScroll.scrollTo(0, inputDay * 40, 300, true)
    },
    dateForTen2: function (n) {
      return n.replace(/\b(0+)/gi, '');
    },
    dateSure: function () {
      let that = this
      let sureBtn = d.getElementById('dateSure')
      let cancelBtn = d.getElementById('dateCancel')
      sureBtn.onclick = function () {
        // if (that.format == 'YMD') {
        //   that.acceptId.value = yearTag + '年' + monthTag + '月' + dayTag + '日'
        // } else {
        //   that.acceptId.value = yearTag + that.format + that.dateForTen(monthTag) + that.format + that.dateForTen(dayTag)
        // }
        // that.acceptId.setAttribute('data-year', yearTag)
        // that.acceptId.setAttribute('data-month', monthTag)
        // that.acceptId.setAttribute('data-day', dayTag)
        const date = yearTag + '-' + that.dateForTen(monthTag) + '-' + that.dateForTen(dayTag)
        that.options.onDateSure(date);
        that.dateCancel()
      }
      cancelBtn.onclick = function () {
        that.dateCancel()
      }
    },
    dateForTen: function (n) {
      if (n < 10) {
        return '0' + n
      } else {
        return n
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
    exports.Mdate = Mdate
  } else {
    window.Mdate = Mdate
  }
})()
