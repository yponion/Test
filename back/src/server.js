const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {Data} = require("./models/data");

const server = async () => {
    try {
        const {MONGO_URI, FRONT_PORT, BACK_PORT} = process.env
        if (!MONGO_URI) throw new Error("MONGO_URI is required!!!")

        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected')

        app.use(express.json())

        app.get('/api/data', async (req, res) => {
            try {
                const data = await Data.find()
                return res.send({data})
            } catch (e) {
                console.log(e)
                return res.status(500).send({error: e.message})
            }
        })

        app.post('/api/data', async (req, res) => {
            try {
                const input = await req.body.input
                const data = new Data({
                    content: input,
                })
                await data.save()
                return res.send({result: "success"})
            } catch (e) {
                console.log(e)
                return res.status(500).send({error: e.message})
            }
        })

        app.listen(BACK_PORT, async () => {
            console.log(`server listening on port ${BACK_PORT}`)
            // generateFakeData(10, 10, 10, 10, 10)
        })
    } catch (err) {
        console.log(err)
    }
}

server()