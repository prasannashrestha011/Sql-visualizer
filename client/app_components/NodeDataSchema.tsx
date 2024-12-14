import React, {  useState, useLayoutEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface DataSchema {
  label: string;
  schema: [{ title: string }];
}

const NodeDataSchema: React.FC<NodeProps<DataSchema>> = ({ data }) => {
  const [handlePositions, setHandlePositions] = useState<number[]>([]);

  useLayoutEffect(() => {
    // Calculate the positions of the handles based on the item titles
    const positions: number[] = [];
    data.schema.forEach((item, idx) => {
      const element = document.getElementById(`item-${idx}`);
      if (element) {
        positions.push(element.offsetTop + element.offsetHeight / 2);
      }
    });
    setHandlePositions(positions);
  }, [data.schema]);

  return (
    <div className="bg-gray-800 p-2 text-slate-50 rounded-md">
      {data.label}
      {data.schema.map((item, idx) => (
        <div key={idx} id={`item-${idx}`} className="flex items-center">
          <Handle
            id={`target-${item.title}`}
            position={Position.Left}
            type="target"
            style={{
              top: `${handlePositions[idx] || 0}px`,
            }}
          />
          {item.title}
          <Handle
            id={`source-${item.title}`}
            position={Position.Right}
            type="source"
            style={{
              top: `${handlePositions[idx] || 0}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NodeDataSchema;
