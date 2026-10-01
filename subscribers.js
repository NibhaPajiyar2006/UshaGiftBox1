(function(){
  var API_URL='https://script.google.com/macros/s/AKfycbwX6XuvaXyL1MrLGdxH0Vpj54-DF1M76Sq6WpreeNd45Qpy77qZlaUIm-nWFJhe8fv3/exec';
  var list=document.getElementById('subscriberList');
  var status=document.getElementById('subscriberStatus');
  var callbackName='ushagifthouseSubscribers_'+Date.now();
  var script=document.createElement('script');

  window[callbackName]=function(data){
    var names=data.names||data.usernames||[];
    list.replaceChildren();
    names.forEach(function(name){
      var item=document.createElement('li');
      item.textContent=name;
      list.appendChild(item);
    });
    status.textContent=names.length?'':'No subscribers yet.';
    delete window[callbackName];
    script.remove();
  };

  script.onerror=function(){
    status.textContent='Subscriber list could not be loaded. Please check the Google Apps Script deployment.';
    delete window[callbackName];
    script.remove();
  };
  script.src=API_URL+'?callback='+callbackName+'&_='+Date.now();
  document.head.appendChild(script);
})();