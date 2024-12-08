import { NodeData } from '@/types/NodeData'
import React from 'react'
interface Prop{
    id:string,
    data:NodeData
}
const Nodes:React.FC<Prop> = ({id,data}) => {
  
  return (
    <div className='flex flex-col gap-2 border border-black p-2 rounded-md'>
       <span>{data.label}</span>
       <span>{data.desc}</span>
    </div>
  )
}

export default Nodes