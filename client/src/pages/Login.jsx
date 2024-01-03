import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const {signin, errors: loginErrors, isAuthenticated} = useAuth()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async user => {
      signin(user)
  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <form onSubmit={onSubmit} >
            <input type="email" placeholder='Email' {...register('email', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
            {errors.email && (
                <p className='text-rose-600'>Email is required.</p>
            )}
            <input type="password" placeholder='Password' {...register('password', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
            {errors.password && (
                <p className='text-rose-600'>Password is required.</p>
            )}
            <ul className='mt-4 list-disc' >
                {loginErrors && (
                    Array.isArray(loginErrors) ? (
                      loginErrors.map((error, i) => {
                            return <li key={i} className='w-full text-rose-600 list-inside'>{error}</li>
                        })
                    ):(
                        <li className='w-full text-rose-600 list-inside'>{loginErrors}</li>
                    )
                )}
                </ul>
            <button type='submit' className='px-3 py-2 rounded mt-5 bg-sky-600'>Sing in</button>
        </form>
        <p className="flex gap-x-2 justify-start mt-4">
          Don´t have an account? <Link to='/register' className="text-sky-500">Sing up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login