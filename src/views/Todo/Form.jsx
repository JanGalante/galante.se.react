import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const Form = ({ addTask }) => {
  const [newTask, setNewTask] = useState(() => ({
    title: undefined,
    completed: false,
    // description: 'Description',

  }));

  // generic change handler for text input as well as switch
  const handleChange = (event) => {
    console.log(newTask)

    const value = event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value

    setNewTask({
      ...newTask,
      [event.target.name]: value
    })
  };

  const onSubmit = async (event) => {
    // Prevent the form from refreshing the page
    event.preventDefault()
    
    console.log({add: newTask})
    addTask(newTask);

    setNewTask({
      title: '',
      completed: false,
    });
  }

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField 
          id="title"
          name="title"
          value={newTask.title}
          placeholder="What needs to be done"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          style={{'width': '100%'}}
        />
      </form>
    </>
  );
};

export default Form;