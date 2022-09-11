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
const migrationsPath = path.resolve(process.cwd(), 'migrations');
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

const migrationTemplate = `/** This is a migration stub. For details on filling it, see https://salsita.github.io/node-pg-migrate/#/ */

exports.up = (pgm) => {

}
exports.down = (pgm) => {
    
}
`;

fs.writeFileSync(filePath, migrationTemplate);
console.log(`Migration saved to "${filePath}"`);