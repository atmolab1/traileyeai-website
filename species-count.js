(()=>{
  const replace38=s=>typeof s==='string'?s.replace(/38/g,'40'):s;

  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){
    const p=n.parentElement;
    if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
    return n.nodeValue.includes('38')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }});
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{n.nodeValue=replace38(n.nodeValue)});

  document.querySelectorAll('meta[content]').forEach(el=>{
    if(el.content.includes('38'))el.content=replace38(el.content);
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach(el=>{
    if(el.textContent.includes('38'))el.textContent=replace38(el.textContent);
  });

  document.querySelectorAll('[aria-label],[title],[alt]').forEach(el=>{
    ['aria-label','title','alt'].forEach(attr=>{
      const value=el.getAttribute(attr);
      if(value&&value.includes('38'))el.setAttribute(attr,replace38(value));
    });
  });

  // Add GPU support to the compact capability row below the hero.
  const trustRow=document.querySelector('.trust-row');
  if(trustRow&&!trustRow.querySelector('[data-gpu-supported]')){
    const params=new URLSearchParams(location.search);
    const lang=params.get('lang')||localStorage.getItem('traileye-lang')||'en';
    const labels={
      en:'GPU supported',
      de:'GPU-Unterstützung',
      sl:'Podpora za GPU',
      es:'Compatible con GPU',
      ru:'Поддержка GPU',
      zh:'支持 GPU'
    };
    const item=document.createElement('span');
    item.dataset.gpuSupported='true';
    item.textContent=labels[lang]||labels.en;
    trustRow.appendChild(item);
  }
})();
