import React, { useState, useEffect } from 'react'
import Column from '../Column'
import './style.css'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { initialTaskLists } from '../../initialTasks'
import { ContentContext } from '../../context'
import _ from 'lodash'

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)
  useEffect(() => { 
    console.log('%c STATE %c taskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#61dafb; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e', taskList)
  }
  , [taskList])
  

  const addToTaskList = ({ sourceTaskIndex, sourceColumnIndex, targetColumnIndex }) => {
    console.log('%c FUNCTION CALL %c addToTaskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#BF6D65; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
    let newTaskList = _.cloneDeep(taskList)
    let task = newTaskList[sourceColumnIndex][sourceTaskIndex]
    newTaskList[sourceColumnIndex].splice(sourceTaskIndex, 1)
    newTaskList[targetColumnIndex].push(task)
    setTaskList(newTaskList)
  }

  const insertToTaskList = ({ sourceTaskIndex, sourceColumnIndex, targetTaskIndex, targetColumnIndex }) => {
    console.log('%c FUNCTION CALL %c insertToTaskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#038C8C; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff')
    let newTaskList = _.cloneDeep(taskList)
    let task = newTaskList[sourceColumnIndex][sourceTaskIndex]
    newTaskList[sourceColumnIndex].splice(sourceTaskIndex, 1)
    newTaskList[targetColumnIndex].splice(targetTaskIndex, 0, task)
    setTaskList(newTaskList)
  }

  const sortTaskList = ({ sourceTaskIndex, targetTaskIndex, sourceColumnIndex }) => {
    console.log('%c FUNCTION CALL %c sortTaskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#F2D785; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e')
    let newTaskList = _.cloneDeep(taskList)
    let currentTaskList = newTaskList[sourceColumnIndex]
    let task = currentTaskList[sourceTaskIndex]
    currentTaskList[sourceTaskIndex] = currentTaskList[targetTaskIndex]
    currentTaskList[targetTaskIndex] = task
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
