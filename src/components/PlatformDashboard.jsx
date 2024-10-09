import React, { useState, useEffect, useRef } from "react";
import {calculateDepartureTime} from "../helper/util.jsx"
import TrainSVG from "./TrainSVG"; 

const PlatformDashboard = ({ platforms }) => {
  const [animatingPlatforms, setAnimatingPlatforms] = useState({});
  const [departingPlatforms, setDepartingPlatforms] = useState({});
  const prevPlatformNumbers = useRef({});

  

  useEffect(() => {
    const newAnimatingPlatforms = {};
    const newDepartingPlatforms = {};
    
    platforms.forEach((train, index) => {
      if (train && train.number !== prevPlatformNumbers.current[index]) {
        newAnimatingPlatforms[index] = true;
        if (prevPlatformNumbers.current[index]) {
          newDepartingPlatforms[index] = prevPlatformNumbers.current[index];
        }
        prevPlatformNumbers.current[index] = train.number;
      } else if (!train && prevPlatformNumbers.current[index]) {
        newDepartingPlatforms[index] = prevPlatformNumbers.current[index];
        prevPlatformNumbers.current[index] = null;
      }
    });

    if (Object.keys(newAnimatingPlatforms).length > 0) {
      setAnimatingPlatforms(prev => ({ ...prev, ...newAnimatingPlatforms }));
      setTimeout(() => {
        setAnimatingPlatforms({});
      }, 2000);
    }

    if (Object.keys(newDepartingPlatforms).length > 0) {
      setDepartingPlatforms(prev => ({ ...prev, ...newDepartingPlatforms }));
      setTimeout(() => {
        setDepartingPlatforms({});
      }, 5000);
    }
  }, [platforms]);

  return (
    <div className="platform-dashboard">
      <h2>Platform Dashboard</h2>
      <div className="platforms-container">
        {platforms.map((train, index) => (
          <div key={index} className="platform">
            <div className="platform-line"></div>
            <div className="platform-label">Platform {index + 1}</div>
            {departingPlatforms[index] && (
              <TrainSVG className="animated-train departing" />
            )}
            {train && (
              <>
                <div className="train-info entering">
                  <span>Train {train.number}</span>
                  <span>-</span>
                  <span>{train.priority}</span>
                  <span>-</span>
                  <span>Departing in {calculateDepartureTime(train)} {calculateDepartureTime(train)!=1 ?"minutes": "minute"}</span>
                </div>
                <TrainSVG className={`animated-train ${animatingPlatforms[index] ? 'entering' : ''}`} />
              </>
            )}
            {/* {departingPlatforms[index] && !train && (
              <div className="train-info departing">
                <span>Train {departingPlatforms[index]}</span>
                <span>-</span>
                <span>Departing</span>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformDashboard;