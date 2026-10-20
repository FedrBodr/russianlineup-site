// Яндекс.Метрика и цели для всех страниц russianlineup.ru. Один счётчик на весь домен, включая /camp/ и olyasurf.
// Направление визита (параметр direction) считаем по первому сегменту пути — по нему режется дашборд /dash/.
(function(){
  var ID = 110157768;
  var DIRS = {
    "": "home",
    "elektroserf": "elektroserf", "moskva.html": "elektroserf", "catalog.html": "elektroserf",
    "korporativ.html": "elektroserf", "blog": "elektroserf",
    "shri-lanka": "sri-lanka", "camp": "camp", "instruktory": "instructors", "mysovoe": "mysovoe"
  };
  var seg = location.pathname.split("/")[1] || "";
  var dir = DIRS[seg] || seg;

  if(!window.ym){
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
    ym(ID,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,params:{direction:dir}});
  }else{
    ym(ID,"params",{direction:dir});
  }

  // rlGoal("camp_calc", {...}) — цель в Метрику и событие в GA4 с направлением страницы.
  window.rlGoal = function(name, params){
    var p = {direction: dir};
    for(var k in params || {}) p[k] = params[k];
    try{ ym(ID, "reachGoal", name, p); }catch(_){}
    try{ if(window.gtag) gtag("event", name, p); }catch(_){}
  };

  // Клики: data-goal — явная цель; t.me — чаты и контакты (кроме кнопок бота, у них своя цель open_bot).
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a");
    if(!a) return;
    if(a.dataset.goal) rlGoal(a.dataset.goal, {target: a.getAttribute("href")});
    var h = a.href || "";
    if(/^https:\/\/t\.me\//.test(h) && !a.classList.contains("js-bot")){
      rlGoal("tg_click", {tg: h.split("?")[0].replace("https://t.me/", "")});
    }else if(/olyasurf\.russianlineup\.ru/.test(h) && location.hostname !== "olyasurf.russianlineup.ru"){
      rlGoal("instructor_click", {instructor: "olya"});
    }else if(/\/instruktory\/den\//.test(h)){
      rlGoal("instructor_click", {instructor: "den"});
    }else if(/\/camp\//.test(h) && seg !== "camp"){
      rlGoal("camp_click");
    }
  }, true);
})();
