(()=>{
  const supported=['en','de','sl','es','ru','zh'];
  const names={en:'English',de:'Deutsch',sl:'Slovenščina',es:'Español',ru:'Русский',zh:'中文'};
  const browser=(navigator.language||'en').toLowerCase();
  const browserLang=browser.startsWith('de')?'de':browser.startsWith('sl')?'sl':browser.startsWith('es')?'es':browser.startsWith('ru')?'ru':browser.startsWith('zh')?'zh':'en';
  const params=new URLSearchParams(location.search);
  let lang=params.get('lang')||localStorage.getItem('traileye-lang')||browserLang;
  if(!supported.includes(lang)) lang='en';
  localStorage.setItem('traileye-lang',lang);
  if(lang==='de' && location.pathname==='/' && !location.pathname.startsWith('/de/')){
    location.replace('/de/');
    return;
  }
  document.documentElement.lang=lang==='zh'?'zh-CN':lang;

  const dictionaries={
    de:{
      'Features':'Funktionen','Heatmaps & stats':'Heatmaps & Statistiken','Maps':'Karten','How it works':'So funktioniert es','Pricing':'Preise','Download free':'Kostenlos herunterladen',
      'Local AI · Windows desktop · No mandatory cloud':'Lokale KI · Windows Desktop · Keine Cloud-Pflicht',
      'Turn trail-camera folders into wildlife intelligence.':'Verwandle Wildkamera-Ordner in verwertbare Wildtierdaten.',
      'Download TrailEye Free':'TrailEye Free herunterladen','Explore the analytics':'Analysen entdecken',
      'Local-first processing':'Lokale Verarbeitung','Photos + videos':'Fotos + Videos','Reviewable species suggestions':'Überprüfbare Artvorschläge','Free edition stays free':'Kostenlose Version bleibt kostenlos','Optional cloud AI custom detection':'Optionale Cloud-KI für benutzerdefinierte Erkennung',
      'supported wildlife species':'unterstützte Wildtierarten','core event classes: animal, person, vehicle':'Kernklassen: Tier, Person, Fahrzeug','export formats incl. CSV, Excel & PDF':'Exportformate inkl. CSV, Excel & PDF','standard detection runs locally':'Standarderkennung läuft lokal',
      'Real TrailEye capabilities':'Echte TrailEye-Funktionen','Much more than automatic animal sorting.':'Viel mehr als nur automatische Tiersortierung.','Animal, person & vehicle detection':'Tier-, Personen- & Fahrzeugerkennung','Species identification':'Arterkennung','Timestamp recovery':'Zeitstempel-Erkennung','Smart review timeline':'Intelligente Prüf-Timeline','Photos and short videos':'Fotos und kurze Videos','Reports & portable data':'Berichte & exportierbare Daten',
      'Activity analytics':'Aktivitätsanalyse','Heatmaps + statistics':'Heatmaps + Statistiken','Place matters':'Der Standort zählt','Connect detections to camera sites.':'Erkennungen mit Kamerastandorten verknüpfen.','Human-in-the-loop AI':'KI mit menschlicher Kontrolle','Review the prediction instead of blindly trusting it.':'Vorhersagen prüfen statt ihnen blind zu vertrauen.',
      'Wildlife detection':'Wildtiererkennung','Built for the species people actually track.':'Für die Arten entwickelt, die Menschen wirklich beobachten.','Deer':'Hirsch','Wolf':'Wolf','Bear':'Bär','Detection context':'Erkennungskontext','Species library':'Artenbibliothek',
      'Simple field workflow':'Einfacher Feld-Workflow','From SD card to useful pattern.':'Von der SD-Karte zu verwertbaren Mustern.','Import your camera folder':'Kameraordner importieren','Let local AI do the first pass':'Lokale KI übernimmt den ersten Durchlauf','Review, analyze and export':'Prüfen, analysieren und exportieren',
      'Who TrailEye is for':'Für wen TrailEye gedacht ist','One workflow, three very different jobs.':'Ein Workflow für drei sehr unterschiedliche Aufgaben.','Hunters & land managers':'Jäger & Revierverwalter','Wildlife researchers':'Wildtierforscher','Nature observers':'Naturbeobachter',
      'AI trail camera software':'KI-Software für Wildkameras','From thousands of trail-camera files to searchable wildlife activity.':'Von tausenden Wildkamera-Dateien zu durchsuchbarer Wildtieraktivität.','Best AI trail camera software guide':'Leitfaden zur besten KI-Wildkamera-Software','AI trail camera photo & video sorting':'KI-Sortierung von Wildkamera-Fotos & Videos','Offline, privacy-first analysis':'Offline-Analyse mit Fokus auf Datenschutz','Camera-trap research workflows':'Workflows für Kamerafallen-Forschung',
      'Simple licensing':'Einfache Lizenzierung','Test it free. Pay once when your archive grows.':'Kostenlos testen. Einmal zahlen, wenn dein Archiv wächst.','Permanent free edition':'Dauerhaft kostenlose Version','Free':'Free','forever':'dauerhaft','Download Free':'Free herunterladen','For active camera users':'Für aktive Kameranutzer','Explorer':'Explorer','one-time licence':'Einmallizenz','Buy Explorer':'Explorer kaufen','Multi-camera projects':'Projekte mit mehreren Kameras','Professional':'Professional','Buy Professional':'Professional kaufen',
      'See more. Search less.':'Mehr sehen. Weniger suchen.','Start with the camera folder you already have.':'Starte mit dem Kameraordner, den du bereits hast.','How local processing works':'So funktioniert lokale Verarbeitung',
      'Contact TrailEye':'TrailEye kontaktieren','Questions, support or licensing?':'Fragen, Support oder Lizenzierung?','Open email app':'E-Mail-App öffnen','Copy email':'E-Mail kopieren','Product':'Produkt','Workflows':'Workflows','Get TrailEye':'TrailEye holen','Contact':'Kontakt'
    },
    sl:{
      'Features':'Funkcije','Heatmaps & stats':'Toplotne karte in statistika','Maps':'Zemljevidi','How it works':'Kako deluje','Pricing':'Cenik','Download free':'Brezplačen prenos',
      'Local AI · Windows desktop · No mandatory cloud':'Lokalni AI · Windows namizni program · Oblak ni obvezen',
      'Turn trail-camera folders into wildlife intelligence.':'Spremenite mape lovskih kamer v uporabne podatke o živalih.',
      'Download TrailEye Free':'Prenesi TrailEye Free','Explore the analytics':'Razišči analitiko',
      'Local-first processing':'Lokalna obdelava','Photos + videos':'Fotografije + videi','Reviewable species suggestions':'Preverljivi predlogi vrst','Free edition stays free':'Brezplačna različica ostane brezplačna','Optional cloud AI custom detection':'Izbirni AI v oblaku za poljubno zaznavanje',
      'supported wildlife species':'podprtih vrst živali','core event classes: animal, person, vehicle':'osnovni razredi: žival, oseba, vozilo','export formats incl. CSV, Excel & PDF':'izvozni formati, vključno CSV, Excel in PDF','standard detection runs locally':'standardno zaznavanje deluje lokalno',
      'Real TrailEye capabilities':'Dejanske zmogljivosti TrailEye','Much more than automatic animal sorting.':'Veliko več kot samodejno razvrščanje živali.','Animal, person & vehicle detection':'Zaznavanje živali, oseb in vozil','Species identification':'Prepoznavanje vrst','Timestamp recovery':'Pridobivanje časovnih oznak','Smart review timeline':'Pametna časovnica za pregled','Photos and short videos':'Fotografije in kratki videi','Reports & portable data':'Poročila in prenosljivi podatki',
      'Activity analytics':'Analitika aktivnosti','Heatmaps + statistics':'Toplotne karte + statistika','Place matters':'Lokacija je pomembna','Connect detections to camera sites.':'Povežite zaznave z lokacijami kamer.','Human-in-the-loop AI':'AI s človeškim nadzorom','Review the prediction instead of blindly trusting it.':'Napoved preverite, namesto da ji slepo zaupate.',
      'Wildlife detection':'Zaznavanje divjadi','Built for the species people actually track.':'Narejeno za vrste, ki jih ljudje dejansko spremljajo.','Deer':'Jelen','Wolf':'Volk','Bear':'Medved','Detection context':'Kontekst zaznave','Species library':'Knjižnica vrst',
      'Simple field workflow':'Preprost terenski potek','From SD card to useful pattern.':'Od SD-kartice do uporabnih vzorcev.','Import your camera folder':'Uvozite mapo kamere','Let local AI do the first pass':'Naj lokalni AI opravi prvi pregled','Review, analyze and export':'Preglejte, analizirajte in izvozite',
      'Who TrailEye is for':'Komu je TrailEye namenjen','One workflow, three very different jobs.':'En potek dela za tri zelo različne naloge.','Hunters & land managers':'Lovci in upravljavci zemljišč','Wildlife researchers':'Raziskovalci divjih živali','Nature observers':'Opazovalci narave',
      'AI trail camera software':'AI programska oprema za lovske kamere','From thousands of trail-camera files to searchable wildlife activity.':'Od tisočev posnetkov lovskih kamer do pregledne aktivnosti živali.','Best AI trail camera software guide':'Vodnik po najboljši AI programski opremi za lovske kamere','AI trail camera photo & video sorting':'AI razvrščanje fotografij in videov lovskih kamer','Offline, privacy-first analysis':'Lokalna analiza z zasebnostjo na prvem mestu','Camera-trap research workflows':'Poteki dela za raziskovanje s kamerami',
      'Simple licensing':'Preprosto licenciranje','Test it free. Pay once when your archive grows.':'Preizkusite brezplačno. Plačajte enkrat, ko arhiv zraste.','Permanent free edition':'Trajno brezplačna različica','Free':'Brezplačno','forever':'za vedno','Download Free':'Prenesi brezplačno','For active camera users':'Za aktivne uporabnike kamer','Explorer':'Explorer','one-time licence':'enkratni nakup','Buy Explorer':'Kupi Explorer','Multi-camera projects':'Projekti z več kamerami','Professional':'Professional','Buy Professional':'Kupi Professional',
      'See more. Search less.':'Poglej več. Išči manj.','Start with the camera folder you already have.':'Začnite z mapo kamere, ki jo že imate.','How local processing works':'Kako deluje lokalna obdelava',
      'Contact TrailEye':'Kontaktirajte TrailEye','Questions, support or licensing?':'Vprašanja, podpora ali licenciranje?','Open email app':'Odpri e-pošto','Copy email':'Kopiraj e-pošto','Product':'Izdelek','Workflows':'Načini uporabe','Get TrailEye':'Pridobi TrailEye','Contact':'Kontakt'
    },
    es:{
      'Features':'Funciones','Heatmaps & stats':'Mapas de calor y estadísticas','Maps':'Mapas','How it works':'Cómo funciona','Pricing':'Precios','Download free':'Descargar gratis',
      'Local AI · Windows desktop · No mandatory cloud':'IA local · Windows · Sin nube obligatoria','Turn trail-camera folders into wildlife intelligence.':'Convierte carpetas de cámaras trampa en información útil sobre fauna.','Download TrailEye Free':'Descargar TrailEye Free','Explore the analytics':'Explorar análisis','Local-first processing':'Procesamiento local','Photos + videos':'Fotos + vídeos','Reviewable species suggestions':'Sugerencias de especies revisables','Free edition stays free':'La edición gratuita sigue siendo gratuita','Optional cloud AI custom detection':'IA opcional en la nube para detección personalizada',
      'Real TrailEye capabilities':'Funciones reales de TrailEye','Much more than automatic animal sorting.':'Mucho más que clasificar animales automáticamente.','Animal, person & vehicle detection':'Detección de animales, personas y vehículos','Species identification':'Identificación de especies','Timestamp recovery':'Recuperación de fecha y hora','Smart review timeline':'Línea de tiempo inteligente','Photos and short videos':'Fotos y vídeos cortos','Reports & portable data':'Informes y datos exportables',
      'Activity analytics':'Análisis de actividad','Heatmaps + statistics':'Mapas de calor + estadísticas','Place matters':'La ubicación importa','Connect detections to camera sites.':'Relaciona detecciones con ubicaciones de cámaras.','Human-in-the-loop AI':'IA con revisión humana','Review the prediction instead of blindly trusting it.':'Revisa la predicción en lugar de confiar ciegamente en ella.',
      'Wildlife detection':'Detección de fauna','Built for the species people actually track.':'Diseñado para las especies que realmente se monitorizan.','Deer':'Ciervo','Wolf':'Lobo','Bear':'Oso','Detection context':'Contexto de detección','Species library':'Biblioteca de especies',
      'Simple field workflow':'Flujo de trabajo sencillo','From SD card to useful pattern.':'De la tarjeta SD a patrones útiles.','Import your camera folder':'Importa la carpeta de tu cámara','Let local AI do the first pass':'Deja que la IA local haga la primera revisión','Review, analyze and export':'Revisa, analiza y exporta','Who TrailEye is for':'Para quién es TrailEye','One workflow, three very different jobs.':'Un flujo de trabajo para tres usos distintos.','Hunters & land managers':'Cazadores y gestores de terrenos','Wildlife researchers':'Investigadores de fauna','Nature observers':'Observadores de naturaleza',
      'AI trail camera software':'Software de IA para cámaras trampa','From thousands of trail-camera files to searchable wildlife activity.':'De miles de archivos a actividad de fauna fácil de buscar.','Best AI trail camera software guide':'Guía del mejor software de IA para cámaras trampa','AI trail camera photo & video sorting':'Clasificación con IA de fotos y vídeos','Offline, privacy-first analysis':'Análisis offline centrado en privacidad','Camera-trap research workflows':'Flujos de investigación con cámaras trampa',
      'Simple licensing':'Licencias simples','Test it free. Pay once when your archive grows.':'Pruébalo gratis. Paga una vez cuando crezca tu archivo.','Permanent free edition':'Edición gratuita permanente','Free':'Gratis','forever':'para siempre','Download Free':'Descargar gratis','For active camera users':'Para usuarios activos','one-time licence':'licencia de pago único','Buy Explorer':'Comprar Explorer','Multi-camera projects':'Proyectos con varias cámaras','Buy Professional':'Comprar Professional','See more. Search less.':'Ve más. Busca menos.','Start with the camera folder you already have.':'Empieza con la carpeta de cámara que ya tienes.','How local processing works':'Cómo funciona el procesamiento local','Contact TrailEye':'Contactar con TrailEye','Questions, support or licensing?':'¿Preguntas, soporte o licencias?','Open email app':'Abrir correo','Copy email':'Copiar correo','Product':'Producto','Workflows':'Flujos de trabajo','Get TrailEye':'Obtener TrailEye','Contact':'Contacto'
    },
    ru:{
      'Features':'Функции','Heatmaps & stats':'Тепловые карты и статистика','Maps':'Карты','How it works':'Как это работает','Pricing':'Цены','Download free':'Скачать бесплатно','Local AI · Windows desktop · No mandatory cloud':'Локальный ИИ · Windows · Облако не обязательно','Turn trail-camera folders into wildlife intelligence.':'Превратите папки фотоловушек в полезные данные о дикой природе.','Download TrailEye Free':'Скачать TrailEye Free','Explore the analytics':'Открыть аналитику','Local-first processing':'Локальная обработка','Photos + videos':'Фото + видео','Reviewable species suggestions':'Проверяемые предложения видов','Free edition stays free':'Бесплатная версия остаётся бесплатной','Optional cloud AI custom detection':'Дополнительный облачный ИИ для произвольного поиска',
      'Real TrailEye capabilities':'Возможности TrailEye','Much more than automatic animal sorting.':'Гораздо больше, чем автоматическая сортировка животных.','Animal, person & vehicle detection':'Распознавание животных, людей и транспорта','Species identification':'Определение видов','Timestamp recovery':'Восстановление времени','Smart review timeline':'Умная шкала просмотра','Photos and short videos':'Фото и короткие видео','Reports & portable data':'Отчёты и экспорт данных','Activity analytics':'Аналитика активности','Heatmaps + statistics':'Тепловые карты + статистика','Place matters':'Место имеет значение','Connect detections to camera sites.':'Связывайте обнаружения с местами установки камер.','Human-in-the-loop AI':'ИИ под контролем человека','Review the prediction instead of blindly trusting it.':'Проверяйте прогноз вместо слепого доверия.','Wildlife detection':'Распознавание дикой природы','Built for the species people actually track.':'Для видов, за которыми действительно наблюдают.','Deer':'Олень','Wolf':'Волк','Bear':'Медведь','Detection context':'Контекст обнаружения','Species library':'Библиотека видов','Simple field workflow':'Простой рабочий процесс','From SD card to useful pattern.':'От SD-карты к полезным закономерностям.','Import your camera folder':'Импортируйте папку камеры','Let local AI do the first pass':'Пусть локальный ИИ выполнит первый проход','Review, analyze and export':'Проверяйте, анализируйте и экспортируйте','Who TrailEye is for':'Для кого TrailEye','One workflow, three very different jobs.':'Один процесс для трёх разных задач.','Hunters & land managers':'Охотники и управляющие угодьями','Wildlife researchers':'Исследователи дикой природы','Nature observers':'Наблюдатели природы','AI trail camera software':'ИИ-программа для фотоловушек','Best AI trail camera software guide':'Руководство по лучшему ПО для фотоловушек с ИИ','AI trail camera photo & video sorting':'ИИ-сортировка фото и видео фотоловушек','Offline, privacy-first analysis':'Офлайн-анализ с приоритетом конфиденциальности','Camera-trap research workflows':'Рабочие процессы исследований с фотоловушками','Simple licensing':'Простое лицензирование','Test it free. Pay once when your archive grows.':'Попробуйте бесплатно. Заплатите один раз, когда архив вырастет.','Permanent free edition':'Постоянная бесплатная версия','Free':'Бесплатно','forever':'навсегда','Download Free':'Скачать бесплатно','For active camera users':'Для активных пользователей','one-time licence':'разовая лицензия','Buy Explorer':'Купить Explorer','Multi-camera projects':'Проекты с несколькими камерами','Buy Professional':'Купить Professional','See more. Search less.':'Смотрите больше. Ищите меньше.','Start with the camera folder you already have.':'Начните с папки камеры, которая у вас уже есть.','How local processing works':'Как работает локальная обработка','Contact TrailEye':'Связаться с TrailEye','Questions, support or licensing?':'Вопросы, поддержка или лицензирование?','Open email app':'Открыть почту','Copy email':'Копировать e-mail','Product':'Продукт','Workflows':'Сценарии','Get TrailEye':'Получить TrailEye','Contact':'Контакты'
    },
    zh:{
      'Features':'功能','Heatmaps & stats':'热力图与统计','Maps':'地图','How it works':'工作原理','Pricing':'价格','Download free':'免费下载','Local AI · Windows desktop · No mandatory cloud':'本地 AI · Windows 桌面版 · 无强制云端','Turn trail-camera folders into wildlife intelligence.':'将野外相机文件夹转化为可用的野生动物信息。','Download TrailEye Free':'下载 TrailEye Free','Explore the analytics':'查看分析','Local-first processing':'优先本地处理','Photos + videos':'照片 + 视频','Reviewable species suggestions':'可审核的物种建议','Free edition stays free':'免费版永久免费','Optional cloud AI custom detection':'可选云端 AI 自定义识别',
      'Real TrailEye capabilities':'TrailEye 核心功能','Much more than automatic animal sorting.':'远不止自动动物分类。','Animal, person & vehicle detection':'动物、人员和车辆识别','Species identification':'物种识别','Timestamp recovery':'时间戳恢复','Smart review timeline':'智能审核时间轴','Photos and short videos':'照片和短视频','Reports & portable data':'报告与可导出数据','Activity analytics':'活动分析','Heatmaps + statistics':'热力图 + 统计','Place matters':'位置很重要','Connect detections to camera sites.':'将识别结果与相机位置关联。','Human-in-the-loop AI':'人工参与的 AI','Review the prediction instead of blindly trusting it.':'审核预测结果，而不是盲目信任。','Wildlife detection':'野生动物识别','Built for the species people actually track.':'面向人们真正关注的物种。','Deer':'鹿','Wolf':'狼','Bear':'熊','Detection context':'识别上下文','Species library':'物种库','Simple field workflow':'简单的现场工作流程','From SD card to useful pattern.':'从 SD 卡到有用的活动规律。','Import your camera folder':'导入相机文件夹','Let local AI do the first pass':'让本地 AI 完成首轮分析','Review, analyze and export':'审核、分析并导出','Who TrailEye is for':'TrailEye 适用人群','One workflow, three very different jobs.':'一个工作流程，适用于三种不同需求。','Hunters & land managers':'猎人和土地管理者','Wildlife researchers':'野生动物研究人员','Nature observers':'自然观察者','AI trail camera software':'AI 野外相机软件','Best AI trail camera software guide':'最佳 AI 野外相机软件指南','AI trail camera photo & video sorting':'AI 野外相机照片和视频分类','Offline, privacy-first analysis':'离线、隐私优先分析','Camera-trap research workflows':'相机陷阱研究工作流程','Simple licensing':'简单授权','Test it free. Pay once when your archive grows.':'免费试用。档案增长后一次性付费。','Permanent free edition':'永久免费版','Free':'免费','forever':'永久','Download Free':'免费下载','For active camera users':'适合活跃相机用户','one-time licence':'一次性授权','Buy Explorer':'购买 Explorer','Multi-camera projects':'多相机项目','Buy Professional':'购买 Professional','See more. Search less.':'看得更多，搜索更少。','Start with the camera folder you already have.':'从你已有的相机文件夹开始。','How local processing works':'本地处理工作原理','Contact TrailEye':'联系 TrailEye','Questions, support or licensing?':'问题、支持或授权？','Open email app':'打开邮件应用','Copy email':'复制邮箱','Product':'产品','Workflows':'工作流程','Get TrailEye':'获取 TrailEye','Contact':'联系'
    }
  };

  const longText={
    de:{
      hero:'TrailEye AI ist eine Windows-Software für Wildkameras, die Tiere, Menschen und Fahrzeuge erkennt, unterstützte Wildtierarten bestimmt, Zeitstempel ausliest und tausende Fotos und Videos in Timelines, Heatmaps, Statistiken, Karten und exportierbare Berichte verwandelt. Optional kann Cloud-KI Medien außerdem nach nahezu allem durchsuchen, was du in natürlicher Sprache beschreibst.',
      contact:'Kontaktiere uns direkt unter <strong>latsyman@gmail.com</strong>.'
    },
    sl:{
      hero:'TrailEye AI je Windows program za lovske kamere, ki zazna živali, ljudi in vozila, prepozna podprte vrste živali, pridobi časovne oznake ter tisoče fotografij in videov spremeni v časovnice, toplotne karte, statistiko, zemljevide in poročila. Izbirni AI v oblaku lahko medije poišče tudi po skoraj poljubnem opisu v naravnem jeziku.',
      contact:'Pišite nam neposredno na <strong>latsyman@gmail.com</strong>.'
    },
    es:{hero:'TrailEye AI es software para cámaras trampa en Windows que detecta animales, personas y vehículos, identifica especies compatibles, recupera marcas de tiempo y convierte miles de fotos y vídeos en líneas de tiempo, mapas de calor, estadísticas, mapas e informes exportables. La IA opcional en la nube también puede buscar prácticamente cualquier cosa que describas en lenguaje natural.',contact:'Escríbenos directamente a <strong>latsyman@gmail.com</strong>.'},
    ru:{hero:'TrailEye AI — программа для фотоловушек под Windows, которая обнаруживает животных, людей и транспорт, определяет поддерживаемые виды, восстанавливает метки времени и превращает тысячи фото и видео в временные шкалы, тепловые карты, статистику, карты и отчёты. Дополнительный облачный ИИ также может искать почти всё, что вы опишете обычным языком.',contact:'Напишите нам напрямую: <strong>latsyman@gmail.com</strong>.'},
    zh:{hero:'TrailEye AI 是 Windows 野外相机分析软件，可识别动物、人员和车辆，识别支持的野生动物物种，恢复时间戳，并将数千张照片和视频整理为时间轴、热力图、统计、地图和可导出报告。可选的云端 AI 还可以根据自然语言描述搜索几乎任何视觉内容。',contact:'直接联系我们：<strong>latsyman@gmail.com</strong>。'}
  };

  function addSelector(){
    const nav=document.querySelector('[data-nav]');
    if(!nav||document.querySelector('[data-language-select]')) return;
    const wrap=document.createElement('label');
    wrap.setAttribute('aria-label','Language');
    wrap.style.cssText='display:flex;align-items:center;margin-left:6px';
    const select=document.createElement('select');
    select.dataset.languageSelect='true';
    select.style.cssText='background:#0d1813;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 28px 8px 10px;font:inherit;cursor:pointer';
    supported.forEach(code=>{const o=document.createElement('option');o.value=code;o.textContent=names[code];o.selected=code===lang;select.appendChild(o)});
    select.addEventListener('change',()=>{
      localStorage.setItem('traileye-lang',select.value);
      if(select.value==='de'){
        location.href='/de/';
        return;
      }
      const u=new URL(location.href);u.searchParams.set('lang',select.value);location.href=u.toString();
    });
    wrap.appendChild(select);
    const cta=nav.querySelector('.nav-cta');
    nav.insertBefore(wrap,cta||null);
  }

  function translateTextNodes(map){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){
      const p=n.parentElement;if(!p||['SCRIPT','STYLE','SELECT','OPTION'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const nodes=[];while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{const raw=n.nodeValue;const t=raw.trim();if(map[t]) n.nodeValue=raw.replace(t,map[t]);});
  }

  addSelector();
  if(lang!=='en'){
    const map=dictionaries[lang]||{};
    translateTextNodes(map);
    const hero=document.querySelector('.hero-content > p');
    if(hero&&longText[lang]?.hero) hero.textContent=longText[lang].hero;
    const contactP=document.querySelector('#contact .final-copy p');
    if(contactP&&longText[lang]?.contact) contactP.innerHTML=longText[lang].contact;
    const titles={de:'KI-Software für Wildkameras & Wildlife-Fotosortierer | TrailEye AI',sl:'AI program za lovske kamere in razvrščanje fotografij | TrailEye AI',es:'Software de IA para cámaras trampa | TrailEye AI',ru:'ИИ-программа для фотоловушек | TrailEye AI',zh:'AI 野外相机软件与野生动物照片分类 | TrailEye AI'};
    if(titles[lang]) document.title=titles[lang];
  }
})();