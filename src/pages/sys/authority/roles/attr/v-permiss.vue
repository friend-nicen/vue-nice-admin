<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="设置角色权限"
      :width="800"
      centered
      @cancel="close"
      class="picker-permiss">


    <template #footer>
      <div class="footer">
        <span class="info">
          <span style="color: red;">*</span>
          只能配置父角色拥有，以及可访问的页面的权限{{ watchSelfRole ? "，您无法修改自身角色的权限！" : "" }}
        </span>
        <a-space>
          <a-button @click="close">取消</a-button>
          <a-button type="primary" @click="submit" :disabled="watchSelfRole">确定</a-button>
        </a-space>
      </div>
    </template>

    <div class="container">

      <template v-if="loaded">

        <div v-if="Object.keys(permiss.data).length > 0">


          <template v-for="(k,key) of Object.keys(permiss.data)" :key="key">

            <div class="title">
              <a-divider orientation="left">
                <a-checkbox :indeterminate="permiss.data[k].checkAll == 0" :checked="permiss.data[k].checkAll == 1"
                            @change="toCheckAll(permiss.data[k])">

                  <a-tag color="green">{{ permiss.data[k].title }}</a-tag>

                </a-checkbox>
              </a-divider>

            </div>

            <ul>
              <template v-for="(j,count) of permiss.data[k].data" :key="count">
                <li>
                  <a-checkbox
                      @change="toCheck(j.permiss)"
                      :checked="(checked.indexOf(j.permiss) > -1)">
                    {{ j.info }}
                  </a-checkbox>
                </li>
              </template>
            </ul>

          </template>


        </div>

        <v-empty v-else description="暂无数据"/>

      </template>
      <template v-else>
        <a-spin :spinning="!loaded">
          <div class="spin"></div>
        </a-spin>
      </template>
    </div>

  </a-modal>
</template>

<script setup>

//自定义事件
import {computed, inject, ref, watch} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {store} from "@/common";


const emit = defineEmits(['update:visible']); //自定义事件
const watchSelfRole = inject('watchSelfRole'); //查看自己
const loaded = ref(false); //页面加载状态
const permiss = store(Object.create(null)); //角色的权限集
const checked = ref([]); //已选的权限
const role = inject("role"); //角色

//组件属性
const props = defineProps({
  visible: {
    required: false,
    default: false
  }
});

//关闭弹窗
const close = () => {
  emit('update:visible', false)
};


/**
 * @param item
 * @param flag ,反选还是取消,还是全选
 * 选择指定的权限
 */
const toCheck = (item, flag = 0) => {
  /*
  * 获取所在索引
  * */
  let index = checked.value.indexOf(item);

  /*
  * 判断是添加还是删除
  * */
  if (index > -1) {
    if (flag !== 1) checked.value.splice(index, 1); //删除这个元素
  } else {
    if (flag !== -1) checked.value.push(item);
  }
}

/**
 * @param k
 * 选择分组下的所有指标
 */
let toCheckAll = (k) => {

  if (!k.data) return; //没有可选项
  if (k.data.length === 0) return; //没有可选项


  /*
  * 全选还是全不选
  * */
  const flag = k.checkAll;

  k.data.forEach(item => {

    if (flag != 1) {    /*全选*/
      toCheck(item.permiss, 1);
    } else {
      toCheck(item.permiss, -1);
    }
  });

}

/*
* 初始化当前角色的数据
* */
const init = () => {

  /* 显示加载效果 */
  load.loading("加载中...");
  loaded.value = false;

  try {
    /* 开始请求 */
    axios.post(api.sys.authority.role.permiss + `?role=${role.value.key}`)
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {

            checked.value = res.data.data.has;

            res.data.data.total.forEach(item => {

              if (!permiss.data[item.route]) {

                /*
                * 权限列表
                * */
                permiss.data[item.route] = {
                  title: item.name,
                  data: [],
                  checkAll: computed(() => {

                    const data = permiss.data[item.route].data;
                    let count = -1;

                    /*
                    * 循环判断
                    * */
                    for (let j of data) {
                      if (checked.value.indexOf(j.permiss) != -1) {
                        count++; //已选数量+1
                      }
                    }

                    if (count == (data.length - 1)) {
                      return 1; //全选
                    } else if (count > -1) {
                      return 0; //部分选择
                    } else {
                      return -1; //0选择
                    }

                  })

                }
              }

              permiss.data[item.route].data.push(item);


            });

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
      loaded.value = true;
    });
  } catch (e) {
    console.log(e)
    load.error(e);
  }
}


/*
* 显示已选项
* */
watch(() => props.visible, () => {
  if (props.visible) {
    permiss.data = {}; //重置数据
    init(); //初始化数据
  }
})


/*
* 提交权限配置
* */
const submit = () => {

  /* 显示加载效果 */
  load.loading("加载中...");

  try {
    /* 开始请求 */
    axios.post(api.sys.authority.role.permiss_set, {
      role: role.value.key,
      permiss: checked.value
    })
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {
            /* 弹出错误原因 */
            load.success(res.data.errMsg);
            close(); //关闭窗口
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
  } catch (e) {
    console.log(e)
    load.error(e);
  }
}

</script>

<style lang="scss">
.picker-permiss {
  .ant-modal-body {
    padding: 0;

    .ant-tree .ant-tree-treenode {
      padding: 0 0 6px 0;
      gap: 6px;
    }

    .ant-divider {
      margin: 5px 0 24px 0;
    }
  }
}
</style>

<style scoped lang="scss">

.container {

  max-height: 65vh;
  min-height: 30vh;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 20px 36px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();


  .title {
    margin-bottom: 18px;

    span {
      font-size: $font-size-xl;
      font-weight: 600;
    }
  }

  ul {
    list-style: none;
    @include flex-center;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    li {
      @include flex-center;
      width: 33.3%;
      margin-bottom: 16px;
    }
  }
}

.footer {
  @include flex-center;
  justify-content: space-between;

  .info {
    font-size: $font-size-sm;
  }
}

.spin {
  @include flex-center;
  height: 50vh;
  width: 100%;
}
</style>