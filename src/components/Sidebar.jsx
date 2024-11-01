import React from 'react';

const features = {
  321: "animal shelter context",
  2079: "hmm token",
  8631: "quite token",
  330: "preposition patterns",
  5373: "token repetition",
  8618: "translation task",
  12017: "antonym prediction",
  5324: "name completion",
  8361: "gender name completion",
  4597: "refusal to provide info",
  10681: "prohibition",
  11046: "official confirmation",
  11256: "denial of offensive action",
  12701: "explicit material warning",
  15553: "offensive gift"

};

const Sidebar = ({ filesData, setSelectedFile }) => {
  // Group files by Feature_ID
  const groupedFiles = filesData.reduce((acc, file) => {
    const featureId = file.SAE_metadata.Feature_ID;
    if (!acc[featureId]) {
      acc[featureId] = [];
    }
    acc[featureId].push(file);
    return acc;
  }, {});

  // Separate known and unknown features
  const sortedEntries = Object.entries(groupedFiles).sort(([idA, _], [idB, __]) => {
    const isUnknownA = !features[idA];
    const isUnknownB = !features[idB];
    if (isUnknownA === isUnknownB) return 0;
    return isUnknownA ? 1 : -1;
  });

  return (
    // <div className="w-64 p-4 border-r border-gray-200">
    <aside className="w-64 h-screen flex-shrink-0 p-4 border-r border-gray-200 overflow-y-auto fixed">
      <h3 className="text-lg font-semibold mb-4">Files</h3>
      <ul className="space-y-2">
        {sortedEntries.map(([featureId, files]) => (
          <li key={featureId} className="mb-4">
            {files.length === 1 ? (
              <button
                onClick={() => setSelectedFile(files[0])}
                className="text-left hover:text-blue-600 transition-colors font-medium"
              >
                {featureId}: {features[featureId] || "Unknown feature"}
              </button>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">
                    {featureId}: {features[featureId] || "Unknown feature"}
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  {files.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFile(file)}
                      className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {filesData.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <ul className="space-y-1">
            {Object.entries(filesData[0].SAE_metadata).map(([key, value]) => (
              <li key={key} className="text-sm">
                <strong className="font-medium">{key}:</strong>{' '}
                <span className="text-gray-600">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    {/* </div> */}
    </aside>
  );
};

export default Sidebar;
