


import { InitialEdges, InitialNode } from '@/app_components/NodeData';
import NodeDataSchema from '@/app_components/NodeDataSchema';
import React from 'react'
import ReactFlow, { Background, BackgroundVariant, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';

const NodeType={
  'dataSchema':NodeDataSchema
}

const index = () => {
  const [nodes,setNodes,OnNodeStatesChange]=useNodesState(InitialNode)
  const [edges,setEdges]=useEdgesState(InitialEdges)
  return (
    <div className='h-screen w-screen bg-gray-700'>
      <ReactFlow
      nodes={nodes}
      onNodesChange={OnNodeStatesChange}
      nodeTypes={NodeType}
      edges={edges}
      >
        <Background color='gray' />
      </ReactFlow>
    </div>
  )
}

export default index


