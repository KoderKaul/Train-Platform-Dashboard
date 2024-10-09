import React from "react";

const TrainSVG = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
    <rect x="10" y="10" width="80" height="30" fill="#4a90e2" />
    <circle cx="25" cy="45" r="5" fill="#fff" />
    <circle cx="75" cy="45" r="5" fill="#fff" />
  </svg>
);

export default TrainSVG;