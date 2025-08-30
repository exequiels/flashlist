import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTodoList, updateTodo } from '../services/todoService'
import type { TodoListData } from '../types/TodoFormData'
import { Checkbox } from 'primereact/checkbox'
import Countdown from './CountDown'
import { InputText } from 'primereact/inputtext'

const VerLista = () => {
  const { code } = useParams<{ code: string }>()
  const [listData, setListData] = useState<TodoListData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const localUsername = localStorage.getItem('flashUser')
    if (localUsername) {
      setUserName(localUsername)
    }
  }, [])

  useEffect(() => {
    if (userName.trim()) {
      localStorage.setItem('flashUser', userName.trim())
    }
  }, [userName])

  useEffect(() => {
    if (!code) {
      setError('Codigo no valido')
      setLoading(false)
      return
    }

    const cargarLista = async () => {
      try {
        // console.log('cargando:', code)
        setLoading(true)
        setError(null)
        const data = await getTodoList(code)
        // console.log('datos:', data)
        setListData(data)
      } catch (error) {
        // console.error('error de la lista:', error)
        setError((error as Error).message)
        setListData(null)
      } finally {
        setLoading(false)
      }
    }
    cargarLista()
  }, [code])

  const handleCheckBox = async (index: number) => {
    if (!code || !listData) return

    if (listData.todos[index].completed) return

    try {
      // console.log(`Completando tarea ${index}`)

      await updateTodo(code, index, userName.trim() || 'Anónimo')

      const updatedList = await getTodoList(code)
      setListData(updatedList)

      // console.log('Tarea completada')
    } catch (error) {
      console.error('Error:', error)
      alert('Error completando la tarea')
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return (
      <div className="text-center">
        A esta lista probablemente se le cumplieron las 24hs, crea una{' '}
        <a href="/" className="font-bold no-underline">
          nueva!
        </a>
      </div>
    )
  }

  if (!listData) {
    return <div>No hay nada para mostrar...</div>
  }

  return (
    <div className="p-3">
      <div className="centrado">
        <div className="col-12 md:col-4 mt-2 border-1">
          <div className="mb-3">
            <label className="font-bold mr-2">Tu nombre:</label>
            <InputText
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Anónimo"
              className="p-inputtext w-full"
            />
          </div>
          <label className="font-bold">{listData?.title}</label>
          {listData.expires_at && (
            <div className="border-1 mt-2 p-2">
              Tiempo restante: <Countdown expiresAt={listData.expires_at} /> hs
              <div className="mt-2">
                Completadas: {listData.todos.filter((t) => t.completed).length}{' '}
                de {listData.todos.length}
              </div>
              {listData.todos.length > 0 &&
                listData.todos.every((t) => t.completed) && (
                  <div className="text-green-600 font-semibold mt-1">
                    ¡Todas las tareas completadas!{' '}
                    <i
                      className="pi pi-trophy mt-2"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                )}
            </div>
          )}
          {listData.todos.length === 0 ? (
            <div className="text-center">Tu lista esta vacia. ¡Añade algo!</div>
          ) : (
            listData.todos.map((data, index: number) => (
              <div
                className="flex flex-row list-item border-1 w-full align-items-center p-3 mt-5 gap-2"
                key={index}
                style={{ width: '8rem' }}
              >
                <div
                  className="flex align-items-center"
                  style={{ width: '3rem' }}
                >
                  <Checkbox
                    checked={data.completed}
                    onChange={() => handleCheckBox(index)}
                  />
                </div>
                <span
                  style={{
                    textDecoration: data.completed ? 'line-through' : 'none',
                  }}
                >
                  {data.text}
                </span>
                {data.completed && data.completed_by && (
                  <div className="text-sm mt-2">
                    Completado por: <strong>{data.completed_by}</strong>
                  </div>
                )}
              </div>
            ))
          )}
          <div className="w-full text-left border-1 p-3 mt-5">
            Flashlist es solo una herramienta para listas temporales (24h)
            creadas por usuarios anónimos. No es un sitio web comercial. Usa con
            precaución y no compartas información sensible.
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerLista
