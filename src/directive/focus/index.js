const focus = {

  inserted: function (el, binding) {
    // 聚焦元素
    if (binding.value) {
      el.querySelector(binding.value).focus();
    } else {
      el.querySelector("input").focus();
    }
  },
}

export default {
  focus,
}