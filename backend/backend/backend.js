import express from 'express'
import cors from 'cors'
import WebSocket, { WebSocketServer } from 'ws'
const app = express()
app.use(cors())
const items = 10000
const sourceData = Array.from({ length: items }, (_, i) => ({
    id: i,
    content: `这是第${i}条测试数据`,
    timeStamp: Date.now()
}))

const server = app.listen(3000, () => {
    console.log('后端启动，地址为ws://localhost:3000/api/list?offset=0&limit=20')
})


const wss = new WebSocketServer({ server })


wss.on('connection', (ws) => {
    console.log('客户端已连接')
    ws.on('message', (message) => {
        try {
            const params = JSON.parse(message)
            const offset = parseInt(params.offset) || 0
            const limit = parseInt(params.limit) || 20
            const delay = Math.random() * 2000 + 500
            const shouldLoss = Math.random() < 0.4
            setTimeout(() => {
                if (shouldLoss) {
                    console.log('请求失败,网络抖动')
                    return (
                        ws.send(JSON.stringify({
                            error: "Internal Sever Error",
                            message: "请求失败，网络抖动",
                            type: 'error'
                        }
                        ))
                    )
                }
                const dataSlice = sourceData.slice(offset, offset + limit)

                console.log(`[success]发送数据：offset${offset},limit${limit}`)

                ws.send(JSON.stringify({
                    code: 200,
                    data: dataSlice,
                    total: items,
                    offset: offset,
                    limit: limit,
                    type: 'list-data'
                }))
                console.log('发送数据')
            }, delay)
        } catch (error) {
            console.log('客户端解析失败')
        }
    })

    ws.on('close', () => { })
    console.log('客户端断开连接')
})



