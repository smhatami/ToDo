import React, { Component } from 'react'

export default class Task extends Component {

    render() {
        return (

            <article className={`task shadow-out ${this.props.bg}`}>
                <p className='task-title m-0'>
                    {this.props.title}
                    <span className='task-iconbox ml-4'>
                        <i className="fa fa-check mr-2 pointer check-icon" onClick={(event)=>this.props.isChecked(event,this.props)}></i>
                        <i className="fa fa-trash pointer delete-icon" onClick={(event) => this.props.taskDelete(event, this.props)}></i>
                    </span>
                </p>
            </article>

        )
    }
}

