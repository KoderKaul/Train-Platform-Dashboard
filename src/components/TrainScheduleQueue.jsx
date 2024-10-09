import React from "react";

const TrainScheduleQueue = ({ queue }) => {
  return (
    <div className="train-queue">
      <h2>Waiting Queue</h2>
      {queue.map((train, index) => (
        <div className="train-queue-data" key={index}>
          <span>Train {train.number}</span>
          <span>Priority: {train.priority}</span>
        </div>
      ))}
    </div>
  );
};

export default TrainScheduleQueue;