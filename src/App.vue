<script setup>
import FatherItem from './components/FatherItem.vue';
import CalculateItem from './components/CalculateItem.vue';
</script>

<template>

  <!-- <h1>Hi</h1> -->
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router';

export default{
  components:{
    useRouter
  }
}

</script>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
