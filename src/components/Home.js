import React from 'react'
import  Header  from "./Header"


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
        {
            props.isLoggedIn ?
            <>
            <h1>Welcome To Fitness Tracker!</h1>
                        </> :
            <>
            <h1>Welcome To Fitness Tracker!</h1>
            <h3>Click the login link above to log in.</h3>
            </>
        }
        </>
    )
}


export default Home