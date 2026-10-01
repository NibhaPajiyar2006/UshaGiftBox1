(function(){
  var photoGroups={
    a:['a__3.png','a_1.png','a__4.png','a.png'],
    b:['b.png','b_1.png','b__2.png','b__3.png','b__5.png'],
    c:['c.png','c_1.png','c__2.png','c__3.png'],
    d:['d.png','d_1.png','d__2.png','d__3.png'],
    e:['e.png','e_1.png','e__2.png','e__4.png'],
    f:['f.png','f__2.png','f__3.png'],
    g:['g.png','g__2.png'],
    h:['h.png','h_1.png','h_1_1.png','h__2.png'],
    i:['i.png','i__2.png','i__3.png'],
    j:['j.png','j__2.png','j__3.png'],
    k:['k.png','k__2.png','k__3.png'],
    l:['l.png','l_1.png','l__2.png','l__3.png'],
    m:['m.png','m__2.png']
  };
  var productGroups={
    'Peacock Lotus Cover':'a',
    'Blue Palace Satin Hamper':'b',
    'Peacock Palace Set':'c',
    'Elephant Palace Trunk':'d',
    'Palace Trunk Lid':'e',
    'Blue Mandala Cover':'f',
    'Blue Mandala Box':'g',
    'Rose Lily Dry Fruit Box':'h',
    'Rose Lily Carry Box':'i',
    'Rose Lily Box Cover':'j',
    'Rose Lily Open Box':'k',
    'Rose Lily Box with Lid':'l',
    'Peacock Tree Hamper Set':'m'
  };

  document.querySelectorAll('.gcard').forEach(function(card){
    var title=card.querySelector('h3');
    var group=card.dataset.viewGroup||productGroups[title&&title.textContent.trim()];
    var photos=photoGroups[group];
    var image=card.querySelector('.gimg img');
    if(!photos){
      card.remove();
      return;
    }
    if(!image)return;

    card.dataset.viewGroup=group;
    var productName=title?title.textContent.trim():'Gift box';
    var current=0;
    var controls=document.createElement('div');
    controls.className='product-views';
    var count=document.createElement('span');
    count.className='view-count';
    count.setAttribute('aria-live','polite');
    var thumbnails=document.createElement('div');
    thumbnails.className='view-thumbnails';
    thumbnails.setAttribute('aria-label',productName+' photos');

    function selectPhoto(index){
      current=index;
      image.src='images/'+photos[index];
      image.alt=productName+' — photo '+(index+1)+' of '+photos.length;
      count.textContent='Photo '+(index+1)+' of '+photos.length;
      thumbnails.querySelectorAll('button').forEach(function(button,i){
        button.setAttribute('aria-pressed',i===index?'true':'false');
      });
    }

    photos.forEach(function(photo,index){
      var button=document.createElement('button');
      button.type='button';
      button.className='view-thumb';
      button.setAttribute('aria-label','Show photo '+(index+1)+' of '+photos.length);
      button.setAttribute('aria-pressed','false');
      var thumbnail=document.createElement('img');
      thumbnail.src='images/'+photo;
      thumbnail.alt='';
      thumbnail.loading='lazy';
      button.appendChild(thumbnail);
      button.addEventListener('click',function(){selectPhoto(index)});
      thumbnails.appendChild(button);
    });

    controls.append(count,thumbnails);
    card.insertBefore(controls,card.querySelector('.ginfo'));
    selectPhoto(current);
  });
})();