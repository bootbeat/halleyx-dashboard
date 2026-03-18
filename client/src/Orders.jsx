import { useState, useEffect } from "react"
import axios from "axios"

export default function Orders(){

  const emptyForm = {
    id:null,
    firstName:"",
    lastName:"",
    email:"",
    product:"Fiber Internet 300 Mbps",
    qty:"",
    price:"",
    status:"Pending"
  }

  const [orders,setOrders] = useState([])
  const [form,setForm] = useState(emptyForm)
  const [editing,setEditing] = useState(false)

  function load(){
    axios.get("http://localhost:5000/orders")
      .then(r=>setOrders(r.data))
  }

  useEffect(load,[])

  function submit(){

    if(!form.firstName || !form.lastName || !form.email){
      alert("Please fill mandatory fields")
      return
    }

    const payload = {
      ...form,
      total: Number(form.qty) * Number(form.price)
    }

    if(editing){
      axios.put(`http://localhost:5000/orders/${form.id}`,payload)
        .then(()=>{
          setForm(emptyForm)
          setEditing(false)
          load()
        })
    }else{
      axios.post("http://localhost:5000/orders",payload)
        .then(()=>{
          setForm(emptyForm)
          load()
        })
    }
  }

  function editOrder(o){
    setForm(o)
    setEditing(true)
  }

  function remove(id){
    axios.delete(`http://localhost:5000/orders/${id}`)
      .then(load)
  }

  return(
    <div>

      <h3 style={{marginBottom:20}}>
        {editing ? "Edit Order" : "Create Order"}
      </h3>

      {/* ⭐ BEAUTIFUL DARK STACKED FORM */}

      <div style={{
        display:"flex",
        flexDirection:"column",
        gap:12,
        maxWidth:420
      }}>

        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={e=>setForm({...form,firstName:e.target.value})}
          style={inputStyle}
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={e=>setForm({...form,lastName:e.target.value})}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
          style={inputStyle}
        />

        <select
          value={form.product}
          onChange={e=>setForm({...form,product:e.target.value})}
          style={inputStyle}
        >
          <option>Fiber Internet 300 Mbps</option>
          <option>5GUnlimited Mobile Plan</option>
          <option>Fiber Internet 1 Gbps</option>
          <option>Business Internet 500 Mbps</option>
          <option>VoIP Corporate Package</option>
        </select>

        <div style={{display:"flex",gap:10}}>
          <input
            placeholder="Qty"
            type="number"
            value={form.qty}
            onChange={e=>setForm({...form,qty:e.target.value})}
            style={{...inputStyle,flex:1}}
          />

          <input
            placeholder="Unit Price"
            type="number"
            value={form.price}
            onChange={e=>setForm({...form,price:e.target.value})}
            style={{...inputStyle,flex:1}}
          />
        </div>

        <select
          value={form.status}
          onChange={e=>setForm({...form,status:e.target.value})}
          style={inputStyle}
        >
          <option>Pending</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>

        <button
          onClick={submit}
          style={submitBtn}
        >
          {editing ? "Update Order" : "Submit Order"}
        </button>

      </div>

      <hr style={{
        margin:"25px 0",
        borderColor:"#374151"
      }}/>

      {/* ⭐ BEAUTIFUL ORDER LIST (BLACK STYLE) */}

      {orders.map(o=>(
        <div
          key={o.id}
          style={{
            padding:"12px 0",
            borderBottom:"1px solid #1f2937"
          }}
        >
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
            <div>
              {o.firstName} {o.lastName} — {o.product} — ${o.total}
            </div>

            <div style={{display:"flex",gap:8}}>
              <button
                onClick={()=>editOrder(o)}
                style={editBtn}
              >
                Edit
              </button>

              <button
                onClick={()=>remove(o.id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

/* ⭐ styles */

const inputStyle = {
  width:"100%",
  padding:"12px",
  borderRadius:8,
  border:"1px solid #1f2937",
  background:"#020617",
  color:"white",
  outline:"none"
}

const submitBtn = {
  background:"#22c55e",
  border:"none",
  padding:"12px",
  borderRadius:8,
  color:"white",
  fontWeight:"bold",
  cursor:"pointer"
}

const editBtn = {
  background:"#3b82f6",
  border:"none",
  padding:"6px 12px",
  borderRadius:6,
  color:"white",
  cursor:"pointer"
}

const deleteBtn = {
  background:"#ef4444",
  border:"none",
  padding:"6px 12px",
  borderRadius:6,
  color:"white",
  cursor:"pointer"
}