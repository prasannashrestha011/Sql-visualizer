export function QueryParser(query: string) {
    // Match all CREATE TABLE statements in the query
    const matches = query
      .trim()
      .toLowerCase()
      .match(/create table (\w+)\s*\(([^)]+)\)/g);
    if(matches){
       const tables= matches.map((query,idx)=>{
         
            const match=query.match(/^create table (\w+)\s*\(([^)]+)\)/i);
            if(match){
                const tableName=match[1]
                const cols=match[2].split(",").map(col=>col.trim()).map(col=>{
                    const [name,type,exp]=col.split(' ').map(s=>s.trim())
                    return {name,type,exp}
                })
                console.log(cols)
                return {tableName,cols}
            }
        })
        return tables
    // if (matches) {
    //     // Parse each CREATE TABLE statement
    //     const tables = matches.map((createTableQuery,idx) => {
    //       console.log(idx)
    //       const match = createTableQuery.match(/^create table (\w+)\s*\(([^)]+)\)/i);
    
    //       if (match) {
    //         const tableName = match[1];
    //         const columnsAndValues = match[2]
    //           .split(',')
    //           .map(col => col.trim())
    //           .map(col => {
    //             const [name, type] = col.split(' ').map(s => s.trim());
    //             return { name, type };
    //           });
    
    //         return { tableName, columnsAndValues };
    //       }
    //     });
    
    //     return tables;
    //   }
    }
  
    return [];
  }