import { Outlet } from 'react-router-dom'
import Header from '../Header'

const SimpleLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default SimpleLayout
