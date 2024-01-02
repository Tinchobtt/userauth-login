import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<TaskPage />} />
            <Route path='/add-task' element={<TaskFormPage />} />
            <Route path='/task/:id' element={<TaskFormPage />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App