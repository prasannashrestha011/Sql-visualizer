import { FamilyTreeType } from "@/types/FamilyTree";
import { Edge } from "reactflow";

const InitialNodes:FamilyTreeType[]=[
    // nodes
    {
        id:"1",
        position:{x:0,y:0},
        data:{
            label:"child",
            schema:[
            {title:"jake",handleId:'jake'},
            {title:"jake's Dad",handleId:'jake-dad'},
            {title:"jake's Mom",handleId:'jake-mom'}
            ]
        },
        type:"dataSchema"
    },
    //jake dad's connections 
    {
        id:"2",
        position:{x:100,y:100},
        data:{
            label:"dad",
            schema:[
            {title:"mike",handleId:'mike'},
            {title:"mike's Dad",handleId:'mike-dad'},
            {title:"mike's Mom",handleId:'mike-mom'}
            ]
        },
           type:"dataSchema"
    },
    //jake mom's connection
    {
        id:"3",
        position:{x:0,y:200},
        data:{
            label:"mom",
            schema:[
            {title:"selena",handleId:'selena'},
            {title:"selena's Dad",handleId:'selena-dad'},
            {title:"mike's Mom",handleId:'selena-mom'}
            ]
        },
           type:"dataSchema"
    }
]
const initialEdges:Edge[]=[
    {
        id:'e1-e2',
        source:'1',
        target:'2',
       sourceHandle:'jake-dad',
       targetHandle:'mike'
    },
    {
        id:'e2-e3',
        source:'1',
        target:'3',
       sourceHandle:'jake-mom',
       targetHandle:'selena'
    }
]
export {InitialNodes,initialEdges}