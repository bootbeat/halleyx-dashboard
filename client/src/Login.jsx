import { useState } from "react"

export default function Login({onLogin}){

  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")

  function submit(){
    if(email==="admin@halleyx.com" && pass==="admin123"){
      onLogin()
    }else{
      alert("Invalid admin credentials")
    }
  }

  return(
    <div style={{
      background:"#0f172a",
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color:"white"
    }}>
      <div style={{
        background:"#111827",
        padding:30,
        borderRadius:14,
        width:320,
        boxShadow:"0 10px 30px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{marginBottom:20}}>Admin Login</h2>

        <input
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e=>setPass(e.target.value)}
          style={input}
        />

        <button onClick={submit} style={btn}>
          Login
        </button>

        <p style={{marginTop:15,fontSize:12,opacity:.7}}>
          demo: admin@halleyx.com / admin123
        </p>
      </div>
    </div>
  )
}

const input = {
  width:"100%",
  padding:"12px",
  marginBottom:"12px",
  borderRadius:8,
  border:"1px solid #1f2937",
  background:"#020617",
  color:"white"
}

const btn = {
  width:"100%",
  padding:"12px",
  background:"#3b82f6",
  border:"none",
  borderRadius:8,
  color:"white",
  cursor:"pointer"
}