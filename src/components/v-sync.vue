<script>

import {h} from 'vue'

/*
* 判断是否输入的是数字
* */
function isNumber(e) {
  /*
  * keycode 48-57   0-9
  *         96-105  0-9
  * */

  if (!(e.keyCode >= 48 && e.keyCode <= 57) &&
      !(e.keyCode >= 96 && e.keyCode <= 105) &&
      ((e.keyCode != 190) &&
          (e.keyCode != 8) &&
          (e.keyCode != 110))
  ) {
    e.preventDefault();
    return false;
  }


  if (e.keyCode == 190) {
    return '.';
  }
}


export default {
  props: {
    'modelValue': {
      required: true,
    },
    /* 是否是纯数字 */
    'number': {
      required: false,
      default: false
    },
    'readOnly': {
      required: false,
      default: false
    },
    'placeholder': {
      required: false,
      default: "请输入所需内容"
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    return () =>
        h('div', Object.assign({
              innerHTML: props.modelValue,
              placeholder: props.placeholder,
              contenteditable: !!props.readOnly ? false : true,
              onPaste: function ($event) {
                $event.preventDefault();
                let text = $event.clipboardData.getData('text/plain');
                document.execCommand("insertText", false, text);
              },
              onBlur: ($event) => {
                emit('update:modelValue', $event.target.innerHTML)
              }
            },
            (props.number === true ? {
              onKeydown: isNumber
            } : {})
        ))
  }
}


</script>

<style lang="scss" scoped>
div[contenteditable=true] {
  cursor: text;
  min-width: 70px;
  display: inline-block;
  border-bottom: 1px solid #333333;

  &:focus-visible {
    outline: 0;
  }
}

div[contenteditable=true]:empty::before {
  content: attr(placeholder);
  padding-right: 30px;
  font-size: 14px;
  color: #d9d9d9;
}


</style>