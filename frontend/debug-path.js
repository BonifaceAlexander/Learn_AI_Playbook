const fs = require('fs');
const path = require('path');

console.log('CWD:', process.cwd());
const p = path.join(process.cwd(), 'content', 'lessons', 'index.json');
console.log('Path:', p);
console.log('Exists:', fs.existsSync(p));

try {
    const data = fs.readFileSync(p, 'utf8');
    console.log('Read success, length:', data.length);
    JSON.parse(data);
    console.log('JSON parse success');
} catch (e) {
    console.error('Error:', e.message);
}
