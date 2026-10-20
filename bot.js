// Кнопки .js-bot → Telegram-бот с UTM и склейкой ClientID. Копия скрипта с /elektroserf/, нужен window.SITE_CONFIG.
(function(){
  var CFG = window.SITE_CONFIG || {};
  function sanitize(s){return String(s||"").replace(/[^A-Za-z0-9_-]/g,"").slice(0,40);}
  function botLink(src, clientId){
    var start = sanitize(src) || "site";
    if(clientId){ start += "__" + sanitize(clientId); }
    return "https://t.me/" + CFG.botUsername + "?start=" + start;
  }
  function withClientId(cb){
    var done = false, finish = function(id){ if(!done){done=true; cb(id);} };
    try{
      if(window.ym && CFG.ymCounterId){ ym(CFG.ymCounterId, "getClientID", finish); }
    }catch(e){}
    setTimeout(function(){ finish(""); }, 700); // фолбэк, если Метрика не ответила
  }
  var BOT_API = "https://ruslineup-bot-fedrbodr.amvera.io/api/token";
  function ga4ClientId(cb){
    try{
      if(window.gtag && CFG.ga4Id){ gtag('get', CFG.ga4Id, 'client_id', function(id){ cb(id||""); }); return; }
    }catch(_){}
    cb("");
  }
  document.querySelectorAll(".js-bot").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      var params = new URLSearchParams(window.location.search);
      var src = params.get("utm_source") || this.dataset.src || "site";
      try{ if(window.gtag) gtag("event","open_bot",{source:src}); }catch(_){}
      try{ if(window.ym && CFG.ymCounterId) ym(CFG.ymCounterId,"reachGoal","open_bot"); }catch(_){}
      withClientId(function(ymCid){
        ga4ClientId(function(gaCid){
          var payload = { ga4_cid: gaCid, ym_cid: ymCid, utm_source: src,
            utm_medium: params.get("utm_medium")||"", utm_campaign: params.get("utm_campaign")||"" };
          var done = false;
          function go(url){ if(!done){ done = true; window.location.href = url; } }
          // Фолбэк через 1.2с: если /api/token не ответил — открываем legacy-ссылку src__ymCid.
          setTimeout(function(){ go(botLink(src, ymCid)); }, 1200);
          fetch(BOT_API, {method:"POST", headers:{"Content-Type":"application/json"},
                          body: JSON.stringify(payload)})
            .then(function(r){ return r.json(); })
            .then(function(d){ if(d && d.token){ go("https://t.me/"+CFG.botUsername+"?start=tok_"+d.token); } })
            .catch(function(){ /* фолбэк сработает по таймауту */ });
        });
      });
    });
  });
})();
