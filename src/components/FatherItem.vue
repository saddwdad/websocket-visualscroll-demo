<template>

    <button @click="goToRoot2">
        点击返回主界面
    </button>

    <hr>
    <h3>
        我是父组件接受的子组件信息:{{ childMsg }}
    </h3>

    <h3>
        我是父组件接受的子组件数字:{{ childNum }}
    </h3>

    
    <div>

        <ChildItem :msg="parentMsg" :fn="parentFunction" @child-send-msg="ReciveChildFunction">
            <template #header>
                <div style="color: blue;"> 我是父组件调用子组件的插槽头 </div>
            </template>
            <template #footer>
                <div style="color: aqua;"> 我是父组件调用子组件的插槽尾 </div>
            </template>
        </ChildItem>
    </div>


</template>

<script>

    import ChildItem from './ChildItem.vue';
    import  {useNavigator2}  from '../route/Navigator2.0';
    export default{

        components:{
            ChildItem
        },
        data(){
            return {
                parentMsg:'我是父组件发给子组件的信息',
                parentNum: 111,
                childMsg: '',
                childNum: ''
            }
        },
        beforeCreate(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        created(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        beforeMount(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        mounted(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        beforeUpdate(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        updated(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        beforeDestroy(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        destroyed(){
            console.log('父组件:', this.$el, this.$data, this.components)
        },
        methods:{
            ForChildFunction(){
                console.log('这是父组件的信息')
            },

            ReciveChildFunction(msg, num){
                this.childMsg = msg
                this.childNum = num
            },
            
            parentFunction(){
                console.log('hhh')
            },
            ...useNavigator2(this)
            
        }
    }

</script>