<script>
/* eslint-disable */
/**
 * @author 友人a丶
 * 批量生成表单
 * 遇到的问题
 * 1. 传递进来双向绑定的数据必须作为一个data对象单独传递进行，跟表单配置对象 作为配置中的一个值会导致替换整个proxy对象，丢失响应性
 * 2. options进行动态加载响应式的时候使用ref会导致组件报类型错误
 * 3. item.attr.value = props.data[item.key];  //依赖没有被收集
 * 4. h内部使用时，直接传入一个定义的对象，才会被收集响应式依赖，可以通过assign去合并，会保持响应式
 *
 * 组件会暴露一个formDom的ref用于表单验证
 * 提供了一个check属性方法，用于权限验证
 *
 * 表单选项的属性
 * 1. bind boolean，是否需要进行双向绑定，默认false，需要
 * 2. data string，是否需要自动加载选项数据（传递接口地址）
 * 3. filter object {depend,key}，依赖数据对象的那个键值，通过key（indexOf）进行筛选
 * 4. grid object，自定义这个表单项的布局
 * 5. permiss，需要的用户权限
 * 6. offset，出现在偏移位置时，自定义偏移的栅格数量
 * 7. visible，传递一个ref对象，响应式是否显示该表单
 * 8. key，绑定数据对象哪个键值
 * 8. attr，组件的一些属性
 * */

import {
  Input,
  InputNumber,
  InputPassword,
  DatePicker,
  RangePicker,
  Select,
  Form,
  FormItem,
  Row,
  Col,
  Checkbox,
  Button,
  RadioGroup,
  Cascader,
  Textarea,
  InputSearch,
  TreeSelect
} from 'ant-design-vue'


import RangeNumber from './v-forms/v-range-number.vue';
import RadioButton from './v-forms/v-radio-button.vue';
import PickerIcon from './v-forms/v-picker-icon.vue';
import ItemPicker from './v-forms/v-item-picker/v-item-picker.vue';
import Icon from './v-icon.vue';


import {h, watch, isRef, toRaw} from 'vue'
import {cloneDeep, debounce} from 'lodash'
import axios from "axios";
import load from "@/common/load";
import {store} from "@/common";
import {getTree} from "@/common/tree";
import dayjs from "dayjs";

/*
* 表单组件库
* */
const components = {
  'input': Input,
  "input-number": InputNumber,
  "input-search": InputSearch,
  "input-password": InputPassword,
  'date-picker': DatePicker,
  'range-picker': RangePicker,
  'select': Select,
  'checkbox': Checkbox,
  "input-range": RangeNumber,
  "radio-button": RadioButton,
  "radio": RadioGroup,
  "cascader": Cascader,
  "textarea": Textarea,
  "TreeSelect": TreeSelect,
  "PickerIcon": PickerIcon,
  'ItemPicker': ItemPicker
}


/*
* 不作为输入星组件渲染
* 绑定update:checked的组件有哪些
* */
const checked = ['checkbox'];

/**
 *
 * @param api 数据接口地址
 * @param options 选项的响应式变量
 * 加载数据的接口
 */
const loadOptions = {
  /*下拉框初始化数据*/
  select(api, options) {

    load.loading("加载中..."); //加载中

    return axios.get(api)
        .then(res => {
          if (res.data.code) {

            /*
            * 如果长度为0
            * */
            if (res.data.data.length == 0) {
              options.data = [];
              return;
            }

            /*
            * 获取对象的所有键
            * */
            const keys = Object.keys(res.data.data[0]);

            const data = res.data.data.map((item) => {

              const need = {
                label: item[keys[1]],
                value: item[keys[0]],
              };

              /*
              * 如果元素个数大于2
              * 则
              * 复制属性
              * */
              if (keys.length > 2) {
                for (let i = 2; i < keys.length && i < 5; i++) {
                  need[keys[i]] = item[keys[i]];
                }
              }

              return need;

            })

            options.save(data); //保存快照
            options.data = data; //保存数据

          } else {
            load.error(res.data.errMsg);
          }
        }).catch(e => {
          load.error(e.message);
        }).finally(() => {
          /* 关闭加载效果 */
          load.loaded();
        });

  },
  /*级联下拉加载数据*/
  cascader(api, options) {

    load.loading("加载中..."); //加载中

    return axios.get(api)
        .then(res => {
          if (res.data.code) {
            /*
            * 如果长度为0
            * */
            if (res.data.data.length == 0) {
              options.data = [];
              return;
            }

            options.save(res.data.data); //保存快照
            options.data = res.data.data; //保存数据

          } else {
            load.error(res.data.errMsg);
          }
        }).catch(e => {
          load.error(e.message);
        }).finally(() => {
          /* 关闭加载效果 */
          load.loaded();
        });
  },
  /*树形组件的数据加载*/
  TreeSelect(api, options) {

    load.loading("加载中..."); //加载中

    return axios.get(api)
        .then(res => {

          /*
        * 判断请求结果
        * */
          if (res.data.code) {

            /*
             * 如果长度为0
             * */
            if (res.data.data.length == 0) {
              options.data = [];
              return;
            }

            const data = getTree(res.data.data.tree, res.data.data.pid);

            options.save(data); //保存快照
            options.data = data; //保存数据

          } else {
            /* 弹出错误原因 */
            load.error(res.data.errMsg);
          }
        }).catch((e) => {
          /* 弹出错误原因 */
          load.error(e.message);
        }).finally(() => {
          /* 关闭加载效果 */
          load.loaded();
        });
  }

}


/*
* 每一个非文本的子元素都用函数返回
* 返回单个vNode或者VNode的数组
* */
export default {
  props: {
    /*表单*/
    form: {
      type: Object,
      required: true
    },
    /* 表单的name */
    name: {
      require: false,
      default: "form"
    },
    /*数据源*/
    data: {
      type: Object,
      required: true
    },
    /*布局*/
    layout: {
      type: String,
      default: "horizontal"
    },
    /*间隔*/
    gutter: {
      type: [Number, Object, Array],
      default: 16
    },
    /*显示重置按钮*/
    showReset: {
      type: Boolean,
      default: false
    },
    /*统一必选，非必选的label宽度*/
    union: {
      type: Boolean,
      default: false
    },
    /*默认布局*/
    grid: {
      type: Object,
      default: () => {
        return {
          xxl: 5,
          xl: 7,
          lg: 8,
          md: 10,
          sm: 12,
          xs: 24,
        }
      }
    },
    /*label是否显示边框*/
    showBorder: {
      require: false,
      default: true
    },
    /*权限验证*/
    check: {
      require: false,
      default: null,
      type: Function
    },
    /*
      label宽度如何处理,fixed固定，fit自适应文字
    */
    label: {
      required: false,
      default: "fit"
    },
    /*
    * 标签的宽度占比
    * */
    "labelSpan": {
      required: false
    },
    /*
    * 是否需要自动间隔
    * 空间不足时。是否自动插入一个空form-item
    * */
    offset: {
      required: false,
      default: true
    }
  },
  emits: ['change'],
  setup(props, {emit}) {

    /*
    * 自定义事件监听
    * */
    watch(() => props.data, () => emit("change", props.data), {deep: true});


    /*
    * 水平模式下，无关padding和border
    * */
    const showBorder = props.showBorder && props.layout != "vertical";
    const hasPadding = (props.label !== 'fixed') && props.layout != "vertical";
    /*
    * 如果没有指定label宽度比
    * */
    const labelSpan = !props['labelSpan'] ? (props.showBorder ? 7 : 5) : props['labelSpan'];


    /*
    * 子元素
    * */
    let parent = []; //最终结果

    /*
    * 是否需要权限验证
    * 过滤无权使用的选项
    * */
    if (!!props.check) {
      parent = props.form.filter((item) => {
        return props.check(item);
      })
    } else {
      parent = props.form;
    }


    const children = []; //最终结果

    for (let i = 0; i < parent.length; i++) {

      const item = parent[i]; //配置

      /*
      * 判断组件类型是否存在
      * */
      if (!components[item.type]) {
        console.warn(i, item.key, item.type, "组件不存在！");
        continue;
      }

      /*
      * 时间类型的组件，转换为dayjs
      * */
      if (['date-picker', 'range-picker'].indexOf(item.type) > -1) {
        if (!!props.data[item.key]) {

          if (Array.isArray(props.data[item.key])) {

            for (let i = 0; i < props.data[item.key].length; i++) {
              if (!!props.data[item.key][i]) {
                props.data[item.key][i] = dayjs(props.data[item.key][i])
              }
            }

          } else {
            props.data[item.key] = dayjs(props.data[item.key])
          }


        }
      }


      /*如果定义了偏移位置*/
      if (props.offset) {
        if (i % 4 === 0 && i != 0) {
          children.push(h(Col, Object.assign({
            xxl: 4,
            xl: 0,
            lg: 0,
            md: 0,
            sm: 0,
            xs: 0
          }, !item.offset ? {} : item.offset)));
        }
      }


      /*
      * 如果没有属性对象
      * 则创建一个
      * 创建属性对象
      * */
      if (!item.attr) {
        item.attr = {};
      }

      /*
      * 过滤基础属性
      * 默认可清除
      * */
      // eslint-disable-next-line no-prototype-builtins
      if (!item.attr.hasOwnProperty('allowClear')) {
        item.attr.allowClear = true; //默认允许清空
      }


      /*
      * 处理单选，多选框的不一致性
      * */
      if (checked.indexOf(item.type) >= 0) {

        /*
        * 如果需要双向绑定
        * */
        if (!item.bind) {
          item.attr['onUpdate:checked'] = (value) => {
            props.data[item.key] = value;
          }
        }

        children.push(h(Col,
            Object.assign({}, !item.grid ? {} : item.grid),
            () => h(FormItem, {},
                () => h(components[item.type],
                    Object.assign({checked: props.data[item.key]}, item.attr),
                    () => item.text)
            )));

        continue;

      } else {


        /*
        * 如果需要双向绑定
        * */
        if (!item.bind) {
          item.attr['onUpdate:value'] = (value) => {
            props.data[item.key] = value;
          }
        }


        /**
         * 如果没有默认的options并且指定了接口
         * */
        const options = store([]); //标记是否需要合并options

        /*
        * 没有传递options，但是传递了接口地址
        * */
        if (!item.attr.hasOwnProperty('options') && !item.attr.hasOwnProperty('treeData') && item.hasOwnProperty('data')) {

          /* 被点击时加载默认的数据 */
          item.loaded = false; //默认数据没有加载完成

          /* 组件被点击时初始化选项数据 */
          item.attr.onClick = async () => {
            if (item.loaded) return;//已加载，不重复加载
            await loadOptions[item.type](item.data, options); //异步加载选项数据
            item.loaded = true; //标记数据加载完成
          }


          /*
          * 如果需要级联筛选
          * 根据指定的key值动态筛选
          * 直接指定options的不支持筛选
          * */
          if (item.hasOwnProperty("filter")) {

            /*
            * 动态响应依赖的选项值
            * */
            watch(() => props.data[item.filter.depend],
                debounce(() => {
                  /*
                  * 如果依赖的键没有值
                  * */
                  if (props.data[item.filter.depend].length == 0) {
                    options.reset(); //重置数据到快照
                    return false;
                  }


                  options.reset(); //重置数据到快照
                  options.data = options.data.filter((option) => {

                    /*
                    * 数组和非数组
                    * */
                    if (Array.isArray(props.data[item.filter.depend])) {
                      return props.data[item.filter.depend].indexOf(option[item.filter.key]) > -1;
                    } else {
                      return props.data[item.filter.depend] == option[item.filter.key];
                    }
                  })

                }, 500), {
                  deep: true
                })
          }


        }

        /*
          xs	<576px
          md	≥768px
          lg	≥992px
          xl	≥1200px
          xxl	≥1600px
          xxxl	≥2000px
          */

        children.push(h(Col,
            Object.assign(
                cloneDeep(props.grid),
                !item.grid ? {} : item.grid,
                {
                  index: i
                }
            ),
            () => h(FormItem,
                Object.assign({
                      /*
                      * 垂直布局时直接百分百即可
                      * */
                      label: item.label,
                      name: item.key,
                      class: {"no-border": item.type == "radio"},
                      rules: {required: !!item.attr.required, message: item.attr.placeholder}
                    },
                    /**
                     * label标签是固定宽度还是自适应文字
                     */
                    props.label == "fixed" ? {
                      "label-col": {span: (props.layout == "vertical" ? 24 : labelSpan)},
                      "wrapper-col": {span: (props.layout == "vertical" ? 24 : 24 - labelSpan)},
                    } : {}),
                /*内部子元素*/
                () => h(
                    components[item.type],
                    Object.assign(
                        {
                          value: props.data[item.key]
                        }, item.attr,
                        isRef(item.attr.options) ? {options: item.attr.options.value} : {},
                        isRef(item.attr.treeData) ? {treeData: item.attr.treeData.value} : {},
                        /* TreeSelect不一样 */
                        options.data.length == 0 ? {} : (item.type == "TreeSelect" ? {treeData: options.data} : {options: options.data})))
            )));


        continue;

      }


    }

    /**
     * 判断是否需要显示重置按钮
     */
    if (props.showReset) {

      /*
      * 深拷贝初始数据对象
      * 用于数据重置
      * 必须toRaw
      * */
      const origin = cloneDeep(toRaw(props.data));

      /*
      * 写入重置筛选按钮
      * */
      children.push(
          h(Button,
              {
                type: "dashed",
                style: "margin-bottom:15px;margin-left:10px;",
                onClick() {
                  Object.assign(props.data, origin); //重置
                }
              },
              {default: () => "重置筛选", icon: () => h(Icon, {icon: "RedoOutlined", size: "12px"})}))
    }


    return () => h(
        /*Form组件*/
        Form,
        {
          ref: 'formDom',
          name: props.name,
          model: props.data,
          labelAlign: "left",
          layout: props.layout,
          class: props.layout + (showBorder ? " show-border" : "") + (hasPadding ? " has-padding" : "") + (props.union ? " union" : ""),
          colon: false
        },
        /*
        * 渲染表单内部的元素
        * */
        () => h(
            /*
            * Row组件
            * Colums 之间的间隔
            * */
            Row, {gutter: props.gutter},
            /*
            * 遍历所有需要渲染的组件
            * */
            () => children.filter(node => {

              if (!parent[node.props.index]) {
                return true;
              }

              const item = parent[node.props.index];

              if (!item.hasOwnProperty("visible")) {
                return true;
              } else {
                if (isRef(parent[node.props.index].visible)) {
                  return parent[node.props.index].visible.value;
                } else {
                  return parent[node.props.index].visible;
                }
              }

            })
        ));
  }
}


</script>

<style lang="scss" scoped>


@mixin unique {

  /*日期选择*/
  .ant-picker, .ant-picker-range {
    width: 100%;
  }

  /*强制单选组不换行*/
  .ant-radio-group {
    white-space: nowrap;
  }

  /*选择框去除做圆角*/
  .ant-select-selector, .ant-input-affix-wrapper, .ant-picker, .ant-input-number {
    width: 100%;
    height: 32px;
  }

  /* 文本域特殊处理 */
  .ant-input-textarea .ant-input-affix-wrapper, .ant-input-affix-wrapper-textarea-with-clear-btn {
    height: fit-content !important;
  }

  textarea {
    @include scroll-bar();
  }
}

/*筛选的表单*/
.horizontal {

  margin: 5px 0 0;

  :deep(.ant-form-item) {

    display: flex;
    align-items: flex-start;
    width: 100%;
    margin: 0 0 16px 0;


    /*左标签*/
    .ant-form-item-label-left {
      @include flex-center;
      justify-content: flex-start;
      flex-shrink: 0;
      height: 32px;

      .ant-form-item-label {
        height: fit-content;
      }

      .ant-form-item-no-colon {

        &:after {
          display: none;
        }
      }

      /* 显示上面隐藏的透明色 */
      .ant-form-item-required {
        &:before {
          color: red;
        }
      }
    }


    @include unique;

  }

  /* 按钮无边框 */
  .no-border {
    :deep(.ant-form-item-label-left) {
      border: none;
    }
  }

  /*
    解决小屏版面异常的问题
  */
  @media (max-width: 575px) {
    :deep(.ant-form-item) {
      flex-wrap: nowrap;

      .ant-form-item-label-left {
        padding: 0;
        max-width: 29.16666667%;
      }

      .ant-form-item-control {
        max-width: 70.83333333%;
      }

      .ant-checkbox-wrapper {
        span {
          white-space: nowrap;
        }
      }

    }
  }
}

/*筛选的表单*/
.vertical {
  :deep(.ant-form-item) {
    /*日期选择*/
    @include unique;
  }
}

.show-border {

  :deep(.ant-form-item) {

    .ant-form-item-label-left {
      border: 1px solid $border-form-item;
      border-right: none;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      justify-content: center !important;
    }

    /*选择框去除做圆角*/
    .ant-select-selector, .ant-input-affix-wrapper, .ant-picker, .ant-input-number {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }

  }
}

/*是否拥有padding*/
.has-padding {
  :deep(.ant-form-item) {
    /*左标签*/
    .ant-form-item-label-left {
      padding: 0 15px;
    }
  }

}

/* 统一必选和非必选的宽度 */
.union {
  :deep(.ant-form-item-no-colon) {
    /* 保持统一的宽度 */
    &:before {
      display: inline-block;
      margin-right: 4px;
      color: transparent;
      font-size: $font-size-xl;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
}

</style>