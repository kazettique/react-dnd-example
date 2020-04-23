import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  children: PropTypes.node,
  columnList: PropTypes.array,
  columnIndex: PropTypes.number,
  changeTaskStatus: PropTypes.func,
  // sortTaskList: PropTypes.func,
}

function TaskDroppable(props) {
  const { children, columnIndex, changeTaskStatus } = props

  const [collectedProps, drop] = useDrop({
    accept: ITEM_TYPE.COLUMN,
    // accept: ITEM_TYPE.COLUMN,
    drop: (item, monitor) => {
      if (item.currentColumn === columnIndex) return
      changeTaskStatus({ moveTask: item, targetColumn: columnIndex })
    },
    // hover: (item, monitor) => { },
    // canDrop: (item, monitor) => item.currentColumn !== columnName,
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop())
    }),
  })

  const { isOver, canDrop } = collectedProps

  return (
    <div ref={drop} data-is-over={isOver && canDrop} data-is-droppable={canDrop}>
      {children}
    </div>
  )
}

export default TaskDroppable
