import React from 'react';

const Sidebar = ({ filesData, setSelectedFile }) => {
  return (
    <div className="sidebar">
      <h3>Files</h3>
      <ul>
        {filesData.map((file, index) => (
          <li key={index} onClick={() => setSelectedFile(file)}>
            {filesData[index].SAE_metadata.Layer} {filesData[index].SAE_metadata.SAE_type} {filesData[index].SAE_metadata.Feature_ID}
          </li>
        ))}
      </ul>
      {filesData.length > 0 && (
        <div className="metadata">
          <h4>Metadata</h4>
          <ul>
            {Object.entries(filesData[0].SAE_metadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
