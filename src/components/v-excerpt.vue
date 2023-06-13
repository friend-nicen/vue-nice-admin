<template>
  <template v-if="content">
    <a-popover :title="title" trigger="hover">
      <template #content>
        <div class="content" v-html="text"></div>
      </template>
      <div class="excerpt">{{ content }}</div>
    </a-popover>
  </template>
  <template v-else>
    <div class="excerpt">-</div>
  </template>

</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  'title': {
    required: false
  },
  'width': {
    required: false
  },
  'content': {
    required: false
  },
  'nextline': {
    required: false,
    default: true
  }
});


const maxWidth = computed(() => {
  if (!props.width) {
    return '120px';
  } else {
    return props.width + 'px';
  }
});

/* 获取文本 */
const text = computed(() => {

  /* 空内容 */
  if (!props.content) {
    return '-';
  }

  if (!props.nextline) {
    return props.content;
  } else {
    return (props.content + "").replace(/\n/g, '<br />');
  }
})

</script>

<style lang="scss" scoped>
.excerpt {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: v-bind(maxWidth);
  font-size: $font-size-md;
}

.content {
  font-size: $font-size-md;
  max-width: 320px;
  word-wrap: break-word;
  word-spacing: normal;
  word-break: break-all;
}
</style>