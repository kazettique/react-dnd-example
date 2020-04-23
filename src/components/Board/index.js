import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import Column from '../Column'
import { TASK_STATUS_NAME } from '../../constants'
import './style.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { initialTaskLists } from '../../initialTasks'
import TaskDroppable from '../TaskDroppable'

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)
  // const { todo: todoList, inProgress: inProgressList, done: doneList } = taskList
  // console.log(taskList)

  const changeTaskStatus = ({ moveTask, targetColumn }) => {
    // console.log(moveTask)
    // const currentColumn = moveTask.currentColumn
    // const currentColumnList = [...taskList[currentColumn]]
    // console.log(currentColumnList)
    // console.log(moveTask.taskIndex)
    // const task = currentColumnList.splice(moveTask.taskIndex, 1)
    // console.log(currentColumnList)
    // const newTargetColumn = [...taskList[targetColumn]]
    // newTargetColumn.push(...task)
    // setTaskList(prevState => ({
    //   ...prevState,
    //   [moveTask.currentColumn]: currentColumnList,
    //   [targetColumn]: newTargetColumn
    // }))
  }

  const sortTaskList = ({ dragTaskIndex, dropTaskIndex, columnIndex }) => {
    let newTaskList = [...taskList]
    let taskListHolder = newTaskList[columnIndex]
    let taskHolder = taskListHolder[dragTaskIndex]
    taskListHolder[dragTaskIndex] = taskListHolder[dropTaskIndex]
    taskListHolder[dropTaskIndex] = taskHolder
    setTaskList(newTaskList)
  }

  return (
    <DndProvider backend={Backend}>
      <div className='board'>
        {taskList.map((columnList, columnIndex) => (
          <TaskDroppable key={TASK_STATUS_NAME[columnIndex]} columnIndex={columnIndex} changeTaskStatus={changeTaskStatus}>
            <Column
              columnList={columnList}
              columnIndex={columnIndex}
              columnName={TASK_STATUS_NAME[columnIndex]}
              sortTaskList={sortTaskList}
            />
          </TaskDroppable>
        )
        )}
      </div>
    </DndProvider>
  )
}

export default Board

