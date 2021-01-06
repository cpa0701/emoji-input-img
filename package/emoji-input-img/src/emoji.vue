<template>
  <div class="emoji">
    <ul class="emoji-controller">
      <li
        v-for="(pannel,index) in pannels_text"
        :key="index"
        :class="{'active': index === activeIndex}"
        @click="changeActive(index)"
      >
        <img :src="pannel" alt="" />
      </li>
    </ul>
    <ul class="emoji-container">
      <li
        v-for="(emojiGroup, index) in emojis"
        :key="index"
        style="padding: 0"
      >
        <span v-if="index === activeIndex">
          <a
            v-for="(emoji, index) in emojiGroup"
            :key="index"
            href="javascript:;"
            @click.stop="selectItem(emoji)"
          >
            <span
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"
              class="emoji-item"
              @click.stop.prevent="selectItem(emoji)"
            >
            </span>
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import data from '../lib/emoji-data.json'

export default {
  name: 'Emoji',
  data() {
    return {
      emojiData: data,
      pannels: ['表情'],
      pannels_text: [require('../images/pannels-smile.png')],
      activeIndex: 0
    }
  },
  computed: {
    emojis() {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index
    },
    getPureName(name) {
      return name.replace(/:/g, '')
    },
    selectItem(emoji) {
      this.$emit('selectEmoji', emoji)
      this.$emit('select')
    }
  },
}
</script>

<style lang='less' scoped>
  @import '../lib/emoji-sprite';

  .emoji {
    background: #EFEFEF;
    border-top: 1px solid #eee;

    .emoji-controller {
      background: #F5F6F9;
      overflow: hidden;
      margin-bottom: 0;
      padding: 5px 0;

      li {
        float: left;
        padding-top: 6px;
        width: 36px;
        height: 36px;
        margin: 0 5px;
        list-style-type: none;
        font-size: 12px;
        line-height: 36px;
        cursor: pointer;
        text-align: center;
        border-radius: 8px;

        img {
          width: 22px;
          height: 22px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    .emoji-container {
      height: 140px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding-left: 0;
      padding: 10px;

      li {
        font-size: 0;
        padding: 5px;

        a {
          float: left;
          overflow: hidden;
          height: 35px;
          transition: all ease-out .2s;
          border-radius: 4px;

          &:hover {
            background-color: #d8d8d8;
            border-color: #d8d8d8;
          }

          span {
            width: 25px;
            height: 25px;
            display: inline-block;
            border: 1px solid transparent;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
