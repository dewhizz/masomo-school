import React, { Link,useState } from 'react'

const LoginComponent = () => {
    // setting our hooks useState
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [secretKey,setSecretKey]=useState('')
  return (
    <div className='container mt-5' style={{maxWidth:'500px'}}>
       login
    </div>
  )
}

export default LoginComponent