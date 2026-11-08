/* Additive assembly metadata. Legacy geometry remains in world millimeters.
   No network or framework dependency; also usable by the validation scripts. */
(function(root){
  'use strict';
  const list=v=>Array.isArray(v)?v:[];
  const text=v=>v==null?'':String(v);
  const vector=v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n))?v.slice():null;
  function evidence(v){
    v=v||{};
    const source=text(v.source), locator=text(v.locator);
    const url=/^https?:\/\//i.test(text(v.url))?text(v.url):'';
    return {status:v.status==='verified'&&source&&locator?'verified':'estimated',source,locator,url,notes:text(v.notes)};
  }
  function dimensions(rows){
    return list(rows).filter(d=>d&&(!d.unit||d.unit==='mm')&&Number.isFinite(d.value)&&d.value>0).map(d=>Object.assign(evidence(d),{
      label:text(d.label),value:d.value,unit:'mm',from:vector(d.from),to:vector(d.to)
    }));
  }
  function normalize(profile){
    const cs=profile.components, byId=new Map(cs.map(c=>[c.id,c])), warnings=[];
    cs.forEach(c=>{
      c.parent=text(c.parent); c.explode=vector(c.explode)||[0,0,0];
      c.evidence=evidence(c.evidence); c.dimensions=dimensions(c.dimensions);
      c.parts.forEach(p=>{p.componentId=byId.has(p.componentId)?p.componentId:'';p.evidence=evidence(p.evidence);});
      if(c.parent&&(!byId.has(c.parent)||c.parent===c.id)){
        warnings.push('Invalid parent for '+c.id+'; placed at the machine root.'); c.parent='';
      }
    });
    cs.forEach(c=>{
      const seen=new Set([c.id]); let at=c;
      while(at.parent){
        if(seen.has(at.parent)){warnings.push('Assembly cycle at '+c.id+'; placed at the machine root.');c.parent='';break;}
        seen.add(at.parent); at=byId.get(at.parent);
      }
    });
    profile.model=Object.assign({},profile.model||{}, {dimensions:dimensions(profile.model&&profile.model.dimensions),warnings});
    return profile;
  }
  function descendants(cs,id){
    const found=new Set([id]);
    for(let added=true;added;){added=false;cs.forEach(c=>{if(found.has(c.parent)&&!found.has(c.id)){found.add(c.id);added=true;}});}
    return [...found];
  }
  function ancestors(cs,id){
    const byId=new Map(cs.map(c=>[c.id,c])), found=[]; let c=byId.get(id);
    while(c&&c.parent&&!found.includes(c.parent)){found.push(c.parent);c=byId.get(c.parent);}
    return found;
  }
  function offset(cs,id,t){
    const ids=new Set([id,...ancestors(cs,id)]), sum=[0,0,0];
    cs.filter(c=>ids.has(c.id)).forEach(c=>(c.explode||[0,0,0]).forEach((n,i)=>sum[i]+=n*t));
    return sum;
  }
  const api={evidence,dimensions,normalize,descendants,ancestors,offset};
  root.ROOTIOModel=api;
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
})(typeof window==='undefined'?globalThis:window);
