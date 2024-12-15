import React, { useCallback, useEffect } from 'react'
import ReactFlow, { Background, Edge, Node, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';
import NodeDataSchema from '../NodeDataSchema'
import { elkOptions } from '@/app_utils/elkOptions'
import ELK from 'elkjs/lib/elk.bundled.js';
interface Prop{
    __nodes:Node[]
    __edges:Edge[]
}
const elk=new ELK()
const NodeType={
    'dataschema':NodeDataSchema
  }

const ReactFlowRenderer:React.FC<Prop> = ({__nodes,__edges}) => {

    const [nodes,setNodes,onNodeStatesChange]=useNodesState(__nodes)
  const [edges,setEdges,onEdgesStateChange]=useEdgesState(__edges)


  const handleAutoLayout=useCallback(async(nodes:Node[],edges:Edge[])=>{
   
    const elkGraph={
      id:"root",
      children:nodes.map((node)=>({
        id:node.id,
        width:80,
        height:50+node.data.schema.length*30,
      })),
      edges:edges.map((edge)=>({
        id:edge.id,
        sources:[edge.source],
        targets:[edge.target],
      }))
    };
    try{
      const layoutGraph=await elk.layout(elkGraph,{layoutOptions:elkOptions})
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          position: {
            x: layoutGraph.children?.find((n) => n.id === node.id)?.x ?? 0,
            y: layoutGraph.children?.find((n) => n.id === node.id)?.y ?? 0,
          },
         
        }))
      );
 
    }catch(err){
      console.error(err)
    }
  },[nodes,edges,setNodes])

  const proOptions = { hideAttribution: true };
  useEffect(()=>{
    handleAutoLayout(__nodes,__edges)
    setNodes(__nodes)
    setEdges(__edges)
  },[__nodes,__edges])

  return (
    <div className=' w-full  h-full'>
     <ReactFlow className='h-full w-full'
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodeStatesChange}
      onEdgesChange={onEdgesStateChange}
      nodeTypes={NodeType}
        proOptions={proOptions}
      >
        
        <Background/>
      </ReactFlow>
    </div>
  )
}

export default ReactFlowRenderer