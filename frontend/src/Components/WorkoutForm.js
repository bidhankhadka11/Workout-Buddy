import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => { 
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()  //The default repsonse when submitted is to reload the page. We are preventing that with e.preventDefault()

        const workout = {title, load, reps}

        //fetch request to post a new data
        const response = await fetch('/api/workouts',{
            method: 'POST', //the second parameter is an object which specifies the api method
            body: JSON.stringify(workout), //converst the workout object to JSON string and sends that as the body
            headers: {
                'Content-Type': 'application/json' //header property specifies the content type as JSON
            }
        })
        const json = await response.json() //getting JSON data back and storing it in json

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle('')  //Reset the form if the reponse is ok
            setLoad('')
            setReps('')
            setError('')
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}> {/* call handleSubmit when submits */}
            <h3>Add a new workout</h3>

            <label>Excercise Title:</label>
            <input 
                type="text"   
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}  {/* outputs the error if there is one */}
        </form>
    )
}

export default WorkoutForm