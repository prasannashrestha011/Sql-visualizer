import Nodes from '@/app_components/Nodes';
import React from 'react'
import ReactFlow, { Background, useEdges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes=[
  {id:'1',position:{x:0,y:0},
  data:{
    label:"Node 1",
    desc: "This is a sample node", 
   
    
  },
  type:'nodes'
  },
  {
    id:'2',position:{x:100,y:100},
    data:{
    label:"Node 1",
    desc: "This is a sample node", 
   
    },
    type:'nodes'
 }
]
const initialEdges=[
  {'id':'e1-e2',source:'1',target:'2',type:'smoothstep'}
]
const index = () => {
  const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes)
  const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges)
  return (
    <div className='h-screen w-screen'>
      <ReactFlow nodes={nodes} 
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={{nodes:Nodes}}
      >
        <Background/>
      </ReactFlow>

    </div>
  )
}

export default index