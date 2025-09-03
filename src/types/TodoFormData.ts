export interface TodoFormData {
  title: string
  todos: { text: string }[]
}

export interface TodoItem {
  text: string
  completed: boolean
  completed_by: string | null
  completed_at: string | null
}

export type TodoListData = {
  title: string
  todos: {
    completed_by: string | null
    text: string
    completed: boolean
    completedBy?: string
  }[]
  expires_at?: string
}
