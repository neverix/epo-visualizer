import React from 'react';

const FileUpload = ({ onFilesUpload }) => {
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const dataPromises = files.map(async (file) => {
      const text = await file.text();
      return JSON.parse(text);
    });

    const data = await Promise.all(dataPromises);
    onFilesUpload(data);
  };

  return (
    <div className="file-upload">
      <input type="file" multiple onChange={handleFileChange} />
      <p>Upload JSON files to visualize tokens.</p>
    </div>
  );
};

export default FileUpload;
