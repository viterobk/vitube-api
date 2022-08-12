const fs = require('fs');
const path = require('path');

if(!process.argv[2]) {
    throw Error('Migration name not specified');
}

const format = (num, digits = 2) => {
    const result = new Array(digits).fill('0');
    result.push(num.toString());
    return result.join('').slice(-digits);
}

const nameArg = process.argv[2].replaceAll(' ', '_').toLowerCase();
const migrationsPath = path.resolve(process.cwd(), 'db/migrations');
const now = new Date();
const timestring = [
    now.getFullYear(),
    format(now.getMonth() + 1),
    format(now.getDate()),
    format(now.getHours()),
    format(now.getMinutes()),
    format(now.getSeconds()),
].join('');
const fullName = `${timestring}_${nameArg}`;
const filePath = path.resolve(migrationsPath, `${fullName}.ts`);

const migrationTemplate = `export default {
    name: '${fullName}',
    up: (knex) => {

    },
    down: (knex) => {

    },
}
`;

fs.writeFileSync(filePath, migrationTemplate);
console.log(`Migration saved to "${filePath}"`);

// Update index.ts
const indexPath = path.resolve(migrationsPath, 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf-8');
const parts = indexContent.split(/\[|\]/);
const linebreak = indexContent.indexOf('\r\n') > -1 ? '\r\n' : '\n';
const importStatements = parts[1].split(linebreak).reduce((res, s) => {
    const value = s.trim();
    if(value) {
        res.push(value);
    }
    return res;
}, []);

importStatements.push(`(await import('./${fullName}')).default,`)
const newIndexContent = `${parts[0]}[
${importStatements.map((s) => `        ${s}`).join(linebreak)}    
    ]${parts[2]}`;

fs.writeFileSync(indexPath, newIndexContent);

console.log('Migration created successfully');

