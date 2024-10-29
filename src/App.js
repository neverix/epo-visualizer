import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import './App.css';

const App = () => {
  const [filesData, setFilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilesUpload = (data) => {
    setFilesData(data);
    setSelectedFile(data[0]); // Default to first file
  };

  return (
    <div className="app">
      <FileUpload onFilesUpload={handleFilesUpload} />
      <div className="content">
        <Sidebar filesData={filesData} setSelectedFile={setSelectedFile} />
        {selectedFile && <Visualization fileData={selectedFile} />}
      </div>
    </div>
  );
};

export default App;
