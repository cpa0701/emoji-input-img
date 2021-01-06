<template>
  <div class="emoji-input-img">
    <div class="input">
      <EmojiInput
        ref="inputField"
        :message.sync="message"
        class="record-text"
        @focus="handleFocus"
      />
      <button class="customer-emoji-btn" @click="handleShow"></button>
    </div>
    <Emoji v-if="emojiShow" @selectEmoji="selectEmoji" />
  </div>
</template>

<script>
import EmojiInput from './emoji-input'
import Emoji from './emoji'

export default {
  name: 'EmojiInputImg',
  components: {
    Emoji,
    EmojiInput
  },
  data() {
    console.log(123123123)
    return {
      message: '',
      emojiShow: false,
    }
  },
  methods: {
    handleFocus(e) {
      this.$emit('handleFocus', e)
    },
    handleShow() {
      this.emojiShow = !this.emojiShow
      this.$refs.inputField.$refs.emojiInput.focus()
      this.$refs.inputField.$refs.emojiInput.blur()
    },
    /**
     * 选择emoji
     */
    selectEmoji(emoji) {
      this.$refs.inputField.handleEmojiPicked(emoji)
    }
  },
}
</script>

<style lang="less">
  .emoji-input-img {
    .input {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      background-color: #f5f6f9;
      padding: 7px 0 12px;

      .record-text {
        flex: auto;
        padding: 10px;
        margin: 0 5px -5px;
        min-height: 41px;
        max-height: 72px;
        line-height: 18px;
        color: #BDC6D5;
        border-radius: 4px;
        background: #fff;
        box-sizing: border-box;
        font-size: 15px;
      }

      .customer-emoji-btn {
        flex: 0 0 30px;
        outline: none;
        height: 30px;
        width: 30px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        border: none;
        background-color: transparent;
        background-image: url("https://front-xps-cdn.xsyx.xyz/2020/10/28/1252002944.png");
      }
    }

  }
</style>
