
import React from 'react'
import 'reactflow/dist/style.css';
import ReactFlowRenderer from '@/app_components/renderer/ReactFlowRenderer';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import CodeEditor from '../Tabs/CodeEditor';
import { useAppSelector } from '@/redux/store';
import moment from 'moment'


const SqlVisualizer = () => {
  


  const {items:nodesAndEdges}=useAppSelector((state)=>state.tableNodesSlice)
  const {items:logs}=useAppSelector((state)=>state.logDataSlice)
 
 

  return (
    <div className='flex  flex-col md:flex-row  items-center justify-center bg-gray-700 h-screen w-screen'>
      {/*flow renderer */}
      <ReactFlowRenderer __nodes={nodesAndEdges?.nodes} __edges={nodesAndEdges?.edges}/>
     
     {/*editor */}
     <Tabs defaultValue='editor' className='h-full w-full  overflow-hidden md:w-6/12 bg-[#17010A] '>
      <TabsList className='flex gap-4 ml-4 p-1 font-mono text-slate-700'>
        <TabsTrigger value='editor'>Editor</TabsTrigger>
        <TabsTrigger value='logs' >logs</TabsTrigger>
      </TabsList>
   
   <div className='  flex flex-col '>
   <TabsContent value='editor' className='flex flex-col   '>
    <CodeEditor/>
   </TabsContent>

   <TabsContent value='logs' className='bg-black text-slate-400 font-mono'>
    <div className='p-2 h-screen'>
      <ul>
        {logs.map((log,idx)=>{
          return(
            <li key={idx} className={`flex gap-2 ${log.is_err?'text-red-700':''}`}>
              <span >{moment.utc(log.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>
              <span>{log.message}</span>
              </li>
          )
        })}
      </ul>
    </div>
   </TabsContent>
   </div>
     
     </Tabs>
    </div>
  )
}

export default SqlVisualizer