<template>
    <h1>{{ [a,b,c] }}</h1>
    <button @click="obersrve(temp)">点击变为响应式</button>
    <button @click="setItem(temp)">点击更改</button>
    <button @click="addItem(temp)">点击新增的属性</button>
    <button @click="readItem(temp)">点击读取属性c</button>
</template>

<script>
let temp = {
    a:'a',
    b:'b',
}

export default{
    
    created(){
        this.temp = temp
    },

    data(){
        return {
            a:{
                itema:1,
                itemAA:2
            },
            b:{
                itemb:2,
                itemBB:3
            },
            c:''
        }
    },

    methods:{


        obersrve(obj){
            for(let k in obj){
                let internalVal = obj[k]
                Object.defineProperty(obj, k, {
                    get(){
                        console.log('读取了')
                        return internalVal
                    },
                    set(newVal){
                        console.log('修改了，新值为：',newVal)
                        return newVal
                    }
                })
            }
        },

        setItem(obj){
            Object.keys(obj).forEach(key => {
                obj[key] = 0
            })
        },

        addItem(obj){
            this.$set(obj.c = 'New Item')
        },

        readItem(obj){
            console.log(obj.c)
        }

    }
}

</script>