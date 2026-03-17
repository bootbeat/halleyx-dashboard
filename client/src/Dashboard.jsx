import { useState } from "react"
import KPI from "./KPI"
import Chart from "./Chart"
import Orders from "./Orders"

const actionBtn = {
  padding: "12px 22px",
  fontSize: 15,
  background: "#1f2937",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.35)"
}

export default function Dashboard(){

  const [widgets,setWidgets] = useState([])
  const [config,setConfig] = useState(false)

  function add(type){
    setWidgets(prev => [...prev,{id:Date.now(),type}])
  }

  function remove(id){
    setWidgets(prev => prev.filter(w=>w.id!==id))
  }

  return(
    <div style={{
      background:"#0f172a",
      minHeight:"100vh",
      color:"white",
      fontFamily:"system-ui, sans-serif"
    }}>

      {/* ⭐ centered container */}
      <div style={{
        maxWidth:1200,
        margin:"0 auto",
        padding:"40px 20px"
      }}>

        {/* ⭐ header section */}
        <div style={{
          textAlign:"center",
          marginBottom:30
        }}>
          <h1 style={{
            fontSize:40,
            fontWeight:600,
            marginBottom:15
          }}>
            Admin Analytics Dashboard Builder
          </h1>

          {!config &&
            <button
              onClick={()=>setConfig(true)}
              style={{
                padding:"14px 28px",
                fontSize:16,
                background:"#3b82f6",
                color:"white",
                border:"none",
                borderRadius:10,
                cursor:"pointer",
                boxShadow:"0 6px 18px rgba(0,0,0,0.4)"
              }}
            >
              Configure Dashboard
            </button>
          }
        </div>

        {/* ⭐ config toolbar */}
        {config &&
          <div style={{
            display:"flex",
            justifyContent:"center",
            gap:14,
            flexWrap:"wrap",
            marginBottom:30
          }}>
            <button style={actionBtn} onClick={()=>add("kpi")}>
              + KPI Card
            </button>

            <button style={actionBtn} onClick={()=>add("chart")}>
              + Chart Widget
            </button>

            <button style={actionBtn} onClick={()=>add("orders")}>
              + Orders Table
            </button>

            <button
              style={{...actionBtn, background:"#22c55e"}}
              onClick={()=>setConfig(false)}
            >
              Save Layout
            </button>
          </div>
        }

        {/* ⭐ widget grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",
          gap:24
        }}>
          {widgets.map(w=>(
            <div key={w.id}
              style={{
                background:"#111827",
                padding:22,
                borderRadius:14,
                position:"relative",
                boxShadow:"0 10px 25px rgba(0,0,0,0.45)"
              }}
            >
              {config &&
                <button
                  onClick={()=>remove(w.id)}
                  style={{
                    position:"absolute",
                    top:8,
                    right:8,
                    background:"#ef4444",
                    color:"white",
                    border:"none",
                    borderRadius:6,
                    padding:"4px 8px",
                    cursor:"pointer"
                  }}
                >
                  ✕
                </button>
              }

              {w.type==="kpi" && <KPI/>}
              {w.type==="chart" && <Chart/>}
              {w.type==="orders" && <Orders/>}

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}