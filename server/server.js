const express = require("express")
const cors = require("cors")
const { v4: uuid } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())

let orders = []
let layout = []

app.post("/orders",(req,res)=>{
  const order = { id:uuid(), date:new Date(), ...req.body }
  orders.push(order)
  res.json(order)
})

app.get("/orders",(req,res)=>res.json(orders))

app.delete("/orders/:id",(req,res)=>{
  orders = orders.filter(o=>o.id!==req.params.id)
  res.json({ok:true})
})

app.post("/layout",(req,res)=>{
  layout = req.body
  res.json({ok:true})
})

app.get("/layout",(req,res)=>res.json(layout))

app.listen(5000,()=>console.log("SERVER RUNNING"))