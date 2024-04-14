import React, { Component } from 'react'
import './Header.css'
import Button from './Button'

export default class Header extends Component {
  render() {
    return (
      <header className="bg-dark text-white py-2" id="my-header">

        <section className="container d-flex justify-content-between align-items-center py-2">

          <h1 id="header-title" className="m-0 p-0">ToDo App</h1>

          {/* task division buttons */}
          <article id="todo-divisions" className="d-flex justify-content-between">
            <Button type="daily-btn">Daily</Button>
            <Button type="weekly-btn">Weekly</Button>
            <Button type="monthly-btn">Monthly</Button>
          </article>

        </section>

      </header>
    )
  }
}
