<template>
  <div className="card">
    <div className="left">
      <img :src="cards[type]" alt="数据卡片"/>
    </div>
    <div className="right">
      <div className="top">
        {{ title }}
      </div>
      <div className="bottom">
        <span className="number">
          {{ fixed ? output.toFixed(2) : parseInt(output) }}
          <slot name="extra"/>
        </span>
        <span className="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import card from '@/assets/card/card.svg'
import card2 from '@/assets/card/card2.svg'
import card3 from '@/assets/card/card3.svg'
import card4 from '@/assets/card/card4.svg'
import {onUpdated, ref, watch} from "vue";
import {TransitionPresets, useTransition} from '@vueuse/core'

let props = defineProps({
  type: {
    default: 1,
    type: Number
  },
  fixed: {
    default: false,
    type: Boolean
  },
  number: {
    default: 0,
    type: [Array, Number]
  },
  unit: {
    default: "个",
    type: String
  },
  title: {
    default: "客资数量",
    type: String
  }
});


/*
* 默认图标
* */
let cards = [card, card2, card3, card4];
let recur = ref(0);//初始值

const output = useTransition(recur, {
  duration: 500,
  transition: TransitionPresets.linear,
})

if (Array.isArray(props.number)) {
  watch(props.number, () => {
    recur.value = props.number[0];
  }, {
    deep: true
  })
} else {
  onUpdated(() => {
    recur.value = props.number;
  })
}

</script>

<style lang="scss" scoped>
.card {
  display: flex;


  .left {
    width: 30%;
    @include flex-center;
    justify-content: center;


    img {
      width: 3.2rem;
      overflow: hidden;
      border-radius: 50%;

      background-color: rgba($card-bg-color, 0.8);
    }
  }

  .right {
    right: 70%;
    padding-left: 10px;
    @include flex-center;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .top {
      margin-bottom: 2.5px;
      font-size: 0.8rem;
      color: $text;
    }

    .bottom {
      margin-top: 2.5px;

      .number {
        padding-left: 2px;
        font-size: 1.6rem;
        color: $black;
      }

      .unit {
        font-size: 0.7rem;
        margin-left: 10px;
        color: $text;
      }
    }
  }
}
</style>