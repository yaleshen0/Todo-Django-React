import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'; 

import TaskRow from './components/TaskRow';
import TaskTab from './components/TaskTab';
import CustomModal from './components/CustomModal';

function TaskTable() {
  const [tasks, setTasks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState({
    title: '',
    description: '',
    completed: false,
  });
  // Incompleted: 0 Completed: 1 All: 2
  const [completedView, setCompletedView] = useState(false);
  
  // const [displayCompleted, setDisplayCompleted] = useState(false)

  useEffect(() => {
    fetch('/api/todos/')
        .then(response => response.json())
        .then(data => setTasks(data));
  }, []);

  function Refresh () {
    fetch('/api/todos/')
        .then(response => response.json())
        .then((data) => setTasks(data));
  }

  function onSave() {
    setShowModal(!showModal);
    if (activeTask.id) {
      axios
        .put(`/api/todos/${activeTask.id}/`, activeTask)
        .then(() => Refresh());
      return;
    }
    axios.post('/api/todos/', activeTask)
    .then(()=>Refresh());
  }

  function createTask() {
    setActiveTask({
      title: '',
      description: '',
      completed: false,
    })
    setShowModal(!showModal)
  }

  return (
    <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button 
                  className='btn btn-primary'
                  onClick={()=>createTask()}
                >
                  Add task
                </button>
            </div>
          </div>
          <TaskTab completedView={completedView} setCompletedView={setCompletedView} />

          <ul className="list-group list-group-flush border-top-0">
              {
                tasks?.filter((t) => t.completed === completedView)
                    ?.map((task, id)=>{
                    return <TaskRow
                            key={id}
                            activeTask={task}
                            setActiveTask={setActiveTask}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            Refresh={Refresh}
                            completedView={completedView}
                          /> 
                })
              }
              
          </ul>
        </div>
      </div>
      {showModal && 
            <CustomModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                activeTask={activeTask} 
                setActiveTask={setActiveTask} 
                setTasks={setTasks}
                onSave={onSave}
                />}
    </main>
  )
}

export default function App() {
  return <TaskTable />
}