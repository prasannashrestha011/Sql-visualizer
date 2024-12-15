import React, {  useState, useLayoutEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FaKey } from "react-icons/fa";
interface DataSchema {
  label: string;
  schema: [{ title: string,  type: string,
    is_null?: boolean,
    is_unique?: boolean,
    is_pk?: boolean, }];
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
  console.log(data)
  return (
    <div className="bg-gray-800  text-slate-50 rounded-md font-mono">
      <div className='flex justify-center items-center bg-gray-900 p-2'>{data.label}</div>
      {data.schema.map((item, idx) => (
        <div key={idx} id={`item-${idx}`} className="flex items-center p-2"> 
          <Handle
            id={`${data.label}-${item.title}`}
            position={Position.Right}
            type="target"
            
            style={{
              backgroundColor: 'white',
              top: `${handlePositions[idx] || 0}px`,
            }}
          />
          <div className='flex  justify-between gap-4 w-72 '>
            <span className='  flex-1' >{item.title}</span>
            {item.is_pk&&<FaKey className='text-yellow-500'/>}
            {item.is_unique&&<span className='text-orange-300'>UNIQUE</span>}
           {item.is_null&&<span className=''>NOT NULL</span>}
  
          </div>
          <Handle 
         id={`${data.label}-${item.title}`}
            position={Position.Left}
            type="source"
            
            style={{
              backgroundColor: 'white',
              top: `${handlePositions[idx] || 0}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NodeDataSchema;
