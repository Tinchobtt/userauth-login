import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tasks' element={<h1>tasks</h1>} />
          <Route path='/add-task' element={<h1>add-task</h1>} />
          <Route path='/task/:id' element={<h1>task/:id</h1>} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App