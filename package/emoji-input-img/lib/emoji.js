import emojiData from './emojiData'

const emojiList = emojiData[0].emojis
const path = 'https://xsyx-front-daily-1259014075.cos.ap-shanghai.myqcloud.com/common-lib/0.1.3/emoji/'

/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */

export function renderEmoji(value) {
  if (!value) return ''
  value = escHTML(value)
  emojiList.forEach(key => {
    value = value.replace(new RegExp(key, 'g'), createIcon(key))
  })
  return value
}

export function createImgNode(item) {
  if (emojiList.includes(item)) {
    const value = item.substring(1, item.length - 1) + '.png' + '?max_age=31536000'
    const img = document.createElement('img')
    const src = path + value
    img.setAttribute('src', src)
    img.setAttribute('style', 'vertical-align:middle;width:22px; height:22px')
    img.setAttribute('data-gemini-emoji', item)
    return img
  }
  return document.createTextNode(item)
}

// 防止XSS
function escHTML(str) {
  str = str + ''
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function createIcon(item) {
  const value = item.substring(1, item.length - 1) + '.png' + '?max_age=31536000'
  const src = path + value
  return `<img src="${src}" style="vertical-align:middle;width:22px; height:22px" data-gemini-emoji="${item}">`
}
