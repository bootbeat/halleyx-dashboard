import { useState } from "react"
import Dashboard from "./Dashboard"
import Login from "./Login"

export default function App(){

  const [logged,setLogged] = useState(false)

  if(!logged){
    return <Login onLogin={()=>setLogged(true)} />
  }

  return <Dashboard/>
}