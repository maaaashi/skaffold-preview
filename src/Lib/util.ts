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

const arrayRender = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  array: any[],
  level: number,
): string => {
  let result = ''
  for (let i = 0; i < level * 2; i++) {
    result += '&nbsp;'
  }
  result += array
    .map((item) => `- ${objectToHtml(item, level + 1, true)}`)
    .join('')

  return result
}

const objectRender = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  obj: any,
  level: number,
  arrayFlag = false,
): string => {
  return Object.keys(obj)
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
}

export const objectToHtml = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  obj: any,
  level: number,
  arrayFlag = false,
): string => {
  if (typeof obj === 'string' || typeof obj === 'number') return `${obj}<br>`

  if (Array.isArray(obj)) {
    return arrayRender(obj, level)
  }

  if (typeof obj === 'object') {
    return objectRender(obj, level, arrayFlag)
  }

  return `${obj}<br>`
}
