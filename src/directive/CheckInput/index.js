
const addListener = function (el, type, fn) {
  el.addEventListener(type, fn, false)
}

const enterNumber = {
  bind: function (el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    let val = binding.value === undefined ? 2 : binding.value;
    if (val !== 0) {
      val += 1;
    }
    addListener(el, 'keyup', () => {
      el.value = (el.value).replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^[0]\d*$/g, '0');
      if ((el.value).indexOf('.') !== -1) {
        el.value = el.value.substring(0, (el.value).indexOf('.') + val)//保留几位小数
      }
      el.dispatchEvent(new Event('input'))
      //通过dispatchEvent再次手动触发input事件
    })
  }
}

export default {
  enterNumber,
}