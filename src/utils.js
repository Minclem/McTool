import Dialog from './dialog'

class UtilFn {
  constructor () {
    this.division = this.division.bind(this)
  }
  isNumber (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  }
  // 数值转换
  division (num = 0, breakpoint = 0) {
    if (!this.isNumber(parseFloat(num)) || breakpoint > 3 || breakpoint < 0 || num === 0) return num
    num = Math.floor(num)
    var $num = num.toString().indexOf('.') === -1
      ? num.toString().replace(/\d{1,4}(?=(\d{4})+$)/g, '$&,').split(',')
      : num.toString().replace(/(\d)(?=(\d{4})+\.)/g, function ($0, $1) {
        return $1 + ','
      }).split(',')
    if (breakpoint === 0) return $num
  }
  // 数据获取
    // 当存在回调函数时 回调函数内部需要返回数据本身
    // 以便于进行数据的缓存
  getDetail (url, field, params = {}, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    let _store = this.$store
    let _cache = _store.state.cache

    _cache[field] && (this.pageInfo = _cache[field])

    this.$http.get(_store.state.api[url], {'params': params}).then(function (res) {
      if (res.data.error_code === '0') {
        let obj = Object.create(null)
        /**
         *  当存在回调方法时值由回调方法返回， 不进行直接的赋值
         */
        this[field] = !!callback ? callback(res.data.data) : res.data.data

        obj[field] = this[field]
        _store.commit('modify', obj)
      }

    })
  }
  // iScroll 插件配置 默认返回对象本身
  scrollSet (obj, config) {
    var dftObj, 
        options,
        scrollBox,
        pullDown,
        pullUp,
        loadingStep = 0
    
    dftObj = {
      refreshFn: function(){},
      loadFn: function(){}
    }
    options = Object.assign({}, dftObj, config)

    obj = document.querySelector('#'+obj)

    // 插件初始化
    scrollBox = new IScroll(obj, {
      scrollbars: true,  
      mouseWheel: false,  
      interactiveScrollbars: true,  
      shrinkScrollbars: 'scale',  
      fadeScrollbars: true,  
      scrollY:true,  
      probeType: 2,  
      bindToWrapper:true
    });

    // 上拉/下拉 提示
    pullDown = obj.querySelector('.pull-down')
    pullUp = obj.querySelector('.pull-up')

    // 滚动
    scrollBox.on("scroll",function(){
      var _getClass;

      if (this.y < 40 && this.y > 2 && loadingStep == 0){
        pullDown.innerText = '下拉刷新';
      }
      if (this.y > 40) {
        _getClass = pullDown.getAttribute("class");

        if(!_getClass.match('refresh')) pullDown.className = _getClass + ' refresh';

        pullDown.style.display = 'block';
        pullDown.innerText = '松手刷新数据';

        loadingStep = 1;
      } else if (this.y < (this.maxScrollY - 14)) {
        _getClass = pullUp.getAttribute("class");

        if(!_getClass.match('refresh')) pullUp.className = _getClass + ' refresh';

        pullUp.style.display = 'block';
        pullUp.innerText = '正在载入';

        loadingStep = 1; 
      }
    })
    scrollBox.on("scrollEnd",function(){  
      if (loadingStep == 1) {
        if( pullDown.getAttribute("class").match("refresh") ){
          options.refreshFn(scrollBox)
          pullDown.innerText = '正在刷新'
          loadingStep = 0

          setTimeout(function(){
            pullDown.className = pullDown.getAttribute("class").replace(/refresh/g, '')
            pullDown.style.innerText = '下拉刷新'
            pullDown.style.display = 'none'
          }, 1000)
        } else if(pullUp.getAttribute("class").match("refresh")) {
          options.loadFn(scrollBox)
          pullUp.style.display = 'none'
          pullUp.innerText = '上拉加载更多'

          setTimeout(function(){
            pullUp.className = pullDown.getAttribute("class").replace(/refresh/g, '')
          }, 600)
        }
      }
    });

    return scrollBox
  }
  // 错误提示
  errorTips (error) {
    Dialog.$dialog ({
      type: 'error',
      template: error
    })
  }
  _dialog = Dialog.$dialog 
}

export default new UtilFn()
