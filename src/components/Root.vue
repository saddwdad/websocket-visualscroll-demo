<template>
   <h1>Hi</h1>
    <h2>
    我是根组件APP
    </h2>
    <div>
      <button @click="goToFather">
        点击跳转到父组件
      </button>
    </div>

    <br>
    <div>
      <button @click="goToCalculator">
        点击跳转到计算器
      </button>
    </div>
      <br>
      <div>
        <button @click="goToProxy">
          点击跳到响应式
        </button>
      </div>
      <br>
      <div>
        <button @click="goToVisualScroll">点击跳到虚拟列表</button>
      </div>

    

</template>

<script setup>
import { useNavigator } from '../route/Navigator3.0';

const {goToCalculator, goToFather, goToProxy, goToVisualScroll} = useNavigator()


</script>