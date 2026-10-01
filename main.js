(function(){
  // ---- CONFIG: change the WhatsApp number & message here ----
  var WA_NUMBER='919152919136';
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.href='tel:+'+WA_NUMBER});
  var WA_TEXT='Hello Usha Gift House, I would like to order a gift box.';
  // Paste the deployed Google Apps Script Web App URL here.
  var SUBSCRIBER_API_URL='https://script.google.com/macros/s/AKfycbxLYWZu4iiGnb2f2YnSMKccEiuERpOWjzbsGeRx3CiJ9hoEtGoQBcz9DxycUAu_utNb/exec';
  var waUrl=function(t){return 'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(t||WA_TEXT)};
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=waUrl();a.target='_blank';a.rel='noopener'});
  document.querySelectorAll('[data-wa-item]').forEach(function(a){a.href=waUrl('Hello Usha Gift House, I am interested in: '+a.dataset.waItem);a.target='_blank';a.rel='noopener'});

  // Keep the call-to-action and opening-hours ticker before FAQ and testimonials.
  var pageMain=document.querySelector('main');
  var finalCta=document.querySelector('.fcta');
  var announcement=document.querySelector('.ann');
  var faq=document.getElementById('faq');
  var testimonials=document.getElementById('reviews');
  var reviewForm=document.getElementById('leave-review');
  pageMain.insertBefore(finalCta,testimonials);
  pageMain.insertBefore(faq,testimonials);
  pageMain.insertBefore(announcement,faq);
  pageMain.insertBefore(reviewForm,testimonials.nextSibling);

  // header
  var hdr=document.getElementById('hdr');
  var onScroll=function(){hdr.classList.toggle('solid',window.scrollY>40)};
  onScroll();addEventListener('scroll',onScroll,{passive:true});

  // mobile menu
  var burger=document.getElementById('burger'),mm=document.getElementById('mmenu');
  var setMenu=function(o){burger.setAttribute('aria-expanded',o);mm.classList.toggle('open',o);mm.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':''};
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // active nav
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  var secs=links.map(function(l){return document.querySelector(l.getAttribute('href'))});
  var spy=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){s&&spy.observe(s)});

  // reveal
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  // Product cards reveal details on hover, focus, or tap.
  var cards=[].slice.call(document.querySelectorAll('#cards .collection-product'));
  cards.forEach(function(c){
    c.addEventListener('click',function(){
      if(!matchMedia('(hover:none)').matches)return;
      var open=c.classList.contains('on');
      cards.forEach(function(x){x.classList.remove('on')});
      c.classList.toggle('on',!open);
    });
  });
  document.addEventListener('click',function(e){
    if(matchMedia('(hover:none)').matches&&!e.target.closest('#cards .collection-product')){
      cards.forEach(function(c){c.classList.remove('on')});
    }
  });
  var collectionRail=document.getElementById('cards');
  var collectionStep=function(){var card=collectionRail.querySelector('.collection-product');return card?card.offsetWidth+12:272};
  document.getElementById('collectionNext').addEventListener('click',function(){collectionRail.scrollBy({left:collectionStep()*2,behavior:'smooth'})});
  document.getElementById('collectionPrev').addEventListener('click',function(){collectionRail.scrollBy({left:-collectionStep()*2,behavior:'smooth'})});

  // hero parallax
  var hi=document.getElementById('heroImg');
  if(hi&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    addEventListener('scroll',function(){var y=Math.min(scrollY,700);hi.style.transform='translateY('+(y*.06)+'px) scale('+(1+y*.0001)+')'},{passive:true});
  }

  // gallery rail
  var rail=document.getElementById('rail');
  var step=function(){var c=rail.querySelector('.gcard');return c?c.offsetWidth+26:340};
  document.getElementById('gNext').addEventListener('click',function(){rail.scrollBy({left:step()*2,behavior:'smooth'})});
  document.getElementById('gPrev').addEventListener('click',function(){rail.scrollBy({left:-step()*2,behavior:'smooth'})});
  rail.addEventListener('keydown',function(e){if(e.key==='ArrowRight')rail.scrollBy({left:step(),behavior:'smooth'});if(e.key==='ArrowLeft')rail.scrollBy({left:-step(),behavior:'smooth'})});
  var down=false,sx=0,sl=0,moved=false;
  rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=rail.scrollLeft});
  addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;rail.classList.add('drag')}rail.scrollLeft=sl-dx});
  addEventListener('pointerup',function(){if(!down)return;down=false;rail.classList.remove('drag')});
  rail.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);

  // process line trigger
  var so=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in')}})},{threshold:.4});
  document.querySelectorAll('.step').forEach(function(s){so.observe(s)});

  // FAQ accordion
  var items=[].slice.call(document.querySelectorAll('#acc .qi'));
  items.forEach(function(it){
    var b=it.querySelector('button');
    b.addEventListener('click',function(){
      var open=it.classList.contains('open');
      items.forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});
      if(!open){it.classList.add('open');b.setAttribute('aria-expanded','true')}
    });
  });

  // Newsletter signup.
  var newsletter=document.getElementById('nl');
  newsletter.addEventListener('submit',function(e){
    e.preventDefault();
    var nameInput=document.getElementById('nlName');
    var emailInput=document.getElementById('nlEmail');
    var message=document.getElementById('nlMsg');
    var name=nameInput.value.trim();
    var email=emailInput.value.trim();
    if(!name){message.textContent='Please enter your name.';return}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){message.textContent='Please enter a valid email address.';return}
    if(!SUBSCRIBER_API_URL){message.textContent='Subscription is not connected yet. Please try again later.';return}
    var submitButton=newsletter.querySelector('button[type="submit"]');
    submitButton.disabled=true;
    message.textContent='Submitting...';
    fetch(SUBSCRIBER_API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({name:name,email:email})})
      .then(function(){message.textContent='Thank you! You are subscribed for festive offers.';nameInput.value='';emailInput.value=''})
      .catch(function(){message.textContent='We could not save your email. Please try again.'})
      .finally(function(){submitButton.disabled=false});
  });

  var reviewForm=document.getElementById('reviewForm');
  reviewForm.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('reviewName').value.trim();
    var rating=document.getElementById('reviewRating').value;
    var review=document.getElementById('reviewText').value.trim();
    var status=document.getElementById('reviewFormStatus');
    if(!name||!review){status.textContent='Please enter your name and review.';return}
    var submitButton=reviewForm.querySelector('button[type="submit"]');
    submitButton.disabled=true;
    status.textContent='Submitting your review...';
    fetch(SUBSCRIBER_API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({type:'review',name:name,rating:rating,review:review})})
      .then(function(){status.textContent='Thank you! Your review has been submitted for approval.';reviewForm.reset()})
      .catch(function(){status.textContent='We could not submit your review. Please try again.'})
      .finally(function(){submitButton.disabled=false});
  });
})();