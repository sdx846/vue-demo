<template>
  <div class="">
    <ul class="loading">
      <li v-for="v in 6" :key="v" :style="`--line-index: ${v}`"></li>
    </ul>
    <div class="heart-loading">
      <ul style="--line-count: 9">
        <li v-for="v in 9" :key="v" :class="`line-${v}`" :style="`--line-index: ${v}`"></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Store from "../../store/store";
export default {
  data() {
    return {
     
    };
  },
  created() {
 
  },
  watch: {
  },
  methods: {
    
  }
};
</script>

<style lang="scss"  scoped="" type="text/css">
// 动画一
.loading {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  li {
    list-style: none;
    border-radius: 3px;
    width: 10px;
    height: 10px;
    background-color: #f66;
    animation: beat 1s ease-in-out infinite;
    & + li {
      margin-left: 5px;
    }
    &:nth-child(2) {
      animation-delay: 200ms;
    }
    &:nth-child(3) {
      animation-delay: 400ms;
    }
    &:nth-child(4) {
      animation-delay: 600ms;
    }
    &:nth-child(5) {
      animation-delay: 800ms;
    }
    &:nth-child(6) {
      animation-delay: 1s;
    }

    // --time: calc((var(--line-index) - 1) * 200ms);
    // width: 10px;
    // height: 10px;
    // border-radius: 50%;
    // background-color: #f66;
    // animation: beat 1.5s ease-in-out var(--time) infinite;
    // & + li {
    //   margin-left: 5px;
    // }
  }
}
@keyframes beat {
  from {
    height: 10px;
    border-radius: 50%;
  }
  to {
    height: 30px;
    border-radius: 3px;
  }
}
//动画二
.heart-loading {
  width: 200px;
  height: 200px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    height: 10px;
  }
  li {
    list-style: none;
    --Θ: calc(var(--line-index) / var(--line-count) * 0.5turn);
    --time: calc((var(--line-index) - 1) * 80ms);
    border-radius: 5px;
    width: 10px;
    height: 60px;
    background-color: #3c9;
    filter: hue-rotate(var(--Θ));
    animation-duration: 1s;
    animation-delay: var(--time);
    animation-iteration-count: infinite;
  }
  .line-1,
  .line-9 {
    animation-name: line-move-1;
  }
  .line-2,
  .line-8 {
    animation-name: line-move-2;
  }
  .line-3,
  .line-7 {
    animation-name: line-move-3;
  }
  .line-4,
  .line-6 {
    animation-name: line-move-4;
  }
  .line-5 {
    animation-name: line-move-5;
  }
}
@keyframes line-move-1 {
  from {
    height: 50px;
    border-radius: 5px;
  }
  to {
    height: 10px;
    border-radius: 50%;
  }
}
@keyframes line-move-2 {
  from {
    height: 80px;
    border-radius: 5px;
  }
  to {
    height: 10px;
    border-radius: 50%;
  }
}
@keyframes line-move-3 {
  from {
    height: 110px;
    border-radius: 5px;
  }
  to {
    height: 10px;
    border-radius: 50%;
  }
}
@keyframes line-move-4 {
  from {
    height: 140px;
    border-radius: 5px;
  }
  to {
    height: 10px;
    border-radius: 50%;
  }
}
@keyframes line-move-5 {
  from {
    height: 170px;
    border-radius: 5px;
  }
  to {
    height: 10px;
    border-radius: 50%;
  }
}
</style>
