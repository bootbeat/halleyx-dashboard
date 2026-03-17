import { useEffect,useState } from "react"
import axios from "axios"

export default function KPI(){

  const [total,setTotal]=useState(0)

  useEffect(()=>{
    axios.get("http://localhost:5000/orders")
      .then(r=>{
        const sum = r.data.reduce((a,b)=>a+Number(b.total||0),0)
        setTotal(sum)
      })
  })

  return(
    <div>
      <h3>Total Revenue</h3>
      <h2>${total}</h2>
    </div>
  )
}