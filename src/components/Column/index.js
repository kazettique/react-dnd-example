import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task'
import './style.css'
import TaskSortable from '../TaskSortable/'
import TaskDraggable from '../TaskDraggable'

export const propTypes = {
  columnList: PropTypes.array,
  columnIndex: PropTypes.number,
  columnName: PropTypes.string,
  // changeTaskStatus: PropTypes.func,
  sortTaskList: PropTypes.func,
}

function Column(props) {
  const { columnList = [], columnIndex, columnName = "", sortTaskList } = props
  // console.log(columnList)

  return (
    <div className='column'>
      <h3 className='column-title'>{columnName}</h3>
      {columnList.map((task, taskIndex) => {
        return (
          <TaskDraggable key={task.id}>
            <TaskSortable taskIndex={taskIndex} columnIndex={columnIndex} sortTaskList={sortTaskList} >
              <Task task={task} />
            </TaskSortable>
          </TaskDraggable>
        )
      })}
    </div>
  )
}

export default Column
