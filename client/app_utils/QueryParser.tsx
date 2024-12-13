export function QueryParser(query: string): void {
    // Extract table name
    const cleanQuery = query.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const tableNameMatch = cleanQuery.match(/`?(\w+)`?\s*\(/i);

    if (!tableNameMatch) return;
    
    const tableName=tableNameMatch[1]
    
    console.log("Table name ",tableName)
    
    const columnDefinitionsString=query.substring(query.indexOf('(')+1,query.lastIndexOf(')')).replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

    const columnDefinition=splitColumnDefinitions(columnDefinitionsString)
    console.log(columnDefinition)
    columnDefinition.forEach(colDef=>{
        console.log('col definition-> ',colDef)
        if(colDef.toLowerCase().includes("primary key")){
            console.log("PRIMARY KEY->",colDef)
        }
        if(colDef.toLowerCase().includes("foreign key")){
            const match = colDef.match(/FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/);
            if(match){
                console.log("table name",tableName)
                console.log("targeted column",match[2])
                console.log("targeted field ",match[3])
            }
        }
        const parts = colDef.split(/\s+/);
        console.log("field name-> ",parts[0])
        console.log("field type ->",parts[1])

        const isPk=colDef.toLowerCase().includes("primary key")
        console.log(`${isPk}`)
        console.log("\n \n" )
    })
    let primaryKeys:string[]=[]
    let foreignKeys:{sourceTable:string,targetTable:string,targetColumn:string}[]=[]

    columnDefinition.forEach(colDef=>{
        if(colDef.startsWith('primary key')){
            console.log('PRIMARY KEY-> ',colDef)
        }
    })
}

function splitColumnDefinitions(columnDef:string){
    return columnDef.split(',').map(def=>def.trim())
}