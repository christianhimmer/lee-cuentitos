import fs from 'node:fs/promises';
import path from 'node:path';

const BASE='https://leecuentitos.com/wp-json/wp/v2';
const get=async(u)=>{const r=await fetch(u); if(!r.ok) throw new Error(u+' '+r.status); return r.json();};

const [posts,tags,cats,sagas,media] = await Promise.all([
  get(`${BASE}/posts?per_page=100&_fields=id,slug,title,date,modified,content,excerpt,featured_media,tags,categories,saga,link`),
  get(`${BASE}/tags?per_page=100`),
  get(`${BASE}/categories?per_page=100`),
  get(`${BASE}/saga?per_page=100`),
  get(`${BASE}/media?per_page=100&_fields=id,slug,source_url,alt_text,title,media_details`)
]);

const map=(a)=>Object.fromEntries(a.map(x=>[x.id,x]));
const t=map(tags), c=map(cats), s=map(sagas), m=map(media);

const data=posts.map(p=>({
  id:p.id, slug:p.slug, title:p.title.rendered, date:p.date, modified:p.modified,
  link:p.link, content:p.content.rendered, excerpt:p.excerpt.rendered,
  sagas:(p.saga||[]).map(i=>s[i]).filter(Boolean).map(x=>({id:x.id,name:x.name,slug:x.slug})),
  tags:(p.tags||[]).map(i=>t[i]).filter(Boolean).map(x=>x.name),
  categories:(p.categories||[]).map(i=>c[i]).filter(Boolean).map(x=>x.name),
  image: m[p.featured_media] ? {url:m[p.featured_media].source_url, alt:m[p.featured_media].alt_text, w:m[p.featured_media].media_details?.width, h:m[p.featured_media].media_details?.height} : null
}));

await fs.writeFile('migracion/datos.json', JSON.stringify(data,null,2));
console.log('posts:',data.length);

for(const p of data){
  if(!p.image?.url) continue;
  const ext=path.extname(new URL(p.image.url).pathname)||'.webp';
  const dest=`public/images/cuentos/${p.slug}${ext}`;
  try{
    const r=await fetch(p.image.url);
    const b=Buffer.from(await r.arrayBuffer());
    await fs.writeFile(dest,b);
    p.image.local=dest;
    console.log('img',dest,(b.length/1024).toFixed(0)+'KB');
  }catch(e){ console.log('ERR img',p.slug,e.message); }
}
await fs.writeFile('migracion/datos.json', JSON.stringify(data,null,2));
