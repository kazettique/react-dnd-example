import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Task from '../Task'
import DummyTask from '../DummyTask'
import './style.css'
import { TASK_STATUS_NAME, ITEM_TYPE } from '../../constants'
import { useDrop } from 'react-dnd'
import { ContentContext } from '../../context'

export const propTypes = {
  columnList: PropTypes.array,
  columnIndex: PropTypes.number,
  columnName: PropTypes.string,
  // changeTaskStatus: PropTypes.func,
  // sortTaskList: PropTypes.func,
}

function Column(props) {
  const { columnList = [], columnIndex } = props
  const { addToTaskList } = useContext(ContentContext)
  // console.log(columnList)
  const columnTitle = TASK_STATUS_NAME[columnIndex]

  const [collectedProps, drop] = useDrop({
    accept: ITEM_TYPE.TASK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) return
      // console.log(item)
      // console.log(monitor.getItem())
      const sourceTaskIndex = monitor.getItem().taskIndex
      const sourceColumnIndex = monitor.getItem().columnIndex
      const targetColumnIndex = columnIndex
      addToTaskList({ sourceTaskIndex, sourceColumnIndex, targetColumnIndex })
    },
    // hover: (item, monitor) => {
    //   console.log('hello')
    // },
    canDrop: (item, monitor) => {
      return monitor.getItem().columnIndex !== columnIndex
    },
    collect: (monitor) => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop()),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const { isOver, canDrop, isOverCurrent } = collectedProps

  return (
    <div className="column" ref={drop} data-is-over={isOver && isOverCurrent} data-can-drop={canDrop}>
      <h3 className="column-title">{columnTitle}</h3>
      {columnList.map((task, taskIndex) => {
        return <Task key={task.id} task={task} columnIndex={columnIndex} taskIndex={taskIndex} />
      })}
      <DummyTask />
    </div>
  )
}

export default Column
