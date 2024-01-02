import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {signup, isAuthenticated, errors: registerErrors} = useAuth()
    const navigate = useNavigate()

    useEffect( () => {
        if(isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async user => {
        signup(user)
    })

    return (
    <div className="flex items-center justify-center h-screen">
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <form onSubmit={onSubmit} >
                <input type="text" placeholder='Username' {...register('username', {required: true})} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                {errors.username && (
                    <p className='text-rose-600'>Username is required.</p>
                )}
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
                {registerErrors && (
                    Array.isArray(registerErrors) ? (
                        registerErrors.map((error, i) => {
                            return <li key={i} className='w-full text-rose-600 list-inside'>{error}</li>
                        })
                    ):(
                        <li className='w-full text-rose-600 list-inside'>{registerErrors}</li>
                    )
                )}
                </ul>
                <button type='submit' className='px-3 py-2 rounded mt-5 bg-sky-600'>Sing up</button>
            </form>
            <p className="flex gap-x-2 justify-start mt-4">
                Already have an account? <Link to='/login' className="text-sky-500">Sing in</Link>
            </p>
        </div>
    </div>
  )
}

export default Register