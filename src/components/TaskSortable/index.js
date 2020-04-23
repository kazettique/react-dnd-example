import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  children: PropTypes.node,
  taskIndex: PropTypes.number,
  columnIndex: PropTypes.number,
  sortTaskList: PropTypes.func,
}


function TaskSortable(props) {
  const { children, taskIndex, columnIndex, sortTaskList } = props

  const taskRef = useRef(null)

  const [, drag, preview] = useDrag({
    item: {
      // id: taskData.id,
      type: ITEM_TYPE.COLUMN,
      taskIndex,
    },
    // begin: monitor => {},
    // end: (item, monitor) => {},
    // isDragging: monitor => {},
    collect: monitor => ({
      canDrag: Boolean(monitor.canDrag()),
      isDragging: Boolean(monitor.isDragging()),
      didDrop: Boolean(monitor.didDrop()),
    }),
  })

  const [, drop] = useDrop({
    accept: ITEM_TYPE.COLUMN,
    hover: (item, monitor) => {
      // 異常處理判斷
      if (!taskRef.current) return
      if (!monitor.canDrop()) return

      // 拖拽目標的Index
      const dragTaskIndex = item.taskIndex
      // 放置目標Index
      const dropTaskIndex = taskIndex

      // 如果拖拽目標和放置目標相同的話，停止執行
      if (dragTaskIndex === dropTaskIndex) return {}

      // 執行交換位置的方法
      sortTaskList({ dragTaskIndex, dropTaskIndex, columnIndex })
      item.taskIndex = dropTaskIndex
    },
    // drop: (item, monitor) => {},
    canDrop: (item, monitor) => {
      const dragTaskIndex = item.taskIndex
      const dropTaskIndex = taskIndex
      // 若 hover 為自己，則 canDrop 設為 false，不顯示 DnD 插入線
      const isMySelf = dragTaskIndex === dropTaskIndex
      return !isMySelf
    },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop()),
    }),
  })

  drag(drop(taskRef))

  return (
    <>
      <div ref={preview(taskRef)}>
        {children}
      </div>
    </>
  )
}

export default TaskSortable