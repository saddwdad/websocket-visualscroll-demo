<template>
    <button @click="goToRoot2">
        返回根组件
    </button>
    <hr>
    <ChildItem>
        <template #header>
            这是温馨提示，插槽文字头
        </template>
        <template #footer>
            <div style="color: red;"> 这是插槽文字尾部</div>
        </template>
    </ChildItem>
    <div>
        <p>输入价格</p>
        <input type="text" v-model.lazy="price" placeholder="输入价格">
    </div>
    <br>
    <div>
        <p>输入数量</p>
        <input type="text" v-model.lazy="count" placeholder="输入数量" >
    </div>
    <p>
        价格是:{{this.price}}
    </p> 
    <br>
    <p>数量是：{{ this.count }}</p>
    <br>
    <p>总价是:{{ total }}</p>
</template>

<script>
import { useNavigator2 } from '../route/Navigator2.0'
import ChildItem from './ChildItem.vue'
function debounce(fn, delay){
    let timer = null
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(
            ()=>{
                fn.apply(this, args)
            },
    delay)
    }
}

export default {
    components:{
        ChildItem
    },
    data(){
        return {
            price: 0,
            count: 0,
        }
    },

    computed:{
        total(){
            return this.price * this.count
        },
        
    },
    methods:{
    ...useNavigator2(this),
    },
    watch:{
        total:{
            handler: debounce(function(totalPrice){
                if(totalPrice >= 1000) alert("可以参加满减")
            }, 300),
            immediate: false    
        }
    }
}

</script>