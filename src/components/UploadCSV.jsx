import React from "react";
import Papa from "papaparse";

const UploadCSV = ({ handleCSVUpload }) => {
  const onFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        handleCSVUpload(results.data);
      },
    });
  };

  return (
    <div>
      <h2>Upload Train Schedule (CSV)</h2>
      <input type="file" accept=".csv" onChange={onFileUpload} />
    </div>
  );
};

export default UploadCSV;