<template>
  <a-input-group class="compact" compact>
    <a-form-item-rest>
      <a-input v-model:value="value[0]" :placeholder="title[0]"
               style="border-top-right-radius:0;border-bottom-right-radius: 0;width: 47.5%; text-align: center"
               type='number'/>
    </a-form-item-rest>
    <a-form-item-rest>
      <a-input
          style="width: 30px; border-left: 0;font-size: 16px; pointer-events: none; background-color: #fff"
          placeholder="~"
          disabled
      />
    </a-form-item-rest>
    <a-input v-model:value="value[1]" :placeholder="title[1]"
             style="border-top-left-radius:0;border-bottom-left-radius: 0;border-left: 0;width: 47.5%; text-align: center"
             type='number'/>
  </a-input-group>
</template>

<script setup>
defineProps({
  value: {
    type: Array
  },
  title: {
    type: Array
  }
})
</script>
<style lang="scss">
.compact.ant-input-group-compact {
  display: flex;
}
</style>
