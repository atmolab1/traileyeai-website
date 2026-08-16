const toggle=document.querySelector('[data-menu-toggle]');
const nav=document.querySelector('[data-nav]');

if(toggle&&nav){
  const huntersLink=nav.querySelector('a[href="trail-camera-software-for-hunters/"]');
  if(huntersLink) huntersLink.remove();

  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });

  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

// Make optional cloud AI/custom-description search visible in the hero.
const heroText=document.querySelector('.hero-content > p');
if(heroText){
  heroText.textContent='TrailEye AI detects animals, people and vehicles, identifies supported wildlife species, recovers timestamps and turns thousands of photos and videos into timelines, heatmaps, statistics, maps and exportable reports. For more flexible searches, optional cloud AI can also analyze your media for virtually anything you describe in natural language.';
}

const trustRow=document.querySelector('.trust-row');
if(trustRow && !trustRow.querySelector('[data-cloud-ai]')){
  const item=document.createElement('span');
  item.dataset.cloudAi='true';
  item.textContent='Optional cloud AI custom detection';
  trustRow.appendChild(item);
}

// Add a dedicated Cloud AI capability card.
const featureGrid=document.querySelector('#features .feature-grid');
if(featureGrid && !featureGrid.querySelector('[data-cloud-feature]')){
  const card=document.createElement('article');
  card.className='feature-card reveal visible';
  card.dataset.cloudFeature='true';
  card.innerHTML='<div class="feature-icon">☁</div><h3>Describe anything. Let cloud AI find it.</h3><p>Use optional cloud AI when you need detection beyond the built-in wildlife classes. Describe what you are looking for in natural language — for example a person carrying equipment, a specific vehicle type, an unusual animal behavior or another visual detail — and TrailEye can search the media for matching events.</p>';
  featureGrid.appendChild(card);
}

// Clarify filtered heatmaps and analytics.
const insights=document.querySelector('#insights');
if(insights){
  const heading=insights.querySelector('.section-heading h2');
  const intro=insights.querySelector('.section-heading p');
  if(heading) heading.textContent='See exactly when selected species, people or vehicles are active.';
  if(intro) intro.textContent='TrailEye converts reviewed detections into visual activity patterns. Select a species, person detections or vehicle detections and build heatmaps and statistics for that selection instead of mixing every event together.';

  const firstCopy=insights.querySelector('.product-showcase .copy');
  if(firstCopy){
    const h3=firstCopy.querySelector('h3');
    const p=firstCopy.querySelector('p');
    if(h3) h3.textContent='Filter the heatmap to the activity you actually care about.';
    if(p) p.textContent='Choose an individual wildlife species, all animals, people or vehicles and inspect when those selected detections occur by hour and day.';

    const bullets=firstCopy.querySelector('.bullet-list');
    if(bullets){
      bullets.innerHTML='<div class="bullet">Heatmaps filtered by selected wildlife species</div><div class="bullet">Separate activity views for people and vehicles</div><div class="bullet">Hourly and daily activity summaries for the current selection</div><div class="bullet">Species counts and filtered timelines</div><div class="bullet">Sun-period and available moon context for deeper field interpretation</div>';
    }
  }
}

// Embedded Lemon Squeezy checkout: customer remains on TrailEye page.
const checkoutUrls={
  Explorer:'https://wildtech.lemonsqueezy.com/checkout/buy/256104e4-6ba8-476d-a560-7faf5e77a50c?embed=1',
  Professional:'https://wildtech.lemonsqueezy.com/checkout/buy/8cb2b684-4c57-4271-8abd-49ceaac2d7d9?embed=1'
};

document.querySelectorAll('#pricing .price-card').forEach(card=>{
  const title=card.querySelector('h3')?.textContent.trim();
  const button=card.querySelector('a.btn');
  const checkout=checkoutUrls[title];
  if(!button || !checkout) return;
  button.href=checkout;
  button.classList.add('lemonsqueezy-button');
  button.removeAttribute('download');
  button.textContent=title==='Explorer' ? 'Buy Explorer' : 'Buy Professional';
});

if(!document.querySelector('script[data-lemonjs]')){
  const lemonScript=document.createElement('script');
  lemonScript.src='https://assets.lemonsqueezy.com/lemon.js';
  lemonScript.defer=true;
  lemonScript.dataset.lemonjs='true';
  document.head.appendChild(lemonScript);
}

// Reliable on-page Contact section. Mailto remains optional, but the email is always visible/copyable.
const footer=document.querySelector('.site-footer');
const contactLink=[...document.querySelectorAll('a')].find(a=>a.textContent.trim()==='Contact');
if(footer && !document.querySelector('#contact')){
  const contact=document.createElement('section');
  contact.id='contact';
  contact.className='section-tight';
  contact.innerHTML='<div class="container"><div class="final-cta reveal visible"><div class="final-copy"><span class="kicker">Contact TrailEye</span><h2>Questions, support or licensing?</h2><p>Contact us directly at <strong>info@traileye.eu</strong>.</p><div class="actions"><a class="btn btn-primary" href="mailto:info@traileye.eu?subject=TrailEye%20AI%20enquiry">Open email app</a><button class="btn btn-secondary" type="button" data-copy-email>Copy email</button></div><p data-copy-status style="margin-top:14px;font-size:13px"></p></div></div></div>';
  footer.parentNode.insertBefore(contact,footer);
}
if(contactLink){
  contactLink.href='#contact';
  contactLink.removeAttribute('target');
}
const copyEmailButton=document.querySelector('[data-copy-email]');
if(copyEmailButton){
  copyEmailButton.addEventListener('click',async()=>{
    const status=document.querySelector('[data-copy-status]');
    try{
      await navigator.clipboard.writeText('info@traileye.eu');
      if(status) status.textContent='Email copied: info@traileye.eu';
    }catch{
      if(status) status.textContent='Email: info@traileye.eu';
    }
  });
}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }
}),{threshold:.08});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());