import { Routes, Route } from 'react-router-dom'
import FullLayout from '../components/layouts/FullLayout'
import Todos from '../pages/Todos'
import VerLista from '../components/VerLista'
// import SimpleLayout from '../components/layouts/SimpleLayout'

const Rutas = () => {
  return (
    <Routes>
      {/* Header & footer */}
      <Route element={<FullLayout />}>
        <Route path="/" element={<Todos />} />
        <Route path="/lista/:code" element={<VerLista />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} /> */}
      </Route>

      {/* Simple */}
      {/* <Route element={<SimpleLayout />}>
        <Route path="/lista/:code" element={<VerLista />} />
      </Route> */}
    </Routes>
  )
}

export default Rutas
