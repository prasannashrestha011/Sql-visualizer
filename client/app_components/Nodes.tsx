import { NodeData } from '@/types/NodeData'
import React from 'react'
import { Handle, Position } from 'reactflow';
interface Prop{
    id:string,
    data:NodeData
}
const Nodes:React.FC<Prop> = ({id,data}) => {
  
  return (
    <div className='flex flex-col gap-2 border border-black p-2 rounded-md'>
       <span>{data.label}</span>
       <span>{data.desc}</span>
       <Handle type="source" position={Position.Right} id="a" style={{ background: 'red' }} />
      <Handle type="target" position={Position.Left} id="b" style={{ background: 'blue' }} />
    </div>
  )
}

export default Nodes