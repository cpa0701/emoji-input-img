<template>
  <div>
    <!--用户输入框-->
    <div
      ref="emojiInput"
      placeholder=" 请输入..."
      role="button"
      tabindex="0"
      contenteditable="true"
      class="sc-user-input--text"
      @click="handleClick"
      @keyup.prevent="handleUpKey"
      @input="getText"
    ></div>
  </div>
</template>

<script>
import { createImgNode } from '../lib/emoji.js'

export default {
  name: 'EmojiInput',

  components: {},
  props: {
    message: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      file: null,
      fileTypeConf: {
        2: ['image/png', 'image/jpg', 'image/jpeg'],
        3: ['mp3', 'amr', 'wma', 'flac', 'aac', 'm4a'],
        4: ['video/mp4', 'video/avi', 'video/mpeg4', 'video/wma'],
      },
      lastEditRange: null,
    }
  },
  watch: {
    message(newValue) {
      if (newValue === '') {
        this.$refs.emojiInput.innerHTML = ''
      }
    }
  },
  methods: {
    getSelectRange() {
      // 获取选定对象
      const selection = getSelection()
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
    },
    handleClick(event) {
      const target = event.target
      const edit = this.$refs.emojiInput
      const selection = getSelection()
      if (target.nodeName === 'IMG') {
        const range = document.createRange()
        // 光标对象的范围界定为新建的表情节点
        range.selectNodeContents(edit)
        // 光标位置定位在表情节点的最大长度
        // 判断点击区域是否不是Img标签
        const idx = [].indexOf.call(edit.childNodes, target) > -1
          ? [].indexOf.call(edit.childNodes, target) + 1
          : edit.childNodes.length
        range.setStart(edit, idx)
        // 使光标开始和光标结束重叠
        range.collapse(true)
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
      }
      this.lastEditRange = selection.getRangeAt(0)
      this.$emit('focus', event)
    },
    // 键盘抬起时获取最后光标范围
    handleUpKey(event) {
      // 键盘抬起时获取最后光标范围
      this.getSelectRange()
    },
    /**
       * 获取输入框文字
       */
    getText() {
      const textChildNodes = this.$refs.emojiInput.childNodes
      let needSendText = ''
      textChildNodes.forEach((v) => {
        if (v.nodeName === 'IMG') {
          needSendText += v.getAttribute('data-gemini-emoji')
        } else if (v.nodeName === '#text') {
          needSendText += v.textContent
        }
      })
      this.$emit('update:message', needSendText)
    },
    handleEmojiPicked(emoji) {
      const emojiText = createImgNode(emoji)
      this.cursorMove(emojiText)
      this.getText()
    },
    /**
       * cnt 是一个节点node（img、text节点）
       *
       */
    cursorMove(cnt) {
      const edit = this.$refs.emojiInput
      const lastEditRange = this.lastEditRange
      const selection = getSelection()
      if (lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(lastEditRange)
        this.$refs.emojiInput.blur()
      }
      // 判断选定对象范围是编辑框还是文本节点
      let range = document.createRange()
      if (selection.anchorNode && selection.anchorNode.nodeName !== '#text') {
        // 创建新的光标对象
        // 光标对象的范围界定为新建的表情节点
        range.selectNodeContents(edit)
        if (edit.childNodes.length > 0) {
          // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
          for (let i = 0; i <= edit.childNodes.length; i++) {
            if (i === selection.anchorOffset) {
              edit.insertBefore(cnt, edit.childNodes[i])
              // 光标位置定位在表情节点的最大长度
              range.setStart(edit, i + 1)
            }
          }
        } else {
          // 否则直接插入一个表情元素
          edit.appendChild(cnt)
          // 光标位置定位在表情节点的最大长度
          range.setStart(edit, edit.childNodes.length)
        }
        // 使光标开始和光标结束重叠
        range.collapse(true)
        // 清除选定对象的所有光标对象
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
        this.$refs.emojiInput.blur()
      } else {
        // 如果是文本节点则先获取光标对象
        range = selection.getRangeAt(0)
        // 获取光标对象的范围界定对象，一般就是textNode对象
        const textNode = range.startContainer
        // 获取光标位置
        const rangeStartOffset = range.startOffset
        const textNodeContent = textNode.textContent
        // 截取左文本、右文本
        const sliceLeftText = textNodeContent.slice(0, rangeStartOffset)
        const sliceRightText = textNodeContent.slice(rangeStartOffset)
        const textLeftNode = document.createTextNode(sliceLeftText)
        const textRightNode = document.createTextNode(sliceRightText)
        // 文本节点在光标位置处插入新的表情内容
        sliceLeftText && edit.insertBefore(textLeftNode, textNode)
        edit.insertBefore(cnt, textNode)
        sliceRightText && edit.insertBefore(textRightNode, textNode)
        // 删除文本节点
        textNode.parentNode.removeChild(textNode)
        range.setStart(cnt.parentNode, [].indexOf.call(cnt.parentNode.childNodes, cnt) + 1)
        // 光标开始和光标结束重叠
        range.collapse(true)
        // 清除选定对象的所有光标对象
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
        this.$refs.emojiInput.blur()
      }
      // 无论如何都要记录最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
    }
  },
}
</script>

<style scoped lang="less">
  .sc-user-input {
    width: 100%;
    min-height: 55px;
    margin: 0px;
    position: relative;
    bottom: 0;
    display: flex;
    background-color: #f4f7f9;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .sc-user-input-submit {
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }

  .sc-user-input--text {
    width: 100%;
    resize: none;
    color: #323233;
    border: none;
    outline: none;
    max-height: 52px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-y: auto;
    word-break: break-all;
    text-align: left;
  }

  .sc-user-input--buttons {
    width: 150px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .sc-user-input--button:first-of-type {
    width: 40px;
  }

  .sc-user-input--button {
    width: 30px;
    margin-left: 2px;
    margin-right: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sc-user-input.active {
    box-shadow: none;
    background-color: white;
    box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
  }

  .sc-user-input--button label {
    position: relative;
    height: 24px;
    padding-left: 3px;
    cursor: pointer;
  }

  .sc-user-input--button label:hover path {
    fill: rgba(86, 88, 103, 1);
  }

  .sc-user-input--button input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99999;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    overflow: hidden;
  }

  .file-container {
    background-color: #f4f7f9;
    border-top-left-radius: 10px;
    padding: 5px 20px;
    color: #565867;
  }

  .delete-file-message {
    font-style: normal;
    float: right;
    cursor: pointer;
    color: #c8cad0;
  }

  .delete-file-message:hover {
    color: #5d5e6d;
  }

  .icon-file-message {
    margin-right: 5px;
  }
</style>
