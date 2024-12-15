import { Editor, Monaco, MonacoDiffEditor } from '@monaco-editor/react'
import initSqlJs, { Database } from 'sql.js';
import React, {  useEffect, useState } from 'react'
import QueryParser from '@/class/QueryParser';
import { handleEditorMount } from '@/app_components/Monaco/EditorMount';
import  { useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';




import ReactFlowRenderer from '@/app_components/renderer/ReactFlowRenderer';



const User = () => {
  
  const [query,setQuery]=useState<string>("")
  const [db,setDb]=useState<Database|null>(null)
  const [nodes,setNodes]=useNodesState([])
  const [edges,setEdges]=useEdgesState([])

  
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
     
     setNodes(tableNodes)
     setEdges(edges)
     
    }catch(err){
      console.log("error",err)
      return 
    }
  }

  const handleEditorChange=(editor:MonacoDiffEditor)=>{
    editor.onDidChangeModelContent(()=>{
      const value=editor.getValue()
      setQuery(value)
    })
  
  }
 
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

  return (
    <div className='flex  flex-col md:flex-row  items-center justify-center bg-gray-700 h-screen w-screen'>
      <ReactFlowRenderer __nodes={nodes} __edges={edges}/>
      <div className='flex flex-col w-full md:w-6/12 md:h-full h-5/6'>
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
        handleEditorChange(editor)
      }}
      />
      <button 
      className='bg-orange-600 p-2 rounded-md text-slate-100 '
      onClick={()=>executeQuery()}>Execute</button>
      </div>
    </div>
  )
}

export default User