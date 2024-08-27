import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type User = {
  id: string;
  name: string;
  email: string;
};
export type UserState = {
  users: User[];
  currentUserId: string | null;
};

export type UserActions = {
  addUser: (name: string, email: string) => void;
  removeUser: (id: string) => void;
  setCurrentUser: (id: string | null) => void;
};

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[]
  draggedTask: string | null
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  dragTask: (id: string | null) => void
  removeTask: (title: string) => void
  updateTask: (title: string, status: Status) => void
}

export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      tasks: [],
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
      updateTask: (id: string, status: Status) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        }))
    }),
    { name: 'task-store', skipHydration: true }
  )
)


export const useUserStore = create<UserState & UserActions>()(
  persist(
    set => ({
      users: [],
      currentUserId: null,
      addUser: (name: string, email: string) =>
        set(state => ({
          users: [
            ...state.users,
            { id: uuid(), name, email }
          ]
        })),
      removeUser: (id: string) =>
        set(state => ({
          users: state.users.filter(user => user.id !== id)
        })),
      setCurrentUser: (id: string | null) => set({ currentUserId: id })
    }),
    { name: 'user-store', skipHydration: true }
  )
);