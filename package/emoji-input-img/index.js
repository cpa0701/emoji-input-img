/**
 * Create by Pengan Chen on 2021/1/6
 */
// 导入组件，组件必须声明 name
import EmojiInput from './src/emoji-input-img.vue'

// 为组件提供 install 安装方法，供按需引入
EmojiInput.install = function(Vue) {
  Vue.component(EmojiInput.name, EmojiInput)
}

// 默认导出组件
export default EmojiInput
