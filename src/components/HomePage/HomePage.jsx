import React from "react";
import "../HomePage/HomePage.css";
import myIcon from '../../assets/blob.svg';
import myIcon1 from '../../assets/blob1.svg';
import myIcon2 from '../../assets/blob2.svg';
import myIcon3 from '../../assets/blob3.svg';

import TodayTable from "./HomePage Components/TodayTable";
import OwnerGraph from './HomePage Components/OwnerGraph';
import HighestContributor from "./HomePage Components/HighestContributor";
import TotalContribution from "./HomePage Components/TotalContribution";
import MatchesLeft from "./HomePage Components/MatchesLeft";
import { useState, useEffect } from "react";
import { URL } from "../../App";
function HomePage({ players, ownerPoints }) {
  const [pointsTable, setPointsTable] = useState([]);
  const [matchesLeft, setMatchesLeft] = useState(null);
  const [todayPoints, setTodayPoints] = useState({});
  const [hoveredOwner, setHoveredOwner] = useState(null);
  useEffect(() => {
    if (players.length > 0 && ownerPoints.length > 0) {
      // Perform your calculations here
      const mostRecent = ownerPoints[0];
      const matchNumber = mostRecent.matchNumber;
      const sortedPoints = Object.entries(mostRecent.points)
        .filter(([key, value]) => key !== "date")
        .filter(([key, value]) => key !== "matchNumber")
        .sort(([, a], [, b]) => b - a);
      // setPointsTable(sortedPoints);
      // Calculate differences
      const pointsWithDifferences = sortedPoints.map(([owner, points], index, arr) => {
        const prevPoints = arr[index - 1] ? arr[index - 1][1] : null;
        const difference = prevPoints !== null ? points - prevPoints : null;
        return { owner, points, difference };
      });
      setPointsTable(pointsWithDifferences);
      //Matches Left Component Calculation
      const totalMatches = 55; // example total matches
      const matchesLeftCalc = totalMatches - matchNumber;
      setMatchesLeft(matchesLeftCalc);

      // Find the previous day's most recent document or most recent document that doesnt belong today
      const documentsNotToday = ownerPoints.filter((doc) => {
        const docDate = new Date(doc.date);
        const mostRecentDate = new Date(mostRecent.date);
        return docDate.getDate() < mostRecentDate.getDate();
        // return (
        //   docDate.getFullYear() === mostRecentDate.getFullYear() &&
        //   docDate.getMonth() === mostRecentDate.getMonth() &&
        //   docDate.getDate() < mostRecentDate.getDate()
        // );
      });
      const mostRecentNotToday = documentsNotToday[0];
      
     
      if (mostRecentNotToday) {
        const todayPointsCalc = {};
        for (const [owner, points] of Object.entries(mostRecent.points)) {
          todayPointsCalc[owner] =
            points - (mostRecentNotToday.points[owner] || 0);
        }
        
        const sortedPoints = Object.entries(todayPointsCalc)
        .sort(([, a], [, b]) => b - a);
        setTodayPoints(sortedPoints);
      }
    }
  }, [players, ownerPoints]);

  return (
    <div className="Home-div">
      <div className="home-grid">
        <div className="main-table container">
          <h3>Points Table</h3>
          {ownerPoints.length > 0 ? (
            <ul>
              {pointsTable.map(({owner, points, difference}, index) => (
                <li key={index}>
                  <span>{owner}</span> <span>{points}</span> 
                  {difference !== null && <span>  {difference}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading owner points...</p>
          )}
          
        </div>
        <div className="today-table container">
          <TodayTable 
          todayPoints={todayPoints}
          onOwnerHover={setHoveredOwner} />
        </div>
        <div className="main-contributor  container">
          <HighestContributor players={players} ownerPoints={ownerPoints} owner={hoveredOwner} />
          <img src={myIcon} className="blob" alt="" />
          <img src={myIcon1} className="blob1" alt="" />
          <img src={myIcon2} className="blob2" alt="" />
          <img src={myIcon3} className="blob3" alt="" />
        </div>
        <div className="matches-left container"> 
          <MatchesLeft matchesLeft={matchesLeft}></MatchesLeft>
        </div>
      </div>
      <div className="home-grid2">

        <div className="graph-1 container">
          <OwnerGraph  ownerPoints={ownerPoints} />
        </div>
        <div className="total-contribution container">
          <TotalContribution players={players}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
