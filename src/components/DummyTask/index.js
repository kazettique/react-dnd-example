import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { ContentContext } from '../../context'
import { useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../../constants'

export const propTypes = {
  task: PropTypes.object,
  columnIndex: PropTypes.number,
  taskIndex: PropTypes.number,
}

function Task(props) {
  // const { task, columnIndex, taskIndex } = props
  const { sortTaskList, insertToTaskList } = useContext(ContentContext)

  const taskRef = useRef(null)

  const [collectedDropProps, drop] = useDrop({
    accept: ITEM_TYPE.TASK,
    drop: (item, monitor) => {
      // // 異常處理判斷
      // if (!taskRef.current) return
      // if (!monitor.canDrop()) return
      // const sourceColumnIndex = item.columnIndex
      // const sourceTaskIndex = item.taskIndex
      // const targetColumnIndex = columnIndex
      // const targetTaskIndex = taskIndex
      // // 如果拖拽目標和放置目標相同的話，停止執行
      // if (sourceColumnIndex === targetColumnIndex && sourceTaskIndex === targetTaskIndex) return {}
      // if (sourceColumnIndex === targetColumnIndex) {
      //   sortTaskList({ sourceTaskIndex, targetTaskIndex, sourceColumnIndex })
      // } else {
      //   insertToTaskList({
      //     sourceColumnIndex,
      //     sourceTaskIndex,
      //     targetColumnIndex,
      //     targetTaskIndex,
      //   })
      // }
      // item.itemIndex = hoverIndex
    },
    // canDrop: (item, monitor) => {
    //   const sourceColumnIndex = item.columnIndex
    //   const sourceTaskIndex = item.taskIndex
    //   const targetColumnIndex = columnIndex
    //   const targetTaskIndex = taskIndex
    //   // 若 hover 為自己，則 canDrop 設為 false，不顯示 DnD 插入線
    //   const isMySelf = sourceColumnIndex === targetColumnIndex && sourceTaskIndex === targetTaskIndex
    //   // 若 hover 為下一個 item，則 canDrop 設為 false，因 hover 的樣式為 border-top
    //   const isTheNextOne = sourceColumnIndex === targetColumnIndex && sourceTaskIndex - targetTaskIndex === -1

    //   return !(isMySelf || isTheNextOne)
    // },
    collect: (monitor) => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop()),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const { isOver, canDrop } = collectedDropProps

  return <div className="task" ref={drop(taskRef)} data-is-over={isOver && canDrop} />
}

export default Task
