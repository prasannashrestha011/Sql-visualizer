import React, { useCallback, useEffect } from 'react'
import ReactFlow, { Background, Edge, Node, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css';
import NodeDataSchema from '../NodeDataSchema'
import { elkOptions } from '@/app_utils/elkOptions'
import ELK from 'elkjs/lib/elk.bundled.js';
import { FaGithub } from 'react-icons/fa';
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
     <ReactFlow className='h-full w-full relative'
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodeStatesChange}
      onEdgesChange={onEdgesStateChange}
      nodeTypes={NodeType}
        proOptions={proOptions}
      >
     {nodes.length==0 && 
     <div className='absolute inset-0 flex items-center justify-center  '>
       <div className=' z-10 border border-yellow-300 h-96 w-96 rounded-md text-yellow-500 shadow-lg font-mono'>
        <span className='flex justify-center items-center font-semibold mt-2'>Sql Visualizer</span>
        <ul className='ml-2 mt-2  p-4 list-disc '>
        <li>Visualize Sql table</li>
        <li className=''>Access sample queries using 'SAMPLE 1 & SAMPLE 2 ' keywords </li>
        <li >
           <a 
           className='flex gap-2  items-center'
           href='https://github.com/prasannashrestha011/Sql-visualizer' 
       rel='noopener noreferrer' 
       target='_blank'>Source code <FaGithub/></a>
        </li>
        </ul>
       </div>
      </div>}
        <Background/>
      </ReactFlow>
    </div>
  )
}

export default ReactFlowRenderer