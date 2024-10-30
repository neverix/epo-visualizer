import React, { useMemo, useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Sidebar from "./components/Sidebar";
import Visualization from "./components/Visualization.tsx";
import "./App.css";

const epoFiles = [
  "16964919-12-Residual-8631-20-False-8-1-20.json",
  "2281359086-12-Residual-11046-20-False-8-1-20.json",
  "3088443363-12-Residual-321-20-False-8-1-20.json",
  "329958841-12-Residual-10689-20-False-8-1-20.json",
  "479093921-12-Residual-12017-20-False-8-1-20.json",
  "2445163549-12-Residual-11256-20-False-8-1-20.json",
  "2214885837-12-Residual-15553-20-False-8-1-20.json",
  "2921201463-12-Residual-14018-20-False-8-1-20.json",
  // "136-16-Refusal-None.json",
  "1902535209-12-Residual-4597-20-False-8-1-20.json",
  "262766863-12-Residual-5373-20-False-8-1-20.json",
  "2752310183-12-Residual-12701-20-False-8-1-20.json",
  "1371614939-12-Residual-330-20-False-8-1-20.json",
  "4095486592-12-Residual-12701-20-False-8-1-20.json",
  "3565587285-12-Residual-321-20-False-8-1-20.json",
  "4211084647-12-Residual-15553-20-False-8-1-20.json",
  "378969470-12-Residual-11046-20-False-8-1-20.json",
  "4077435381-12-Residual-12017-20-False-8-1-20.json",
  "3713928756-12-Residual-2079-20-False-8-1-20.json",
  "1762534299-12-Residual-330-20-False-8-1-20.json",
  "1915166145-12-Residual-10689-20-False-8-1-20.json",
  "3287737178-12-Residual-5373-20-False-8-1-20.json",
  "3662667823-12-Residual-14018-20-False-8-1-20.json",
  "2056008373-12-Residual-11256-20-False-8-1-20.json",
  "81103655-12-Residual-5373-20-False-8-1-20.json",
  "607021563-12-Residual-14151-20-False-8-1-20.json",
  // "227-20-Sycophancy-None-20-False-8-0.25-10.json",
  "52962703-12-Residual-12017-20-False-8-1-20.json",
  "3662151313-12-Residual-5324-20-False-8-1-20.json",
  "3327743943-12-Residual-5324-20-False-8-1-20.json",
  "3258021871-12-Residual-8631-20-False-8-1-20.json",
  "1211129900-12-Residual-14151-20-False-8-1-20.json",
  "250965953-12-Residual-5324-20-False-8-1-20.json",
  "1962088204-12-Residual-14018-20-False-8-1-20.json",
  "1374390804-12-Residual-4597-20-False-8-1-20.json",
  "2824895964-12-Residual-2079-20-False-8-1-20.json",
  "2121368957-12-Residual-8631-20-False-8-1-20.json",
  "1051337852-12-Residual-2079-20-False-8-1-20.json",
  "3488014743-12-Residual-8618-20-False-8-1-20.json",
  "2530992268-12-Residual-8618-20-False-8-1-20.json",
  "1780966255-12-Residual-5373-20-False-8-1-20.json",
  "2084675842-12-Residual-321-20-False-8-1-20.json",
  "4090869258-12-Residual-8618-20-False-8-1-20.json",
  "1518225593-12-Residual-8361-20-False-8-1-20.json",
  "2271715956-12-Residual-10689-20-False-8-1-20.json",
  "2107071455-12-Residual-8361-20-False-8-1-20.json",
  "1821301682-12-Residual-15553-20-False-8-1-20.json",
  "1100435015-12-Residual-14151-20-False-8-1-20.json",
  "1797358082-12-Residual-4597-20-False-8-1-20.json",
  "387874479-12-Residual-11256-20-False-8-1-20.json",
  "1281804245-12-Residual-330-20-False-8-1-20.json",
  "3389953250-12-Residual-11046-20-False-8-1-20.json",
  "2078907541-12-Residual-12701-20-False-8-1-20.json",
  "2254815805-12-Residual-8361-20-False-8-1-20.json",
  // "1834762302-20-Sycophancy-None-20-False-8-0.25-10.json",
];

const App = () => {
  const [filesData, setFilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    (async () => {
      const files = (
        await Promise.all(
          epoFiles.map(async (file) => {
            const response = await fetch(`./epo/${file}`);
            const text = await response.text();
            return JSON.parse(text);
          })
        )
      ).sort((a, b) => a.SAE_metadata.Feature_ID - b.SAE_metadata.Feature_ID);
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
