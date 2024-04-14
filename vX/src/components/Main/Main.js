import React, { Component } from 'react'
import './Main.css'
import Color from './Color'
import Task from './Task'


export default class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {

      newTask: "",
      background: "",
      tasks: []

    }

  }

  newTaskInput(event) {
    this.setState({
      newTask: event.nativeEvent.target.value
    })
  }

  bgSet(event) {
    this.setState({
      background: event.nativeEvent.target.classList[0]
    })
  }

  newTaskSubmit() {
    this.setState({
      tasks: [...this.state.tasks, { title: this.state.newTask, bg: this.state.background, id: `ID-${(Math.round((Math.random() * 10000)))}`, isChecked: false }],
      newTask: "",
      background: ""
    })
  }

  taskCheck(event, task) {

    let myTask = this.state.tasks.find(index => index.id === task.id)

    if (myTask.isChecked === false) {
      event.nativeEvent.target.parentElement.parentElement.classList.add("check")
      myTask.isChecked = true;
    } else {
      event.nativeEvent.target.parentElement.parentElement.classList.remove("check")
      myTask.isChecked = false;
    }

  }

  deleteTask(event, task){

    let myTask = this.state.tasks.find(index => index.id === task.id)
    let newTasksState = this.state.tasks.filter(elem => elem.id !== myTask.id)
    this.setState({
      tasks: newTasksState
    })

  }

  render() {

    return (

      <main className="container py-4">

        {/* new task */}
        <section className="add-newtask d-flex align-items-center">

          <input value={this.state.newTask} onChange={(event) => this.newTaskInput(event)} data-taskdivision="daily" type="text" id="newtask-input" className={`shadow rounded-pill ${this.state.background}`} placeholder="New Task ..." />

          <article className="newtask-colorbox mx-3 d-flex align-items-center">
            <Color bg='bg-purple' onClick={this.bgSet.bind(this)}></Color>
            <Color bg='bg-primary' onClick={this.bgSet.bind(this)}></Color>
            <Color bg='bg-info' onClick={this.bgSet.bind(this)}></Color>
            <Color bg='bg-orange' onClick={this.bgSet.bind(this)}></Color>
            <Color bg='bg-warning' onClick={this.bgSet.bind(this)}></Color>
          </article>

          <button type="submit" id="newtask-submit" onClick={() => this.newTaskSubmit()} className="mybtn btn-success inactive-btn">
            Submite
          </button>

        </section>

        {/* tasks */}
        <section id="task-container" className="taskbox d-flex flex-wrap align-content-start mt-4 p-2 shadow-in rounded-2">

          {this.state.tasks.map((task) => (
            <Task {...task} key={task.id} isChecked={(event, task) => this.taskCheck(event, task)} taskDelete={(event,task) => this.deleteTask(event,task)}></Task>
          ))}

        </section>

      </main>

    )
  }
}
