<template>
  <div class="emoji-list">
    <ul class="emoji-controller">
      <li
        v-for="(panel,index) in emojiData"
        :key="index"
        :class="{'active': index === activeIndex,'emoji':index!==0}"
        @click="changeActive(index)"
      >
        <img
          v-if="index===0"
          src="https://xsyx-front-daily-1259014075.cos.ap-shanghai.myqcloud.com/common-lib/0.1.3/emoji/smile.png"
          alt=""
        />
        <template v-else>{{ panel.name }}</template>
      </li>
    </ul>
    <ul class="emoji-container">
      <li
        v-for="(emoji, index) in emojiData[activeIndex].emojis"
        :key="index"
        style="padding: 0"
      >
        <a
          v-if="0 === activeIndex"
          href="javascript:;"
          @click.stop="selectItem(emoji)"
        >
          <span
            :title="emoji"
            :class="'sprite-' + getPureName(emoji)"
            @click.stop.prevent="selectItem(emoji)"
          >
          </span>
        </a>
        <a
          v-else
          href="javascript:;"
          @click.stop="selectItem(emoji)"
        >
          <span class="emoji-item" @click.stop.prevent="selectItem(emoji)">
            {{ emoji }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import emojiData from '../lib/emojiData'

export default {
  name: 'Emoji',
  data() {
    return {
      emojiData,
      activeIndex: 0
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
    }
  },
}
</script>

<style lang='less' scoped>
  @import '../lib/emoji-sprite';

  .emoji-list {
    background: #EFEFEF;
    border-top: 1px solid #eee;
    user-select: none;

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
        font-size: 16px;
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

        &.emoji {
          padding-top: 0;
        }
      }
    }

    .emoji-container {
      height: 140px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding: 5px 10px;

      li {
        font-size: 0;
        padding: 5px;
        float: left;
        overflow: hidden;
        transition: all ease-out .2s;

        &:hover {
          border-radius: 4px;
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }

        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;

          &.emoji-item {
            margin: 5px;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
