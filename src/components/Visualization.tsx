import React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowUpDown } from 'lucide-react';

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
    const alpha = index < 3 ? 0 : Math.min(100, act * 100);
    return `hsl(50, 100%, 50%, ${alpha}%)`;
  };

  const [sortAscending, setSortAscending] = useState(false);

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  const npURL = `https://www.neuronpedia.org/gemma-2b-it/${fileData.SAE_metadata.Layer}-res-jb/${fileData.SAE_metadata.Feature_ID}`;

  return (
    <Card className="w-full max-w-4xl ml-64 bg-white shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold">Token Visualization: Layer {fileData.SAE_metadata.Layer} feature {fileData.SAE_metadata.Feature_ID}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSort}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortAscending ? 'Show highest activations' : 'Show lowest perplexities'}
            </Button>
          </div>
          <a 
            href={npURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-sm">
              {fileData.SAE_metadata.Layer} {fileData.SAE_metadata.SAE_type} {fileData.SAE_metadata.Feature_ID}
            </span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardTitle>
      </CardHeader>

      <iframe
        src={`${npURL}?embed=true&embedexplanation=true&embedplots=true&embedtest=true&height=500`}
        title="Neuronpedia"
        className="w-full h-[500px] border-none bg-gray-50"
      />

      <CardContent className="p-6">
        <div className="space-y-6">
          {Examples.map((example, exampleIndex) => (
            <div key={exampleIndex} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-4 mb-3">
                <Badge variant="outline" className="bg-white">
                  Cross-Entropy: {example.Cross_entropy_score.toFixed(3)}
                </Badge>
                <Badge variant="outline" className="bg-white">
                  EPO Metric: {example.EPO_metric_score.toFixed(3)}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {example.Tokens.map((token, tokenIndex) => (
                  tokenIndex < 3 ? null : (
                    <span
                      key={tokenIndex}
                      className="px-2 py-1 rounded text-sm font-mono"
                      style={{
                        backgroundColor: generateColorShade(exampleIndex, tokenIndex),
                      }}
                    >
                      {token.replaceAll(' ', '_')}
                    </span>
                  )
                ))}
              </div>
            </div>
          )).sort((a, b) => sortAscending ? 1 : -1)}
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualization;