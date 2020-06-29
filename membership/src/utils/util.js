export default{
  getUrlKey: function (name) {
    // eslint-disable-next-line no-sparse-arrays
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || ''
  }
}