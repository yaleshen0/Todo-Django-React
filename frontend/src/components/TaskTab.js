export default function TaskTab({ completedView, setCompletedView }) {
  
    return (
      <div className="nav nav-tabs nav-item">
        <span 
            className={completedView ? "nav-link" : "nav-link active"}
            onClick={()=>setCompletedView(false)}
        >
          Incomplete
        </span>
        <span 
            className={completedView ? "nav-link active" : "nav-link"}
            onClick={()=>setCompletedView(true)}
        >
          Complete
        </span>
      </div>
    )
  }