<template>
    <slot name ="header"></slot>
    <p>
        这是父组件传给子组件的信息 {{msg}}
    </p>
    <button @click="fn">
        点击显示父组件函数执行结果
    </button>

    <button @click="sendMsgToFather">
        点我给父组件发信息
    </button>

    <input type="text" name="" id="">
    <slot name="footer"></slot>

</template>

<script>
    export default{
        data(){
            return{
                childMsg : 'this is child msg',
                childNum : 666
            }
        },
        beforeCreate(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        created(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        beforeMount(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        mounted(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        beforeUpdate(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        updated(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        beforeDestroy(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        destroyed(){
            console.log('子组件:', this.$el, this.$data, this.components)
        },
        methods:{
            sendMsgToFather(){
                this.$emit('child-send-msg', '我是子组件信息', 666)
            }
        },
        computed:{
            changeStr:{
                get(){
                    return childMsg * 100
                },
                set(val){
                    this.str = val
                }
            }
        },

        props: ['msg', 'fn']
    }

</script>