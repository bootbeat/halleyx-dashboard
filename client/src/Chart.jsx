import { useState, useEffect } from "react"
import axios from "axios"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts"

export default function Chart(){

  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/orders")
      .then(res=>{

        const orders = res.data

        const grouped = {}

        orders.forEach(o=>{
          if(!grouped[o.product]){
            grouped[o.product] = 0
          }
          grouped[o.product] += Number(o.total)
        })

        const formatted = Object.keys(grouped).map(p=>({
          product:p,
          revenue:grouped[p]
        }))

        setData(formatted)
      })
  },[])

  const colors = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6"]

  return(
    <div style={{height:420}}>

      <h3 style={{
        textAlign:"center",
        marginBottom:10
      }}>
        Product Analytics
      </h3>

      {/* ✅ PIE CHART */}
      <div style={{height:220}}>
        <ResponsiveContainer>
          <PieChart margin={{ top:25 }}>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="product"
              outerRadius={60}
              label={({ value }) => `$${value}`}
            >
              {data.map((entry,index)=>(
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ BAR CHART */}
      <div style={{height:180}}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="#1f2937"/>
            <XAxis
              dataKey="product"
              stroke="#94a3b8"
            />
            <YAxis stroke="#94a3b8"/>
            <Tooltip/>
            <Legend/>
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[6,6,0,0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}