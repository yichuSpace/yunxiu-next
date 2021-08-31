/**
 * @description 更新标题
 * @param {String} title 标题
 */
export function title(title) {
  if (title) {
    window.document.title = title
  }
}

/**
 * @description 复制到剪切板
 * @param content
 */
export function copy(content) {
  return new Promise(resolve => {
    const copyInput = document.createElement('textarea')
    copyInput.value = content
    copyInput.setAttribute('id', 'yun-copy-temp')
    document.body.appendChild(copyInput)
    copyInput.select() // 选择对象
    const result = document.execCommand('Copy') // 执行浏览器复制命令
    copyInput.style.display = 'none'
    document.body.removeChild(document.getElementById('yun-copy-temp'))
    resolve(result)
  })
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 * @param target
 */
export function open(url, target = false) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  if (target) {
    a.setAttribute('target', '_blank')
  }
  a.setAttribute('id', 'yun-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('yun-link-temp'))
}
