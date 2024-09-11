import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import { PaymentStatus } from './pages/PaymentStatus'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/paymentStatus' element={<PaymentStatus/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/send' element={<SendMoney/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
