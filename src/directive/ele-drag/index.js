import drag from './drag'

const install = function(Vue) {
  Vue.directive('ele-drag', drag)
}

if (window.Vue) {
  window['ele-drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
