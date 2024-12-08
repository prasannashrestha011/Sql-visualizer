import Nodes from '@/app_components/Nodes'
import React from 'react'
import ReactFlow, { Background, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';
const initialNode=[
  {
    id:"1",
    position:{x:0,y:0} ,
    data:{
      label:'Node1',
      desc:"this is node1"
    },
    type:'custom'
  },  
  {
    id:"2",
    position:{x:100,y:100},
    data:{
      label:"Node 2",
      desc:"this is node2"
    },
    type:"custom"
  }
]
const initialEdge=[
 {
  id:'e1-e2',
  source:'1',
  target:'2',
  type:'smoothstep'
 }
]
const index = () => {
  const [nodes,setNodes,onNodesStateChange]=useNodesState(initialNode)
  const [egdes,setEdges,onEdgesStateChange]=useEdgesState(initialEdge)
  return (
    <div className='h-screen w-screen'>
      <ReactFlow
      nodes={nodes}
      edges={egdes}
      nodeTypes={{custom:Nodes}}
      onNodesChange={onNodesStateChange}
      onEdgesChange={onEdgesStateChange}
      >
        <Background/>
      </ReactFlow>
    </div>
  )
}

export default index