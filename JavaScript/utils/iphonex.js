// 1.判断是否是IPhoneX手机
let isIphone = /iphone/gi.test(window.navigator.userAgent)
let windowW = window.screen.width
let windowH = window.screen.height
let pixelRatio = window.devicePixelRatio
let isIPhoneX = isIphone && pixelRatio && pixelRatio === 3 && windowW === 375 && windowH === 812
let isIPhoneXSMax = isIphone && pixelRatio && pixelRatio === 3 && windowW === 414 && windowH === 896
let isIPhoneXR = isIphone && pixelRatio && pixelRatio === 2 && windowW === 414 && windowH === 896
if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
  // 底部增加fix-iphonex-bottm 样式
  $(".contact-box").addClass('fix-iphonex-bottom')
  // 底部增加iphone-footer-bg样式 初始none,条件满足block
  $(".iphone-footer-bg").addClass('iphonexshow')
}