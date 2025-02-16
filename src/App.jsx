import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("High");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterDate, setFilterDate] = useState("Default");

  const addTask = () => {
    if (newTask.trim() !== "" && newTaskStartDate !== "" && newTaskEndDate !== "") {
      const newTaskItem = {
        id: Date.now(),
        text: newTask,
        startDate: newTaskStartDate,
        endDate: newTaskEndDate,
        priority: newTaskPriority,
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
      setNewTaskStartDate("");
      setNewTaskEndDate("");
      setNewTaskPriority("High");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
    setEditedStartDate(task.startDate);
    setEditedEndDate(task.endDate);
    setEditedPriority(task.priority);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editedText, startDate: editedStartDate, endDate: editedEndDate, priority: editedPriority }
          : task
      )
    );
    setEditingTaskId(null);
  };

  const filteredTasks = tasks
    .filter(task => filterPriority === "All" || task.priority === filterPriority)
    .sort((a, b) => {
      if (filterDate === "StartDate") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (filterDate === "EndDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      return 0;
    });

  return (
    <div className="app-container">
      <nav className="navbar">
      <img src="/lex.png" alt="Logo" style={{ width: "150px", marginRight: "10px" }} />
      </nav>

        <div className="content flex-grow-1 p-4">
      <h1 className="text">To-Do List</h1>
      <div className="task-input mb-4 d-flex gap-2 align-items-center">
        <div className="position-relative">
          <label className="form-label mb-0">Task Name:</label>
          <input type="text" className="form-control" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter Task Name"/>
        </div>

        <div className="position-relative">
        <label className="form-label mb-0">Start Date:</label>
        <div className="position-relative">
          <input id="startDate" type="date" className="form-control pe-5" value={newTaskStartDate} onChange={(e) => setNewTaskStartDate(e.target.value)}/>
          <img src="/calendar-fill.svg" className="calendar-icon position-absolute end-0 me-2" alt="Calendar" onClick={() => document.getElementById("startDate").showPicker()}/>
        </div>
      </div>

        <div className="position-relative">
          <label className="form-label mb-0">End Date:</label>
          <input id="endDate" input type="date" className="form-control pe-5" value={newTaskEndDate} onChange={(e) => setNewTaskEndDate(e.target.value)}/>
          <img src="/calendar-fill.svg" className="calendar-icon position-absolute end-0 me-2" alt="Calendar" onClick={() => document.getElementById("endDate").showPicker()}/>
        </div>

        <div className="position-relative">
          <label className="form-label mb-0">Priority:</label>
          <select className="form-select" value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button className="btn add" onClick={addTask}>Add</button>
      </div>


        {/* Filters Section */}
        <div className="filter d-flex gap-3 align-items-center">
          <div>
            <label>Filter by Priority: </label>
            <select className="form-select w-auto d-inline-block ms-2" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label>Sort by Date: </label>
            <select className="form-select w-auto d-inline-block ms-2" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
              <option value="Default">Default</option>
              <option value="StartDate">Start Date</option>
              <option value="EndDate">End Date</option>
            </select>
          </div>
        </div>

        <ul className="task-list list-group">{filteredTasks.map(task => (
  <li key={task.id} className={`task-item list-group-item d-flex justify-content-between align-items-center p-3 mb-2 rounded shadow-sm border-start ${
    task.priority === "High" ? "border-danger" : task.priority === "Medium" ? "border-warning" : "border-success"}`}>
    {editingTaskId === task.id ? (
      <>
        <input type="text" className="form-control me-2" value={editedText} onChange={e => setEditedText(e.target.value)} />
        <input type="date" className="form-control me-2" value={editedStartDate} onChange={e => setEditedStartDate(e.target.value)} />
        <input type="date" className="form-control me-2" value={editedEndDate} onChange={e => setEditedEndDate(e.target.value)} />
        <select className="form-select me-2" value={editedPriority} onChange={e => setEditedPriority(e.target.value)}>
          <option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option>
        </select>
        <button className="btn btn-success btn-sm px-3" onClick={() => saveEdit(task.id)}>✔</button>
      </>
    ) : (
      <>
        <span className="task-text flex-grow-1">{task.text}</span>
        <span className="task-date">{task.startDate} - {task.endDate}</span>
        <span className={`task-priority badge ${task.priority === "High" ? "high" : task.priority === "Medium" ? "medium" : "low"}`}>
          {task.priority}
        </span>
        <div className="task-actions">

        <button className="edit-btn me-2" onClick={() => startEditing(task)}>
          <img src="/pencil-fill.svg"/>
        </button>
        <button className="trash-btn" onClick={() => deleteTask(task.id)}>
          <img src="/trash3.svg"/>
        </button>
        </div>
      </>
    )}
  </li>
))}</ul>

      </div>
    </div>
  );
};

export default App;

