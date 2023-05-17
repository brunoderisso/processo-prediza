import Router from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';

import BodyLogin from '@/models/login';
import serviceLogin from '@/services/login.service';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function requestLogin() {
    const body: BodyLogin = {
      username: email,
      password
    }

    const result = await serviceLogin(body)

    setToken(result)
  }

  useEffect(() => {
    if (token && token !== '') {
      localStorage.setItem('token', token)
      Router.push('/home')
    }
  }, [token])

  return (
    <div className='login-panel'>
      <div>
      <FormControl sx={{ m: 1, width: '40ch' }} variant='outlined'>
        <TextField id='email' label='E-mail' onChange={e => { setEmail(e.target.value) }}/>
      </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '40ch' }} variant='outlined'>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            onChange={e => { setPassword(e.target.value) }}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={ handleClickShowPassword }
                  onMouseDown={ handleMouseDownPassword }
                  edge='end'
                >
                  { showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
      </div>
      <Button variant='contained' size='small' onClick={requestLogin}>Acessar</Button>
    </div>
  )
}