import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  children: PropTypes.node,
  taskData: PropTypes.object,
  taskIndex: PropTypes.number,
  columnName: PropTypes.string,
  sortTaskList: PropTypes.func,
}


function TaskSortable(props) {
  const { children, taskData, taskIndex, sortTaskList, columnName } = props

  const itemRef = useRef(null)

  const [collectedDragProps, drag, preview] = useDrag({
    item: {
      id: taskData.id,
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

  const { isDragging } = collectedDragProps

  const [collectedDropProps, drop] = useDrop({
    accept: ITEM_TYPE.COLUMN,
    hover: (item, monitor) => {
      // console.log(item.taskIndex)
      // console.log(taskIndex)
      
      // 異常處理判斷
      if (!itemRef.current) return
      if (!monitor.canDrop()) return

      // 拖拽目標的Index
      const dragTaskIndex = item.taskIndex
      // 放置目標Index
      const dropTaskIndex = taskIndex

      // 如果拖拽目標和放置目標相同的話，停止執行
      if (dragTaskIndex === dropTaskIndex) return {}

      // 執行交換位置的方法
      sortTaskList({ dragTaskIndex, dropTaskIndex, columnName })
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

  const { isOver, canDrop } = collectedDropProps

  drag(drop(itemRef))

  return (
    <div ref={preview(itemRef)}>
      {children}
    </div>
  )
}

export default TaskSortable