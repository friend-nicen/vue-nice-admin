<script>

/*
* @author 友人a丶
* 递归自动生成无限层级的菜单
* */


import {h, watch} from 'vue'
import {RouterLink} from 'vue-router'
import {Menu, MenuItem, SubMenu} from 'ant-design-vue';
import Icon from '@/components/v-icon.vue'


/*
* 接收渲染函数和路由参数
* */
function render(items, h, level = 1) {

  return items.map(
      (item) => {

        /*
        * 如果菜单有子路由
        * 处理空数组为空的问题
        * */

        if (typeof item.children == 'object') {
          if (item.children.length == 0) {
            item.children = false;
          }
        }


        /*
        * 如果有子路由
        * */
        if (!!item.children) {

          /*
          * 如果没定义图标
          * */
          if (!item.meta.icon) {
            item.meta.icon = 'BulbOutlined'
          }


          const menus = render(item.children, h, level + 1);

          return h(SubMenu, {
            key: item.path,
            title: item.meta.name,
          }, {
            default: () => menus,
            icon: () => !item.meta.icon ? null : h(Icon, {icon: item.meta.icon})
          });

        } else {

          /*
          * 没有子路由
          * 没有子路由就不需要图标
          * */
          return h(MenuItem, {
            key: item.path
          }, {
            default: () => h(RouterLink, {
              to: item.path,
            }, {
              default: () => item.meta.name
            }),
            icon: () => !item.meta.icon ? null : h(Icon, {icon: item.meta.icon})
          });

        }
      })
}

/*
* 导出组件
* 菜单收缩展开的功能在侧边栏布局组件上面
* */
export default {
  props: ['menu'],
  setup(props) {

    let menus = []; //菜单项

    watch(() => props.menu.items, () => {
      menus = render(props.menu.items, h);
    }, {
      deep: true,
      immediate: true
    })

    /*渲染函数*/
    return () => h(Menu, {
      selectedKeys: props.menu.selectedKeys, //被选中的菜单
      openKeys: props.menu.selectedKeys,//展开的菜单
      mode: "inline",//内嵌
      inlineIndent: 28, //缩进
      forceSubMenuRender: true
    }, {default: () => menus});
  }
}

</script>
