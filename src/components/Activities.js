import React, { useState, useEffect } from "react";

const Activities = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch(`/api/activities/`, {
        });
        const result = await response.json();
        setActivities(result)
        return result
      } catch (err) {
        console.error(err);
      }
    }
    userData()
  }, [])

  const allActivities = activities.map((activities, i) => {
    return (
      <li key={i} className='allActivities'>
        <div>
          <h4>Activity name:</h4>
          {activities.name}
          <br></br>
          <h5>Description:</h5>
          {activities.description}
          <br></br>
          <br></br>
        </div>
      </li>
    )
  })

  return (
    <ul>
      {allActivities}
    </ul>
  );
};

export default Activities