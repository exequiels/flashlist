import { Button } from 'primereact/button'
// import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import type { TodoFormData } from '../types/TodoFormData'
import { generateTodoList } from '../services/todoService'
import { Dialog } from 'primereact/dialog'
import config from '../config'
import { Toast } from 'primereact/toast'

interface Todo {
  text: string
  checked: boolean
}

const Todos = () => {
  const toast = useRef<Toast>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [title, setTitle] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTodos = () => {
    if (inputValue.trim() === '') return
    setTodos((prev) => [...prev, { text: inputValue.trim(), checked: false }])
    setInputValue('')
  }

  // const handleCheckBox = (index: number) => {
  //   setTodos((prev) =>
  //     prev.map((t, i) => (i === index ? { ...t, checked: !t.checked } : t))
  //   )
  // }

  const handleGenerateList = async () => {
    if (!title.trim()) {
      alert('Por favor, agrega un título a la lista')
      return
    }

    if (todos.length === 0) {
      alert('Agrega al menos un item a la lista')
      return
    }

    setLoading(true)
    setGeneratedUrl(null)

    try {
      const formData: TodoFormData = {
        title: title.trim(),
        todos: todos.map((todo) => ({ text: todo.text })),
      }

      const url = await generateTodoList(formData)
      setGeneratedUrl(url)
      setShowDialog(true)

      // console.log('Lista creada')
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!generatedUrl) {
      toast.current?.show({
        severity: 'error',
        summary: 'No se pudo copiar',
        detail: 'Fallamos y no se pudo.',
        life: 3000,
      })
      return
    }
    const fullUrl = `${generatedUrl}`
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.current?.show({
          severity: 'success',
          summary: 'Copiado',
          detail: 'Listo lo tenemos',
          life: 3000,
        })
      })
      .catch((err) => {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo copiar.',
          life: 3000,
        })
        console.error('Error al copiar: ', err)
      })
  }

  return (
    <div className="p-3">
      <div className="centrado">
        <div className="col-12 md:col-8 mt-2">
          <Toast ref={toast} />

          <div className="w-full text-left border-1 p-3 gap-3">
            Tutorial Express: Agregas items a la lista(compras, actividades de
            la casa, rutina del dia, etc.) una vez terminada, le das al boton
            "Crear" y te va a dar un enlace esa es tu lista la puedes usar o
            compartila con alguien mas y entre varios podran ir tachando las
            consignas cumplidas. La lista expira por si sola en 24hs.
          </div>
          <div className="mt-2 w-full border-1 centrado p-3 gap-3">
            <label>Nombre de la Lista:</label>
            <InputText
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="col-12 md:col-4"
              maxLength={100}
              placeholder="Ej: Lista del super, Tareas del día..."
            />
          </div>
          <div className="mt-2 w-full border-1 centrado p-3 gap-3">
            <label>Item:</label>
            <InputText
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodos()}
              type="text"
              className="col-12 md:col-4"
              maxLength={40}
            />
            <Button
              className="text-2xl col-12 md:col-4"
              label="Agregar"
              onClick={handleAddTodos}
              disabled={todos.length < 20 ? false : true}
            />
          </div>
          <div className="mt-2 w-full flex justify-content-center border-1 p-3">
            <div className="col-12 md:col-4">
              {todos.length === 0 ? (
                <div className="text-center">
                  Tu lista esta vacia. ¡Añade algo!
                </div>
              ) : (
                todos.map((todo, index) => (
                  <div
                    className="list-item border-1 w-full flex justify-content-between align-items-center gap-3 p-3 mt-2"
                    key={index}
                    style={{ width: '8rem' }}
                  >
                    {/* <Checkbox
                    checked={todo.checked}
                    onChange={() => handleCheckBox(index)}
                  /> */}
                    <label>{todo.text}</label>
                    <Button
                      icon="pi pi-trash"
                      onClick={() => deleteTodo(index)}
                      severity="danger"
                      size="small"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mt-2 w-full centrado p-3 gap-3">
            <Button
              className="text-2xl col-12 md:col-4"
              label={loading ? 'Creando...' : 'Crear y compartir!!!'}
              onClick={handleGenerateList}
              disabled={loading || todos.length === 0 || !title.trim()}
              loading={loading}
            />
          </div>
          <Dialog
            header="Lista la lista"
            visible={showDialog}
            style={{ width: '50vw' }}
            breakpoints={{ '960px': '75vw', '641px': '95vw' }}
            onHide={() => setShowDialog(false)}
            blockScroll
            draggable={false}
          >
            {generatedUrl && (
              <div>
                <InputText
                  value={`${generatedUrl}` || ''}
                  placeholder="Generando..."
                  readOnly
                  className="text-center w-full"
                />

                <div className="mt-3">
                  <small className="text-gray-600 text-center block">
                    Que no se hagan los boludos y te ayuden! Tenes 24hs.
                  </small>
                </div>

                <div className="flex gap-2 mt-3 justify-content-center flex-wrap">
                  <Button
                    icon="pi pi-external-link"
                    onClick={() => window.open(generatedUrl!, '_blank')}
                    tooltip="Abrir el enlace en una nueva pestaña"
                    label="Abrir"
                    tooltipOptions={{ position: 'top' }}
                    className="p-button-sm p-button-secondary"
                    disabled={!generatedUrl}
                    style={{ width: '8rem' }}
                  />

                  <Button
                    icon="pi pi-copy"
                    onClick={copyToClipboard}
                    tooltip="Copiar el enlace"
                    label="Copiar"
                    tooltipOptions={{ position: 'top' }}
                    className="p-button-sm"
                    style={{ width: '8rem' }}
                  />

                  <Button
                    icon="pi pi-whatsapp"
                    severity="success"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hacete cargo! ${generatedUrl}`
                      )
                      window.open(`https://wa.me/?text=${text}`, '_blank')
                    }}
                    tooltip="Enviar por"
                    label="Wassap"
                    tooltipOptions={{ position: 'top' }}
                    className="p-button-sm p-button-success"
                    disabled={!generatedUrl}
                    style={{ width: '8rem' }}
                  />

                  <Button
                    icon="pi pi-send"
                    severity="info"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hacete cargo! ${config.VITE_URL}${generatedUrl}`
                      )
                      window.open(
                        `https://t.me/share/url?url=${generatedUrl}&text=${text}`,
                        '_blank'
                      )
                    }}
                    tooltip="Enviar por"
                    label="Telegram"
                    tooltipOptions={{ position: 'top' }}
                    className="p-button-sm p-button-info"
                    disabled={!generatedUrl}
                    style={{ width: '8rem' }}
                  />
                </div>
              </div>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  )
}
export default Todos
