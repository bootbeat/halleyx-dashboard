import { useState, useEffect } from "react"
import axios from "axios"

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #1f2937",
  background: "#020617",
  color: "white",
  fontSize: "15px"
}

export default function Orders(){

  const [orders,setOrders] = useState([])

  const [form,setForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    product:"Fiber Internet 300 Mbps",
    qty:1,
    price:50,
    status:"Pending"
  })

  function load(){
    axios.get("http://localhost:5000/orders")
      .then(r=>setOrders(r.data))
  }

  useEffect(load,[])

  function create(){
    if(!form.firstName || !form.lastName || !form.email)
      return alert("Please fill mandatory fields")

    axios.post("http://localhost:5000/orders",{
      ...form,
      total: Number(form.qty)*Number(form.price)
    }).then(load)
  }

  function remove(id){
    axios.delete(`http://localhost:5000/orders/${id}`)
      .then(load)
  }

  return(
    <div style={{
      maxWidth:420,
      padding:20
    }}>
      <h2 style={{marginBottom:15}}>Create Order</h2>

      <input style={inputStyle} placeholder="First Name"
        onChange={e=>setForm({...form,firstName:e.target.value})} />

      <input style={inputStyle} placeholder="Last Name"
        onChange={e=>setForm({...form,lastName:e.target.value})} />

      <input style={inputStyle} placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})} />

      <select style={inputStyle}
        onChange={e=>setForm({...form,product:e.target.value})}>
        <option>Fiber Internet 300 Mbps</option>
        <option>5GUnlimited Mobile Plan</option>
        <option>Fiber Internet 1 Gbps</option>
        <option>Business Internet 500 Mbps</option>
      </select>

      <div style={{display:"flex",gap:10}}>
        <input style={{...inputStyle,flex:1}} type="number"
          placeholder="Qty"
          onChange={e=>setForm({...form,qty:e.target.value})} />

        <input style={{...inputStyle,flex:1}} type="number"
          placeholder="Unit Price"
          onChange={e=>setForm({...form,price:e.target.value})} />
      </div>

      <select style={inputStyle}
        onChange={e=>setForm({...form,status:e.target.value})}>
        <option>Pending</option>
        <option>In progress</option>
        <option>Completed</option>
      </select>

      <button
        onClick={create}
        style={{
          padding:"12px 20px",
          background:"#22c55e",
          border:"none",
          borderRadius:8,
          fontSize:15,
          cursor:"pointer"
        }}
      >
        Submit Order
      </button>

      <hr style={{margin:"20px 0"}}/>

      {orders.map(o=>(
        <div key={o.id} style={{
          padding:"10px 0",
          borderBottom:"1px solid #1f2937",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <span>
            {o.firstName} {o.lastName} — {o.product} — ${o.total}
          </span>

          <button
            onClick={()=>remove(o.id)}
            style={{
              background:"#ef4444",
              border:"none",
              color:"white",
              padding:"6px 10px",
              borderRadius:6,
              cursor:"pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}