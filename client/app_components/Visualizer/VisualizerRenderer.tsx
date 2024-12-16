
import React, { useEffect, useState } from 'react'
import 'reactflow/dist/style.css';
import ReactFlowRenderer from '@/app_components/renderer/ReactFlowRenderer';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import CodeEditor from '../Tabs/CodeEditor';
import { useAppSelector } from '@/redux/store';
import moment from 'moment'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';




const SqlVisualizer = () => {
  
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');

  const {items:nodesAndEdges}=useAppSelector((state)=>state.tableNodesSlice)
  const {items:logs}=useAppSelector((state)=>state.logDataSlice)
 
  useEffect(() => {
    const checkDirection = () => {
      setDirection(window.innerWidth >= 768 ? 'horizontal' : 'vertical');
    };

    // Check on mount
    checkDirection();

    // Add event listener for window resize
    window.addEventListener('resize', checkDirection);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkDirection);
  }, []);

  return (
    <div className='flex  flex-col md:flex-row  items-center justify-center bg-gray-700 h-screen w-screen'>
  <ResizablePanelGroup 
    direction={direction} 
  className='md:direction-horizontal'>

      {/*flow renderer */}
    <ResizablePanel >

    <ReactFlowRenderer __nodes={nodesAndEdges?.nodes} __edges={nodesAndEdges?.edges}/>
    </ResizablePanel>
    <ResizableHandle/>
     
    <ResizablePanel defaultSize={34} >
      {/*editor */}

<Tabs defaultValue='editor' className='h-full w-full  overflow-hidden  bg-[#17010A] '>
 <TabsList className='flex gap-4 ml-4 p-1 font-mono text-slate-700'>
   <TabsTrigger value='editor'>Editor</TabsTrigger>
   <TabsTrigger value='logs' >logs</TabsTrigger>
 </TabsList>

<div className='  flex flex-col '>
<TabsContent value='editor' className='flex flex-col   '>
<CodeEditor/>
</TabsContent>

<TabsContent value='logs' className='bg-black text-slate-400 font-mono '>
<div className='p-2 h-screen text-xs md:text-base'>
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

    </ResizablePanel>
  </ResizablePanelGroup>
    
    </div>
  )
}

export default SqlVisualizer