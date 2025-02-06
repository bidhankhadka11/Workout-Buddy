import {useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//Components
import WorkoutDetails from '../Components/WorkoutDetails'
import WorkoutForm from '../Components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch } = useWorkoutsContext()

    useEffect(() => { //use effect hook fires the function when home component is rendered
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') //added a proxy to local host 4000 on  package.json so no need to explicitly tell localhost:4000
            const json = await response.json() //passes json from backend

            if(response.ok){  //checks if the response is ok
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, [dispatch]) //passing empty array makes it so the useeffect hook only fires ones and not multiple times when everytime the component is rendered 

    return(
        <div className="home">
            <div className = "workouts">
                {workouts && workouts.map((workout) => (  //checks if we have something in workout and only map if it does
                    <WorkoutDetails key= {workout._id} workout = {workout} />
                ))}
            </div>
            <WorkoutForm /> 
        </div>
    )
}

export default Home