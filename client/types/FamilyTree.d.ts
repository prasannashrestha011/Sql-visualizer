
import type { Node } from "reactflow";
declare global 
type FamilyTreeType=Omit<Node,'data'>& {
    data:Node['data']&{
        schema?:{
            title:string,
        
        }[]
    }
}