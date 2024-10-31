import React, { useMemo, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Visualization from "./components/Visualization.tsx";
import "./App.css";

import epoFiles from "./epoFiles.json";

const App = () => {
  const [filesData, setFilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    (async () => {
      const files = (
        await Promise.all(
          epoFiles.map(async (file) => {
            const response = await fetch(`epo/${file}`);
            const text = await response.text();
            return JSON.parse(text);
          })
        )
      )
        .sort((a, b) => a.SAE_metadata.Feature_ID - b.SAE_metadata.Feature_ID)
        .filter((x) => x.SAE_metadata.SAE_type == "Residual");
      setSelectedFile(files[0]);
      setFilesData(files);
    })();
  }, []);

  // const handleFilesUpload = (data) => {
  //   // setFilesData(data);
  //   setSelectedFile(data[0]); // Default to first file
  // };

  return (
    <div className="app">
      {/* <FileUpload onFilesUpload={handleFilesUpload} /> */}
      <div className="content">
        <Sidebar
          filesData={filesData || []}
          setSelectedFile={setSelectedFile}
        />
        {selectedFile && <Visualization fileData={selectedFile} />}
      </div>
    </div>
  );
};

export default App;
