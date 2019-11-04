class FileUpload {
  constructor(url, headers = {}, onProgress = () => {}) {
    this.url = url
    this.headers = headers
    this.onProgress = onProgress
    this.file = ""
  }

  compress(file) {
    let name = file.name
    let self = this
    return new Promise((resolve, reject) => {
      let orientation
      //使用EXIF插件,获取照片的角度
      //ios中竖着拍照会逆时针旋转90°
      EXIF.getData(file, function() {
        //0° 1  顺时针90° 6 逆时针90° 8 180° 3
        orientation = EXIF.getTag(this, 'Orientation'); //1,6,8,3
        let reader = new FileReader()
        file.name = name
        //把文件转换为base64
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          //获取到base64
          self.getImgData(this.result, orientation, function(data, err) {
            if (err) {
              reject(data)
            } else {
              resolve(data)
            }
          })
        }
      })
    })
  }

  getImgData(img, dir, next) {
    var self = this
    var image = new Image();
    image.onload = function() {
      var degree = 0,
        drawWidth, drawHeight, width, height;
      //获取图片的原始宽度和高度
      drawWidth = this.naturalWidth;
      drawHeight = this.naturalHeight;
      //以下改变一下图片大小
      var maxSide = Math.max(drawWidth, drawHeight);
      if (maxSide > 800) {
        var minSide = Math.min(drawWidth, drawHeight);
        minSide = minSide / maxSide * 800;
        maxSide = 800;
        if (drawWidth > drawHeight) {
          drawWidth = maxSide;
          drawHeight = minSide;
        } else {
          drawWidth = minSide;
          drawHeight = maxSide;
        }
      }
      var canvas = document.createElement('canvas');
      canvas.width = width = drawWidth;
      canvas.height = height = drawHeight;
      var context = canvas.getContext('2d');
      //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
      switch (dir) {
        //iphone横屏拍摄，此时home键在左侧
        case 3:
          degree = 180;
          drawWidth = -width;
          drawHeight = -height;
          break;
          //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
        case 6:
          canvas.width = height;
          canvas.height = width;
          degree = 90;
          drawWidth = width;
          drawHeight = -height;
          break;
          //iphone竖屏拍摄，此时home键在上方
        case 8:
          canvas.width = height;
          canvas.height = width;
          degree = 270;
          drawWidth = -width;
          drawHeight = height;
          break;
      }
      //使用canvas旋转校正
      context.rotate(degree * Math.PI / 180);
      context.drawImage(this, 0, 0, drawWidth, drawHeight);
      //返回校正图片,把canvas转换为base64
      let dataUrl = canvas.toDataURL('image/jpeg')
      // 把base64 转换为 blob对象,为二进制流的形式
      let blob = self.dataURItoBlob(dataUrl)
      next(blob);
    }
    image.onerror = function(err) {
      next(this.file, err)
    }
    image.src = img;
  }

  dataURItoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  upload(file, additionalData = {}) {
    this.file = file
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'

    // Headers
    xhr.open('POST', this.url, true)
    this._setXhrHeaders(xhr)

    // Events
    xhr.upload.addEventListener('progress', this.onProgress, false)
    let promise = new Promise((resolve, reject) => {
      xhr.onload = e =>
        xhr.status >= 200 && xhr.status < 400 ? resolve(e) : reject(e)
      xhr.onerror = e => reject(e)
    })

    function sendFormData(data) {
      //此时的data是一个二进制流blob对象
      let formData = new FormData()
      formData.append('file', data)
      Object.keys(additionalData).forEach(p => {
        formData.append(p, additionalData[p])
      })
      xhr.send(formData)
    }

    // Start upload
    this.compress(file).then(data => {
      sendFormData(data)
    }).catch(() => {
      //这里转为blob部分手机出现bug,只能折中,错误的时候也提交上传文件
      additionalData = { quality: 35 }
      //formData同样支持文件直接传输,内部会把文件转为二进制流的形式
      sendFormData(file)
    })
    return promise
  }

  _setXhrHeaders(xhr) {
    Object.keys(this.headers).forEach(p =>
      xhr.setRequestHeader(p, this.headers[p])
    )
  }
}

export default FileUpload