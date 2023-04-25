import React from "react";
import { useState, useEffect, useNavigate } from "react-router-dom";


export const Rountines = () => {
    const [ token, setToken ] = useState(window.localStorage.getItem('token'))
    const [ routines, setRoutines ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        const myData = async () => {

            try {
              const response = await fetch(`${BASE_URL}/users/albert/routines`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
              const result = await response.json();
              setRoutines(result.data.routines)
              console.log(result);
              return result
            } catch (err) {
              console.error(err);
            }
          }
      myData()
    }, [])

    const allRoutines = rounties.filter(routines).map((rounties, i) => {
        return(
            <li key={i} className='allRoutines'>
                <div>
                    
                </div>
            </li>
        )
    })
          
    return(
        <>
        </>
    )
}