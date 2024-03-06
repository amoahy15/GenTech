import React from 'react'

const LoginPage = () => {
  return (
    <div className='wrapper'>
      <form action=""> 
        <h1>Login</h1>
        <div> 
          <input type="text" placeholder='Username' required/> 
        </div>
        <div> 
          <input type="password" placeholder='Password' required/> 
        </div>

        <div className="remember me/ forgot password"> 
          <label><input type="checkbox"/>Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="register">
          <a href="#">Register</a>
        </div>

      </form>
      
    </div>
  )
}

export default LoginPage
