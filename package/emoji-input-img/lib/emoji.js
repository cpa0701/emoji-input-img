import data from './emoji-data.json'

let emojiData = {}
Object.keys(data).forEach(key => {
  emojiData = { ...emojiData, ...data[key] }
})
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
  Object.keys(emojiData).forEach(key => {
    value = value.replace(new RegExp(key, 'g'), createIcon(key))
  })
  return value
}

export function createImgNode(item) {
  const value = emojiData[item] + '?max_age=31536000'
  const path = 'https://xsyx-front-daily-1259014075.cos.ap-shanghai.myqcloud.com/common-lib/0.1.3/emoji/'
  const img = document.createElement('img')
  const src = path + value
  img.setAttribute('src', src)
  img.setAttribute('style', 'vertical-align:middle;width:22px; height:22px')
  img.setAttribute('data-gemini-emoji', item)
  return img
}

// 防止XSS
function escHTML(str) {
  str = str + ''
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}
function createIcon(item) {
  const value = emojiData[item] + '?max_age=31536000'
  const path = 'https://xsyx-front-daily-1259014075.cos.ap-shanghai.myqcloud.com/common-lib/0.1.3/emoji/'
  const src = path + value
  return `<img src=${src} style="vertical-align:middle" width="22px" height="22px" />`
}
