


import { InitialEdges, InitialNode } from '@/app_components/NodeData';
import NodeDataSchema from '@/app_components/NodeDataSchema';
import React from 'react'
import ReactFlow, { Background, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';

const NodeType={
  'dataSchema':NodeDataSchema
}

const Index = () => {
  const [nodes,,OnNodeStatesChange]=useNodesState(InitialNode)
  const [edges]=useEdgesState(InitialEdges)
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

export default Index


