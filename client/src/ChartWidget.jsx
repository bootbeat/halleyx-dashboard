import { useEffect, useState } from "react"
import axios from "axios"

export default function ChartWidget(){

  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/orders")
      .then(res=>setData(res.data))
  },[])

  return(
    <div style={{padding:20,background:"#ddd",width:300}}>
      <h3>Orders Chart</h3>
      {data.map(o=>(
        <div key={o.id}>
          {o.product} : ${o.total}
        </div>
      ))}
    </div>
  )
}