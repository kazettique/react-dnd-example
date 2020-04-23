import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { useDrag, useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  taskData: PropTypes.object,
  // id: PropTypes.number
  taskIndex: PropTypes.number,
  columnName: PropTypes.string,
}

function Task(props) {
  const { taskData, taskIndex, columnName } = props
  const { content, id } = taskData

  const taskRef = useRef(null)

  const [collectedDragProps, drag, preview] = useDrag({
    item: {
      id: taskData.id,
      type: ITEM_TYPE.COLUMN,
      taskIndex,
      currentColumn: columnName,
    },
    // begin: monitor => { },
    // end: (item, monitor) => { },
    // canDrag: monitor => { },
    isDragging: monitor => monitor.getItem().id === taskData.id,
    collect: monitor => ({
      isDragging: Boolean(monitor.isDragging()),
      didDrop: Boolean(monitor.didDrop()),
    }),
  })

  const { isDragging } = collectedDragProps

  // const [collectedTaskDragProps, taskDrag, taskPreview] = useDrag({
  //   item: {
  //     id: taskData.id,
  //     type: ITEM_TYPE.TASK,
  //     taskIndex,
  //     currentColumn: columnName,
  //   },
  //   // begin: monitor => { },
  //   // end: (item, monitor) => { },
  //   // canDrag: monitor => { },
  //   isDragging: monitor => monitor.getItem().id === taskData.id,
  //   collect: monitor => ({
  //     isTaskDragging: Boolean(monitor.isDragging()),
  //     didTaskDrop: Boolean(monitor.didDrop()),
  //   }),
  // })

  // const { isTaskDragging } = collectedTaskDragProps
  
  // const [collectedDropProps, drop] = useDrop({
  //   accept: ITEM_TYPE.TASK,
  //   drop: (item, monitor) => { },
  //   hover: (item, monitor) => {
  //     console.log('hello hover')
  //     // console.log(monitor.getItem())
  //     // taskListSorting({ dragIndex })
  //   },
  //   canDrop: (item, monitor) => {
  //     console.log(item)
  //     console.log(monitor.getItem())
  //     // return item.id !== monitor.getItem().id
  //   },
  //   collect: monitor => ({
  //     isOver: Boolean(monitor.isOver()),
  //     canDrop: Boolean(monitor.canDrop()),
  //   }),
  // })

  // const { isOver, canDrop } = collectedDropProps
  // console.log(canDrop)

  // drag(drop(taskRef))

  return (
    <div className='task' ref={preview(drag(taskRef))}>
      <strong>[IT-{id}]</strong>
      <p>{content}</p>
    </div>
  )
}

export default Task
