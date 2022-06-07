import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom';

export const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && history.push('/');
    });
    return () => unSub();
  }, [history]);

  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="password"
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  history.push('/');
                } catch (err: any) {
                  alert(err.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  history.push('/');
                } catch (err: any) {
                  alert(err.message);
                }
              }
        }>
        {isLogin ? 'Login' : 'Register'}
      </Button>
      <br />
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create new account' : 'Back to login'}
        </span>
      </Typography>
    </div>
  );
};
