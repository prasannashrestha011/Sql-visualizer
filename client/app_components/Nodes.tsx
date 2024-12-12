interface NodeDataType{
  id:string
  student_name:string
  relation:string
  class_name:string
}
const NodeData:NodeDataType[]=[
  {
    id:"1",
    class_name:"1stsem",
    relation:"student",
    student_name:"prasanna"
  },
  {
    id:"1",
    class_name:"1stsem",
    relation:"student",
    student_name:"jake"
  },
  {
    id:"1",
    class_name:"1stsem",
    relation:"student",
    student_name:"mike"
  }


   
]
export type {NodeDataType}