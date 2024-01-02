import { useForm } from 'react-hook-form'
const TaskFormPage = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
    return (
        <div className="flex items-center justify-center h-screen">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <input type="text" name="" placeholder="Title" {...register('title')} autoFocus
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    <textarea name="" rows="3" placeholder="Description" {...register('description')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>
                    <button type="sumit" className='px-3 py-2 rounded mt-5 bg-sky-600'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage