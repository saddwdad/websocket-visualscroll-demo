<template>
  <div class="container" :style="{ height: containerHeight }" @scroll="onScroll">
    
    <div class="phantom" :style="{ height: totalBarHeight }"></div>
    
    <div class="list" :style="{ transform: `translateY(${offsetY}px)` }">
      <div v-for="item in visibleData" :key="item.id" class="message">
        {{ item.content }}
      </div>
      <div :style="{height: totalBarHeight}" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,   
    limit: Number, 
    offset: Number, 
    total:Number
  },
  data() {
    return {
      size: 60,    
      start: 0,
      offsetY: 0,
      start: 0,
      end: this.offset+this.limit
    }
  },
  computed: {
    // 视口高度
    containerHeight() {
      return this.limit * this.size + 'px';
    },
    // 总高度（决定滚动条长短）
    totalBarHeight() {
      return this.total * this.size + 'px';
    },
    // 【核心】根据 start 计算出当前要显示的切片数据
    visibleData() {
      return this.items.slice(this.start, this.start + this.limit);
    }
  },
  methods: {
    onScroll(e) {

      const scrollTop = e.target.scrollTop;
      
      this.start = Math.floor(scrollTop / this.size);
      
      this.offsetY = this.start * this.size;
      
      if(this.start >= this.items.length - 10){
        this.$emit('need-to-be-updated', this.start)
        
      }
    }
  }
}
</script>

<style>
.container {
  position: relative; 
  overflow-y: auto;
  
  width: 500px;
  margin: 0 auto;
  background-color: rgba(150, 150, 150, .2);
}

.phantom {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: -1; 
}

.list {
  position: absolute;
  background-color: aqua;
  border-color:red ;
  top: 0; left: 0; right: 0;
  width: 100%;
}

.message {
  height: 60px; 
  line-height: 60px;
  border-bottom: 1px solid #eee;
}
</style>