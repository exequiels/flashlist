import config from '../config'
import type { TodoFormData, TodoListData } from '../types/TodoFormData'

export const generateTodoList = async (
  formData: TodoFormData
): Promise<string> => {
  const response = await fetch(`${config.VITE_BACKEND_URL}/api/todo-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const result = await response.json()

  if (!response.ok) {
    if (response.status === 422) {
      const errorMessages = Object.values(result.errors).flat()
      throw new Error(errorMessages.join(', '))
    }
    if (response.status === 429) {
      throw new Error(
        result.message || 'Demasiadas solicitudes, por favor esperá un momento.'
      )
    }
    throw new Error(result.error || 'Error creando lista')
  }

  return result.url
}

export const updateTodo = async (
  shortCode: string,
  index: number,
  userName?: string
) => {
  const response = await fetch(
    `${config.VITE_BACKEND_URL}/api/todo-list/${shortCode}/lista/${index}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user_name: userName }),
    }
  )

  if (!response.ok) {
    throw new Error('Error actualizando la tarea')
  }

  return response.json()
}

export const getTodoList = async (shortCode: string): Promise<TodoListData> => {
  const response = await fetch(
    `${config.VITE_BACKEND_URL}/api/todo-list/${shortCode}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Lista no encontrada o expirada')
    }
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  // return response.json()
  const result = await response.json()
  // console.log('gettodo', result)

  return result
}
