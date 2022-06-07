import { FormControl, List, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { db } from './firebase';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { TaskItem } from './TaskItem';
import { makeStyles } from '@material-ui/styles';
import { auth } from './firebase';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '40%',
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push("/");
    });
    return () => unSub();
  });

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <button
        className={styles.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            history.push("/login");
          } catch (err: any) {
            alert(err.message);
          }
        }}><ExitToApp /></button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="New Task"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask} className={styles.app__icon}>
        <AddToPhotosIcon />
      </button>
      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} title={task.title} id={task.id} />
        ))}
      </List>
    </div>
  );
};

export default App;
