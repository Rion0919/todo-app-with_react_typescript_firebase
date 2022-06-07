import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import { Grid, ListItem, TextField } from '@material-ui/core';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import { EditOutlined } from '@material-ui/icons';
import { db } from './firebase';

interface PROPS {
  id: string;
  title: string;
}

export const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button onClick={editTask} className={styles.taskitem__icon}>
        <EditOutlined />
      </button>
      <button onClick={deleteTask} className={styles.taskitem__icon}>
        <DeleteOutlineOutlined />
      </button>
    </ListItem>
  );
};
