import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import Column from '../Column'
import { TASK_STATUS } from '../../constants'
import './style.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { initialTaskLists } from '../../initialTasks'

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)
  const { todo: todoList, inProgress: inProgressList, done: doneList } = taskList
  // console.log(taskList)

  const changeTaskStatus = ({ moveTask, targetColumn }) => {
    const currentColumn = moveTask.currentColumn
    const currentColumnList = [...taskList[currentColumn]]
    const task = currentColumnList.splice(moveTask.taskIndex, 1)
    const newTargetColumn = [...taskList[targetColumn]]
    newTargetColumn.push(...task)
    setTaskList(prevState => ({
      ...prevState,
      [moveTask.currentColumn]: currentColumnList,
      [targetColumn]: newTargetColumn
    }))
  }

  const sortTaskList = ({ dragTaskIndex, dropTaskIndex, columnName }) => {
    const newColumnList = [...taskList[columnName]]
    const taskHolder = newColumnList[dragTaskIndex]
    newColumnList[dragTaskIndex] = newColumnList[dropTaskIndex]
    newColumnList[dropTaskIndex] = taskHolder

    setTaskList(prevState => ({
      ...prevState,
      [columnName]: newColumnList
    }))
  }


  return (
    <DndProvider backend={Backend}>
      <div className='board'>
        <Column columnList={todoList} columnName={TASK_STATUS.TODO} changeTaskStatus={changeTaskStatus} sortTaskList={sortTaskList} />
        <Column columnList={inProgressList} columnName={TASK_STATUS.IN_PROGRESS} changeTaskStatus={changeTaskStatus} sortTaskList={sortTaskList} />
        <Column columnList={doneList} columnName={TASK_STATUS.DONE} changeTaskStatus={changeTaskStatus} sortTaskList={sortTaskList} />
      </div>
    </DndProvider>
  )
}

export default Board

