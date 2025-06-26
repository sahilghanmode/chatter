import { Server } from "socket.io"
import redis from "./redis.js"

let io
export const userIdMap={}

export const initSocket=(server)=>{
    io=new Server(server,{
        cors:{
            origin:process.env.VITE_ENDPOINT,
            methods:["GET","POST"],
            credentials:true

        }
    })

    io.on("connect",(socket)=>{
        console.log("socket connected",socket.id)

        socket.on("usertomap",async(userId)=>{
            userIdMap[userId]=socket.id

            await redis.sadd("activeUser",userId)

            io.emit("user-online",{userId})
        })

        socket.on("send-message",({sender,receiver,content,timestamp,conversation})=>{
            const toSocketId=userIdMap[receiver]
            const message={sender,receiver,content,timestamp,conversation}

            if(toSocketId){
                io.to(toSocketId).emit("receive-message",message)
            }

            socket.emit("receive-message",message)
        })


        socket.on("disconnect",async()=>{
            console.log("user disconnect",socket.id)
            for (const id in userIdMap) {
                if (userIdMap[id] === socket.id) {

                    // const redisKey = `chat:${userId}`;
                    // // const messages = await redis.lrange(redisKey, 0, -1);
                    // // for (const msg of messages) {
                    // //     await saveMessageToMongo(JSON.parse(msg));
                    // // }
                    // await redis.del(redisKey);
                    const userId=id

                    console.log(userId)
    
                    await redis.srem("activeUser", userId);
                    delete userIdMap[id];
                    break;
                }
            }
        })
    })

    return io
}