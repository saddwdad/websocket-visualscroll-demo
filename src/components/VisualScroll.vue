<template>
    <h1>虚拟列表测试</h1>
    <div v-if="loading">加载中</div>
    <div v-else-if="error" style="color: red;">出错了，{{ error }}
        <button @click="handleUpdate">点击重试</button>
    </div>
    <div>
        <button @click="restartByHand">点击重连webSocket</button>
    </div>
    <List :items="data" :limit="limit" :offset="offset" :total="total" @need-to-be-updated="handleUpdate"></List>
</template>


<script setup>
import List from './List.vue';
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
let webSoc = new WebSocket(`ws://localhost:3000/api/list`)
let retryTimer = null

let isRestartedByHand = false
let isAutoRestart = false
const data = ref([])
const loading = ref(false)
const error = ref(null)
const offset = ref(0)
const limit = ref(20)
const total = ref(0)
let dataRetryTimer = null
let attemps = 0
const maxAttemps = 4
const maxSend = 4
let send = 0
const openHandler = () => {
    console.log('websocket连接成功！！')
    attemps = 0
    loadData(offset.value, limit.value)
}


const closeHandler = () => {

    console.log('websocket关闭成功！！')
    attemps++
    console.log(`出错了,正在第${attemps}次重连`)
    retryTimer = setTimeout(autoRestartFunc, attemps * 200);
}


const errorHandler = (e) => {
    console.log('websocket出错！！', e)
}


const messageHandler = (event) => {
    loading.value = false
    const response = JSON.parse(event.data)
    if (response.type === 'list-data') {
        if(dataRetryTimer) clearTimeout(dataRetryTimer)
        send = 0
        data.value = [...data.value, ...response.data]
        total.value = response.total
    } else if (response.type === 'error') {
        error.value = response.message
        if(send < maxSend){
            send++
            console.log(`正在尝试第${send}次重新发送请求`)
            dataRetryTimer = setTimeout(() => {
                loadData(offset.value, limit.value)
            }, send * 200);
        } else {
            send = 0
            loading.value = false
            console.log('重新请求达到上限，请检查网络')
        }
    }
    console.log('服务端websocket发送消息！！', event)
}


const restartByHand = () => {
    isRestartedByHand = true
    isAutoRestart = false
    attemps = 0
    restartWebSoc(isAutoRestart, isRestartedByHand)
}

const autoRestartFunc = () => {
    isAutoRestart = true
    restartWebSoc(isAutoRestart, isRestartedByHand)
}


const restartWebSoc = (isAutoRestart, isRestartedByHand) => {

    if (!isRestartedByHand && !isAutoRestart) return

    if (retryTimer) {
        clearTimeout(retryTimer)
    }
    tryToConnect()
}

const tryToConnect = () => {

    if (attemps > maxAttemps) {
        alert('超时，请手动重连')
        console.log('超时，请手动重连')
        return
    }
    webSoc = new WebSocket(`ws://localhost:3000/api/list`)
    webSoc.onopen = openHandler
    webSoc.onclose = closeHandler
    webSoc.onerror = errorHandler
    webSoc.onmessage = messageHandler
}

const loadData = async (offset, limit) => {
    if (typeof offset !== 'number') {
        console.warn("发现非法请求起点，已拦截。当前 offset:", offset);
        return;
    }
    if (loading.value) return

    error.value = null
    // try {
    //     // const response = await axios.get('http://localhost:3000/api/list', {
    //     //     params: { offset, limit }
    //     // })
    //     const response = await axios.get('http://localhost:3000/api/list', {
    //         params: { offset, limit }
    //     })
    //     data.value = [...data.value, ...response.data.data]
    //     total.value = response.data.total
    //     console.log('请求成功')
    // }
    // catch (err) {
    //     if (err.response)
    //         console.log(`请求失败${error.value}`)
    //     error.value = err.response?.data?.error || '服务器连接失败'
    // } finally {
    //     loading.value = false
    // }
    if (webSoc && webSoc.readyState === webSoc.OPEN) {
        const requestParams = { offset: offset, limit: limit }
        webSoc.send(JSON.stringify(requestParams))
        loading.value = true
        console.log('请求成功')
    } else {
        console.log('未连接websocket')
    }

}

const handleUpdate = () => {
    const nextOffSet = data.value.length
    if (nextOffSet >= total.value && total.value !== 0) return
    offset.value = nextOffSet
    loadData(offset.value, limit.value)
}


onMounted(() => {
    tryToConnect()
})

onUnmounted(() => {
    webSoc.removeEventListener("open", openHandler)
    webSoc.removeEventListener("error", errorHandler)
    webSoc.removeEventListener("close", closeHandler)
    webSoc.removeEventListener("message", messageHandler)
})


</script>


<style></style>