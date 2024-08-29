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
  removeTask: (id: string) => void
  updateTask: (id: string, status: Status) => void
}

export type Product = {
  id: string
  name: string
  price: number
  description?: string
}

export type ProductState = {
  products: Product[]
}

export type ProductActions = {
  addProduct: (name: string, price: number, description?: string) => void
  removeProduct: (id: string) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
}

// Common function to create stores
const createStore = <TState, TActions>(initialState: TState, actions: (set: any) => TActions, name: string) =>
  create<TState & TActions>()(
    persist(
      (set) => ({
        ...initialState,
        ...actions(set)
      }),
      { name, skipHydration: true }
    )
  );

export const useTaskStore = createStore<State, Actions>(
  { tasks: [], draggedTask: null },
  (set) => ({
    addTask: (title: string, description?: string) =>
      set((state: State) => ({
        tasks: [
          ...state.tasks,
          { id: uuid(), title, description, status: 'TODO' }
        ]
      })),
    dragTask: (id: string | null) => set({ draggedTask: id }),
    removeTask: (id: string) =>
      set((state: State) => ({
        tasks: state.tasks.filter((task: Task) => task.id !== id)
      })),
    updateTask: (id: string, status: Status) =>
      set((state: State) => ({
        tasks: state.tasks.map((task: Task) =>
          task.id === id ? { ...task, status } : task
        )
      }))
  }),
  'task-store'
);

export const useUserStore = createStore<UserState, UserActions>(
  { users: [], currentUserId: null },
  (set) => ({
    addUser: (name: string, email: string) =>
      set((state: UserState) => ({
        users: [
          ...state.users,
          { id: uuid(), name, email }
        ]
      })),
    removeUser: (id: string) =>
      set((state: UserState) => ({
        users: state.users.filter((user: User) => user.id !== id)
      })),
    setCurrentUser: (id: string | null) => set({ currentUserId: id })
  }),
  'user-store'
);

export const useProductStore = createStore<ProductState, ProductActions>(
  { products: [] },
  (set) => ({
    addProduct: (name: string, price: number, description?: string) =>
      set((state: ProductState) => ({
        products: [
          ...state.products,
          { id: uuid(), name, price, description }
        ]
      })),
    removeProduct: (id: string) =>
      
      set((state: ProductState) => ({
        products: state.products.filter((product: Product) => product.id !== id)
      })),
    updateProduct: (id: string, updates: Partial<Product>) =>
      set((state: ProductState) => ({
        products: state.products.map((product: Product) =>
          product.id === id ? { ...product, ...updates } : product
        )
      }))
  }),
  'product-store'
);
