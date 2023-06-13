
export default {
  "rootValue": 19.2,
  "unitPrecision": 6,
  /*
  * 匹配的属性如下:
  * font-size,
  * padding top/left/right/bottom
  * margin top/left/right/bottom
  * min-width\max-width
  * height
  *
  * */
  "propList": ["font-size","padding*","margin*","*width","border-radius","height"],
  "selectorBlackList": [],
  "replace": true,
  "mediaQuery": false,
  "minPixelValue": 0,
  /*文本开头的右边内容，不匹配任何符合断言的内容，断言规则外的"." "用于搭配+匹配任意字符*/
  "exclude": /^(?:(?!(.*(pages\/login).*)).)+$/i
}

