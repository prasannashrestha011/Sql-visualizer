import { Editor, Monaco, MonacoDiffEditor } from '@monaco-editor/react'
import initSqlJs, { Database } from 'sql.js';
import React, { useCallback, useEffect, useState } from 'react'
import QueryParser from '@/class/QueryParser';
import { handleEditorMount } from '@/app_components/Monaco/EditorMount';
import ReactFlow, { Background, Edge, Node, useEdgesState, useNodes, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js';

import NodeDataSchema from '@/app_components/NodeDataSchema';
const NodeType={
  'dataschema':NodeDataSchema
}
const elk=new ELK()
  const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.spacing.nodeNode': '150',
    'elk.layered.spacing.nodeNodeBetweenLayers': '200',
    'elk.direction': 'LEFT',
    'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
    'elk.layered.nodePlacement.strategy': 'SIMPLE',
    'elk.layered.layering.strategy': 'NETWORK_SIMPLEX',
  };
const user = () => {
  
  const [query,setQuery]=useState<string>("")
  const [db,setDb]=useState<Database|null>(null)
  const [nodes,setNodes,onNodeStatesChange]=useNodesState([])
  const [edges,setEdges,onEdgesStateChange]=useEdgesState([])

  
  const executeQuery=async()=>{
    try{
      if(!db){
        console.log("no db connected")
        return 
      }
      const result=db.exec(query)
      if(result.length==0){
        console.log("no results")
      }
     
     const queryParser=new QueryParser()
     const {tableNodes,edges}=await queryParser.createNodesAndEdges(query)
     console.log("TABLE NODE->",tableNodes)
     console.log("EDGES->",edges)
     setNodes(tableNodes)
     setEdges(edges)
     handleAutoLayout(tableNodes,edges)
    }catch(err){
      console.log("error",err)
      return 
    }
  }

  const handleEditorChange=(editor:MonacoDiffEditor,monaco:Monaco)=>{
    editor.onDidChangeModelContent(()=>{
      const value=editor.getValue()
      setQuery(value)
    })
  
  }
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
  useEffect(()=>{
    const loadSqljs=async()=>{
      const Sql = await initSqlJs({
         locateFile: file => `https://sql.js.org/dist/${file}` //getting sql engine
      });
      
      const database=new Sql.Database()
      setDb(database)
    }
    loadSqljs()
  },[])
  useEffect(()=>{
    handleAutoLayout(nodes,edges)
   
  },[])
  return (
    <div className='flex  items-center justify-center bg-gray-700 h-screen w-screen'>

      <ReactFlow className='h-full w-full'
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodeStatesChange}
      onEdgesChange={onEdgesStateChange}
      nodeTypes={NodeType}
      >
        <Background/>
      </ReactFlow>
      <div className='flex flex-col w-6/12 h-full'>
      <Editor

      
      defaultLanguage='sql'
      theme='custom-theme'
      beforeMount={monaco => {
        monaco.editor.defineTheme('custom-theme', {
          base: 'vs-dark', // Start with the 'vs-dark' base theme
      inherit: true,    // Inherit other settings from the base theme
      rules: [],        // Customize rules (if needed)
      colors: {
        'editor.background': '#17010A', // Set background color to black
      },
        });
      }}
      options={{
        wordWrap:"on"
      }}
      onMount={(editor,monaco:Monaco)=>{
        handleEditorMount(editor,monaco)
        handleEditorChange(editor,monaco)
      }}
      />
      <button 
      className='bg-orange-400 p-2 rounded-md text-slate-50 '
      onClick={()=>executeQuery()}>Execute</button>
      </div>
    </div>
  )
}

export default user