import axios from "axios";

export default function TaskRow({ activeTask, setActiveTask, showModal, setShowModal, Refresh, completedView }) {
    function editTask() {
      // this.setState({ activeItem: item, modal: !this.state.modal });
      setActiveTask(activeTask);
      setShowModal(!showModal);
    };
  
    function onDelete() {
      axios
        .delete(`/api/todos/${activeTask.id}/`)
        .then(() => Refresh());
    }
  
    return (
      <li
          key={activeTask.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
              className={`todo-title mr-2 col-8 ${completedView ? "completed" : ""}`}
              title={activeTask.description}>
            {activeTask.title}
          </span>
          <button 
            className='btn btn-secondary mr-2'
            onClick={()=>editTask(activeTask)}
            >
            Edit
          </button>
          <button 
            className='btn btn-danger mr-2'
            onClick={onDelete}
            >
            Delete
          </button>
      </li>
    )
  }