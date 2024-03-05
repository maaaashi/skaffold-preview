import * as yaml from 'js-yaml'

export const escapeHtml = (unsafeText: string) => {
  return unsafeText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const yamlToHtml = (y: string): string => {
  let result = ''
  yaml.loadAll(y, (doc) => {
    result += objectToHtml(doc, 0)
    result += '---<br>'
  })
  if (result.endsWith('---<br>')) {
    result = result.slice(0, -8)
  }
  return result
}

export const objectToHtml = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  obj: any,
  level: number,
  arrayFlag = false,
): string => {
  if (typeof obj === 'string' || typeof obj === 'number') return `${obj}<br>`

  let result = ''
  switch (true) {
    case Array.isArray(obj):
      for (let i = 0; i < level * 2; i++) {
        result += '&nbsp;'
      }
      result += obj
        .map((item) => `- ${objectToHtml(item, level + 1, true)}`)
        .join('')
      break
    case typeof obj === 'object':
      result += Object.keys(obj)
        .map((key: string, index: number) => {
          let r = ''
          if (!(arrayFlag && index === 0)) {
            for (let i = 0; i < level * 2; i++) {
              r += '&nbsp;'
            }
          }
          const k = `<span class="key">${key}</span>`
          const v = objectToHtml(obj[key], level + 1)
          r += `${k}: `
          if (typeof obj[key] === 'object') {
            r += '<br>'
          }
          r += v
          return r
        })
        .join('')
      break
    default:
      result += `${obj}<br>`
  }

  return result
}
