import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export const propTypes = {
  task: PropTypes.object,
}

function Task(props) {
  const { task } = props
  const { content, id } = task
  // console.log(task)

  return (
    <div className='task'>
      <strong>[IT-{id}]</strong>
      <p>{content}</p>
    </div>
  )
}

export default Task
