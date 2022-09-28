import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';

const index = () => {
  const {state,dispatch} = useContext(Context)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(state?.loggedInUser?.id) {
      router.push('/')
    }
  },[state.loggedInUser])

  useEffect(()=> {
    if(state?.loggedInUser?.id) {
      router.push('/')
    }
  }, [])

  const login = ()=>{
    fetch('https://inpimaca-api.herokuapp.com/iniciarSesion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user,
            password:pass
        })
    })
    .then(response => response.json())
    .then(user => {
        if (user.id){
          dispatch({type:'SET_USER', payload: user})
        }
    })
    .catch(error => console.error(error))
}

  // value="customDolarActive" checked={customDolarActive} onChange={(e) => handleCheck()}

  return (
    <div style={{display:'flex', flexDirection: 'column', margin: 'auto', width: '100%'}}>
      <input value={user} onChange={(t) => setUser(t.target.value)} placeholder='usuario'/>
      <input value={pass} onChange={(t) => setPass(t.target.value)} placeholder='clave' type="password" />
      <button onClick={login}>login</button>
    </div>
  );
}

export default index;