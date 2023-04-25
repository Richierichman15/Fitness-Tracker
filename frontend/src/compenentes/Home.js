import React from 'react'
import { Header } from "./Header"


const Home = (props) => {
    // useEffect(() => {
    //     const fetchGamers = async()=> {
    //         await fetch("/api/gamer")
    //         .then((response) => {
    //             console.log(response.body);
    //             response.json()
    //         })
    //         .then(res => {
    //             console.log(res);
    //         })

    //     }
    //     fetchGamers()
    // }, [])
    return(
        <>
        <Header />
        {
            props.isLoggedIn ?
            <>
            <h1>Please Log in First</h1>
            </> :
            <>
            <h1>Welcome To Fitness Tracker!</h1>
            </>
        }
        </>
    )
}


export default Home