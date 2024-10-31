import React from 'react';
import { SketchPicker } from 'react-color';

const Visualization = ({ fileData }) => {
  const { Examples } = fileData;
  const [baseColor, setBaseColor] = React.useState('#4CAF50');

  const generateColorShade = (exampleIndex, index) => {
    let maxAct = Examples.reduce((max, example) => {
      let acts = example.Activations_per_token;
      acts = [...acts].splice(3);
      const max_act = Math.max(...acts);
      return Math.max(max, max_act);
    }, 0);
    const act = Examples[exampleIndex].Activations_per_token[index] / maxAct;
    const alpha = index < 1 ? 0 : Math.round(Math.min(100, act * 100));
    return `hsl(50, 100%, 50%, ${alpha}%)`;
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

      {[...Examples].reverse().map((example, exampleIndex) => (
        <div key={exampleIndex} className="example">
          {/* {JSON.stringify(example)} */}
          <p>
            <strong>Cross-Entropy:</strong> {example.Cross_entropy_score} |{' '}
            <strong>EPO Metric:</strong> {example.EPO_metric_score}
          </p>
          <div className="tokens">
            {example.Tokens.map((token: string, tokenIndex) => (tokenIndex < 3 ? null : <>
              <span
                style={{
                  backgroundColor: generateColorShade(exampleIndex, tokenIndex),
                  // marginRight: '5px',
                }}
              >
                {token.replaceAll(' ', '_')}
              </span>
            </>))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Visualization;
