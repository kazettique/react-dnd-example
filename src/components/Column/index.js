import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task'
import './style.css'
import { useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'
import TaskSortable from '../TaskSortable/'

export const propTypes = {
  columnList: PropTypes.array,
  columnName: PropTypes.string,
  changeTaskStatus: PropTypes.func,
  sortTaskList: PropTypes.func,
}

function Column(props) {
  const { columnList = [], columnName = "", changeTaskStatus, sortTaskList } = props

  const [collectedProps, drop] = useDrop({
    accept: [ITEM_TYPE.COLUMN, ITEM_TYPE.TASK],
    drop: (item, monitor) => {
      // console.log(item)
      // console.log(monitor.getItem())
      if (item.currentColumn === columnName) return
      changeTaskStatus({ moveTask: item, targetColumn: columnName })
    },
    // hover: (item, monitor) => { },
    // canDrop: (item, monitor) => {
    //   console.log(item)
    //   console.log(monitor.getItem())
      // return item.currentColumn !== columnName
      // const dragTaskIndex = item.taskIndex
      // const dropTaskIndex = taskIndex
      // 若 hover 為自己，則 canDrop 設為 false，不顯示 DnD 插入線
      // const isMySelf = dragTaskIndex === dropTaskIndex
      // return !isMySelf
    // },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop())
    }),
  })

  const { isOver, canDrop } = collectedProps
  // console.log(canDrop)

  return (
    <div className='column' ref={drop} data-is-over={isOver && canDrop} data-is-droppable={canDrop}>
      <h3 className='column-title'>{columnName}</h3>
      {columnList.map((task, taskIndex) => {
        return (
          <TaskSortable key={task.id} taskData={task} taskIndex={taskIndex} sortTaskList={sortTaskList} columnName={columnName}>
            <Task key={task.id} taskData={task} taskIndex={taskIndex} columnName={columnName} />
          </TaskSortable>
        )
      })}
    </div>
  )
}

export default Column