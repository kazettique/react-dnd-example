import { TASK_STATUS } from './constants'

const initialTasks = [
  {
    id: 100,
    content: 'Code Refinement',
    status: TASK_STATUS.TODO,
  },
  {
    id: 102,
    content: 'Study Vue',
    status: TASK_STATUS.TODO,
  },
  {
    id: 103,
    content: 'Add RWD',
    status: TASK_STATUS.TODO,
  },
  {
    id: 104,
    content: 'Fix IE bugs',
    status: TASK_STATUS.TODO,
  },
  {
    id: 105,
    content: 'Study React-beautiful-DnD',
    status: TASK_STATUS.TODO,
  },
  {
    id: 106,
    content: 'Write testing',
    status: TASK_STATUS.TODO,
  }
]

const initialTaskLists = {
  [TASK_STATUS.TODO]: [
    {
      id: 100,
      content: 'Code Refinement',
    },
    {
      id: 102,
      content: 'Study Vue',
    },
    {
      id: 103,
      content: 'Add RWD',
    },
  ],
  [TASK_STATUS.IN_PROGRESS]: [
    {
      id: 104,
      content: 'Fix IE bugs',
    },
    {
      id: 105,
      content: 'Study React-beautiful-DnD',
    },
  ],
  [TASK_STATUS.DONE]: [
    {
      id: 106,
      content: 'Write testing',
    }
  ],

}

export {
  initialTasks,
  initialTaskLists
}