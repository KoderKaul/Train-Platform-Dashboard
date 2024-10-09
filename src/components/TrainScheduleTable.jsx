import React from "react";

const TrainScheduleTable = ({ completedTrains }) => {
  return (
    <div>
      <h2>Arrived & Departed Trains</h2>
      <table className="train-schedule-table">
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Priority</th>
            <th>Scheduled Arrival</th>
            <th>Actual Arrival</th>
            <th>Scheduled Departure</th>
            <th>Actual Departure</th>
          </tr>
        </thead>
        <tbody>
          {completedTrains.map((train, index) => (
            <tr key={index}>
              <td>{train.number}</td>
              <td>{train.priority}</td>
              <td>{train.arrival}</td>
              <td>{train.actualArrival}</td>
              <td>{train.departure}</td>
              <td>{train.actualDeparture}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainScheduleTable;