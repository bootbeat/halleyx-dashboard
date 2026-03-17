import { useEffect, useState } from "react"
import axios from "axios"
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from "recharts"

const COLORS = ["#22c55e","#3b82f6","#f97316","#a855f7","#ef4444"]

export default function Chart(){

  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/orders")
      .then(r=>setData(r.data))
  },[])

  function grouped(){
    const map={}
    data.forEach(o=>{
      map[o.product]=(map[o.product]||0)+1
    })
    return Object.keys(map).map(k=>({
      name:k,
      value:map[k]
    }))
  }

  const chartData = grouped()

  return(
    <div style={{width:"100%",height:300}}>
      <h3 style={{marginBottom:10}}>Product Analytics</h3>

      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={60}
            label
          >
            {chartData.map((e,i)=>(
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={chartData}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="value" fill="#3b82f6"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}