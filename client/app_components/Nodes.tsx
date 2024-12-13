
interface NodeType{
  id:string
  position:{x:number,y:number}
  type:"dataschema",
  data:{
    label:string 
    schema:[{}]
  }
}
const NodeData:NodeType[]=[
{
  id:"1",
  position:{x:0,y:0},
  type:"dataschema",
  data:{
    label:"student",
    schema:[
      {name:"prasanna",address:"sallaghari",college:"samriddhi"},
      
    ]
  }
},
{
  id:"2",
  position:{x:100,y:100},
  type:"dataschema",
  data:{
    label:"district",
    schema:[
      {name:"bhaktapur",address:"lokanthali"}
    ]
  }
}
]
const NodeEdges=[
  {
    id:'e1-e2',
    source:"1",
    target:"2",
    sourceHandle:"prasanna-0",
    targetHandle:"bhaktapur-0",
    type:"smoothstep" 
  },
  {
    id:'e3-e4',
    source:"1",
    target:"2",
    sourceHandle:"prasanna-0",
    targetHandle:"lokanthali-0",
    type:"smoothstep" 
  }
]
export type {NodeType}
export  {NodeData,NodeEdges}