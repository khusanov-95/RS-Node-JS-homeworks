import fs from 'fs';

export const printList = () => {
const table = [];
fs.readdir(process.cwd(), { withFileTypes: true }, (err, items) => {
  if (err) {
    console.error(err);
    return;
  }
  const folders = items.filter(item => item.isDirectory());
  const files = items.filter(item => item.isFile());


  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));

  folders.forEach(folder => {
    table.push( { Name: folder.name, Type: 'directory'});
  });

  files.forEach(file => {
    table.push( { Name: file.name, Type: 'file'});
  });
  
  console.table(table);
});


}



