export function QueryParser(query: string): void {
    // Extract table name
    const tableNameMatch = query.match(/`?(\w+)`?\s*\(/i);
    if (!tableNameMatch) return;
    
    const tableName = tableNameMatch[1].toLowerCase();
    console.log(`Table Name: ${tableName}`);
    
    // Extract column definitions
    const columnSection = query.substring(query.indexOf('(') + 1, query.lastIndexOf(')'));
    console.log("column section ",columnSection)
    const columnDefinitions = splitColumnDefinitions(columnSection); //get all the columns
    
    let primaryKey: string[] = [];
    let foreignKeys: { sourceColumn: string, targetTable: string, targetColumn: string }[] = [];

    columnDefinitions.forEach(colDef => {
        // Skip constraint definitions
        if (colDef.toLowerCase().startsWith('constraint') ||
            colDef.toLowerCase().startsWith('primary key') ||
            colDef.toLowerCase().startsWith('foreign key')) {
                
            // Handle PRIMARY KEY constraint
            if (colDef.toLowerCase().includes('primary key')) {
                const pkMatch = colDef.match(/PRIMARY KEY\s*\(([^)]+)\)/i);
                if (pkMatch) {
                    primaryKey = pkMatch[1].split(',').map(col => col.trim().replace(/`/g, '').toLowerCase());
                    console.log(`Primary Key Columns: ${primaryKey.join(', ')}`);
                }
            }

            // Handle FOREIGN KEY constraints
            const fkMatch = colDef.match(/FOREIGN KEY\s*\(`?(\w+)`?\)\s*REFERENCES\s*`?(\w+)`?\s*\(`?(\w+)`?\)/i);
            if (fkMatch) {
                foreignKeys.push({
                    sourceColumn: fkMatch[1],
                    targetTable: fkMatch[2].toLowerCase(),
                    targetColumn: fkMatch[3]
                });
                console.log(`Foreign Key: ${fkMatch[1]} references ${fkMatch[2]}(${fkMatch[3]})`);
            }

            return;
        }

        // Parse column definition
        const parts = colDef.split(/\s+/);
        if (parts.length < 2) return;

        const columnName = parts[0].replace(/`/g, '');
        let dataType = parts[1];
        if (dataType.includes('(')) {
            dataType = dataType.split('(')[0];
        }
        dataType = dataType.toLowerCase();

        // Log column name and data type
        console.log(`Column: ${columnName}, Data Type: ${dataType}`);
    });
}

// Helper function to split the column definitions (assuming this function is available)
function splitColumnDefinitions(columnSection: string): string[] {
    return columnSection.split(',').map(col => col.trim());
}
