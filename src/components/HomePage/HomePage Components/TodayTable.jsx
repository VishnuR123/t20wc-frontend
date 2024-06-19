
import React from 'react'
import { useState,useEffect } from 'react';
function TodayTable({todayPoints, onOwnerHover}) {
  // const todayPointsLocal () =>{  return todayPoints;  }
    // const [todayPointsLocal,setTodayPoints] = useState([]);
    // useEffect(() => {
    //     if(todayPoints.length > 0){
    //         console.log(todayPoints);
    //         setTodayPoints(todayPoints);
    //     }
    // },[]);

  return (
    <>
      <h3>Today Points</h3>
        {todayPoints.length > 0 ? (
        <ul>
            {todayPoints.map(([owner, points]) => (
              <li 
              key={owner}
              onMouseEnter={()=> onOwnerHover(owner)}
              onMouseLeave={()=> onOwnerHover(null)}>
                <span>{owner}</span> <span>{points.toFixed(2)}</span> 
              </li>
            ))}
          </ul>):(
            <div>Waiting to Load</div>
          )}
    </>
  )
}

export default TodayTable