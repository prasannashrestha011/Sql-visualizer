import { TableNode } from "@/types/TableNode";
import { Edge, Node } from "reactflow";

class QueryParser{
    nodes:Node[]
    edges:Edge[]
    constructor(){
        this.nodes=[]
        this.edges=[]
    }
    public async createNodesAndEdges(queryString:string):Promise<{tableNodes:Node[],edges:Edge[]}>{
        const tableDefinitions = queryString.match(/CREATE TABLE[\s\S]*?\);/g);
        if(!tableDefinitions) return{tableNodes:[],edges:[]};
        for (const tableQuery of tableDefinitions) {
             this.parseTable(tableQuery);
        }
        if(this.nodes.length==0){
            
            return {tableNodes:[],edges:[]}
        }
            
        return {tableNodes:this.nodes,edges:this.edges}
       
    }
    public  parseTable(query:string){
     
        const cleanQuery = query
        .replace(/--.*$/gm, '')   // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, ''); 
        const tableNameMatch = cleanQuery.match(/`?(\w+)`?\s*\(/i);
        if (!tableNameMatch) return 
        const tableName=tableNameMatch[1]

        //for converting query into array of fields
        //=>["id INTEGER PRIMARY KEY AUTOINCREMENT,student_id INTEGER NOT NULL"]  

        const columnDefinitionsString=query.substring(query.indexOf('(')+1,query.lastIndexOf(')')).replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        const columnDefinition=this.splitColumnDefition(columnDefinitionsString)
 


        const schema:SchemaType[]=[]
        
        columnDefinition.forEach(colDef=>{
            
            const parts = colDef.split(/\s+/);
    
            if(colDef.toLowerCase().includes('foreign key')){
                const match = colDef.match(/FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/);
                if(match){
                    const foreign_key=match[1]
                    const targetedTable=match[2]
                    const targetedTablefield=match[3]
                    const edge:Edge={
                        id:`${tableName}-${targetedTable}`,
                        source:tableName,
                        target:targetedTable,
                        sourceHandle:`${tableName}-${foreign_key}`,
                        targetHandle:`${targetedTable}-${targetedTablefield}`
                    }
                  
                    this.edges.push(edge)
                }
            }
            if(!colDef.toLowerCase().includes('foreign key')){

            const isPk=colDef.toLowerCase().includes('primary key')
            const isUnique=colDef.toLowerCase().includes('unique') 
            const isNull=colDef.toLowerCase().includes('not null') 

            schema.push({
                title:parts[0],
                type:parts[1],
                is_pk:isPk,
                is_unique:isUnique,
                is_null:isNull
            })
            }
            
            
        })
    
        const Node:TableNode={
            id:tableName,
            position:{x:0,y:0},
         
            data:{
                label:tableName,
                schema:schema
            },
            type:'dataschema'
        }
        this.nodes.push(Node)
  
 

    }
    splitColumnDefition(colDef:string){
        return colDef.split(',').map(def=>def.trim())
    }
}
export default QueryParser