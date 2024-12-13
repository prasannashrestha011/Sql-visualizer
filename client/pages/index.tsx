import NodeDataSchema from '@/app_components/NodeDataSchema';
import { NodeData, NodeEdges } from '@/app_components/Nodes';
import React from 'react'
import ReactFlow, { Background, BackgroundVariant, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';



const index = () => {
  const [nodes,setNodes,onNodesStateChange]=useNodesState(NodeData)
  return (
    <div className='h-screen w-screen bg-gray-700'>
      <ReactFlow
      nodes={nodes}
      edges={NodeEdges}
      nodeTypes={{
        "dataschema":NodeDataSchema
      }}
      onNodesChange={onNodesStateChange}
      >
        <Background color='gray' />
      </ReactFlow>
    </div>
  )
}

export default index


