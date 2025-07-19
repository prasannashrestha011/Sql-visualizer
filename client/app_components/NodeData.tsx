import { TableNode } from "@/types/TableNode";
import { Edge } from "reactflow";

const InitialNode:TableNode[]=[
    {
        id:'student',
        position:{x:Math.ceil(Math.random()*500),y:Math.ceil(Math.random()*500)},
        data:{
            schema:[
                {title:'id',type:"TEXT",is_null:false,is_pk:true,is_unique:false},
                {title:'name',type:"TEXT",is_null:false,is_pk:false,is_unique:false},
                {title:'contacts',type:"TEXT",is_null:false,is_pk:false,is_unique:false}
                
            ]
        },
        type:'dataSchema'
    },
    {
        id:'contact',
        position:{x:Math.ceil(Math.random()*500),y:Math.ceil(Math.random()*500)},
        data:{
            schema:[
                {title:'email',type:"TEXT",is_null:false,is_pk:true,is_unique:true},
               
                {title:'number',type:"TEXT",is_null:false,is_pk:false,is_unique:true}
            ]
        }
        ,
         type:'dataSchema'
    }
]

const InitialEdges:Edge[]=[
    {
        id:'e1-e2',
        source:'student',
        target:'contact',
        sourceHandle:'source-contacts',
        targetHandle:'target-email',
        type:'smoothstep'
    },
    {
        id:'e2-e3',
        source:'student',
        target:'contact',
        sourceHandle:'source-contacts',
        targetHandle:'target-number',
        type:'smoothstep'
    },
]
export {InitialNode,InitialEdges}
