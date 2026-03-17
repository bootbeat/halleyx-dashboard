import { useEffect, useState } from "react"
import axios from "axios"

export default function Table(){

  const [orders,setOrders]=useState([])
  const [form,setForm]=useState({product:"Fiber",qty:1,price:10})

  function load(){
    axios.get("http://localhost:5000/orders")
      .then(r=>setOrders(r.data))
  }

  useEffect(load,[])

  function create(){
    axios.post("http://localhost:5000/orders",{
      product:form.product,
      total:form.qty*form.price
    }).then(load)
  }

  return(
    <div>
      <h4>Create Order</h4>

      <input placeholder="product"
        onChange={e=>setForm({...form,product:e.target.value})}/>

      <input type="number"
        placeholder="qty"
        onChange={e=>setForm({...form,qty:e.target.value})}/>

      <input type="number"
        placeholder="price"
        onChange={e=>setForm({...form,price:e.target.value})}/>

      <button onClick={create}>Add</button>

      <hr/>

      {orders.map(o=>(
        <div key={o.id}>
          {o.product} — ${o.total}
        </div>
      ))}
    </div>
  )
}
