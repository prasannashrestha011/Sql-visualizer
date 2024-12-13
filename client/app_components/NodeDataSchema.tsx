import React from 'react'
import { NodeType } from './Nodes'
import { Handle, Position } from 'reactflow'
interface Prop{
   data:{
    schema:{[key:string]:any}[]
   }
}
//custom node for visualizer
const NodeDataSchema:React.FC<Prop> = ({data}) => {
  return (
    <div className='bg-gray-900 text-slate-50 py-2 rounded-md'>
      

      <ul>
      {data.schema.map((item,index)=>(
            <li key={index}>
          
            {Object.entries(item).map(([key, value],fieldIdx) => (
              <div key={key} className='border-b border-gray-500 px-4'>
                       <Handle
                    id={`${item.name || item.address}-${fieldIdx}`}
                    type="source" // Target handle (input connection)
                    position={Position.Right}
                    style={{ 
                        top: `${21 + 24 * fieldIdx}px`,
                        right:2
                    }}
                    />
                <strong>{key}:</strong> {value}
                <Handle
               id={`${item.name||item.address}-${fieldIdx}`}
              type="target" // Target handle (input connection)
              position={Position.Left}
              style={{ 
                top: `${21 + 24 * fieldIdx}px`,
                right:2
             }}
            />
              </div>
            ))}
            
          </li>
        ))}
      </ul>
     
    </div>
  )
}

export default NodeDataSchema