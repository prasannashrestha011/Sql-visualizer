import React from 'react'
import ReactFlow, { Background, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';



const index = () => {
  return (
    <div className='h-screen w-screen'>
      <ReactFlow>
        <Background color='black'/>
      </ReactFlow>
    </div>
  )
}

export default index


