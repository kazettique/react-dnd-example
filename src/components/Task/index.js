import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { useDrag } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  taskData: PropTypes.object,
  taskIndex: PropTypes.number,
  columnName: PropTypes.string,
}

function Task(props) {
  const { taskData, taskIndex, columnName } = props
  const { content, id } = taskData

  const taskRef = useRef(null)

  const [, drag, preview] = useDrag({
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


  return (
    <div className='task' ref={preview(drag(taskRef))}>
      <strong>[IT-{id}]</strong>
      <p>{content}</p>
    </div>
  )
}

export default Task
