const fs = require('fs');
const d = JSON.parse(fs.readFileSync('C:/Users/MOHIT/OneDrive/Desktop/my-project/src/data/bank_branches.json','utf8'));
const m = new Map();
d.forEach(r => { const b = r.bank_name || r.BANK_NAME; if(b) m.set(b, (m.get(b)||0)+1); });
const top = Array.from(m.entries()).sort((a,b)=>b[1]-a[1]).slice(0,12);
top.forEach(([k,v]) => console.log(k, v));
