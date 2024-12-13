
import React from 'react';
import {  Handle, NodeProps, Position } from 'reactflow';
type NodeDataSchema={
    label:string;
    schema:{title:string,handleId?:string}[]
}
export function NodeDataSchema({data}:NodeProps<NodeDataSchema>){
    return (
        <div className='bg-slate-400 p-2 rounded-md'>
           <strong> {data.label}</strong>
            {data.schema&&data.schema.map((item, idx) => (
                
                <>
                {console.log(`target-${data.label}-${item.title}`)}
                {console.log(`source-${item.handleId}`)}
                {console.log(`\n`)}
                <Handle
                type='target'
                id={`${item.handleId}`}
                style={{top:`${42+26*idx}px`}}
                position={Position.Left}
                />
                 <div key={idx}>{item.title}</div>

                 <Handle
                type='source'
                id={`${item.handleId}`}
               
                style={{top:`${42+26*idx}px`}}
                position={Position.Right}
                />
                </>
               
            ))}
        </div>
    );
};

export default NodeDataSchema;
