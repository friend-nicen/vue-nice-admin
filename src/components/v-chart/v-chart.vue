<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup="chart">
import initialize from './initialize'

let props = defineProps({
  api: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  }
});

let chart = initialize(props);
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>