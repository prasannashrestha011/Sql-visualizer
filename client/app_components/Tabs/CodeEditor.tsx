import React, { useEffect, useState } from 'react'

import * as monaco from 'monaco-editor'; 
import { Editor, Monaco } from '@monaco-editor/react';
import { handleEditorMount } from '../Monaco/EditorMount';
import { Database } from 'sql.js';
import QueryParser from '@/class/QueryParser';
import initSqlJs from 'sql.js';
import { VscDebugStart } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setNodesAndEdges } from '@/redux/Slices/TableNodesSlice';
import { addLogs } from '@/redux/Slices/LogSlice';
import { setQuery } from '@/redux/Slices/EditorSlice';
const CodeEditor = () => {
  const {query}=useAppSelector((state)=>state.editorSlice)

  const [db,setDb]=useState<Database|null>(null)
  const dispatcher=useAppDispatch()
  const executeQuery=async()=>{
    try{
      if(!db){
        console.log("no db connected")
        dispatcher(addLogs({message:"database not connected",is_err:true}))
        return 
      }
      const result=db.exec(query)
      if(result.length==0){
        console.log("query executed succesfully")
        dispatcher(addLogs({message:"query executed succesfully",is_err:false}))
      }
     
     const queryParser=new QueryParser()
     const {tableNodes,edges}=await queryParser.createNodesAndEdges(query)
     dispatcher(setNodesAndEdges({nodes:tableNodes,edges:edges}))
     
     
    }catch(err){
      const Err=err as Error
      console.log("error",Err.message)
      dispatcher(addLogs({message:Err.message,is_err:true}))
      return 
    }
  }

  const handleEditorChange = (editor:monaco.editor.IStandaloneCodeEditor) => {
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
     
      dispatcher(setQuery(value))
    });
   
  };
  
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
           <div className='flex flex-col '>
          <div className='flex justify-end mr-4 mb-1'>
          <VscDebugStart className='  text-[#4d142b] z-10'
   onClick={()=>executeQuery()}
   size={29}/>
          </div>
 <Editor
      value={query}
      className='min-h-screen'
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
        handleEditorMount(monaco)
        handleEditorChange(editor)
      }}
      />
           </div>
  )
}

export default CodeEditor