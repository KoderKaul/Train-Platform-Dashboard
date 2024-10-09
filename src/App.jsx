import React, { useState, useEffect } from "react";
import { parseTime, formatTime, getCurrentTime } from "./helper/util.jsx";
import PlatformDashboard from "./components/PlatformDashboard.jsx";
import TrainQueue from "./components/TrainScheduleQueue.jsx";
import TrainScheduleTable from "./components/TrainScheduleTable.jsx";
import UploadCSV from "./components/UploadCSV.jsx";
import "./App.css";

function App() {
  const [trains, setTrains] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [queue, setQueue] = useState([]);
  const [completedTrains, setCompletedTrains] = useState([]);
  const [numPlatforms, setNumPlatforms] = useState(2); // Default to 2 platforms

  useEffect(() => {
    initializePlatforms();
  }, [numPlatforms]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTrainTimes();
    }, 5000);
    return () => clearInterval(interval);
  }, [trains, queue]);

  const initializePlatforms = () => {
    const currPlatforms = platforms.length;
    if (currPlatforms === 0) {
      // Initialize with nulls if platforms is empty
      const platformsArr = Array.from({ length: numPlatforms }, () => null);
      setPlatforms(platformsArr);
    } else if (numPlatforms > currPlatforms) {
      // Add nulls at the end if increasing platforms
      const additionalPlatforms = Array(numPlatforms - currPlatforms).fill(null);
      setPlatforms([...platforms, ...additionalPlatforms]);
    } else {
      alert("Can't destroy a platform man, comeon people on board")
    }
    
  }
  
  const handleCSVUpload = (data) => {
    const trainData = data.map((row) => ({
      number: row["Train Number"],
      arrival: row["Arrival Time"],
      departure: row["Departure Time"],
      actualArrival: row["Arrival Time"],
      actualDeparture: row["Departure Time"],
      priority: row["Priority"],
    }));
    setTrains((prev) => { return [ ...prev, ...trainData ]});
    setQueue((prev) => {return [ ...prev, ...trainData ]});
  };

  const sortQueue = (queueToSort) => {
    return [...queueToSort].sort((a, b) => {
      const delta = (-parseTime(a.actualArrival) +  parseTime(b.actualArrival));
      if (delta != 0) {
        return delta;
      }
      // If arrival times are equal, compare priorities
      const priorityMap = { P1: 1, P2: 2, P3: 3 };
      if (priorityMap[a.priority] !== priorityMap[b.priority]) {
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
      // If priorities are equal, use CSV order
      return trains.indexOf(a) - trains.indexOf(b);
    });
  };

  const updateTrainTimes = () => {
    const now = getCurrentTime();
    setPlatforms((currentPlatforms) => {
      // Handling train departures
      const updatedPlatforms = currentPlatforms.map((platformTrains) => {
        if (platformTrains) {
          if ( now - parseTime(platformTrains.actualDeparture) >=0) {
              setCompletedTrains((prev) => {
                const isAlreadyCompleted = prev.some(train => train.number === platformTrains.number && train.actualArrival === platformTrains.actualArrival);
                if (!isAlreadyCompleted) {
                  return [
                    ...prev,
                    {
                      ...platformTrains,
                      actualDeparture: formatTime(now),
                    },
                  ];
                }
                return prev;
              });
              return null; // Platform is now empty
          }
        }
        return platformTrains; // Platform remains occupied
      });

      // Sort the train queue
      const sortedQueue = sortQueue(queue);

      // Allocate trains from the queue to available platforms
      const newPlatforms = updatedPlatforms.map((platform) => {
        if (!platform && sortedQueue.length > 0 && parseTime(sortedQueue[0].actualArrival) <= now) {
          const nextTrain = sortedQueue.shift();
          const delta = (now -  parseTime(nextTrain.arrival));

          return {
            ...nextTrain,
            actualDeparture: formatTime(delta + parseTime(nextTrain.departure)),
            actualArrival: formatTime(now),
          };
        }
        return platform;
      });

      // Ensure that newPlatforms maintains the correct length
      while (newPlatforms.length < numPlatforms) {
        newPlatforms.push(null);
      }

      setQueue(sortedQueue);
      return newPlatforms;
    });
  };

  return (
    <div className="App">
      <h1>Train Scheduler</h1>
      <div>
        <label>Number of Platforms: </label>
        <input
          type="number"
          value={numPlatforms}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            if (newValue >= 2 && newValue <= 20) {
              if (newValue > numPlatforms){
                setNumPlatforms(newValue);
              } else {
                  alert("Can't destroy a platform man, God Comeon people on board!")
              }
            }
          }}
          min="2"
          max="20"
        />
      </div>
      <UploadCSV handleCSVUpload={handleCSVUpload} />
      <div className="dashboard-container">
        <TrainQueue queue={sortQueue(queue)} />
        <PlatformDashboard platforms={platforms} />
      </div>
      <TrainScheduleTable completedTrains={completedTrains} />
    </div>
  );
}

export default App;