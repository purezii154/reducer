import { useReducer } from 'react';
//import { useState } from 'react';
import AddTask from './Addtask.jsx';
import TaskList from './Tasklist.jsx';
import tasksReducer from './tasksReducer.jsx';


export default function TaskApp() {
  //const [tasks, setTasks] = useState(initialTasks);
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  //function handleAddTask(text) {
    //setTasks([
      //...tasks,
      //{
        //id: nextId++,
        //text: text,
        //done: false,
      //},
    //]);
  //}

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }
  
  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }
  
  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }


  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  function tasksReducer(tasks, action) {
    if (action.type === 'added') {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    } else if (action.type === 'changed') {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    } else if (action.type === 'deleted') {
      return tasks.filter((t) => t.id !== action.id);
    } else {
      throw Error('Unknown action: ' + action.type);
    }
  }
  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
