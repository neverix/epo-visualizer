import React from 'react';
import { SketchPicker } from 'react-color';

const Visualization = ({ fileData }) => {
  const { Examples } = fileData;
  const [baseColor, setBaseColor] = React.useState('#4CAF50');

  const generateColorShade = (index) => {
    const hueShift = (index * 137.5) % 360; // Spread colors around the color wheel
    return `hsl(${hueShift}, 70%, 60%)`;
  };

  const npURL = `https://www.neuronpedia.org/gemma-2b-it/${fileData.SAE_metadata.Layer}-res-jb/${fileData.SAE_metadata.Feature_ID}`;

  return (
    <div className="visualization">
      <h3>Token Visualization: <a target="_blank" rel="noopener noreferrer" href={npURL}>{fileData.SAE_metadata.Layer} {fileData.SAE_metadata.SAE_type} {fileData.SAE_metadata.Feature_ID}</a></h3>
      {/* <SketchPicker
        color={baseColor}
        onChangeComplete={(color) => setBaseColor(color.hex)}
      /> */}

    <iframe
    src={npURL + "?embed=true&embedexplanation=true&embedplots=true&embedtest=true&height=300"}
    title="Neuronpedia"
    style={{height: "300px", width: "540px"}}></iframe>

      {Examples.map((example, exampleIndex) => (
        <div key={exampleIndex} className="example">
          <p>
            <strong>Cross-Entropy:</strong> {example.Cross_entropy_score} |{' '}
            <strong>EPO Metric:</strong> {example.EPO_metric_score}
          </p>
          <div className="tokens">
            {example.Tokens.map((token, tokenIndex) => (
              <span
                key={tokenIndex}
                style={{
                  color: generateColorShade(tokenIndex),
                  marginRight: '5px',
                }}
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Visualization;
