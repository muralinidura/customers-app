import React, { useState } from 'react';
import * as XLSX from 'xlsx';
const GenerateSQL = ()=>{
    const [sqlCommands, setSQLCommands] = useState([]);

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetNames = workbook.SheetNames;
        const commands = [];
  
        sheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
          const tableName = sheetName;
          const columns = data[0].join(', ');
          const values = data.slice(1).map(row => '(' + row.map(cell => `"${cell}"`).join(', ') + ')');
  
          const insertCommands = values.map(row => `INSERT INTO ${tableName} (${columns}) VALUES ${row};`);
          commands.push(...insertCommands);
        });
  
        setSQLCommands(commands);
      };
  
      reader.readAsBinaryString(file);
    };
    
    return(
        <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        {sqlCommands.map((command, index) => (
          <pre key={index}>{command}</pre>
        ))}
      </div>
    </div>
    )
}


export default GenerateSQL;