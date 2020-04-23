import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import Column from '../Column'
// import { TASK_STATUS_NAME } from '../../constants'
import './style.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { initialTaskLists } from '../../initialTasks'
// import TaskDroppable from '../TaskDroppable'
import { ContentContext } from '../../context'
import _ from 'lodash'

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)

  const addToTaskList = ({ sourceTaskIndex, sourceColumnIndex, targetColumnIndex }) => {
    // console.log('add')
    let newTaskList = _.cloneDeep(taskList)
    let task = newTaskList[sourceColumnIndex][sourceTaskIndex]
    newTaskList[sourceColumnIndex].splice(sourceTaskIndex, 1)
    newTaskList[targetColumnIndex].push(task)
    setTaskList(newTaskList)
  }

  const insertToTaskList = ({ sourceTaskIndex, sourceColumnIndex, targetTaskIndex, targetColumnIndex }) => {
    // console.log('insert')
    let newTaskList = _.cloneDeep(taskList)
    let task = newTaskList[sourceColumnIndex][sourceTaskIndex]
    newTaskList[sourceColumnIndex].splice(sourceTaskIndex, 1)
    newTaskList[targetColumnIndex].splice(targetTaskIndex, 0, task)
    setTaskList(newTaskList)
  }

  const sortTaskList = ({ sourceTaskIndex, targetTaskIndex, sourceColumnIndex }) => {
    console.log('sort')
    let newTaskList = _.cloneDeep(taskList)
    let task = newTaskList[sourceColumnIndex][sourceTaskIndex]
    let currentTaskList = newTaskList[sourceColumnIndex]
    currentTaskList.splice(sourceColumnIndex, 1)
    currentTaskList = [...currentTaskList.slice(0, targetTaskIndex), task, ...currentTaskList.slice(targetTaskIndex)]
    newTaskList[sourceColumnIndex] = currentTaskList
    setTaskList(newTaskList)
  }

  const context = { addToTaskList, insertToTaskList, sortTaskList }

  return (
    <DndProvider backend={Backend}>
      <ContentContext.Provider value={context}>
        <div className="board">
          {taskList.map((columnList, columnIndex) => (
            <Column key={columnIndex} columnList={columnList} columnIndex={columnIndex} sortTaskList={sortTaskList} />
          ))}
        </div>
      </ContentContext.Provider>
    </DndProvider>
  )
}

export default Board
