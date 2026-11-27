
function openTourDetailModal(index) {
  const data = window.__tourTranslationsData ? window.__tourTranslationsData[index] : null;
  if (!data) return;

  const curL = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
  let modal = document.getElementById('mnt-tour-detail-modal-wrap');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mnt-tour-detail-modal-wrap';
    document.body.appendChild(modal);
  }

  modal.onclick = (e) => {
    if (e.target === modal) closeTourDetailModal();
  };

  const btnLabel = curL === 'hy' ? 'Ուղարկել հարցում' : (curL === 'ru' ? 'Отправить запрос' : 'Send an Inquiry');
  const routeLabel = curL === 'hy' ? 'Երթուղի' : (curL === 'ru' ? 'Маршрут' : 'Route');
  const aboutLabel = curL === 'hy' ? 'Շրջագայության մասին' : (curL === 'ru' ? 'О путешествии' : 'About the Tour');
  const stopsLabel = curL === 'hy' ? 'Հիմնական կանգառներ' : (curL === 'ru' ? 'Ключевые остановки' : 'Key Highlights');

  const stopsList = (data.stops && data.stops[curL]) ? data.stops[curL] : (data.stops ? data.stops.hy : []);
  const stopsHtml = stopsList.map(s => `
    <li class="mnt-tour-stop-item">
      <div><strong>${s.name}</strong> — ${s.desc}</div>
    </li>
  `).join('');

  modal.innerHTML = `
    <div class="mnt-tour-detail-card" onclick="event.stopPropagation()">
      <button class="mnt-tour-detail-close" onclick="closeTourDetailModal()" aria-label="Close">✕</button>
      <img src="${data.img}" alt="${data.title[curL] || data.title.hy}" class="mnt-tour-detail-img" />
      <div class="mnt-tour-detail-body-scroll">
        <div class="mnt-tour-detail-content">
          <div class="mnt-tour-detail-badges">
            <span class="mnt-tour-date-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              ${data.days[curL] || data.days.hy} (${data.dates})
            </span>
            <span class="mnt-tour-detail-price">${data.price}</span>
          </div>
          <h3 class="mnt-tour-detail-title">${data.title[curL] || data.title.hy}</h3>
          
          <div class="mnt-tour-route-badge" style="margin-bottom: 16px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span><strong>${routeLabel}:</strong> ${data.route[curL] || data.route.hy}</span>
          </div>

          <h4 class="mnt-tour-section-heading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            ${aboutLabel}
          </h4>
          <p class="mnt-tour-rich-desc">${data.intro[curL] || data.intro.hy}</p>

          <h4 class="mnt-tour-section-heading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${stopsLabel}
          </h4>
          <ul class="mnt-tour-stops-list">
            ${stopsHtml}
          </ul>

          <button class="mnt-tour-detail-inquire-btn" onclick="closeTourDetailModal(); openMyNextTripModal('group', { dest: '${(data.title[curL] || data.title.hy).replace(/'/g, "\\'")}' })">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            <span>${btnLabel}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeTourDetailModal() {
  const modal = document.getElementById('mnt-tour-detail-modal-wrap');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
window.openTourDetailModal = openTourDetailModal;
window.closeTourDetailModal = closeTourDetailModal;
// Immediate Hero Video Autoplay Enforcer on Script Load
(function immediateHeroVideoInit() {
  function fixVideo() {
    const vids = document.querySelectorAll('header#hero video, header video, video');
    vids.forEach(v => {
      if (!v.src.endsWith('/videos/hero.mp4')) {
        v.src = '/videos/hero.mp4';
      }
      v.autoplay = true;
      v.loop = true;
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('autoplay', '');
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.play().catch(() => {});
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixVideo);
  } else {
    fixVideo();
  }
  setTimeout(fixVideo, 50);
  setTimeout(fixVideo, 200);
  setTimeout(fixVideo, 600);
})();

// Ensure privacy-data.js is loaded
if (!window.__MYNEXTTRIP_PRIVACY__) {
  const privScript = document.createElement('script');
  privScript.src = '/privacy-data.js';
  document.head.appendChild(privScript);
}

window.__visaDatabase = {"en": [{"country": "United Arab Emirates", "badge": "Visa-free", "badge_type": "free", "stay": "Stay: up to 90 days in 180 days", "desc": "Armenian citizens enter without a visa. Valid passport for 6 months, return ticket, and hotel booking required.", "link": ""}, {"country": "Qatar", "badge": "Visa-free", "badge_type": "free", "stay": "Stay: up to 90 days", "desc": "No visa needed for tourism. Valid passport for at least 6 months, confirmed hotel booking and return ticket.", "link": ""}, {"country": "Egypt", "badge": "Visa-free / On arrival", "badge_type": "free", "stay": "Stay: Sharm El Sheikh 15 days free, Hurghada/Cairo 30 days", "desc": "Sharm El Sheikh (Sinai) is visa-free up to 15 days. For Hurghada, Cairo and other cities, visa on arrival or e-Visa ($25–30 USD).", "link": "https://www.visa2egypt.gov.eg"}, {"country": "Georgia", "badge": "Visa-free", "badge_type": "free", "stay": "Stay: up to 1 year", "desc": "Visa-free entry for Armenian citizens with ordinary passport or national ID card.", "link": ""}, {"country": "Maldives", "badge": "Visa on arrival", "badge_type": "arrival", "stay": "Stay: 30 days (free)", "desc": "Free 30-day visa upon arrival at Malé airport. Return flight ticket and hotel reservation required.", "link": "https://imuga.immigration.gov.mv"}, {"country": "Thailand", "badge": "Visa required", "badge_type": "required", "stay": "Stay: 30–60 days", "desc": "Visa is required for Armenian citizens. Processing takes 20 to 40 days. We assist with all paperwork, financial statements and appointments.", "link": "https://thaievisa.go.th"}, {"country": "Cyprus", "badge": "Visa required", "badge_type": "required", "stay": "Stay: Depends on visa / Up to 90 days", "desc": "National visa or valid multiple-entry Schengen visa required. Processing takes 2–4 weeks.", "link": ""}, {"country": "Schengen Area (Spain, Italy, France, Greece...)", "badge": "Visa required", "badge_type": "required", "stay": "Stay: up to 90 days in 180 days", "desc": "Schengen visa required. Processing takes approx 15–45 days. Complete guidance on documents, flight/hotel bookings, travel insurance and biometric appointment.", "link": ""}, {"country": "Sri Lanka", "badge": "e-Visa / ETA", "badge_type": "evisa", "stay": "Stay: 30 days", "desc": "Electronic Travel Authorization (ETA) required prior to departure. Processing time 2–3 working days.", "link": "https://www.eta.gov.lk"}, {"country": "United States of America", "badge": "Visa required", "badge_type": "required", "stay": "Stay: B1/B2 Tourist Visa", "desc": "DS-160 application and in-person interview at US Embassy in Yerevan. We assist with DS-160 filling, fees and appointment booking.", "link": ""}, {"country": "United Kingdom", "badge": "Visa required", "badge_type": "required", "stay": "Stay: Standard Visitor Visa (up to 6 months)", "desc": "Online application with biometric submission at TLScontact Yerevan. Processing takes 3–6 weeks.", "link": ""}], "ru": [{"country": "ОАЭ", "badge": "Без визы", "badge_type": "free", "stay": "Срок: до 90 дней в течение 180 дней", "desc": "Граждане Армении въезжают без визы. Требуется загранпаспорт со сроком действия от 6 месяцев, обратный билет и ваучер отеля.", "link": ""}, {"country": "Катар", "badge": "Без визы", "badge_type": "free", "stay": "Срок: до 90 дней", "desc": "Виза для туристических поездок не требуется. Нужен паспорт с запасом 6 месяцев, бронь проживания и обратный билет.", "link": ""}, {"country": "Египет", "badge": "Без визы / По прилёте", "badge_type": "free", "stay": "Срок: Шарм-эль-Шейх 15 дней, Хургада/Каир 30 дней", "desc": "Шарм-эль-Шейх (Синайский штамп) — бесплатно до 15 дней. Для Хургады, Каира и других городов оформляется виза по прилёте или e-Visa ($25–30 USD).", "link": "https://www.visa2egypt.gov.eg"}, {"country": "Грузия", "badge": "Без визы", "badge_type": "free", "stay": "Срок: до 1 года", "desc": "Безвизовый въезд для граждан РА по загранпаспорту или идентификационной карте (ID-карте).", "link": ""}, {"country": "Мальдивы", "badge": "Виза по прилёте", "badge_type": "arrival", "stay": "Срок: 30 дней (бесплатно)", "desc": "Бесплатная туристическая виза оформляется в аэропорту Мале. Необходим обратный билет и бронь отеля.", "link": "https://imuga.immigration.gov.mv"}, {"country": "Таиланд", "badge": "Нужна виза", "badge_type": "required", "stay": "Срок: 30–60 дней", "desc": "Для граждан Армении требуется виза. Срок рассмотрения составляет 20–40 дней. Мы готовим полный пакет документов и помогаем с подачей.", "link": "https://thaievisa.go.th"}, {"country": "Кипр", "badge": "Нужна виза", "badge_type": "required", "stay": "Срок: по визе / до 90 дней", "desc": "Требуется национальная виза Кипра или действующий многократный шенген. Срок оформления 2–4 недели.", "link": ""}, {"country": "Шенгенская зона (Испания, Италия, Франция, Греция...)", "badge": "Нужна виза", "badge_type": "required", "stay": "Срок: до 90 дней в течение 180 дней", "desc": "Обязательна шенгенская виза. Рассмотрение занимает 15–45 дней. Подготавливаем бронирования, страховку, анкеты и запись в визовый центр.", "link": ""}, {"country": "Шри-Ланка", "badge": "Электронная виза", "badge_type": "evisa", "stay": "Срок: 30 дней", "desc": "Оформляется электронное разрешение (ETA/e-Visa) заранее до вылета. Срок оформления 2–3 рабочих дня.", "link": "https://www.eta.gov.lk"}, {"country": "США", "badge": "Нужна виза", "badge_type": "required", "stay": "Срок: Туристическая виза B1/B2", "desc": "Заполнение формы DS-160, оплата консульского сбора и собеседование в посольстве США в Ереване. Полное сопровождение.", "link": ""}, {"country": "Великобритания", "badge": "Нужна виза", "badge_type": "required", "stay": "Срок: Standard Visitor (до 6 месяцев)", "desc": "Онлайн-заявление и сдача биометрии в визовом центре TLScontact в Ереване. Срок рассмотрения 3–6 недель.", "link": ""}], "hy": [{"country": "Արաբական Միացյալ Էմիրություններ (ԱՄԷ)", "badge": "Առանց վիզայի", "badge_type": "free", "stay": "Մնալու ժամկետ՝ մինչև 90 օր 180 օրվա ընթացքում", "desc": "ՀՀ քաղաքացիների համար մուտքն առանց վիզայի է։ Անհրաժեշտ է առնվազն 6 ամիս վավերականության անձնագիր, հետադարձ տոմս և հյուրանոցի ամրագրում։", "link": ""}, {"country": "Կատար", "badge": "Առանց վիզայի", "badge_type": "free", "stay": "Մնալու ժամկետ՝ մինչև 90 օր", "desc": "Զբոսաշրջային նպատակով վիզա չի պահանջվում։ Անհրաժեշտ է 6 ամիս վավեր անձնագիր, հաստատված հյուրանոցի ամրագրում և տոմս։", "link": ""}, {"country": "Եգիպտոս", "badge": "Առանց վիզայի / Ժամանելիս", "badge_type": "free", "stay": "Շարմ էլ-Շեյխ՝ 15 օր անվճար, այլ քաղաքներ՝ 30 օր վիզայով", "desc": "Շարմ էլ-Շեյխ (Սինայի թերակղզի) մուտքն անվճար է մինչև 15 օր։ Հուրգադայի, Կահիրեի և այլ քաղաքների համար վիզան տրվում է ժամանելիս կամ նախապես e-Visa ($25–30 USD)։", "link": "https://www.visa2egypt.gov.eg"}, {"country": "Վրաստան", "badge": "Առանց վիզայի", "badge_type": "free", "stay": "Մնալու ժամկետ՝ մինչև 1 տարի", "desc": "Առանց վիզայի ռեժիմ։ Մուտքը հնարավոր է ինչպես արտասահմանյան անձնագրով, այնպես էլ ՀՀ նույնականացման քարտով (ID քարտով)։", "link": ""}, {"country": "Մալդիվներ", "badge": "Վիզա ժամանելիս", "badge_type": "arrival", "stay": "Մնալու ժամկետ՝ 30 օր (անվճար)", "desc": "Անվճար 30-օրյա վիզան տրվում է Մալեի օդանավակայան ժամանելիս։ Անհրաժեշտ է հետադարձ տոմս և հյուրանոցի ամրագրում։", "link": "https://imuga.immigration.gov.mv"}, {"country": "Թաիլանդ", "badge": "Պահանջվում է վիզա", "badge_type": "required", "stay": "Մնալու ժամկետ՝ 30–60 օր", "desc": "ՀՀ քաղաքացիների համար պահանջվում է վիզա։ Դիմումի քննարկումը տևում է 20-ից 40 օր։ Մենք օգնում ենք փաստաթղթերի ամբողջական փաթեթի պատրաստման և դիմումի գործընթացում։", "link": "https://thaievisa.go.th"}, {"country": "Կիպրոս", "badge": "Պահանջվում է վիզա", "badge_type": "required", "stay": "Մնալու ժամկետ՝ կախված է վիզայից (մինչև 90 օր)", "desc": "Պահանջվում է Կիպրոսի ազգային վիզա կամ գործող բազմակի մուտքի Շենգեն վիզա։ Գործընթացը տևում է 2–4 շաբաթ։", "link": ""}, {"country": "Շենգեն գոտի (Իսպանիա, Իտալիա, Ֆրանսիա, Հունաստան...)", "badge": "Պահանջվում է վիզա", "badge_type": "required", "stay": "Մնալու ժամկետ՝ մինչև 90 օր 180 օրվա ընթացքում", "desc": "Պահանջվում է Շենգեն վիզա։ Քննարկումը տևում է 15-ից 45 օր։ Ապահովում ենք ամբողջական աջակցություն՝ հյուրանոցների, տոմսերի ամրագրում, ապահովագրություն, հերթագրում դեսպանատանը կամ վիզային կենտրոնում։", "link": ""}, {"country": "Շրի Լանկա", "badge": "Էլեկտրոնային վիզա", "badge_type": "evisa", "stay": "Մնալու ժամկետ՝ 30 օր, կրկնակի մուտք", "desc": "Մինչև մեկնելը պետք է օնլայն ձևակերպել էլեկտրոնային մուտքի թույլտվություն (ETA)։ Տևում է 1–3 աշխատանքային օր։", "link": "https://www.eta.gov.lk"}, {"country": "ԱՄՆ", "badge": "Պահանջվում է վիզա", "badge_type": "required", "stay": "Տուրիստական B1/B2 վիզա", "desc": "DS-160 հարցաթերթիկի լրացում, պետական տուրքի վճարում և հարցազրույց Երևանում ԱՄՆ դեսպանատանը։ Մասնագիտացված աջակցություն։", "link": ""}, {"country": "Մեծ Բրիտանիա", "badge": "Պահանջվում է վիզա", "badge_type": "required", "stay": "Standard Visitor վիզա (մինչև 6 ամիս)", "desc": "Օնլայն դիմում և կենսաչափական տվյալների հանձնում Երևանի TLScontact կենտրոնում։ Քննարկումը տևում է 3–6 շաբաթ։", "link": ""}]};
window.__visaSectionTexts = {"hy": {"tag": "Վիզայի աջակցություն", "title": "Վիզայի աջակցություն", "intro": "Մենք կօգնենք Ձեզ կողմնորոշվել վիզայի դիմումի գործընթացում, ներկայացվող փաստաթղթերի պահանջներում և անհրաժեշտ քայլերում։ Ստացեք խորհրդատվություն՝ Ձեր նախընտրած ուղղության և ՀՀ քաղաքացիների համար գործող վիզային պահանջների վերաբերյալ։", "filterAll": "Բոլորը", "filterFree": "Առանց վիզայի", "filterArrival": "Վիզա ժամանելիս", "filterRequired": "Պահանջվում է վիզա", "filterEvisa": "Էլեկտրոնային վիզա", "disclaimer": "Մուտքի կանոնները կարող են փոփոխվել: Մենք միշտ ճշտում ենք գործող կանոնները ամրագրումից առաջ: Նշված են ՀՀ քաղաքացիների սովորական անձնագրով զբոսաշրջային մուտքի պայմանները:", "bannerTitle": "Խորհրդատվություն", "bannerDesc": "Ուղարկեք հայտ՝ վիզայի հարցով անվճար խորհրդատվություն ստանալու համար:", "bannerBtn": "Ուղարկել հայտ", "modalTitle": "Վիզայի խորհրդատվության հայտ", "modalSubtitle": "Ուղարկեք հայտ՝ վիզայի հարցով անվճար խորհրդատվություն ստանալու համար:"}, "ru": {"tag": "Визовая поддержка", "title": "Визовая поддержка", "intro": "Мы поможем Вам разобраться в процессе подачи заявления на визу, требованиях к документам и необходимых этапах оформления. Получите консультацию по визовым требованиям для граждан Армении в зависимости от выбранного направления.", "filterAll": "Все", "filterFree": "Без визы", "filterArrival": "По прилёте", "filterRequired": "Нужна виза", "filterEvisa": "Электронная виза", "disclaimer": "Правила въезда могут меняться. Мы всегда проверяем актуальные требования перед бронированием. Приведены правила для туристических поездок по паспорту гражданина РА.", "bannerTitle": "Консультация", "bannerDesc": "Оставьте заявку, чтобы получить бесплатную консультацию по визовым вопросам.", "bannerBtn": "Оставить заявку", "modalTitle": "Заявка на визовую консультацию", "modalSubtitle": "Оставьте заявку, чтобы получить бесплатную консультацию по визовым вопросам."}, "en": {"tag": "Visa Assistance", "title": "Visa Assistance", "intro": "We’ll help you navigate the visa application process, understand the required documents, and learn about the necessary steps. Get guidance on visa requirements for Armenian citizens based on your chosen destination.", "filterAll": "All Destinations", "filterFree": "Visa-Free", "filterArrival": "On Arrival", "filterRequired": "Visa Required", "filterEvisa": "e-Visa", "disclaimer": "Entry requirements may change. We always confirm current regulations prior to booking. Requirements shown apply to tourism with an ordinary Armenian passport.", "bannerTitle": "Consultation", "bannerDesc": "Submit a request to receive a free visa consultation.", "bannerBtn": "Submit a request", "modalTitle": "Visa Consultation Request", "modalSubtitle": "Submit a request to receive a free visa consultation."}};
window.__tourTypesTexts = {"hy": {"tag": "Տուրերի Ձևաչափեր", "title": "Ընտրեք Ձեր Ճամփորդության Ձևաչափը", "sub": "Միացեք մեր պատրաստի խմբային արշավներին կամ պատվիրեք անհատական երթուղի՝ ստեղծված հատուկ Ձեզ համար:", "group": {"tag": "Պատրաստի Ծրագրեր", "title": "ԽՄԲԱՅԻՆ ՏՈՒՐԵՐ", "desc": "Բացահայտեք նոր ուղղություններ՝ միանալով պատրաստի խմբային ճամփորդություններին։ Ուղարկեք հարցում խմբային տուրերի համար, և մենք կառաջարկենք լավագույն տարբերակները։", "btn": "Ուղարկել հարցում", "features": ["Հստակ երթուղի և հաստատված ամսաթվեր", "Փորձառու հայախոս ուղեկցորդ", "Հագեցած էքսկուրսիոն ծրագիր և ամբողջական կազմակերպում"]}, "individual": {"tag": "100% Անհատական", "title": "ԱՆՀԱՏԱԿԱՆ ՏՈՒՐԵՐ", "desc": "Ձեր նախասիրություններին համապատասխան ճամփորդություն՝ Ձեր ընտրած ուղղությամբ և ամսաթվերով։ Ուղարկեք հարցում, իսկ մենք կառաջարկենք Ձեզ համապատասխան տարբերակներ։", "btn": "Ուղարկել հարցում", "features": ["Ճկուն ամսաթվեր և աշխարհի ցանկացած երկիր", "Ընտրովի հյուրանոցներ և անհատական տրանսֆերներ", "Անձնական տուր-մենեջերի 24/7 աջակցություն"]}}, "ru": {"tag": "Форматы Путешествий", "title": "Выберите Формат Вашего Путешествия", "sub": "Присоединяйтесь к готовым групповым турам или закажите индивидуальный маршрут с учётом всех Ваших пожеланий:", "group": {"tag": "Готовые Программы", "title": "ГРУППОВЫЕ ТУРЫ", "desc": "Открывайте новые направления в составе группы. Отправьте запрос на групповой тур, и мы предложим лучшие актуальные варианты.", "btn": "Отправить запрос", "features": ["Чёткий маршрут и фиксированные даты", "Опытный тур-лидер на протяжении всей поездки", "Продуманная экскурсионная программа и организация под ключ"]}, "individual": {"tag": "100% Индивидуально", "title": "ИНДИВИДУАЛЬНЫЕ ТУРЫ", "desc": "Путешествие с учётом Ваших предпочтений, в выбранном Вами направлении и в удобные для Вас даты. Отправьте запрос, и мы предложим Вам подходящие варианты.", "btn": "Отправить запрос", "features": ["Гибкие даты и любые направления по всему миру", "Подбор отелей премиум-класса и индивидуальные трансферы", "Персональный тревел-менеджер и забота 24/7"]}}, "en": {"tag": "Travel Formats", "title": "Choose Your Travel Format", "sub": "Join our curated group tours or order a completely customized individual trip tailored to your style:", "group": {"tag": "Curated Journeys", "title": "GROUP TOURS", "desc": "Discover new destinations with curated group trips. Submit an inquiry for our group programs and we will tailor the best options for you.", "btn": "Submit Inquiry", "features": ["Fixed itinerary and verified departure dates", "Experienced dedicated tour leader", "Rich sightseeing program and turnkey travel support"]}, "individual": {"tag": "100% Tailored", "title": "INDIVIDUAL TOURS", "desc": "A trip tailored to your preferences, with your chosen destination and travel dates. Send us an inquiry, and we’ll suggest suitable options for you.", "btn": "Submit Inquiry", "features": ["Flexible dates & destinations worldwide", "Handpicked hotels & custom VIP transfers", "Dedicated personal travel concierge 24/7"]}}};



// Ensure terms-data.js is loaded
if (!window.__MYNEXTTRIP_TERMS__) {
  const termsScript = document.createElement('script');
  termsScript.src = '/terms-data.js';
  document.head.appendChild(termsScript);
}


// ==========================================
// TERMS & CONDITIONS MODAL
// ==========================================
function openMyNextTripTermsModal(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  let modal = document.getElementById('mnt-terms-modal-wrap');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mnt-terms-modal-wrap';
    modal.innerHTML = `
      <div class="mnt-terms-modal-backdrop" onclick="closeMyNextTripTermsModal()">
        <div class="mnt-terms-modal-card" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="mnt-terms-header">
            <div class="mnt-terms-header-left">
              <span class="mnt-terms-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                MyNextTrip Legal
              </span>
              <h2 class="mnt-terms-title" id="mnt-terms-modal-title">ԴՐՈՒՅԹՆԵՐ ԵՎ ՊԱՅՄԱՆՆԵՐ</h2>
              <div class="mnt-terms-meta">
                <span id="mnt-terms-modal-eff"></span>
                <span class="mnt-terms-meta-sep">•</span>
                <span id="mnt-terms-modal-upd"></span>
              </div>
            </div>

            <div class="mnt-terms-header-right">
              <!-- Lang Switcher inside modal -->
              <div class="mnt-terms-lang-pills">
                <button class="mnt-t-lang-btn" data-lang="hy" onclick="switchTermsModalLang('hy')">ՀԱՅ</button>
                <button class="mnt-t-lang-btn" data-lang="en" onclick="switchTermsModalLang('en')">EN</button>
                <button class="mnt-t-lang-btn" data-lang="ru" onclick="switchTermsModalLang('ru')">RU</button>
              </div>

              <!-- Open Full Page link -->
              <a href="/terms.html" target="_blank" class="mnt-terms-ext-btn" title="Open full page">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>

              <!-- Close button -->
              <button class="mnt-terms-close-btn" onclick="closeMyNextTripTermsModal()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="mnt-terms-body" id="mnt-terms-modal-body">
            <!-- Dynamic Content -->
          </div>

          <!-- Footer -->
          <div class="mnt-terms-footer">
            <span id="mnt-terms-footer-copy">© 2026 MyNextTrip LLC. All rights reserved.</span>
            <button class="mnt-terms-ok-btn" onclick="closeMyNextTripTermsModal()">OK</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.__termsModalLang = currentL;
  renderTermsModalContent(currentL);

  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeMyNextTripTermsModal() {
  const modal = document.getElementById('mnt-terms-modal-wrap');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  }
}

function switchTermsModalLang(lang) {
  window.__termsModalLang = lang;
  renderTermsModalContent(lang);
}

function renderTermsModalContent(lang) {
  if (!window.__MYNEXTTRIP_TERMS__) return;
  const data = window.__MYNEXTTRIP_TERMS__[lang] || window.__MYNEXTTRIP_TERMS__.hy;

  const titleEl = document.getElementById('mnt-terms-modal-title');
  const effEl = document.getElementById('mnt-terms-modal-eff');
  const updEl = document.getElementById('mnt-terms-modal-upd');
  const bodyEl = document.getElementById('mnt-terms-modal-body');

  if (titleEl) titleEl.textContent = data.title;
  if (effEl) effEl.textContent = `${data.effectiveLabel} ${data.effective}`;
  if (updEl) updEl.textContent = `${data.updatedLabel} ${data.updated}`;

  // Update lang pill active state
  document.querySelectorAll('.mnt-t-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  if (bodyEl) {
    let html = `
      <div class="mnt-terms-intro-box">
        ${data.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    `;

    data.sections.forEach(s => {
      const numStr = s.num < 10 ? '0' + s.num : s.num;

      if (s.isContact) {
        html += `
          <div class="mnt-terms-sec-card mnt-terms-contact-sec">
            <div class="mnt-sec-head">
              <span class="mnt-sec-num">${numStr}</span>
              <h3 class="mnt-sec-title">${s.title}</h3>
            </div>
            <p style="font-weight:700; color:#fff; margin-bottom:12px;">${s.company}</p>
            <div class="mnt-sec-contact-row">
              <a href="mailto:${s.email}" class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>${s.email}</span>
              </a>
              <a href="tel:${s.phone.replace(/[^0-9+]/g, '')}" class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>${s.phone}</span>
              </a>
              <span class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${s.city}</span>
              </span>
            </div>
          </div>
        `;
        return;
      }

      let secBody = '';
      if (s.content) {
        secBody += s.content.map(p => `<p>${p}</p>`).join('');
      }
      if (s.list) {
        secBody += `<ul class="mnt-sec-list">` + s.list.map(li => `
          <li>
            <span class="mnt-sec-bullet"></span>
            <span>${li}</span>
          </li>
        `).join('') + `</ul>`;
      }
      if (s.after) {
        secBody += s.after.split('\n').map(p => `<div class="mnt-sec-callout">${p}</div>`).join('');
      }

      html += `
        <div class="mnt-terms-sec-card">
          <div class="mnt-sec-head">
            <span class="mnt-sec-num">${numStr}</span>
            <h3 class="mnt-sec-title">${s.title}</h3>
          </div>
          <div class="mnt-sec-content">
            ${secBody}
          </div>
        </div>
      `;
    });

    bodyEl.innerHTML = html;
  }
}

// Function to attach Terms & Conditions links to footer & form

// ==========================================
// PRIVACY POLICY MODAL
// ==========================================
function openMyNextTripPrivacyModal(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  let modal = document.getElementById('mnt-privacy-modal-wrap');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mnt-privacy-modal-wrap';
    modal.innerHTML = `
      <div class="mnt-terms-modal-backdrop" onclick="closeMyNextTripPrivacyModal()">
        <div class="mnt-terms-modal-card" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="mnt-terms-header">
            <div class="mnt-terms-header-left">
              <span class="mnt-terms-tag" style="background:rgba(45,212,191,0.15); border-color:rgba(45,212,191,0.3); color:#2dd4bf;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                MyNextTrip Security & Privacy
              </span>
              <h2 class="mnt-terms-title" id="mnt-privacy-modal-title">ԳԱՂՏՆԻՈՒԹՅԱՆ ՔԱՂԱՔԱԿԱՆՈՒԹՅՈՒՆ</h2>
              <div class="mnt-terms-meta">
                <span id="mnt-privacy-modal-eff"></span>
                <span class="mnt-terms-meta-sep">•</span>
                <span id="mnt-privacy-modal-upd"></span>
              </div>
            </div>

            <div class="mnt-terms-header-right">
              <div class="mnt-terms-lang-pills">
                <button class="mnt-p-lang-btn" data-lang="hy" onclick="switchPrivacyModalLang('hy')">ՀԱՅ</button>
                <button class="mnt-p-lang-btn" data-lang="en" onclick="switchPrivacyModalLang('en')">EN</button>
                <button class="mnt-p-lang-btn" data-lang="ru" onclick="switchPrivacyModalLang('ru')">RU</button>
              </div>

              <a href="/privacy.html" target="_blank" class="mnt-terms-ext-btn" title="Open full page">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>

              <button class="mnt-terms-close-btn" onclick="closeMyNextTripPrivacyModal()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="mnt-terms-body" id="mnt-privacy-modal-body"></div>

          <!-- Footer -->
          <div class="mnt-terms-footer">
            <span id="mnt-privacy-footer-copy">© 2026 MyNextTrip LLC. Privacy & Data Security.</span>
            <button class="mnt-terms-ok-btn" style="background:linear-gradient(135deg, #0d9488, #0f766e);" onclick="closeMyNextTripPrivacyModal()">OK</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.__privacyModalLang = currentL;
  renderPrivacyModalContent(currentL);

  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeMyNextTripPrivacyModal() {
  const modal = document.getElementById('mnt-privacy-modal-wrap');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  }
}

function switchPrivacyModalLang(lang) {
  window.__privacyModalLang = lang;
  renderPrivacyModalContent(lang);
}

function renderPrivacyModalContent(lang) {
  if (!window.__MYNEXTTRIP_PRIVACY__) return;
  const data = window.__MYNEXTTRIP_PRIVACY__[lang] || window.__MYNEXTTRIP_PRIVACY__.hy;

  const titleEl = document.getElementById('mnt-privacy-modal-title');
  const effEl = document.getElementById('mnt-privacy-modal-eff');
  const updEl = document.getElementById('mnt-privacy-modal-upd');
  const bodyEl = document.getElementById('mnt-privacy-modal-body');

  if (titleEl) titleEl.textContent = data.title;
  if (effEl) effEl.textContent = `${data.effectiveLabel} ${data.effective}`;
  if (updEl) updEl.textContent = `${data.updatedLabel} ${data.updated}`;

  document.querySelectorAll('.mnt-p-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  if (bodyEl) {
    let html = `
      <div class="mnt-terms-intro-box" style="border-left-color: #2dd4bf;">
        ${data.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    `;

    data.sections.forEach(s => {
      const numStr = s.num < 10 ? '0' + s.num : s.num;

      if (s.isContact) {
        html += `
          <div class="mnt-terms-sec-card mnt-terms-contact-sec" style="border-color: rgba(45,212,191,0.3); background: rgba(13,148,136,0.06);">
            <div class="mnt-sec-head">
              <span class="mnt-sec-num" style="background: rgba(45,212,191,0.2); color: #2dd4bf;">${numStr}</span>
              <h3 class="mnt-sec-title">${s.title}</h3>
            </div>
            <p style="font-weight:700; color:#fff; margin-bottom:12px;">${s.company}</p>
            <div class="mnt-sec-contact-row">
              <a href="mailto:${s.email}" class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>${s.email}</span>
              </a>
              <a href="tel:${s.phone.replace(/[^0-9+]/g, '')}" class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>${s.phone}</span>
              </a>
              <span class="mnt-sec-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${s.city}</span>
              </span>
            </div>
            ${s.note ? `<div class="mnt-sec-callout" style="margin-top:14px; border-left-color:#2dd4bf;">${s.note}</div>` : ''}
          </div>
        `;
        return;
      }

      let secBody = '';
      if (s.content) {
        secBody += s.content.map(p => `<p>${p}</p>`).join('');
      }

      if (s.subsections) {
        s.subsections.forEach(sub => {
          secBody += `<div class="privacy-sub-box" style="margin: 14px 0; padding: 12px 14px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">`;
          if (sub.title) {
            secBody += `<h4 style="font-size: 13.5px; font-weight: 700; color: #38bdf8; margin: 0 0 8px 0;">${sub.title}</h4>`;
          }
          if (sub.intro) {
            secBody += `<p style="font-size: 13px; color: #cbd5e1; margin-bottom: 8px;">${sub.intro}</p>`;
          }
          if (sub.list) {
            secBody += `<ul class="mnt-sec-list">` + sub.list.map(li => `
              <li>
                <span class="mnt-sec-bullet" style="background: #2dd4bf;"></span>
                <span>${li}</span>
              </li>
            `).join('') + `</ul>`;
          }
          if (sub.after) {
            secBody += sub.after.split('\n').map(p => `<div class="mnt-sec-callout" style="border-left-color: #2dd4bf; margin-top: 8px;">${p}</div>`).join('');
          }
          secBody += `</div>`;
        });
      }

      if (s.list) {
        secBody += `<ul class="mnt-sec-list">` + s.list.map(li => `
          <li>
            <span class="mnt-sec-bullet" style="background: #2dd4bf;"></span>
            <span>${li}</span>
          </li>
        `).join('') + `</ul>`;
      }
      if (s.after) {
        secBody += s.after.split('\n').map(p => `<div class="mnt-sec-callout" style="border-left-color: #2dd4bf;">${p}</div>`).join('');
      }

      html += `
        <div class="mnt-terms-sec-card">
          <div class="mnt-sec-head">
            <span class="mnt-sec-num" style="background: rgba(45,212,191,0.2); color: #2dd4bf;">${numStr}</span>
            <h3 class="mnt-sec-title">${s.title}</h3>
          </div>
          <div class="mnt-sec-content">
            ${secBody}
          </div>
        </div>
      `;
    });

    bodyEl.innerHTML = html;
  }
}
window.openMyNextTripPrivacyModal = openMyNextTripPrivacyModal;
window.closeMyNextTripPrivacyModal = closeMyNextTripPrivacyModal;
window.switchPrivacyModalLang = switchPrivacyModalLang;


// Function to attach Terms & Conditions AND Privacy Policy links to footer & form
function attachLegalLinks(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  const termsLabels = {
    hy: 'Դրույթներ և պայմաններ',
    en: 'Terms & Conditions',
    ru: 'Условия и положения'
  };
  const privLabels = {
    hy: 'Գաղտնիության քաղաքականություն',
    en: 'Privacy Policy',
    ru: 'Политика конфиденциальности'
  };

  const termsText = termsLabels[currentL] || termsLabels.hy;
  const privText = privLabels[currentL] || privLabels.hy;

  // 1. Footer Bottom Bar: inject/update both Terms and Privacy links
  const bottomBars = document.querySelectorAll('.framer-83888v');
  bottomBars.forEach(bar => {
    // Terms link
    let termsLink = bar.querySelector('.mnt-footer-terms-link');
    if (!termsLink) {
      termsLink = document.createElement('a');
      termsLink.className = 'mnt-footer-terms-link';
      termsLink.href = '/terms.html';
      termsLink.onclick = (e) => {
        e.preventDefault();
        openMyNextTripTermsModal(window.__currentLang || currentL);
      };
      termsLink.style.cssText = 'color: #94a3b8; font-size: 13px; font-weight: 600; text-decoration: none; margin: 0 10px; transition: color 0.2s; cursor: pointer;';
      termsLink.onmouseover = () => termsLink.style.color = '#38bdf8';
      termsLink.onmouseout = () => termsLink.style.color = '#94a3b8';

      const designedBy = bar.querySelector('.framer-1ljxkrc');
      if (designedBy) {
        bar.insertBefore(termsLink, designedBy);
      } else {
        bar.appendChild(termsLink);
      }
    }
    termsLink.textContent = termsText;

    // Privacy link
    let privLink = bar.querySelector('.mnt-footer-privacy-link');
    if (!privLink) {
      privLink = document.createElement('a');
      privLink.className = 'mnt-footer-privacy-link';
      privLink.href = '/privacy.html';
      privLink.onclick = (e) => {
        e.preventDefault();
        openMyNextTripPrivacyModal(window.__currentLang || currentL);
      };
      privLink.style.cssText = 'color: #94a3b8; font-size: 13px; font-weight: 600; text-decoration: none; margin: 0 10px; transition: color 0.2s; cursor: pointer;';
      privLink.onmouseover = () => privLink.style.color = '#2dd4bf';
      privLink.onmouseout = () => privLink.style.color = '#94a3b8';

      if (termsLink && termsLink.nextSibling) {
        bar.insertBefore(privLink, termsLink.nextSibling);
      } else {
        bar.appendChild(privLink);
      }
    }
    privLink.textContent = privText;
  });

  // 2. In Footer Contact Column, ensure both links are present
  document.querySelectorAll('.framer-1iup7vv').forEach(col => {
    // Terms link
    let tLink = col.querySelector('.mnt-col-terms-link');
    if (!tLink) {
      tLink = document.createElement('a');
      tLink.className = 'mnt-col-terms-link';
      tLink.href = '/terms.html';
      tLink.onclick = (e) => {
        e.preventDefault();
        openMyNextTripTermsModal(window.__currentLang || currentL);
      };
      tLink.style.cssText = 'display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 14.5px; font-weight: 600; text-decoration: none; margin-top: 6px; transition: all 0.2s; cursor: pointer;';
      tLink.onmouseover = () => { tLink.style.color = '#38bdf8'; tLink.style.transform = 'translateX(2px)'; };
      tLink.onmouseout = () => { tLink.style.color = '#94a3b8'; tLink.style.transform = 'none'; };
      tLink.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span>${termsText}</span>`;
      col.appendChild(tLink);
    } else {
      const span = tLink.querySelector('span');
      if (span) span.textContent = termsText;
    }

    // Privacy link
    let pLink = col.querySelector('.mnt-col-privacy-link');
    if (!pLink) {
      pLink = document.createElement('a');
      pLink.className = 'mnt-col-privacy-link';
      pLink.href = '/privacy.html';
      pLink.onclick = (e) => {
        e.preventDefault();
        openMyNextTripPrivacyModal(window.__currentLang || currentL);
      };
      pLink.style.cssText = 'display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 14.5px; font-weight: 600; text-decoration: none; margin-top: 6px; transition: all 0.2s; cursor: pointer;';
      pLink.onmouseover = () => { pLink.style.color = '#2dd4bf'; pLink.style.transform = 'translateX(2px)'; };
      pLink.onmouseout = () => { pLink.style.color = '#94a3b8'; pLink.style.transform = 'none'; };
      pLink.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>${privText}</span>`;
      col.appendChild(pLink);
    } else {
      const span = pLink.querySelector('span');
      if (span) span.textContent = privText;
    }
  });

  // 3. In the Inquiry Form modal, add notice with both links
  const form = document.getElementById('mnt-tour-form');
  if (form) {
    let notice = form.querySelector('.mnt-terms-form-notice');
    const noticeTexts = {
      hy: 'Հարցումն ուղարկելով՝ Դուք հաստատում եք, որ ծանոթացել եք մեր <a href="#" onclick="openMyNextTripTermsModal(\'hy\'); return false;">Դրույթներին</a> և <a href="#" onclick="openMyNextTripPrivacyModal(\'hy\'); return false;">Գաղտնիության քաղաքականությանը</a>:',
      en: 'By submitting, you confirm that you have read our <a href="#" onclick="openMyNextTripTermsModal(\'en\'); return false;">Terms & Conditions</a> and <a href="#" onclick="openMyNextTripPrivacyModal(\'en\'); return false;">Privacy Policy</a>.',
      ru: 'Отправляя запрос, вы подтверждаете согласие с нашими <a href="#" onclick="openMyNextTripTermsModal(\'ru\'); return false;">Условиями</a> и <a href="#" onclick="openMyNextTripPrivacyModal(\'ru\'); return false;">Политикой конфиденциальности</a>.'
    };
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'mnt-terms-form-notice';
      notice.style.cssText = 'font-size: 12px; color: #94a3b8; text-align: center; margin-top: 14px; line-height: 1.5;';
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.mnt-submit-btn');
      if (submitBtn && submitBtn.parentNode) {
        submitBtn.parentNode.insertBefore(notice, submitBtn.nextSibling);
      } else {
        form.appendChild(notice);
      }
    }
    notice.innerHTML = noticeTexts[currentL] || noticeTexts.hy;
  }
}
window.attachLegalLinks = attachLegalLinks;
window.attachTermsLinks = attachLegalLinks;


function setVisaFilter(category) {
  window.__visaFilter = category;
  const curL = (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  renderVisaSection(curL);
  renderContactSection(curL);
  renderHeroSearchBar(curL);
  updateWhatsAppFloatLabel(curL);
}

function scrollToGroupTours() {
  const toursSec = document.getElementById('mnt-tours-section') || document.querySelector('section[data-framer-name="Tours"]');
  if (toursSec) {
    toursSec.scrollIntoView({ behavior: 'smooth' });
  }
}


window.__menuNavTranslations = {
  en: {
    indiv: "Private Tours",
    group: "Group Tours",
    visa: "Visa Assistance",
    why: "Why MyNextTrip",
    contact: "Contact",
    bookBtn: "Submit Inquiry"
  },
  ru: {
    indiv: "Индивидуальные туры",
    group: "Групповые туры",
    visa: "Визовая поддержка",
    why: "Почему MyNextTrip",
    contact: "Контакты",
    bookBtn: "Отправить запрос"
  },
  hy: {
    indiv: "Անհատական տուրեր",
    group: "Խմբային տուրեր",
    visa: "Վիզայի աջակցություն",
    why: "Ինչու MyNextTrip",
    contact: "Կապ",
    bookBtn: "Ուղարկել հարցում"
  }
};

function handleMenuNav(e, target) {
  if (e && e.preventDefault) e.preventDefault();
  closeMobileDrawer();

  // Close Framer overlay if open
  const framerMenu = document.querySelector('[data-framer-name="Menu"], .framer-qeznpr');
  const overlay = document.getElementById('template-overlay');
  if (overlay && overlay.children.length > 0 && framerMenu) {
    framerMenu.click();
  }

  setTimeout(() => {
    if (target === 'individual') {
      openMyNextTripModal('individual');
    } else if (target === 'group') {
      const g = document.getElementById('mnt-tour-types-section') || document.querySelector('section[data-framer-name="Tours"]');
      if (g) g.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'visa') {
      renderVisaSection();
      const v = document.getElementById('mnt-visa-section');
      if (v) {
        v.scrollIntoView({ behavior: 'smooth' });
      } else {
        openVisaConsultationModal();
      }
    } else if (target === 'why') {
      const w = document.querySelector('section[data-framer-name="Why Us"]') || document.querySelector('section[data-framer-name="Experience"]');
      if (w) w.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'contact') {
      const c = document.getElementById('mnt-contact-section') || document.querySelector('footer') || document.querySelector('section[data-framer-name="Conversion"]');
      if (c) c.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mnt-mobile-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeMobileDrawer();
  } else {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mnt-mobile-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateNavLabels(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  const transDict = window.__menuNavTranslations || {};
  const trans = transDict[currentL] || transDict.en || transDict.hy || {};
  
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl('mnt-nav-indiv', trans.indiv);
  setEl('mnt-nav-group', trans.group);
  setEl('mnt-nav-visa', trans.visa);
  setEl('mnt-nav-why', trans.why);
  setEl('mnt-nav-contact', trans.contact);

  setEl('mnt-mob-indiv', trans.indiv);
  setEl('mnt-mob-group', trans.group);
  setEl('mnt-mob-visa', trans.visa);
  setEl('mnt-mob-why', trans.why);
  setEl('mnt-mob-contact', trans.contact);

  const bookBtn = document.getElementById('mnt-book-btn-text');
  if (bookBtn) bookBtn.textContent = trans.bookBtn;
}

function renderTourTypesSection() {
  let section = document.getElementById('mnt-tour-types-section');
  if (!section) {
    section = document.createElement('section');
    section.id = 'mnt-tour-types-section';
    section.className = 'mnt-tour-types-section';

    // Insert right before Tours section
    const toursSection = document.querySelector('section[data-framer-name="Tours"]');
    if (toursSection && toursSection.parentNode) {
      toursSection.id = 'mnt-tours-section';
      toursSection.parentNode.insertBefore(section, toursSection);
    } else {
      const footer = document.querySelector('footer');
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(section, footer);
      } else {
        document.body.appendChild(section);
      }
    }
  }

  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const t = (window.__tourTypesTexts && window.__tourTypesTexts[lang]) ? window.__tourTypesTexts[lang] : window.__tourTypesTexts.en;

  section.innerHTML = `
    <div class="mnt-types-container">
      <div class="mnt-types-header">
        <span class="mnt-types-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          ${t.tag}
        </span>
        <h2 class="mnt-types-title">${t.title}</h2>
        <p class="mnt-types-sub">${t.sub}</p>
      </div>

      <div class="mnt-types-grid">
        <!-- Group Tours Card -->
        <div class="mnt-type-card mnt-group-card">
          <div class="mnt-type-card-img" style="background-image: url('https://framerusercontent.com/images/j5yLKM0E783r5ug16dHihjxz6c.png');">
            <div class="mnt-type-img-overlay"></div>
            <span class="mnt-type-pill group-pill">${t.group.tag}</span>
          </div>
          <div class="mnt-type-content">
            <h3 class="mnt-type-card-title">${t.group.title}</h3>
            <p class="mnt-type-desc">${t.group.desc}</p>
            <div class="mnt-type-features">
              ${t.group.features.map(f => `<div class="mnt-type-feat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></div>`).join('')}
            </div>
            <button class="mnt-type-btn mnt-btn-group" onclick="openMyNextTripModal('group')">
              <span>${t.group.btn}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 13 12 18 17 13"></polyline><line x1="12" y1="6" x2="12" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <!-- Individual Tours Card -->
        <div class="mnt-type-card mnt-indiv-card">
          <div class="mnt-type-card-img" style="background-image: url('https://framerusercontent.com/images/SV1MiT2BJSPLRUGiJqhm8CRVHkg.jpg');">
            <div class="mnt-type-img-overlay"></div>
            <span class="mnt-type-pill indiv-pill">${t.individual.tag}</span>
          </div>
          <div class="mnt-type-content">
            <h3 class="mnt-type-card-title">${t.individual.title}</h3>
            <p class="mnt-type-desc">${t.individual.desc}</p>
            <div class="mnt-type-features">
              ${t.individual.features.map(f => `<div class="mnt-type-feat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></div>`).join('')}
            </div>
            <button class="mnt-type-btn mnt-btn-indiv" onclick="openMyNextTripModal('individual')">
              <span>${t.individual.btn}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderVisaSection() {
  let visaSec = document.getElementById('mnt-visa-section');
  if (!visaSec) {
    visaSec = document.createElement('section');
    visaSec.id = 'mnt-visa-section';
    visaSec.className = 'mnt-visa-section';
    
    // Insert after Group Tours section (before Why Us) to match requested order:
    // Individual Tours -> Group Tours -> Visa Assistance -> Why MyNextTrip -> Contact
    const toursSec = document.querySelector('section[data-framer-name="Tours"]') || document.getElementById('mnt-tours-section');
    if (toursSec && toursSec.parentNode) {
      if (toursSec.nextSibling) {
        toursSec.parentNode.insertBefore(visaSec, toursSec.nextSibling);
      } else {
        toursSec.parentNode.appendChild(visaSec);
      }
    } else {
      const footer = document.querySelector('footer');
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(visaSec, footer);
      } else {
        document.body.appendChild(visaSec);
      }
    }
  }

  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const texts = (window.__visaSectionTexts && window.__visaSectionTexts[lang]) ? window.__visaSectionTexts[lang] : window.__visaSectionTexts.en;
  let allCards = (window.__visaDatabase && window.__visaDatabase[lang]) ? window.__visaDatabase[lang] : [];

  const curFilter = window.__visaFilter || 'all';
  const filteredCards = allCards.filter(c => {
    if (curFilter === 'all') return true;
    if (curFilter === 'free') return c.badge_type === 'free';
    if (curFilter === 'arrival') return c.badge_type === 'arrival';
    if (curFilter === 'required') return c.badge_type === 'required';
    if (curFilter === 'evisa') return c.badge_type === 'evisa';
    return true;
  });

  let cardsHtml = '';
  filteredCards.forEach(card => {
    let linkHtml = '';
    if (card.link) {
      const linkLabel = lang === 'hy' ? 'Պաշտոնական կայք ↗' : (lang === 'ru' ? 'Официальный сайт ↗' : 'Official website ↗');
      linkHtml = `<a href="${card.link}" target="_blank" rel="noopener noreferrer" class="mnt-visa-link">${linkLabel}</a>`;
    }
    cardsHtml += `
      <div class="mnt-visa-card">
        <div class="mnt-visa-card-content">
          <div class="mnt-visa-card-top">
            <h4 class="mnt-visa-card-title">${card.country}</h4>
            <span class="mnt-visa-tag ${card.badge_type}">${card.badge}</span>
          </div>
          ${card.stay ? `<div class="mnt-visa-stay">${card.stay}</div>` : ''}
          <p class="mnt-visa-desc">${card.desc}</p>
        </div>
        ${linkHtml}
      </div>
    `;
  });

  visaSec.innerHTML = `
    <div class="mnt-visa-container">
      <div class="mnt-visa-header">
        <span class="mnt-visa-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          ${texts.tag}
        </span>
        <h2 class="mnt-visa-title">${texts.title}</h2>
        <p class="mnt-visa-intro">${texts.intro}</p>

        <!-- Category Filters -->
        <div class="mnt-visa-filters">
          <button class="mnt-filter-btn ${curFilter === 'all' ? 'active' : ''}" onclick="setVisaFilter('all')">${texts.filterAll}</button>
          <button class="mnt-filter-btn ${curFilter === 'free' ? 'active' : ''}" onclick="setVisaFilter('free')">${texts.filterFree}</button>
          <button class="mnt-filter-btn ${curFilter === 'arrival' ? 'active' : ''}" onclick="setVisaFilter('arrival')">${texts.filterArrival}</button>
          <button class="mnt-filter-btn ${curFilter === 'required' ? 'active' : ''}" onclick="setVisaFilter('required')">${texts.filterRequired}</button>
          <button class="mnt-filter-btn ${curFilter === 'evisa' ? 'active' : ''}" onclick="setVisaFilter('evisa')">${texts.filterEvisa}</button>
        </div>
      </div>

      <div class="mnt-visa-grid">
        ${cardsHtml}
      </div>

      <div class="mnt-visa-disclaimer">
        ${texts.disclaimer}
      </div>

      <!-- Bottom Consultation Banner -->
      <div class="mnt-visa-banner">
        <div class="mnt-visa-banner-text">
          <h3>${texts.bannerTitle}</h3>
          <p>${texts.bannerDesc}</p>
        </div>
        <button class="mnt-visa-banner-btn" onclick="openVisaConsultationModal()">
          <span>${texts.bannerBtn}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  `;
}

function openVisaConsultationModal() {
  initVisaModal();
  const vModal = document.getElementById('mnt-visa-modal-wrap');
  if (vModal) {
    vModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVisaConsultationModal() {
  const vModal = document.getElementById('mnt-visa-modal-wrap');
  if (vModal) {
    vModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleVisaFormSubmit(e) {
  e.preventDefault();
  const successBox = document.getElementById('mnt-visa-success-box');
  const form = document.getElementById('mnt-visa-form');
  if (successBox) successBox.style.display = 'flex';
  if (form) form.reset();
  setTimeout(() => {
    closeVisaConsultationModal();
    if (successBox) successBox.style.display = 'none';
  }, 3500);
}

const visaFormTranslations = {
  hy: {
    heroTitle: "Վիզայի աջակցության հայտ",
    heroDesc: "Լրացրեք հայտը և մեր մասնագետը կկապվի Ձեզ հետ՝ վիզայի դիմումի գործընթացի վերաբերյալ անհրաժեշտ տեղեկատվություն և աջակցություն տրամադրելու համար:",
    back: "Հետ վերադառնալ",
    success: "Շնորհակալություն: Ձեր հայտն ընդունված է: Մեր մասնագետը շուտով կկապվի Ձեզ հետ:",
    nameLbl: "Անուն, ազգանուն",
    namePh: "Օրինակ՝ Անահիտ Սարգսյան",
    phoneLbl: "Հեռախոսահամար",
    emailLbl: "Էլ. փոստ",
    destLbl: "Ո՞ր երկրի համար եք դիմում",
    destPh: "Ընտրել երկիրը",
    typeLbl: "Վիզայի տեսակը",
    typePh: "Ընտրել տեսակը",
    typeTourist: "Տուրիստական",
    typeBusiness: "Բիզնես",
    peopleLbl: "Քանի՞ անձի համար է անհրաժեշտ աջակցություն",
    peopleUnit: "անձ",
    dateLbl: "Նախատեսվող մեկնելու ամսաթիվը",
    pastLbl: "Նախկինում ունեցե՞լ եք տվյալ երկրի վիզա",
    yes: "Այո",
    no: "Ոչ",
    notesLbl: "Լրացուցիչ տեղեկություն",
    notesPh: "Եթե ունեք մերժում, նախկին վիզա կամ այլ հանգամանք, կարող եք նշել այստեղ",
    consent: "Հաստատում եմ, որ ներկայացված տվյալները ճիշտ են և համաձայն եմ, որ My Next Trip-ը կապ հաստատի ինձ հետ՝ հայտի վերաբերյալ:",
    submit: "Ուղարկել հայտը"
  },
  ru: {
    heroTitle: "Заявка на визовую поддержку",
    heroDesc: "Заполните форму, и наш специалист свяжется с вами для предоставления полной информации и поддержки по оформлению визы.",
    back: "Назад",
    success: "Спасибо! Ваша заявка принята. Наш специалист скоро свяжется с вами.",
    nameLbl: "Имя, Фамилия",
    namePh: "Например: Анна Саргсян",
    phoneLbl: "Номер телефона",
    emailLbl: "Эл. почта",
    destLbl: "В какую страну вы подаете",
    destPh: "Выберите страну",
    typeLbl: "Тип визы",
    typePh: "Выберите тип",
    typeTourist: "Туристическая",
    typeBusiness: "Деловая / Бизнес",
    peopleLbl: "Для скольких человек нужна поддержка",
    peopleUnit: "чел.",
    dateLbl: "Планируемая дата поездки",
    pastLbl: "Была ли у вас ранее виза этой страны",
    yes: "Да",
    no: "Нет",
    notesLbl: "Дополнительная информация",
    notesPh: "Если у вас был отказ, предыдущая виза или другие обстоятельства, укажите здесь",
    consent: "Подтверждаю правильность предоставленных данных и согласен(на) на связь с My Next Trip по поводу заявки.",
    submit: "Отправить заявку"
  },
  en: {
    heroTitle: "Visa Assistance Application",
    heroDesc: "Fill out the application and our specialist will contact you to provide necessary information and guidance for your visa application process.",
    back: "Go Back",
    success: "Thank you! Your application has been submitted. Our specialist will contact you shortly.",
    nameLbl: "Full Name",
    namePh: "e.g., Anahit Sargsyan",
    phoneLbl: "Phone Number",
    emailLbl: "Email Address",
    destLbl: "Which country are you applying for",
    destPh: "Select country",
    typeLbl: "Visa Type",
    typePh: "Select type",
    typeTourist: "Tourist",
    typeBusiness: "Business",
    peopleLbl: "How many people need assistance",
    peopleUnit: "person(s)",
    dateLbl: "Planned Departure Date",
    pastLbl: "Have you previously had a visa for this country",
    yes: "Yes",
    no: "No",
    notesLbl: "Additional Information",
    notesPh: "If you have a previous refusal, past visa, or any specifics, please mention here",
    consent: "I confirm that the submitted information is accurate and agree that My Next Trip may contact me regarding this request.",
    submit: "Submit Application"
  }
};

function initVisaModal() {
  const existing = document.getElementById('mnt-visa-modal-wrap');
  if (existing) existing.remove();

  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
  const t = visaFormTranslations[lang] || visaFormTranslations.hy;

  const modal = document.createElement('div');
  modal.id = 'mnt-visa-modal-wrap';
  modal.innerHTML = `
    <div class="mnt-visa-modal-card" onclick="event.stopPropagation()">
      <!-- Top Bar -->
      <div class="mnt-visa-modal-topbar">
        <div class="mnt-modal-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          <div>
            <strong>My Next Trip</strong>
            <span>TRAVEL AGENCY</span>
          </div>
        </div>
        <button class="mnt-modal-back-btn" type="button" onclick="closeVisaConsultationModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span id="mnt-visa-back-text">${t.back}</span>
        </button>
      </div>

      <!-- Hero Heading with intro text -->
      <div class="mnt-visa-modal-header-hero">
        <h2 id="mnt-visa-hero-title">${t.heroTitle}</h2>
        <p id="mnt-visa-hero-desc">${t.heroDesc}</p>
      </div>

      <!-- Form Body -->
      <form class="mnt-visa-modal-form" id="mnt-visa-form" onsubmit="handleVisaFormSubmit(event)">
        <div id="mnt-visa-success-box" style="display:none; margin-bottom: 20px;" class="mnt-success-alert">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
          <p>${t.success}</p>
        </div>

        <div class="mnt-visa-grid">
          <!-- 1. Name* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">1.</span> ${t.nameLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input type="text" required placeholder="${t.namePh}" />
            </div>
          </div>

          <!-- 2. Phone* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">2.</span> ${t.phoneLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <input type="tel" required placeholder="+374 XX XXX XXX" />
            </div>
          </div>

          <!-- 3. Email -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">3.</span> ${t.emailLbl}</label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input type="email" placeholder="example@email.com" />
            </div>
          </div>

          <!-- 4. Country* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">4.</span> ${t.destLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </span>
              <select required>
                <option value="" disabled selected>${t.destPh}</option>
                <option value="Spain">🇪🇸 Իսպանիա (Spain)</option>
                <option value="Italy">🇮🇹 Իտալիա (Italy)</option>
                <option value="Greece">🇬🇷 Հունաստան (Greece)</option>
                <option value="Cyprus">🇨🇾 Կիպրոս (Cyprus)</option>
                <option value="France">🇫🇷 Ֆրանսիա (France)</option>
                <option value="Germany">🇩🇪 Գերմանիա (Germany)</option>
                <option value="Czech Republic">🇨🇿 Չեխիա (Czechia)</option>
                <option value="Netherlands">🇳🇱 Նիդերլանդներ (Netherlands)</option>
                <option value="Romania">🇷🇴 Ռումինիա (Romania)</option>
                <option value="Bulgaria">🇧🇬 Բուլղարիա (Bulgaria)</option>
                <option value="Austria">🇦🇹 Ավստրիա (Austria)</option>
                <option value="Croatia">🇭🇷 Խորվաթիա (Croatia)</option>
                <option value="Poland">🇵🇱 Լեհաստան (Poland)</option>
                <option value="Lithuania">🇱🇹 Լիտվա (Lithuania)</option>
                <option value="United Kingdom">🇬🇧 Միացյալ Թագավորություն (UK)</option>
                <option value="USA">🇺🇸 ԱՄՆ (USA)</option>
                <option value="Canada">🇨🇦 Կանադա (Canada)</option>
                <option value="Slovakia">🇸🇰 Սլովակիա (Slovakia)</option>
                <option value="Other">🌍 Այլ (Other)</option>
              </select>
            </div>
          </div>

          <!-- 5. Visa Type* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">5.</span> ${t.typeLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </span>
              <select required>
                <option value="" disabled selected>${t.typePh}</option>
                <option value="Tourist">${t.typeTourist}</option>
                <option value="Business">${t.typeBusiness}</option>
              </select>
            </div>
          </div>

          <!-- 6. Travelers count* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">6.</span> ${t.peopleLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </span>
              <select required>
                <option value="1" selected>1 ${t.peopleUnit}</option>
                <option value="2">2 ${t.peopleUnit}</option>
                <option value="3">3 ${t.peopleUnit}</option>
                <option value="4">4 ${t.peopleUnit}</option>
                <option value="5+">5+ ${t.peopleUnit}</option>
              </select>
            </div>
          </div>

          <!-- 7. Planned date* -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">7.</span> ${t.dateLbl} <span class="req">*</span></label>
            <div class="mnt-visa-input-wrap">
              <span class="field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </span>
              <input type="date" required id="mnt-visa-date-input" onclick="try{this.showPicker()}catch(e){}" />
            </div>
          </div>

          <!-- 8. Past visa -->
          <div class="mnt-visa-field">
            <label><span class="num-badge">8.</span> ${t.pastLbl}</label>
            <div class="mnt-visa-radio-group">
              <label class="mnt-visa-radio-label">
                <input type="radio" name="mnt_visa_past" value="Yes" />
                <span>${t.yes}</span>
              </label>
              <label class="mnt-visa-radio-label">
                <input type="radio" name="mnt_visa_past" value="No" checked />
                <span>${t.no}</span>
              </label>
            </div>
          </div>

          <!-- 9. Additional Notes -->
          <div class="mnt-visa-field mnt-visa-col-full">
            <label><span class="num-badge">9.</span> ${t.notesLbl}</label>
            <textarea placeholder="${t.notesPh}"></textarea>
          </div>
        </div>

        <!-- Consent Checkbox -->
        <div class="mnt-visa-consent">
          <input type="checkbox" id="mnt-visa-agree" required checked />
          <label for="mnt-visa-agree">${t.consent}</label>
        </div>

        <!-- Submit Button -->
        <div class="mnt-visa-submit-row">
          <button type="submit" class="mnt-visa-submit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            <span>${t.submit}</span>
          </button>
        </div>
      </form>
    </div>
  `;

  modal.onclick = (e) => {
    if (e.target === modal) closeVisaConsultationModal();
  };

  document.body.appendChild(modal);

  const dtInput = document.getElementById('mnt-visa-date-input');
  if (dtInput) {
    dtInput.min = new Date().toISOString().split('T')[0];
  }
}
window.openVisaConsultationModal = openVisaConsultationModal;
window.closeVisaConsultationModal = closeVisaConsultationModal;


// =========================================================================
// Contacts Section & WhatsApp Floating Button
// =========================================================================
window.__contactSectionTexts = {
  hy: {
    tag: "Կապ",
    title: "Կապը մեզ հետ",
    sub: "Մենք միշտ պատրաստ ենք պատասխանել ձեր հարցերին և օգնել կազմակերպել ձեր հաջորդ ճամփորդությունը:",
    phoneLabel: "Հեռախոս",
    phoneValue: "+374 77 225678",
    phoneHint: "077 225678",
    phoneHref: "tel:+37477225678",
    emailLabel: "Էլ. փոստ",
    emailValue: "info@mynexttrip.am",
    emailHint: "Գրեք մեզ ձեր հարցումները ցանկացած ժամանակ",
    instaLabel: "Instagram",
    instaValue: "@my.next_trip",
    instaHint: "Հետևեք մեր նոր առաջարկներին և ակցիաներին",
    whatsappBtn: "Կապ WhatsApp-ով"
  },
  ru: {
    tag: "Контакты",
    title: "Свяжитесь с нами",
    sub: "Мы всегда на связи и с радостью поможем спланировать ваше следующее идеальное путешествие:",
    phoneLabel: "Телефон",
    phoneValue: "+374 77 225678",
    phoneHint: "077 225678",
    phoneHref: "tel:+37477225678",
    emailLabel: "Эл. почта",
    emailValue: "info@mynexttrip.am",
    emailHint: "Пишите нам в любое время по любым вопросам",
    instaLabel: "Instagram",
    instaValue: "@my.next_trip",
    instaHint: "Следите за нашими актуальными турами и акциями",
    whatsappBtn: "Чат в WhatsApp"
  },
  en: {
    tag: "Contact",
    title: "Contact Us",
    sub: "We are always ready to answer your questions and help design your next unforgettable trip:",
    phoneLabel: "Phone",
    phoneValue: "+374 77 225678",
    phoneHint: "077 225678",
    phoneHref: "tel:+37477225678",
    emailLabel: "Email",
    emailValue: "info@mynexttrip.am",
    emailHint: "Send your inquiries anytime, we reply promptly",
    instaLabel: "Instagram",
    instaValue: "@my.next_trip",
    instaHint: "Follow us for travel inspiration, packages and updates",
    whatsappBtn: "Chat on WhatsApp"
  }
};

function renderContactSection() {
  let sec = document.getElementById('mnt-contact-section');
  if (!sec) {
    sec = document.createElement('section');
    sec.id = 'mnt-contact-section';
    sec.className = 'mnt-contact-section';
    const footerWrap = document.querySelector('.framer-1388mbi-container') || document.querySelector('footer');
    if (footerWrap && footerWrap.parentNode) {
      footerWrap.parentNode.insertBefore(sec, footerWrap);
    } else {
      document.body.appendChild(sec);
    }
  }

  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const t = window.__contactSectionTexts[lang] || window.__contactSectionTexts.en;

  sec.innerHTML = `
    <div class="mnt-contact-container">
      <div class="mnt-contact-header">
        <span class="mnt-contact-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${t.tag}
        </span>
        <h2 class="mnt-contact-title">${t.title}</h2>
        <p class="mnt-contact-sub">${t.sub}</p>
      </div>

      <div class="mnt-contact-grid">
        <!-- Phone Card -->
        <a href="tel:+37477225678" class="mnt-contact-card">
          <div class="mnt-contact-icon-box mnt-contact-icon-phone">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <span class="mnt-contact-label">${t.phoneLabel}</span>
          <div class="mnt-contact-value" style="color: #38bdf8; font-weight: 700; font-size: 19px;">+374 77 225678</div>
          <p class="mnt-contact-hint" style="color: #94a3b8; font-size: 13px;">077 225678 (WhatsApp)</p>
        </a>

        <!-- Email Card -->
        <a href="mailto:info@mynexttrip.am" class="mnt-contact-card">
          <div class="mnt-contact-icon-box mnt-contact-icon-email">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <span class="mnt-contact-label">${t.emailLabel}</span>
          <div class="mnt-contact-value">${t.emailValue}</div>
          <p class="mnt-contact-hint">${t.emailHint}</p>
        </a>

        <!-- Instagram Card -->
        <a href="https://instagram.com/my.next_trip" target="_blank" rel="noopener noreferrer" class="mnt-contact-card">
          <div class="mnt-contact-icon-box mnt-contact-icon-insta">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
          <span class="mnt-contact-label">${t.instaLabel}</span>
          <div class="mnt-contact-value">${t.instaValue}</div>
          <p class="mnt-contact-hint">${t.instaHint}</p>
        </a>
      </div>
    </div>
  `;
}

// Floating WhatsApp Button (Fixed Bottom-Left on all pages)
function initWhatsAppFloat() {
  if (document.getElementById('mnt-whatsapp-float')) return;
  const btn = document.createElement('a');
  btn.id = 'mnt-whatsapp-float';
  btn.className = 'mnt-whatsapp-float';
  btn.href = 'https://wa.me/37477225678?text=Hello%20MyNextTrip!';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat on WhatsApp');
  btn.title = 'WhatsApp: +374 77 225678';

  btn.innerHTML = `
    <div class="mnt-whatsapp-icon-wrap">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.04C9.36 7.04 9.09 7.1 8.87 7.34C8.65 7.58 8.02 8.16 8.02 9.35C8.02 10.54 8.89 11.69 9.01 11.85C9.13 12.01 10.68 14.5 13.11 15.45C15.13 16.23 15.54 16.07 15.98 16.03C16.42 15.99 17.41 15.45 17.61 14.88C17.81 14.31 17.81 13.82 17.75 13.72C17.69 13.62 17.52 13.56 17.27 13.43C17.02 13.31 15.8 12.71 15.57 12.63C15.34 12.55 15.18 12.51 15.01 12.76C14.84 13 14.37 13.56 14.22 13.72C14.07 13.88 13.93 13.9 13.68 13.78C13.43 13.66 12.63 13.4 11.68 12.55C10.94 11.89 10.44 11.07 10.3 10.82C10.15 10.58 10.28 10.44 10.41 10.32C10.52 10.21 10.66 10.03 10.78 9.89C10.9 9.74 10.94 9.64 11.02 9.47C11.1 9.31 11.06 9.17 11 9.05C10.94 8.93 10.45 7.73 10.25 7.23C10.05 6.75 9.85 6.81 9.7 6.81C9.56 6.8 9.39 6.8 9.53 7.04Z"/>
      </svg>
    </div>
  `;
  document.body.appendChild(btn);
}
function updateWhatsAppFloatLabel(lang) {
  const lbl = document.getElementById('mnt-whatsapp-label');
  if (lbl && window.__contactSectionTexts && window.__contactSectionTexts[lang]) {
    lbl.textContent = window.__contactSectionTexts[lang].whatsappBtn;
  }
}


// =========================================================================
// MyNextTrip - Complete Translation, Logo, Dynamic Images & Form Controller
// Languages supported: English (EN), Russian (RU), Armenian (HY)
// =========================================================================

window.__customDestinationsList = [
  {
    id: "dest-china",
    N6ZbQXHdN: "china",
    get AYlbiDb5i() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Китай" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Չինաստան" : "China");
    },
    get mle5_OseC() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Древние династии, Великая стена и футуризм" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Հնագույն դինաստիաներ, Մեծ պարիսպ և ապագա" : "Ancient dynasties, Great Wall & futuristic metropolises");
    },
    MdGfHiRoa: { src: "/images/destinations/china1.jpg", pixelWidth: 1920, pixelHeight: 1080 },
    moq7ENOXp: { src: "/images/destinations/china2.jpg", pixelWidth: 1200, pixelHeight: 900 },
    DUwgLv8de: { src: "/images/destinations/china3.jpg", pixelWidth: 1200, pixelHeight: 900 },
    jwIgf6tBO: { src: "/images/destinations/china4.jpg", pixelWidth: 1200, pixelHeight: 900 }
  },
  {
    id: "dest-rome",
    N6ZbQXHdN: "rome",
    get AYlbiDb5i() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Рим" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Հռոմ" : "Rome");
    },
    get mle5_OseC() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Вечный город, Колизей и гастрономия" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Հավերժական քաղաք, Կոլիզեյ և մշակույթ" : "Eternal city, Colosseum & rich culinary art");
    },
    MdGfHiRoa: { src: "/images/destinations/rome1.jpeg", pixelWidth: 1920, pixelHeight: 1080 },
    moq7ENOXp: { src: "/images/destinations/rome2.jpg", pixelWidth: 1200, pixelHeight: 900 },
    DUwgLv8de: { src: "/images/destinations/rome3.jpg", pixelWidth: 1200, pixelHeight: 900 },
    jwIgf6tBO: { src: "/images/destinations/rome4.jpg", pixelWidth: 1200, pixelHeight: 900 }
  },
  {
    id: "dest-london",
    N6ZbQXHdN: "london",
    get AYlbiDb5i() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Лондон" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Լոնդոն" : "London");
    },
    get mle5_OseC() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Королевское величие, Биг Бен и культура" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Թագավորական պատմություն, Բիգ Բեն և մշակույթ" : "Historic royalty, iconic landmarks & culture");
    },
    MdGfHiRoa: { src: "/images/destinations/london1.jpg", pixelWidth: 1920, pixelHeight: 1080 },
    moq7ENOXp: { src: "/images/destinations/london2.jpg", pixelWidth: 1200, pixelHeight: 900 },
    DUwgLv8de: { src: "/images/destinations/london3.jpg", pixelWidth: 1200, pixelHeight: 900 },
    jwIgf6tBO: { src: "/images/destinations/london4.jpg", pixelWidth: 1200, pixelHeight: 900 }
  },
  {
    id: "dest-spain",
    N6ZbQXHdN: "spain",
    get AYlbiDb5i() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Испания" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Իսպանիա" : "Spain");
    },
    get mle5_OseC() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Солнечные побережья, фламенко и шедевры" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Արևոտ ափեր, ֆլամենկո և ճարտարապետություն" : "Sunny coasts, flamenco passion & architectural wonders");
    },
    MdGfHiRoa: { src: "/images/destinations/spanien1.jpg", pixelWidth: 1920, pixelHeight: 1080 },
    moq7ENOXp: { src: "/images/destinations/spanien2.jpg", pixelWidth: 1200, pixelHeight: 900 },
    DUwgLv8de: { src: "/images/destinations/spanien3.jpg", pixelWidth: 1200, pixelHeight: 900 },
    jwIgf6tBO: { src: "/images/destinations/spanien4.jpg", pixelWidth: 1200, pixelHeight: 900 }
  }
];

window.__customTourPackages = [
  {
    id: "tour-italy",
    ffrqBkpLP: "italy-tuscany-escape",
    dOhhE2NhA: "8 Days / 7 Nights",
    get L76jPdbmu() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Тоскана и Рим" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Տոսկանա և Հռոմ" : "Tuscany & Rome Classic");
    },
    rrBsiGNOX: "$1,450",
    cfJPgXq_U: { src: "/images/tours/italy.jpg", pixelWidth: 1920, pixelHeight: 1080 }
  },
  {
    id: "tour-france",
    ffrqBkpLP: "france-castles-paris",
    dOhhE2NhA: "7 Days / 6 Nights",
    get L76jPdbmu() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Франция: Замки и Париж" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Ֆրանսիա՝ Ամրոցներ և Փարիզ" : "France: Castles & Paris");
    },
    rrBsiGNOX: "$1,850",
    cfJPgXq_U: { src: "/images/tours/france.jpg", pixelWidth: 1920, pixelHeight: 1080 }
  },
  {
    id: "tour-russia",
    ffrqBkpLP: "russia-moscow-heritage",
    dOhhE2NhA: "7 Days / 6 Nights",
    get L76jPdbmu() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Москва и Золотое Кольцо" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Մոսկվա և Ոսկե Օղակ" : "Russia: Moscow Heritage");
    },
    rrBsiGNOX: "$1,350",
    cfJPgXq_U: { src: "/images/tours/russia.jpg", pixelWidth: 1920, pixelHeight: 1080 }
  },
  {
    id: "tour-japan",
    ffrqBkpLP: "japan-tokyo-kyoto-neon",
    dOhhE2NhA: "9 Days / 8 Nights",
    get L76jPdbmu() {
      return (typeof window !== "undefined" && window.__currentLang === "ru") ? "Токио и Киото: Неон и Сакура" : ((typeof window !== "undefined" && window.__currentLang === "hy") ? "Տոկիո և Կիոտո՝ Նեոն և Սակուրա" : "Japan: Tokyo & Kyoto Neon");
    },
    rrBsiGNOX: "$2,100",
    cfJPgXq_U: { src: "/images/tours/japan.jpg", pixelWidth: 1920, pixelHeight: 1080 }
  }
];

window.__customTravelStyles = [
  {
    id: "style-city",
    wJeWQBqmm: "camping-outdoor",
    rkuvG0Uyg: { src: "/images/experience/style1.jpg", pixelWidth: 1920, pixelHeight: 1280 },
    get dYs3LAPaP() {
      if (typeof window !== "undefined") {
        if (window.__currentLang === "ru") return "Городские туры";
        if (window.__currentLang === "hy") return "Քաղաքային տուրեր";
      }
      return "City Skylines";
    },
    oI83kLpbd: null
  },
  {
    id: "style-culture",
    wJeWQBqmm: "water-adventures",
    rkuvG0Uyg: { src: "/images/experience/style2.jpg", pixelWidth: 1920, pixelHeight: 1280 },
    get dYs3LAPaP() {
      if (typeof window !== "undefined") {
        if (window.__currentLang === "ru") return "Культура и история";
        if (window.__currentLang === "hy") return "Մշակույթ և պատմություն";
      }
      return "Cultural Journeys";
    },
    oI83kLpbd: null
  },
  {
    id: "style-coast",
    wJeWQBqmm: "cultural-journeys",
    rkuvG0Uyg: { src: "/images/experience/style3.jpg", pixelWidth: 1920, pixelHeight: 1280 },
    get dYs3LAPaP() {
      if (typeof window !== "undefined") {
        if (window.__currentLang === "ru") return "Мегаполисы и побережья";
        if (window.__currentLang === "hy") return "Մեգապոլիսներ և ափեր";
      }
      return "Metropolitan & Coast";
    },
    oI83kLpbd: null
  },
  {
    id: "style-zen",
    wJeWQBqmm: "solo-exploration",
    rkuvG0Uyg: { src: "/images/experience/style4.jpg", pixelWidth: 1920, pixelHeight: 1280 },
    get dYs3LAPaP() {
      if (typeof window !== "undefined") {
        if (window.__currentLang === "ru") return "Природа и релакс";
        if (window.__currentLang === "hy") return "Բնություն և հանգիստ";
      }
      return "Zen & Nature";
    },
    oI83kLpbd: null
  }
];


const websiteTranslations = {
  en: {
    heroTitle: "Experience the World, Not Just the Map",
    heroSub: "Curated Journeys Designed To Be Felt, Not Rushed.",
    bookTrip: "Book a trip",
    aboutUsTag: "About Us",
    aboutTitle: "Meaningful travel experiences, thoughtfully crafted",
    aboutDesc: "We create journeys that bring together remarkable destinations, authentic experiences and carefully considered details so every trip feels personal and worth remembering.",
    discoverStory: "Discover our story",
    chooseStyle: "Choose Your Perfect Travel Style",
    expWorld: "Explore The World’s Most Popular Destinations",
    destRomance: "Romance, culture, and timeless charm",
    packagesTitle: "Journeys Designed For Every Travel Style",
    viewPackages: "View Packages",
    exploreMore: "Explore more journeys waiting for you",
    includedTag: "What’s included",
    includedTitle: "Everything You Need For Your Next Journey",
    accTitle: "Accommodation",
    accDesc: "Comfortable places with character, selected in the right locations.",
    expTitle: "Local experiences",
    expDesc: "Discover the destination through experiences beyond the ordinary.",
    transTitle: "Transportation",
    transDesc: "Reliable transfers and local transport from arrival to departure.",
    howWorksTag: "How it works",
    howWorksTitle: "Your Journey in Three Simple Steps",
    step1Title: "Choose your journey",
    step1Desc: "Choose your destination, travel style and the experiences you love.",
    step2Title: "We handle the details",
    step2Desc: "From stays to transfers, we take care of the planning for you.",
    step3Title: "Experience the journey",
    step3Desc: "Travel with ease and enjoy every moment along the way.",
    whyUsTag: "Why Travel With Us",
    whyUsTitle: "Book With Confidence, Travel With Peace Of Mind",
    reviewsTag: "Testimonials",
    reviewsTitle: "Words From Those Who Traveled With Us",
    reviewQuote: "“MyNextTrip created an extraordinary journey for our family. Every hotel, transfer, and hidden gem exceeded our highest expectations!”",
    reviewAuthor: "— Alexandre & Elena S., Private Tour",
    faqTag: "Frequently Asked Questions",
    faqTitle: "Everything You Need To Know Before You Travel",
    footerTitle: "Turn Your Travel Dreams Into Reality",
    footerDesc: "From the first idea to the final detail, we design journeys you’ll remember forever.",
    modal: {
      title: "Custom Tour Inquiry",
      subtitle: "State your travel preferences, and our specialists will assemble the ideal proposal:",
      back: "Back to website",
      step1: "Travel Details",
      step2: "Contact Information",
      step3: "Preferred Contact Channel",
      dest: "Destination *",
      destPh: "e.g., Italy, France, Spain, Armenia, New York...",
      departDate: "Departure Date *",
      returnDate: "Return Date *",
      travelers: "Travelers *",
      adults: "Adults *",
      children: "Children",
      childrenHelp: "Specify age if applicable",
      hotelCat: "Preferred Hotel Category",
      hotelCatPh: "3★, 4★, 5★ Luxury",
      meal: "Meal Plan",
      mealPh: "Breakfast (BB), Half Board (HB), All-Inclusive",
      budget: "Estimated Budget",
      budgetPh: "e.g., $1,500 - $3,000",
      notes: "Additional requests / notes",
      notesPh: "e.g., beachside resort, historic sightseeing, relaxed pace...",
      name: "Full Name *",
      namePh: "Enter your full name",
      phone: "Phone Number *",
      phonePh: "+1 555 123 4567",
      email: "Email Address *",
      emailPh: "yourname@example.com",
      call: "Phone Call",
      whatsapp: "WhatsApp",
      securityTitle: "Your Data is Protected",
      securityDesc: "We respect your privacy and never share your details with third parties.",
      submitBtn: "Send Inquiry Now",
      successMsg: "Thank you! Your request has been sent successfully. Our specialist will contact you shortly."
    }
  },
  ru: {
    heroTitle: "Познавайте мир, а не просто карту",
    heroSub: "Тщательно продуманные путешествия для незабываемых эмоций.",
    bookTrip: "Забронировать тур",
    aboutUsTag: "О нас",
    aboutTitle: "Уникальные впечатления, созданные со смыслом",
    aboutDesc: "Мы объединяем лучшие направления, авторские экскурсии и внимательное обслуживание, чтобы каждая поездка оставила теплые воспоминания.",
    discoverStory: "Наша история",
    chooseStyle: "Выберите ваш идеальный стиль отдыха",
    expWorld: "Откройте самые популярные направления мира",
    destRomance: "Романтика, культура и вечное очарование",
    packagesTitle: "Туры для любого стиля путешествий",
    viewPackages: "Смотреть туры",
    exploreMore: "Еще больше увлекательных маршрутов ждет вас",
    includedTag: "Что включено",
    includedTitle: "Все необходимое для вашего отдыха",
    accTitle: "Проживание",
    accDesc: "Уютные проверенные отели с безупречным расположением.",
    expTitle: "Яркие впечатления",
    expDesc: "Погружение в культуру и скрытые жемчужины стран.",
    transTitle: "Трансферы и транспорт",
    transDesc: "Комфортный трансфер и транспортное сопровождение.",
    howWorksTag: "Как мы работаем",
    howWorksTitle: "Путешествие мечты за 3 простых шага",
    step1Title: "01 - Выберите направление",
    step1Desc: "Укажите страну, даты и ваши пожелания.",
    step2Title: "02 - Мы всё организуем",
    step2Desc: "Отели, билеты, персональные гиды и логистика.",
    step3Title: "03 - Наслаждайтесь поездкой",
    step3Desc: "Путешествуйте с комфортом и поддержкой 24/7.",
    whyUsTag: "Почему выбирают нас",
    whyUsTitle: "Бронируйте с уверенностью, отдыхайте со спокойной душой",
    reviewsTag: "Отзывы клиентов",
    reviewsTitle: "Что говорят наши путешественники",
    reviewQuote: "«Команда MyNextTrip создала идеальный маршрут для нашей семьи! Все отели, трансферы и гиды были на высочайшем уровне.»",
    reviewAuthor: "— Александр и Елена С., Индивидуальный тур",
    faqTag: "Частые вопросы",
    faqTitle: "Всё, что важно знать перед поездкой",
    footerTitle: "Воплотите мечты о путешествиях в реальность",
    footerDesc: "От первой идеи до возвращения домой — мы продумываем всё до мелочей.",
    modal: {
      title: "Заявка на индивидуальный тур",
      subtitle: "Укажите ваши пожелания, и мы подготовим оптимальное предложение:",
      back: "Назад на сайт",
      step1: "Детали поездки",
      step2: "Контактная информация",
      step3: "Предпочтительный способ связи",
      dest: "Направление *",
      destPh: "Например: Италия, Франция, Испания, Армения...",
      departDate: "Дата вылета *",
      returnDate: "Дата возвращения *",
      travelers: "Количество туристов *",
      adults: "Взрослые *",
      children: "Дети",
      childrenHelp: "Укажите возраст детей при наличии",
      hotelCat: "Категория отеля",
      hotelCatPh: "3★, 4★, 5★ Люкс",
      meal: "Тип питания",
      mealPh: "Завтраки (BB), Полупансион (HB), Всё включено",
      budget: "Ориентировочный бюджет",
      budgetPh: "Например: 150 000 - 300 000 руб.",
      notes: "Дополнительные пожелания",
      notesPh: "Например: первая линия пляжа, насыщенная экскурсионная программа...",
      name: "Ваше имя и фамилия *",
      namePh: "Введите полное имя",
      phone: "Номер телефона *",
      phonePh: "+7 (999) 000-00-00",
      email: "Электронная почта *",
      emailPh: "yourname@example.com",
      call: "Телефонный звонок",
      whatsapp: "WhatsApp",
      securityTitle: "Ваши данные под защитой",
      securityDesc: "Мы соблюдаем конфиденциальность и не передаем ваши данные третьим лицам.",
      submitBtn: "Отправить запрос",
      successMsg: "Спасибо! Ваша заявка успешно отправлена. Наш специалист свяжется с вами в течение часа."
    }
  },
  hy: {
    heroTitle: "Բացահայտեք աշխարհը, ոչ միայն քարտեզը",
    heroSub: "Յուրահատուկ ճանապարհորդություններ՝ ապրելու, ոչ թե շտապելու համար:",
    bookTrip: "Ամրագրել տուր",
    aboutUsTag: "Մեր մասին",
    aboutTitle: "Իմաստալից տպավորություններ, մտածված ստեղծված",
    aboutDesc: "Մենք կազմակերպում ենք ուղևորություններ, որոնք միավորում են հիասքանչ ուղղություններ, իսկական փորձառություններ և խնամքով մտածված մանրուքներ:",
    discoverStory: "Մեր պատմությունը",
    chooseStyle: "Ընտրեք ձեր կատարյալ հանգստի ոճը",
    expWorld: "Բացահայտեք աշխարհի ամենահայտնի ուղղությունները",
    destRomance: "Ռոմանտիկա, մշակույթ և անսահման հմայք",
    packagesTitle: "Տուրեր յուրաքանչյուր ճանապարհորդական ոճի համար",
    viewPackages: "Դիտել տուրերը",
    exploreMore: "Ավելի շատ տուրեր են սպասում ձեզ",
    includedTag: "Ինչ է ներառված",
    includedTitle: "Այն ամենը, ինչ անհրաժեշտ է ձեր հանգստի համար",
    accTitle: "Հյուրանոցներ",
    accDesc: "Հարմարավետ և բարձրակարգ հյուրանոցներ լավագույն վայրերում:",
    expTitle: "Տեղական տպավորություններ",
    expDesc: "Բացահայտեք երկրները անսովոր և վառ տպավորություններով:",
    transTitle: "Տրանսպորտ",
    transDesc: "Հուսալի տրանսֆերներ և հարմարավետ տեղաշարժ ողջ ընթացքում:",
    howWorksTag: "Ինչպես ենք աշխատում",
    howWorksTitle: "Երեք պարզ քայլ դեպի երազանքի ճանապարհորդություն",
    step1Title: "01 - Ընտրեք ուղղությունը",
    step1Desc: "Ընտրեք ձեր նախընտրած երկիրը, ոճը և ծրագիրը:",
    step2Title: "02 - Մենք կհոգանք մնացածը",
    step2Desc: "Ավիատոմսեր, հյուրանոցներ, անհատական էքսկուրսիաներ:",
    step3Title: "03 - Վայելեք հանգիստը",
    step3Desc: "Ճանապարհորդեք ապահով և մեր 24/7 աջակցությամբ:",
    whyUsTag: "Ինչո՞ւ MyNextTrip",
    whyUsTitle: "Ամրագրեք վստահությամբ, հանգստացեք խաղաղ սրտով",
    reviewsTag: "Կարծիքներ",
    reviewsTitle: "Մեր ճանապարհորդների կարծիքները",
    reviewQuote: "«MyNextTrip-ը կազմակերպեց անմոռանալի հանգիստ մեր ընտանիքի համար: Յուրաքանչյուր հյուրանոց և տրանսֆեր գերազանցեց մեր բոլոր սպասումները!»",
    reviewAuthor: "— Ալեքսանդր և Ելենա Ս., Անհատական տուր",
    faqTag: "Հաճախ տրվող հարցեր",
    faqTitle: "Այն ամենը, ինչ պետք է իմանալ նախքան մեկնելը",
    footerTitle: "Իրականացրեք ձեր ճանապարհորդական երազանքները",
    footerDesc: "Առաջին մտքից մինչև վերջին մանրուք՝ մենք ստեղծում ենք հիշողություններ ողջ կյանքի համար:",
    modal: {
      title: "Անհատական տուրի հարցում",
      subtitle: "Նշեք ձեր նախընտրությունները, և մենք կգտնենք ձեզ համապատասխան տարբերակներ:",
      back: "Հետ վերադառնալ",
      step1: "Ճանապարհորդության տվյալներ",
      step2: "Կոնտակտային տվյալներ",
      step3: "Նախընտրելի կապի եղանակ",
      dest: "Ուղղություն *",
      destPh: "Օր.՝ Իտալիա, Ֆրանսիա, Իսպանիա, Հայաստան, Նյու Յորք...",
      departDate: "Մեկնելու ամսաթիվ *",
      returnDate: "Վերադարձի ամսաթիվ *",
      travelers: "Ուղևորների քանակ *",
      adults: "Մեծահասակներ *",
      children: "Երեխաներ",
      childrenHelp: "Նշեք երեխաների տարիքները, եթե ունեք",
      hotelCat: "Հյուրանոցի նախընտրելի կարգ",
      hotelCatPh: "3★, 4★, 5★ Լյուքս",
      meal: "Սննդի նախընտրություն",
      mealPh: "Նախաճաշ (BB), 2-անգամյա (HB), All Inclusive",
      budget: "Բյուջե (ըստ ցանկության)",
      budgetPh: "Օր.՝ 1000 $ - 2500 $",
      notes: "Լրացուցիչ ցանկություններ / մեկնաբանություններ",
      notesPh: "Օրինակ՝ նախընտրում եմ ծովափնյա հանգիստ, հետաքրքրված եմ էքսկուրսիաներով...",
      name: "Անուն Ազգանուն *",
      namePh: "Մուտքագրեք ձեր անունը",
      phone: "Հեռախոսահամար *",
      phonePh: "+374 99 000000",
      email: "Էլ. հասցե *",
      emailPh: "yourname@example.com",
      call: "Հեռախոսազանգ",
      whatsapp: "WhatsApp",
      securityTitle: "Ձեր տվյալները անվտանգ են",
      securityDesc: "Մենք չենք փոխանցում ձեր անձնական տվյալները երրորդ կողմերին:",
      submitBtn: "Ուղարկել հարցումը",
      successMsg: "Ձեր հարցումը հաջողությամբ ուղարկվեց: Մեր մասնագետը շուտով կկապվի ձեզ հետ:"
    }
  }
};

let currentAppLang = 'hy';

// Phrases mapping across languages
const phraseMappings = [
{
  "en": "Destinations explored",
  "ru": "Исследованных направлений",
  "hy": "Բացահայտված ուղղություններ"
},
{
  "en": "Years of travel expertise",
  "ru": "Лет экспертного опыта",
  "hy": "Տարիների ճամփորդական փորձ"
},
{
  "en": "Traveler satisfaction",
  "ru": "Довольных путешественников",
  "hy": "Գոհ ճամփորդներ"
},
{
  "en": "Handcrafted Tour Packages",
  "ru": "Авторские туристические пакеты",
  "hy": "Հատուկ մշակված տուր փաթեթներ"
},
{
  "en": "Journeys designed for every travel style",
  "ru": "Путешествия для любого стиля отдыха",
  "hy": "Ճամփորդություններ յուրաքանչյուր ոճի համար"
},
{
  "en": "Journeys Designed For Every Travel Style",
  "ru": "Путешествия для любого стиля отдыха",
  "hy": "Ճամփորդություններ յուրաքանչյուր ոճի համար"
},
{
  "en": "How it Works",
  "ru": "Как это работает",
  "hy": "Ինչպես ենք աշխատում"
},
{
  "en": "How It Works",
  "ru": "Как это работает",
  "hy": "Ինչպես ենք աշխատում"
},
{
  "en": "Simple steps to your next journey",
  "ru": "Простые шаги к вашему следующему путешествию",
  "hy": "Պարզ քայլեր դեպի ձեր հաջորդ ճամփորդությունը"
},
{
  "en": "Simple Steps To Your Next Journey",
  "ru": "Простые шаги к вашему следующему путешествию",
  "hy": "Պարզ քայլեր դեպի ձեր հաջորդ ճամփորդությունը"
},
{
  "en": "Explore by Experience",
  "ru": "Исследуйте по впечатлениям",
  "hy": "Բացահայտեք ըստ տպավորությունների"
},
{
  "en": "Experience the world in different ways",
  "ru": "Познавайте мир по-разному",
  "hy": "Բացահայտեք աշխարհը տարբեր ձևերով"
},
{
  "en": "Experience The World In Different Ways",
  "ru": "Познавайте мир по-разному",
  "hy": "Բացահայտեք աշխարհը տարբեր ձևերով"
},
{
  "en": "Travel Into Nature",
  "ru": "Путешествие на природу",
  "hy": "Ճամփորդություն դեպի բնություն"
},
{
  "en": "Travel into Nature",
  "ru": "Путешествие на природу",
  "hy": "Ճամփորդություն դեպի բնություն"
},
{
  "en": "Travel Back in Time",
  "ru": "Путешествие во времени",
  "hy": "Ճամփորդություն պատմության խորքերը"
},
{
  "en": "Travel back in Time",
  "ru": "Путешествие во времени",
  "hy": "Ճամփորդություն պատմության խորքերը"
},
{
  "en": "Relax & Recharge",
  "ru": "Релакс и восстановление",
  "hy": "Հանգիստ և վերականգնում"
},
{
  "en": "Discover Local Flavours",
  "ru": "Откройте местную кухню",
  "hy": "Բացահայտեք տեղական համերը"
},
{
  "en": "Discover Local Flavors",
  "ru": "Откройте местную кухню",
  "hy": "Բացահայտեք տեղական համերը"
},
  {
    en: "China",
    ru: "Китай",
    hy: "Չինաստան"
  },
  {
    en: "Rome",
    ru: "Рим",
    hy: "Հռոմ"
  },
  {
    en: "London",
    ru: "Лондон",
    hy: "Լոնդոն"
  },
  {
    en: "Spain",
    ru: "Испания",
    hy: "Իսպանիա"
  },
  {
    en: "Tuscany & Rome Classic",
    ru: "Тоскана и Рим",
    hy: "Տոսկանա և Հռոմ"
  },
  {
    en: "Morocco Desert Journey",
    ru: "Тоскана и Рим",
    hy: "Տոսկանա և Հռոմ"
  },
  {
    en: "France: Castles & Paris",
    ru: "Франция: Замки и Париж",
    hy: "Ֆրանսիա՝ Ամրոցներ և Փարիզ"
  },
  {
    en: "Italy Classic",
    ru: "Франция: Замки и Париж",
    hy: "Ֆրանսիա՝ Ամրոցներ և Փարիզ"
  },
  {
    en: "Russia: Moscow Heritage",
    ru: "Москва и Золотое Кольцо",
    hy: "Մոսկվա և Ոսկե Օղակ"
  },
  {
    en: "Africa Experience",
    ru: "Москва и Золотое Кольцо",
    hy: "Մոսկվա և Ոսկե Օղակ"
  },
  {
    en: "Japan: Tokyo & Kyoto Neon",
    ru: "Токио и Киото: Неон и Сакура",
    hy: "Տոկիո և Կիոտո՝ Նեոն և Սակուրա"
  },
  {
    en: "Japan Spring",
    ru: "Токио и Киото: Неон и Сакура",
    hy: "Տոկիո և Կիոտո՝ Նեոն և Սակուրա"
  },
  {
    en: "7 Days / 6 Nights",
    ru: "7 Дней / 6 Ночей",
    hy: "7 Օր / 6 Գիշեր"
  },
  {
    en: "8 Days / 7 Nights",
    ru: "8 Дней / 7 Ночей",
    hy: "8 Օր / 7 Գիշեր"
  },
  {
    en: "9 Days / 8 Nights",
    ru: "9 Дней / 8 Ночей",
    hy: "9 Օր / 8 Գիշեր"
  },
  {
    en: "From",
    ru: "От",
    hy: "Սկսած"
  },
  {
    en: "/ Per Person",
    ru: "/ За человека",
    hy: "/ Մեկ անձի համար"
  },
  {
    en: "/ Per Person ",
    ru: "/ За человека ",
    hy: "/ Մեկ անձի համար "
  },
  {
    en: "Technology, vibrant nightlife & traditions",
    ru: "Древние династии, Великая стена и футуризм",
    hy: "Հնագույն դինաստիաներ, Մեծ պարիսպ և ապագա"
  },
  {
    en: "Ancient dynasties, Great Wall & futuristic metropolises",
    ru: "Древние династии, Великая стена и футуризм",
    hy: "Հնագույն դինաստիաներ, Մեծ պարիսպ և ապագա"
  },
  {
    en: "Eternal city, Colosseum & rich culinary art",
    ru: "Вечный город, Колизей и гастрономия",
    hy: "Հավերժական քաղաք, Կոլիզեյ և մշակույթ"
  },
  {
    en: "Historic royalty, iconic landmarks & culture",
    ru: "Королевское величие, Биг Бен и культура",
    hy: "Թագավորական պատմություն, Բիգ Բեն և մշակույթ"
  },
  {
    en: "Sunny coasts, flamenco passion & architectural wonders",
    ru: "Солнечные побережья, фламенко и шедевры",
    hy: "Արևոտ ափեր, ֆլամենկո և ճարտարապետություն"
  },
  {
    en: "Experience the World, Not Just the Map",
    ru: "Познавайте мир, а не просто карту",
    hy: "Բացահայտեք աշխարհը, ոչ միայն քարտեզը"
  },
  {
    en: "Curated Journeys Designed To Be Felt, Not Rushed.",
    ru: "Тщательно продуманные путешествия для незабываемых эмоций.",
    hy: "Յուրահատուկ ճանապարհորդություններ՝ ապրելու, ոչ թե շտապելու համար:"
  },
  {
    en: "Curated journeys designed to be felt, not rushed.",
    ru: "Тщательно продуманные путешествия для незабываемых эмоций.",
    hy: "Յուրահատուկ ճանապարհորդություններ՝ ապրելու, ոչ թե շտապելու համար:"
  },
  {
    en: "Book a trip",
    ru: "Забронировать тур",
    hy: "Ամրագրել տուր"
  },
  {
    en: "About Us",
    ru: "О нас",
    hy: "Մեր մասին"
  },
  {
    en: "Meaningful travel experiences, thoughtfully crafted",
    ru: "Уникальные впечатления, созданные со смыслом",
    hy: "Իմաստալից տպավորություններ, մտածված ստեղծված"
  },
  {
    en: "Meaningful Travel Experiences, Thoughtfully Crafted",
    ru: "Уникальные впечатления, созданные со смыслом",
    hy: "Իմաստալից տպավորություններ, մտածված ստեղծված"
  },
  {
    en: "We create journeys that bring together remarkable destinations, authentic experiences and carefully considered details so every trip feels personal and worth remembering.",
    ru: "Мы объединяем лучшие направления, авторские экскурсии и внимательное обслуживание, чтобы каждая поездка оставила теплые воспоминания.",
    hy: "Մենք կազմակերպում ենք ուղևորություններ, որոնք միավորում են հիասքանչ ուղղություններ, իսկական փորձառություններ և խնամքով մտածված մանրուքներ:"
  },
  {
    en: "Discover our story",
    ru: "Наша история",
    hy: "Մեր պատմությունը"
  },
  {
    en: "Choose your style",
    ru: "Выберите стиль",
    hy: "Ընտրեք ոճը"
  },
  {
    en: "Choose Your Perfect Travel Style",
    ru: "Выберите ваш идеальный стиль отдыха",
    hy: "Ընտրեք ձեր կատարյալ հանգստի ոճը"
  },
  {
    en: "Camping & Outdoor",
    ru: "Кемпинг и природа",
    hy: "Քեմփինգ և բնություն"
  },
  {
    en: "Water Adventures",
    ru: "Водные приключения",
    hy: "Ջրային արկածներ"
  },
  {
    en: "Mountain Expeditions",
    ru: "Горные экспедиции",
    hy: "Լեռնային էքսպեդիցիաներ"
  },
  {
    en: "Ski & Snow Adventures",
    ru: "Горнолыжный отдых",
    hy: "Դահուկային հանգիստ"
  },
  {
    en: "Popular Destinations",
    ru: "Популярные направления",
    hy: "Հանրաճանաչ ուղղություններ"
  },
  {
    en: "Explore The World’s Most Popular Destinations",
    ru: "Откройте самые популярные направления мира",
    hy: "Բացահայտեք աշխարհի ամենահայտնի ուղղությունները"
  },
  {
    en: "Explore the world’s most popular destinations",
    ru: "Откройте самые популярные направления мира",
    hy: "Բացահայտեք աշխարհի ամենահայտնի ուղղությունները"
  },
  {
    en: "Explore the World’s Most Popular Destinations",
    ru: "Откройте самые популярные направления мира",
    hy: "Բացահայտեք աշխարհի ամենահայտնի ուղղությունները"
  },
  {
    en: "Romance, culture, and timeless charm",
    ru: "Романтика, культура и вечное очарование",
    hy: "Ռոմանտիկա, մշակույթ և անսահման հմայք"
  },
  {
    en: "Featured Tours",
    ru: "Рекомендуемые туры",
    hy: "Ընտրված տուրեր"
  },
  {
    en: "Journeys Designed For Every Travel Style",
    ru: "Туры для любого стиля путешествий",
    hy: "Տուրեր յուրաքանչյուր ճանապարհորդական ոճի համար"
  },
  {
    en: "Journeys Designed for Every Travel Style",
    ru: "Туры для любого стиля путешествий",
    hy: "Տուրեր յուրաքանչյուր ճանապարհորդական ոճի համար"
  },
  {
    en: "View Packages",
    ru: "Смотреть туры",
    hy: "Դիտել տուրերը"
  },
  {
    en: "Explore more journeys waiting for you",
    ru: "Еще больше увлекательных маршрутов ждет вас",
    hy: "Ավելի շատ տուրեր են սպասում ձեզ"
  },
  {
    en: "What’s included",
    ru: "Что включено",
    hy: "Ինչ է ներառված"
  },
  {
    en: "Everything You Need For Your Next Journey",
    ru: "Все необходимое для вашего отдыха",
    hy: "Այն ամենը, ինչ անհրաժեշտ է ձեր հանգստի համար"
  },
  {
    en: "Accommodation",
    ru: "Проживание",
    hy: "Հյուրանոցներ"
  },
  {
    en: "Comfortable places with character, selected in the right locations.",
    ru: "Уютные проверенные отели с безупречным расположением.",
    hy: "Հարմարավետ և բարձրակարգ հյուրանոցներ լավագույն վայրերում:"
  },
  {
    en: "Local experiences",
    ru: "Яркие впечатления",
    hy: "Տեղական տպավորություններ"
  },
  {
    en: "Discover the destination through experiences beyond the ordinary.",
    ru: "Погружение в культуру и скрытые жемчужины стран.",
    hy: "Բացահայտեք երկրները անսովոր և վառ տպավորություններով:"
  },
  {
    en: "Transportation",
    ru: "Трансферы и транспорт",
    hy: "Տրանսպորտ"
  },
  {
    en: "Reliable transfers and local transport from arrival to departure.",
    ru: "Комфортный трансфер и транспортное сопровождение.",
    hy: "Հուսալի տրանսֆերներ և հարմարավետ տեղաշարժ ողջ ընթացքում:"
  },
  {
    en: "How it works",
    ru: "Как мы работаем",
    hy: "Ինչպես ենք աշխատում"
  },
  {
    en: "Your Journey in Three Simple Steps",
    ru: "Путешествие мечты за 3 простых шага",
    hy: "Երեք պարզ քայլ դեպի երազանքի ճանապարհորդություն"
  },
  {
    en: "Choose your journey",
    ru: "01 - Выберите направление",
    hy: "01 - Ընտրեք ուղղությունը"
  },
  {
    en: "Choose your destination, travel style and the experiences you love.",
    ru: "Укажите страну, даты и ваши пожелания.",
    hy: "Ընտրեք ձեր նախընտրած երկիրը, ոճը և ծրագիրը:"
  },
  {
    en: "We handle the details",
    ru: "02 - Мы всё организуем",
    hy: "02 - Մենք կհոգանք մնացածը"
  },
  {
    en: "From stays to transfers, we take care of the planning for you.",
    ru: "Отели, билеты, персональные гиды и логистика.",
    hy: "Ավիատոմսեր, հյուրանոցներ, անհատական էքսկուրսիաներ:"
  },
  {
    en: "Experience the journey",
    ru: "03 - Наслаждайтесь поездкой",
    hy: "03 - Վայելեք հանգիստը"
  },
  {
    en: "Travel with ease and enjoy every moment along the way.",
    ru: "Путешествуйте с комфортом и поддержкой 24/7.",
    hy: "Ճանապարհորդեք ապահով և մեր 24/7 աջակցությամբ:"
  },
  {
    en: "Why Travel With Us",
    ru: "Почему выбирают нас",
    hy: "Ինչո՞ւ MyNextTrip"
  },
  {
    en: "Book With Confidence, Travel With Peace Of Mind",
    ru: "Бронируйте с уверенностью, отдыхайте со спокойной душой",
    hy: "Ամրագրեք վստահությամբ, հանգստացեք խաղաղ սրտով"
  },
  {
    en: "Testimonials",
    ru: "Отзывы клиентов",
    hy: "Կարծիքներ"
  },
  {
    en: "Words From Those Who Traveled With Us",
    ru: "Что говорят наши путешественники",
    hy: "Մեր ճանապարհորդների կարծիքները"
  },
  {
    en: "Vibe with Us",
    ru: "В ритме путешествий",
    hy: "Մեզ հետ միասին"
  },
  {
    en: "Real Travel Stories From Around the World",
    ru: "Реальные истории путешественников со всего мира",
    hy: "Իրական ճանապարհորդական պատմություններ ողջ աշխարհից"
  },
  {
    en: "Frequently Asked Questions",
    ru: "Частые вопросы",
    hy: "Հաճախ տրվող հարցեր"
  },
  {
    en: "Everything You Need to Know Before You Travel",
    ru: "Всё, что важно знать перед поездкой",
    hy: "Այն ամենը, ինչ պետք է իմանալ նախքան մեկնելը"
  },
  {
    en: "Turn Your Travel Dreams Into Reality",
    ru: "Воплотите мечты о путешествиях в реальность",
    hy: "Իրականացրեք ձեր ճանապարհորդական երազանքները"
  },
  {
    en: "From the first idea to the final detail, we design journeys you’ll remember forever.",
    ru: "От первой идеи до возвращения домой — мы продумываем всё до мелочей.",
    hy: "Առաջին մտքից մինչև վերջին մանրուք՝ մենք ստեղծում ենք հիշողություններ ողջ կյանքի համար:"
  },
  {
    en: "From the first idea to the final detail, we design journeys you'll remember forever.",
    ru: "От первой идеи до возвращения домой — мы продумываем всё до мелочей.",
    hy: "Առաջին մտքից մինչև վերջին մանրուք՝ մենք ստեղծում ենք հիշողություններ ողջ կյանքի համար:"
  },
  {
    en: "View All",
    ru: "Смотреть все",
    hy: "Դիտել բոլորը"
  },
  {
    en: "4.9 stars (541k Reviews)",
    ru: "4.9 звезд (541k отзывов)",
    hy: "4.9 աստղ (541k կարծիք)"
  },
  {
    en: "50k travellers",
    ru: "50k+ туристов",
    hy: "50k+ ճանապարհորդներ"
  },
  {
    en: "1+ million followers",
    ru: "1+ млн подписчиков",
    hy: "1+ մլն հետևորդներ"
  },
  {
    en: "47+ Destinations explored",
    ru: "47+ направлений",
    hy: "47+ ուղղություններ"
  },
  {
    en: "9+ Years of travel expertise",
    ru: "9+ лет опыта",
    hy: "9+ տարվա փորձ"
  },
  {
    en: "94% Traveler satisfaction",
    ru: "94% довольных клиентов",
    hy: "94% գոհունակություն"
  }
];

// Continuous text node walker & replacer

// ==========================================
// HERO SEARCH BAR (FROSTED GLASSMORPHISM)
// ==========================================
window.__heroSearchTranslations = {
  hy: {
    title: 'Ձեր հաջորդ ճանապարհորդությունը սկսվում է այստեղից',
    subtitle: 'Գտեք ձեր նախընտրած ուղղությունը, ամսաթվերը և ուղևորների քանակը',
    destLabel: 'Ուղղություն',
    destPlaceholder: 'Ուր եք ցանկանում մեկնել',
    destOptions: [
      { val: 'Dubai', label: '🇦🇪 Դուբայ (Dubai)' },
      { val: 'Egypt', label: '🇪🇬 Եգիպտոս (Egypt)' },
      { val: 'Italy', label: '🇮🇹 Իտալիա (Italy)' },
      { val: 'Spain', label: '🇪🇸 Իսպանիա (Spain)' },
      { val: 'France', label: '🇫🇷 Ֆրանսիա (France)' },
      { val: 'Greece', label: '🇬🇷 Հունաստան (Greece)' },
      { val: 'Maldives', label: '🇲🇻 Մալդիվներ (Maldives)' },
      { val: 'Bali', label: '🇮🇩 Բալի (Bali)' },
      { val: 'Moscow', label: '🇷🇺 Մոսկվա (Moscow)' }
    ],
    datesLabel: 'Մեկնում — Վերադարձ',
    travelersLabel: 'Ուղևորներ',
    travelersOptions: [
      { val: '1 Adult', label: '1 մեծահասակ' },
      { val: '2 Adults', label: '2 մեծահասակ' },
      { val: '3 Adults', label: '3 մեծահասակ' },
      { val: 'Family (2+1)', label: 'Ընտանեկան (2+1)' },
      { val: 'Group (5+)', label: 'Խումբ (5+)' }
    ],
    searchBtn: 'Ուղարկել հարցում'
  },
  ru: {
    title: 'Ваше следующее путешествие начинается здесь',
    subtitle: 'Выберите подходящее направление, даты и количество пассажиров',
    destLabel: 'Направление',
    destPlaceholder: 'Куда вы хотите поехать?',
    destOptions: [
      { val: 'Dubai', label: '🇦🇪 Дубай (ОАЭ)' },
      { val: 'Egypt', label: '🇪🇬 Египет' },
      { val: 'Italy', label: '🇮🇹 Италия' },
      { val: 'Spain', label: '🇪🇸 Испания' },
      { val: 'France', label: '🇫🇷 Франция' },
      { val: 'Greece', label: '🇬🇷 Греция' },
      { val: 'Maldives', label: '🇲🇻 Мальдивы' },
      { val: 'Bali', label: '🇮🇩 Бали' },
      { val: 'Moscow', label: '🇷🇺 Москва' }
    ],
    datesLabel: 'Даты поездки',
    travelersLabel: 'Пассажиры',
    travelersOptions: [
      { val: '1 Adult', label: '1 взрослый' },
      { val: '2 Adults', label: '2 взрослых' },
      { val: '3 Adults', label: '3 взрослых' },
      { val: 'Family (2+1)', label: 'Семья (2+1)' },
      { val: 'Group (5+)', label: 'Группа (5+)' }
    ],
    searchBtn: 'Отправить запрос'
  },
  en: {
    title: 'Your Next Journey Begins Here',
    subtitle: 'Find your preferred destination, travel dates and number of travelers',
    destLabel: 'Destination',
    destPlaceholder: 'Where do you want to go?',
    destOptions: [
      { val: 'Dubai', label: '🇦🇪 Dubai (UAE)' },
      { val: 'Egypt', label: '🇪🇬 Egypt' },
      { val: 'Italy', label: '🇮🇹 Italy' },
      { val: 'Spain', label: '🇪🇸 Spain' },
      { val: 'France', label: '🇫🇷 France' },
      { val: 'Greece', label: '🇬🇷 Greece' },
      { val: 'Maldives', label: '🇲🇻 Maldives' },
      { val: 'Bali', label: '🇮🇩 Bali' },
      { val: 'Moscow', label: '🇷🇺 Moscow' }
    ],
    datesLabel: 'Departure — Return',
    travelersLabel: 'Travelers',
    travelersOptions: [
      { val: '1 Adult', label: '1 Adult' },
      { val: '2 Adults', label: '2 Adults' },
      { val: '3 Adults', label: '3 Adults' },
      { val: 'Family (2+1)', label: 'Family (2+1)' },
      { val: 'Group (5+)', label: 'Group (5+)' }
    ],
    searchBtn: 'Send an Inquiry'
  }
};

function renderHeroSearchBar(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  const heroContent = document.querySelector('.framer-75udrc') || document.querySelector('.framer-1ld071l') || document.getElementById('hero') || document.querySelector('header');
  if (!heroContent) return;

  // Hide the old small button in the hero so there is no clutter
  const oldBtn = document.querySelector('.framer-q9nfdf');
  if (oldBtn) oldBtn.style.display = 'none';

  const transDict = window.__heroSearchTranslations || {};
  const trans = transDict[currentL] || transDict.en || transDict.hy || {};
  let wrap = document.getElementById('mnt-hero-search-wrap');

  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'mnt-hero-search-wrap';
    wrap.innerHTML = `
      <div class="mnt-search-header">
        <h3 class="mnt-search-title" id="mnt-search-title"></h3>
        <p class="mnt-search-subtitle" id="mnt-search-subtitle"></p>
      </div>
      
      <div class="mnt-search-bar">
        <!-- Destination -->
        <div class="mnt-search-field" id="mnt-field-dest">
          <div class="mnt-field-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="mnt-field-body">
            <span class="mnt-field-label" id="mnt-lbl-dest"></span>
            <select class="mnt-field-select" id="mnt-select-destination"></select>
          </div>
        </div>

        <div class="mnt-search-divider"></div>

        <!-- Dates -->
        <div class="mnt-search-field" id="mnt-field-dates">
          <div class="mnt-field-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <div class="mnt-field-body">
            <div class="mnt-dates-row">
              <div class="mnt-date-box" onclick="try{document.getElementById('mnt-date-depart').showPicker()}catch(e){document.getElementById('mnt-date-depart').focus()}">
                <span class="mnt-date-box-lbl" id="mnt-lbl-depart-sub">Մեկնում</span>
                <input type="date" class="mnt-date-input" id="mnt-date-depart" aria-label="Departure Date" onclick="event.stopPropagation(); try{this.showPicker()}catch(e){}">
              </div>
              <span class="mnt-date-sep">→</span>
              <div class="mnt-date-box" onclick="try{document.getElementById('mnt-date-return').showPicker()}catch(e){document.getElementById('mnt-date-return').focus()}">
                <span class="mnt-date-box-lbl" id="mnt-lbl-return-sub">Վերադարձ</span>
                <input type="date" class="mnt-date-input" id="mnt-date-return" aria-label="Return Date" onclick="event.stopPropagation(); try{this.showPicker()}catch(e){}">
              </div>
            </div>
          </div>
        </div>

        <div class="mnt-search-divider"></div>

        <!-- Travelers -->
        <div class="mnt-search-field" id="mnt-field-travelers">
          <div class="mnt-field-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="mnt-field-body">
            <span class="mnt-field-label" id="mnt-lbl-travelers"></span>
            <select class="mnt-field-select" id="mnt-select-travelers"></select>
          </div>
        </div>

        <!-- Submit button -->
        <button class="mnt-search-btn" id="mnt-search-btn" type="button" onclick="handleHeroSearchSubmit()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          <span class="mnt-search-btn-text" id="mnt-hero-btn-text"></span>
        </button>
      </div>
    `;
    heroContent.appendChild(wrap);

    // Set today as min date
    const today = new Date().toISOString().split('T')[0];
    const dep = document.getElementById('mnt-date-depart');
    const ret = document.getElementById('mnt-date-return');
    if (dep) dep.min = today;
    if (ret) ret.min = today;
    if (dep && ret) {
      dep.addEventListener('change', () => {
        if (dep.value) ret.min = dep.value;
      });
    }
  } else if (!heroContent.contains(wrap)) {
    heroContent.appendChild(wrap);
  }

  // Update text values
  const titleEl = document.getElementById('mnt-search-title');
  const subEl = document.getElementById('mnt-search-subtitle');
  const destLbl = document.getElementById('mnt-lbl-dest');
  const destSel = document.getElementById('mnt-select-destination');
  const datesLbl = document.getElementById('mnt-lbl-dates');
  const travLbl = document.getElementById('mnt-lbl-travelers');
  const travSel = document.getElementById('mnt-select-travelers');
  const btnTxt = document.getElementById('mnt-hero-btn-text');

  if (titleEl) titleEl.textContent = trans.title;
  if (subEl) subEl.textContent = trans.subtitle;
  if (destLbl) destLbl.textContent = trans.destLabel;
  if (datesLbl) datesLbl.textContent = trans.datesLabel;
  const depSub = document.getElementById('mnt-lbl-depart-sub');
  const retSub = document.getElementById('mnt-lbl-return-sub');
  if (depSub) depSub.textContent = currentL === 'hy' ? 'Մեկնում' : (currentL === 'ru' ? 'Вылет' : 'Depart');
  if (retSub) retSub.textContent = currentL === 'hy' ? 'Վերադարձ' : (currentL === 'ru' ? 'Возврат' : 'Return');
  if (travLbl) travLbl.textContent = trans.travelersLabel;
  if (btnTxt) btnTxt.textContent = trans.searchBtn;

  if (destSel) {
    const curVal = destSel.value;
    destSel.innerHTML = `<option value="" disabled ${!curVal ? 'selected' : ''}>${trans.destPlaceholder}</option>` +
      trans.destOptions.map(opt => `<option value="${opt.val}" ${curVal === opt.val ? 'selected' : ''}>${opt.label}</option>`).join('');
  }

  if (travSel) {
    const curTrav = travSel.value || '2 Adults';
    travSel.innerHTML = trans.travelersOptions.map(opt =>
      `<option value="${opt.val}" ${curTrav === opt.val ? 'selected' : ''}>${opt.label}</option>`
    ).join('');
  }
}

// Blackstone Search mapping & Live Tours Modal
window.__blackstoneDestMap = {
  'Cyprus': 73,
  'Greece': 16,
  'Spain': 15,
  'Albania': 59,
  'Morocco': 34,
  'Egypt': 73,
  'Dubai': 73,
  'Italy': 15,
  'France': 15,
  'Maldives': 73,
  'Bali': 73,
  'Moscow': 73
};

function openBlackstoneToursModal(dest, departDate, returnDate, travelers) {
  let modal = document.getElementById('mnt-tours-modal');
  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';

  const modalTitles = {
    hy: 'Առաջարկների որոնում (Live)',
    ru: 'Поиск туров и предложений (Live)',
    en: 'Tour Offers & Live Search'
  };

  const loadingTexts = {
    hy: 'Բեռնվում են ուղղությունների առաջարկները...',
    ru: 'Загрузка актуальных предложений...',
    en: 'Loading available tour offers...'
  };

  const openNewTabTexts = {
    hy: 'Բացել առանձին պատուհանում ↗',
    ru: 'Открыть в новом окне ↗',
    en: 'Open in new tab ↗'
  };

  // Determine state ID if matching
  const stateId = (dest && window.__blackstoneDestMap[dest]) ? window.__blackstoneDestMap[dest] : '';
  
  let targetUrl = 'https://tours.blackstone.am/search_tour';
  const params = [];
  
  // Set language parameter according to user active site language:
  // eng for English & German/Armenian (or rus for Russian)
  if (lang === 'en' || lang === 'de') {
    params.push('LANG=eng');
  } else if (lang === 'ru') {
    params.push('LANG=rus');
  } else {
    // For Armenian/default, default to English so it's clean and international
    params.push('LANG=eng');
  }

  if (stateId) params.push('STATEINC=' + stateId);
  params.push('TOWNFROMINC=1212'); // Yerevan
  
  if (departDate) {
    const p = departDate.split('-');
    if (p.length === 3) params.push('CHECKIN_BEG=' + p[2] + '.' + p[1] + '.' + p[0]);
  }
  if (params.length > 0) {
    targetUrl += '?' + params.join('&');
  }

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mnt-tours-modal';
    modal.className = 'mnt-tours-modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="mnt-tours-modal-card" onclick="event.stopPropagation()">
      <div class="mnt-tours-modal-header">
        <div class="mnt-tours-modal-brand">
          <span class="mnt-tours-modal-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            MyNextTrip Live
          </span>
          <h3 class="mnt-tours-modal-title">${modalTitles[lang] || modalTitles.hy}</h3>
        </div>
        <div class="mnt-tours-modal-actions">
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="mnt-tours-external-btn">
            <span>${openNewTabTexts[lang] || openNewTabTexts.hy}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <button class="mnt-tours-modal-close" onclick="closeBlackstoneToursModal()" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="mnt-tours-iframe-wrapper">
        <div class="mnt-tours-loader" id="mnt-tours-loader">
          <div class="mnt-tours-spinner"></div>
          <span>${loadingTexts[lang] || loadingTexts.hy}</span>
        </div>
        <iframe 
          id="mnt-tours-iframe" 
          class="mnt-tours-iframe" 
          src="${targetUrl}" 
          title="Tour Search Engine"
          onload="document.getElementById('mnt-tours-loader').style.display='none'">
        </iframe>
      </div>
    </div>
  `;

  modal.onclick = (e) => {
    if (e.target === modal) closeBlackstoneToursModal();
  };

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeBlackstoneToursModal() {
  const modal = document.getElementById('mnt-tours-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    const iframe = document.getElementById('mnt-tours-iframe');
    if (iframe) iframe.src = 'about:blank';
  }
}

function handleHeroSearchSubmit() {
  const destSelect = document.getElementById('mnt-select-destination');
  const departInput = document.getElementById('mnt-date-depart');
  const returnInput = document.getElementById('mnt-date-return');
  const travelersSelect = document.getElementById('mnt-select-travelers');

  const dest = destSelect ? destSelect.value : '';
  const departDate = departInput ? departInput.value : '';
  const returnDate = returnInput ? returnInput.value : '';
  const travelers = travelersSelect ? travelersSelect.value : '2 Adults';

  // Open MyNextTrip Inquiry Modal pre-filled
  openMyNextTripModal('search', { dest, departDate, returnDate, travelers });
}



// =========================================================================
// Why MyNextTrip Feature Grid & Learn More Modal
// =========================================================================

window.__whyMyNextTripTexts = {
  hy: {
    tag: "Ինչո՞ւ MyNextTrip",
    title: "Ինչո՞ւ ճամփորդել MyNextTrip-ի հետ",
    items: [
      {
        icon: 'user-check',
        title: "ԱՆՀԱՏԱԿԱՆ ՄՈՏԵՑՈՒՄ",
        desc: "Ձեր պահանջներին համապատասխան առաջարկներ"
      },
      {
        icon: 'scale',
        title: "ՏԱՐԲԵՐԱԿՆԵՐԻ ՀԱՄԱԴՐՈՒՄ",
        desc: "Մենք գտնում ենք տարբերակներ և համադրում Ձեզ համար"
      },
      {
        icon: 'headset',
        title: "ԱՋԱԿՑՈՒԹՅՈՒՆ",
        desc: "Ճամփորդության ընթացքում մենք միշտ կապի մեջ ենք Ձեզ հետ:"
      }
    ],
    learnMoreBtn: "Իմանալ ավելին",
    modalTitle: "Ինչո՞ւ ընտրել MyNextTrip-ը",
    modalContent: [
      "Ձեր վստահությունը՝ մեր առաջնահերթությունն է։",
      "Մենք կօգնենք Ձեզ գտնել Ձեր նախասիրություններին, նախընտրած ուղղությանը և բյուջեին համապատասխան ճամփորդական առաջարկներ։ Մենք կաջակցենք Ձեզ ընտրության հարցում՝ դարձնելով ճամփորդության պլանավորումն ավելի հեշտ ու հարմար։",
      "Մենք հավատում ենք, որ լավ ճամփորդությունը սկսվում է վստահելի ընտրությունից։ My Next Trip-ի միջոցով կարող եք մեկ վայրում ծանոթանալ ճամփորդական առաջարկներին, ստանալ անհատական խորհրդատվություն և ընտրել Ձեր նախասիրություններին համապատասխան տարբերակը։",
      "Մենք կարևորում ենք թափանցիկ տեղեկատվությունը, անհատական մոտեցումն ու հստակ հաղորդակցությունը, որպեսզի ճամփորդության յուրաքանչյուր որոշում կայացնեք վստահությամբ։",
      "Ձեր հաջորդ ճամփորդությունը սկսեք մեզ հետ։"
    ],
    closeBtn: "Փակել"
  },
  ru: {
    tag: "Почему MyNextTrip",
    title: "Почему выбирают MyNextTrip",
    items: [
      {
        icon: 'user-check',
        title: "ИНДИВИДУАЛЬНЫЙ ПОДХОД",
        desc: "Предложения с учётом ваших пожеланий"
      },
      {
        icon: 'scale',
        title: "СРАВНЕНИЕ ВАРИАНТОВ",
        desc: "Мы находим и сравниваем подходящие варианты для вас"
      },
      {
        icon: 'headset',
        title: "ПОДДЕРЖКА",
        desc: "Мы всегда на связи с вами во время путешествия."
      }
    ],
    learnMoreBtn: "Узнать больше",
    modalTitle: "Почему выбирают MyNextTrip",
    modalContent: [
      "Ваше доверие — наш главный приоритет.",
      "Мы поможем вам найти туристические предложения, соответствующие вашим предпочтениям, выбранному направлению и бюджету. Мы поможем вам с выбором, сделав планирование путешествия проще и удобнее.",
      "Мы верим, что хорошее путешествие начинается с правильного выбора. С My Next Trip вы можете ознакомиться с туристическими предложениями в одном месте, получить индивидуальную консультацию и выбрать вариант, который соответствует вашим предпочтениям.",
      "Мы ценим прозрачность информации, индивидуальный подход и чёткую коммуникацию, чтобы вы могли уверенно принимать каждое решение, связанное с путешествием.",
      "Начните своё следующее путешествие с нами."
    ],
    closeBtn: "Закрыть"
  },
  en: {
    tag: "Why MyNextTrip",
    title: "Why Travel With MyNextTrip",
    items: [
      {
        icon: 'user-check',
        title: "PERSONALIZED APPROACH",
        desc: "Offers tailored to your needs"
      },
      {
        icon: 'scale',
        title: "COMPARING OPTIONS",
        desc: "We find and compare suitable options for you"
      },
      {
        icon: 'headset',
        title: "SUPPORT",
        desc: "We stay in touch with you throughout your trip."
      }
    ],
    learnMoreBtn: "Learn More",
    modalTitle: "Why Choose MyNextTrip",
    modalContent: [
      "Your trust is our top priority.",
      "We’ll help you find travel offers that match your preferences, chosen destination, and budget. We’ll guide you through the selection process, making travel planning easier and more convenient.",
      "We believe that a great trip begins with the right choice. With My Next Trip, you can explore travel offers in one place, receive personalized advice, and choose the option that best suits your preferences.",
      "We value transparent information, a personalized approach, and clear communication, so you can make every travel decision with confidence.",
      "Start your next journey with us."
    ],
    closeBtn: "Close"
  }
};

function renderWhyMyNextTrip() {
  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const data = (window.__whyMyNextTripTexts && window.__whyMyNextTripTexts[lang]) ? window.__whyMyNextTripTexts[lang] : window.__whyMyNextTripTexts.en;

  // 1. Update the tag and section title in Why Us
  const whyTag = document.querySelector('[data-framer-name="Why Us"] [data-framer-name="Tag"] p, [data-framer-name="Why Us"] .framer-jag73r p');
  if (whyTag) whyTag.textContent = data.tag;

  const whyTitle = document.querySelector('[data-framer-name="Why Us"] [data-framer-name="Title"] h2, [data-framer-name="Why Us"] .framer-1r2p0fe h2');
  if (whyTitle) whyTitle.textContent = data.title;

  // 2. Locate all Left Content / Menu Wrapper containers (desktop, tablet, mobile variants)
  const leftContentBlocks = document.querySelectorAll('[data-framer-name="Left Content"], .framer-blq609');

  const iconsSvg = {
    'user-check': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>',
    'scale': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    'headset': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>'
  };

  leftContentBlocks.forEach(block => {
    // Check if we already injected our customized wrapper
    let customWrap = block.querySelector('.mnt-why-custom-wrapper');
    if (!customWrap) {
      // Hide any original children like Menu Wrapper
      Array.from(block.children).forEach(c => {
        c.style.display = 'none';
      });

      customWrap = document.createElement('div');
      customWrap.className = 'mnt-why-custom-wrapper';
      block.appendChild(customWrap);
    }

    customWrap.innerHTML = `
      <div class="mnt-why-list">
        ${data.items.map((item, idx) => `
          <div class="mnt-why-list-item">
            <div class="mnt-why-item-icon">
              ${iconsSvg[item.icon] || iconsSvg['user-check']}
            </div>
            <div class="mnt-why-item-text">
              <h3 class="mnt-why-item-title">${item.title}</h3>
              <p class="mnt-why-item-desc">${item.desc}</p>
            </div>
          </div>
          ${idx < data.items.length - 1 ? '<div class="mnt-why-item-divider"></div>' : ''}
        `).join('')}
      </div>

      <div class="mnt-why-btn-container">
        <button class="mnt-why-learn-btn" onclick="openWhyLearnMoreModal()">
          <span>${data.learnMoreBtn}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `;
  });
}

function openWhyLearnMoreModal() {
  let modal = document.getElementById('mnt-why-modal');
  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const data = window.__whyMyNextTripTexts[lang] || window.__whyMyNextTripTexts.en;

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mnt-why-modal';
    modal.className = 'mnt-why-modal-backdrop';
    modal.onclick = (e) => {
      if (e.target === modal) closeWhyLearnMoreModal();
    };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="mnt-why-modal-card">
      <div class="mnt-why-modal-header">
        <div class="mnt-why-modal-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>MyNextTrip</span>
        </div>
        <button class="mnt-why-modal-close" onclick="closeWhyLearnMoreModal()">✕</button>
      </div>
      <h3 class="mnt-why-modal-title">${data.modalTitle}</h3>
      <div class="mnt-why-modal-body">
        ${data.modalContent.map(p => `<p>${p}</p>`).join('')}
      </div>
      <div class="mnt-why-modal-footer">
        <button class="mnt-why-modal-btn" onclick="closeWhyLearnMoreModal()">${data.closeBtn}</button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeWhyLearnMoreModal() {
  const modal = document.getElementById('mnt-why-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Back to Top Button
function initBackToTop() {
  if (document.getElementById('mnt-back-to-top')) return;
  const btn = document.createElement('button');
  btn.id = 'mnt-back-to-top';
  btn.className = 'mnt-back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}


// =========================================================================
// Explicit Translation for Complex Framer Section Headings & Steps
// =========================================================================
function translateAllFramerHeadings(lang) {
  const activeLangKey = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');

  const sectionHeadings = [
    // 1. Choose your perfect travel style (Upload 1)
    {
      selector: '[data-framer-name="Choose your style"] h2, .framer-1a9y67u h2, h2.framer-1nnsewm',
      matchText: 'travel style',
      hy: 'Ընտրեք ձեր կատարյալ հանգստի ոճը',
      ru: 'Выберите ваш идеальный стиль отдыха',
      en: 'Choose your perfect travel style'
    },
    // 2. Most Loved Destinations / Explore the world's most popular destinations (Upload 2)
    {
      selector: '[data-framer-name="Destinations"] h2, [data-framer-name="Popular Destinations"] h2, .framer-6wz0p1 h2, .framer-8rx6eb h2',
      matchText: 'popular destinations',
      hy: 'Բացահայտեք աշխարհի ամենահայտնի ուղղությունները',
      ru: 'Откройте самые популярные направления мира',
      en: 'Explore The World’s Most Popular Destinations'
    },
    {
      selector: '[data-framer-name="Destinations"] [data-framer-name="Tag"] p, [data-framer-name="Popular Destinations"] [data-framer-name="Tag"] p, .framer-6wz0p1 p, .framer-jag73r p',
      matchText: 'most loved',
      hy: 'Ամենասիրված ուղղությունները',
      ru: 'Самые любимые направления',
      en: 'Most Loved Destinations'
    },
    // 3. Handcrafted Tour Packages & Journeys Designed For Every Travel Style
    {
      selector: '[data-framer-name="Tours"] h2, #mnt-tours-section h2',
      matchText: 'travel style',
      hy: 'Տուրեր յուրաքանչյուր ճանապարհորդական ոճի համար',
      ru: 'Туры для любого стиля путешествий',
      en: 'Journeys designed for every travel style'
    },
    {
      selector: '[data-framer-name="Tours"] [data-framer-name="Tag"] p, #mnt-tours-section p',
      matchText: 'tour packages',
      hy: 'Հատուկ մշակված տուր փաթեթներ',
      ru: 'Авторские туристические пакеты',
      en: 'Handcrafted Tour Packages'
    },
    // 4. Everything You Need For Your Next Journey & What's included (Upload 4)
    {
      selector: '[data-framer-name="Features"] h2, [data-framer-name="What’s Included"] h2, .framer-5718fu h2',
      matchText: 'next journey',
      hy: 'Այն ամենը, ինչ անհրաժեշտ է ձեր հանգստի համար',
      ru: 'Все необходимое для вашего отдыха',
      en: 'Everything you need for your next journey'
    },
    {
      selector: '[data-framer-name="Features"] [data-framer-name="Tag"] p, .framer-5718fu p',
      matchText: 'included',
      hy: 'Ինչ է ներառված',
      ru: 'Что включено',
      en: "What's included"
    },
    // 5. How It Works / Simple steps to your next journey (Upload 3)
    {
      selector: '[data-framer-name="How it Works"] h2, [data-framer-name="How It Works"] h2, .framer-1a48c90 h2',
      matchText: 'next journey',
      hy: 'Պարզ քայլեր դեպի ձեր հաջորդ ճամփորդությունը',
      ru: 'Простые шаги к вашему следующему путешествию',
      en: 'Simple steps to your next journey'
    },
    {
      selector: '[data-framer-name="How it Works"] [data-framer-name="Tag"] p, .framer-1a48c90 p',
      matchText: 'how it works',
      hy: 'Ինչպես ենք աշխատում',
      ru: 'Как мы работаем',
      en: 'How it Works'
    },
    // 6. Inspiration And Tips For Your Next Travel Journey & Blogs (Upload 5)
    {
      selector: '[data-framer-name="Blogs"] h2, .framer-53llfx h2',
      matchText: 'next travel journey',
      hy: 'Ոգեշնչում և խորհուրդներ ձեր հաջորդ ճամփորդության համար',
      ru: 'Вдохновение и советы для вашего следующего путешествия',
      en: 'Inspiration and tips for your next travel journey'
    },
    {
      selector: '[data-framer-name="Blogs"] [data-framer-name="Tag"] p, .framer-53llfx p',
      matchText: 'blogs',
      hy: 'Բլոգ',
      ru: 'Блог',
      en: 'Blogs'
    },
    // 7. Experience the World in Different Ways & Explore by Experience
    {
      selector: '[data-framer-name="Experience"] h2, .framer-1clvqlu h2',
      matchText: 'different ways',
      hy: 'Բացահայտեք աշխարհը տարբեր ձևերով',
      ru: 'Познавайте мир по-разному',
      en: 'Experience the world in different ways'
    },
    {
      selector: '[data-framer-name="Experience"] [data-framer-name="Tag"] p, .framer-1clvqlu p',
      matchText: 'explore by experience',
      hy: 'Բացահայտեք ըստ տպավորությունների',
      ru: 'Исследуйте по впечатлениям',
      en: 'Explore by Experience'
    }
  ];

  sectionHeadings.forEach(item => {
    document.querySelectorAll(item.selector).forEach(el => {
      const txt = el.textContent.toLowerCase();
      if (txt.includes(item.matchText.toLowerCase()) || txt.includes(item.hy.toLowerCase().slice(0, 10)) || txt.includes(item.ru.toLowerCase().slice(0, 10))) {
        el.textContent = item[activeLangKey] || item.en;
      }
    });
  });

  // Step names in How It Works (Upload 3: 01, 02, 03) - Ensure clean title without double '01 -'
  const stepTitles = {
    hy: ['Ընտրեք ուղղությունը', 'Մենք կհոգանք մնացածը', 'Վայելեք հանգիստը'],
    ru: ['Выберите направление', 'Мы всё организуем', 'Наслаждайтесь поездкой'],
    en: ['Choose your journey', 'We handle the details', 'Experience the journey']
  };

  document.querySelectorAll('[data-framer-name="Name"] h4, .framer-1ubverm h4').forEach((el, idx) => {
    const list = stepTitles[activeLangKey] || stepTitles.en;
    if (list[idx]) {
      el.textContent = list[idx];
    }
  });

  // Stat numbers subtext (Upload 2)
  const statLabels = {
    hy: ['Բացահայտված ուղղություններ', 'Տարիների ճամփորդական փորձ', 'Գոհ ճամփորդներ'],
    ru: ['Исследованных направлений', 'Лет экспертного опыта', 'Довольных путешественников'],
    en: ['Destinations explored', 'Years of travel expertise', 'Traveler satisfaction']
  };
  document.querySelectorAll('.framer-136b6k8 p, .framer-177h89c p, .framer-135qovl p').forEach((el, idx) => {
    const list = statLabels[activeLangKey] || statLabels.en;
    if (list[idx % 3]) {
      el.textContent = list[idx % 3];
    }
  });
}


function applyLanguageToWholePage(lang) {

  // Explicit translation for Hero Main Title
  const heroH1 = document.querySelector('[data-framer-name="Main Title"] h1, h1.framer-text');
  if (heroH1) {
    const currentL = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
    const titles = {
      hy: "Բացահայտեք աշխարհը, ոչ միայն քարտեզը",
      ru: "Познавайте мир, а не просто карту",
      en: "Experience the World, Not Just the Map"
    };
    heroH1.innerHTML = titles[currentL] || titles.hy;
  }

  updateNavLabels(lang);

  currentAppLang = lang;
  window.__currentLang = lang;
  renderTourTypesSection();
  renderVisaSection();
  initVisaModal();
  renderContactSection();
  renderHeroSearchBar(lang);
  updateWhatsAppFloatLabel(lang);

  currentAppLang = lang;
  window.__currentLang = lang;
  
  // 1. Walk document text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  const nodesToUpdate = [];

  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest('#mnt-modal-wrap') || parent.closest('#mnt-top-bar') || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
      continue;
    }
    const txt = node.nodeValue.trim();
    if (!txt) continue;

    // Check phrase match
    for (const phrase of phraseMappings) {
      if (txt === phrase.en || txt === phrase.ru || txt === phrase.hy) {
        nodesToUpdate.push({ node, newVal: phrase[lang] });
        break;
      }
    }
  }

  nodesToUpdate.forEach(({ node, newVal }) => {
    node.nodeValue = newVal;
  });

  // 2. Overwrite Review Quotes & Authors explicitly
  const reviewContainers = document.querySelectorAll('.framer-tgbul2, .framer-1gby3na, .framer-1g8nw4w');
  reviewContainers.forEach(container => {
    const quotes = {
      en: "“MyNextTrip completely redefined our travel experience. Every hotel, transfer, and authentic local discovery was flawless and beyond expectations!”",
      ru: "«MyNextTrip полностью изменил наши представления об отдыхе! Отели, трансферы и гиды были подобраны безупречно, а забота чувствовалась на каждом шагу.»",
      hy: "«MyNextTrip-ը լիովին վերաիմաստավորեց մեր ճանապարհորդությունը: Յուրաքանչյուր հյուրանոց, տրանսֆեր և էքսկուրսիա անթերի էր և սպասվածից բարձր!»"
    };
    container.innerHTML = `<h5 class="framer-text framer-styles-preset-s9j4b3" style="--framer-text-color: #ffffff; font-size: 19px; line-height: 1.45;">${quotes[lang]}</h5>`;
  });

  const authorContainers = document.querySelectorAll('.framer-1f3nkkr, .framer-2rhsl3, .framer-rq2xqx');
  authorContainers.forEach(container => {
    const authors = {
      en: "— Alexandre & Elena S., Private Tour",
      ru: "— Александр и Елена С., Индивидуальный тур",
      hy: "— Ալեքսանդր և Ելենա Ս., Անհատական տուր"
    };
    container.innerHTML = `<p class="framer-text framer-styles-preset-mxaz03" style="--framer-text-color: #cbd5e1; font-weight: 600;">${authors[lang]}</p>`;
  });

  // 3. Replace any remaining "Traavellio" texts
  document.querySelectorAll('*').forEach(el => {
    if (el.children.length === 0 && el.textContent.includes('Traavellio')) {
      el.textContent = el.textContent.replace(/Traavellio/gi, 'MyNextTrip');
    }
    if (el.children.length === 0 && el.textContent.includes('Travellio')) {
      el.textContent = el.textContent.replace(/Travellio/gi, 'MyNextTrip');
    }
  });

  // 4. Re-render modal content
  renderModalContent();
  translateAllFramerHeadings(lang);
  updateFooterContactColumn(lang);
  attachLegalLinks(lang);
  }

// Ensure Logo and Custom Destinations are always rendered

// Dynamically replace / enhance footer columns with Email and Contacts
function updateFooterContactColumn(lang) {
  const currentL = lang || (typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  const titles = {
    hy: { title: 'Կապ', emailText: 'info@mynexttrip.am', phoneText: '+374 77 225678' },
    ru: { title: 'Контакты', emailText: 'info@mynexttrip.am', phoneText: '+374 77 225678' },
    en: { title: 'Contact', emailText: 'info@mynexttrip.am', phoneText: '+374 77 225678' }
  };
  const t = titles[currentL] || titles.hy;

  // Replace 'Other Pages' column title with 'Contact' / 'Կապ' / 'Контакты'
  document.querySelectorAll('.framer-1i0ddgz .framer-8r4q31 p, [data-framer-name="Documentation "] .framer-8r4q31 p').forEach(p => {
    if (p.textContent.includes('Other Pages') || p.textContent.includes('Pages') || p.textContent.includes('Կապ') || p.textContent.includes('Contact')) {
      p.textContent = t.title;
      p.style.color = '#94a3b8';
      p.style.fontSize = '14px';
      p.style.fontWeight = '700';
      p.style.letterSpacing = '0.05em';
      p.style.textTransform = 'uppercase';
    }
  });

  // Inject/Update both Phone and Email in the footer links container
  document.querySelectorAll('.framer-1iup7vv').forEach(nav => {
    // Check if phone link already exists
    let phoneLink = nav.querySelector('a[href^="tel:"]');
    if (!phoneLink) {
      phoneLink = document.createElement('a');
      phoneLink.href = 'tel:+37477225678';
      phoneLink.className = 'mnt-footer-phone-link';
      phoneLink.style.cssText = 'display: flex; align-items: center; gap: 8px; color: #38bdf8; font-size: 15.5px; font-weight: 600; text-decoration: none; margin-bottom: 8px; transition: all 0.2s;';
      phoneLink.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${t.phoneText}</span>`;
      nav.insertBefore(phoneLink, nav.firstChild);
    } else {
      const span = phoneLink.querySelector('span') || phoneLink;
      span.textContent = t.phoneText;
    }

    // Ensure Email link is styled and properly labeled
    const emailLink = nav.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.href = 'mailto:info@mynexttrip.am';
      emailLink.style.cssText = 'display: flex; align-items: center; gap: 8px; color: #38bdf8; font-size: 15.5px; font-weight: 600; text-decoration: none; transition: all 0.2s;';
      const p = emailLink.querySelector('p');
      if (p) {
        p.textContent = t.emailText;
        p.style.cssText = 'color: #38bdf8; font-size: 15.5px; font-weight: 600; margin: 0; white-space: nowrap;';
      }
    }
  });

  // Replace any mailto link text
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.href = 'mailto:info@mynexttrip.am';
    a.style.color = '#38bdf8';
    a.style.fontSize = '15.5px';
    a.style.fontWeight = '600';
    a.style.textDecoration = 'none';
    if (a.textContent.includes('@')) {
      a.textContent = 'info@mynexttrip.am';
    }
    const p = a.querySelector('p');
    if (p) {
      p.style.color = '#38bdf8';
      p.style.fontSize = '15.5px';
      p.style.fontWeight = '600';
    }
  });
}

function enforceCustomAssets() {
  updateFooterContactColumn();
    attachLegalLinks();

  // Explicit translation for Hero Main Title
  const heroH1 = document.querySelector('[data-framer-name="Main Title"] h1, h1.framer-text');
  if (heroH1) {
    const currentL = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
    const titles = {
      hy: "Բացահայտեք աշխարհը, ոչ միայն քարտեզը",
      ru: "Познавайте мир, а не просто карту",
      en: "Experience the World, Not Just the Map"
    };
    heroH1.innerHTML = titles[currentL] || titles.hy;
  }

  renderHeroSearchBar(typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
    // Enforce Popular Destinations Section Heading & Tag
  const destH2 = document.querySelector('[data-framer-name="Destinations"] h2, .framer-8rx6eb h2');
  if (destH2) {
    const curL = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
    const dTitles = {
      hy: "Բացահայտեք աշխարհի ամենահայտնի ուղղությունները",
      ru: "Откройте самые популярные направления мира",
      en: "Explore The World’s Most Popular Destinations"
    };
    destH2.textContent = dTitles[curL] || dTitles.hy;
  }
  const destTag = document.querySelector('[data-framer-name="Destinations"] .framer-jag73r p, .framer-jag73r p');
  if (destTag) {
    const curL = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
    const dTags = {
      hy: "Ամենասիրված ուղղությունները",
      ru: "Самые любимые направления",
      en: "Most Loved Destinations"
    };
    destTag.textContent = dTags[curL] || dTags.hy;
  }

  renderWhyMyNextTrip();
  translateAllFramerHeadings();

  // Menu link handling for Group Tours and Visa Assistance
  document.querySelectorAll('a, p, span, h2, h3, h4').forEach(el => {
    if (el.children.length === 0) {
      const raw = el.textContent.trim().toLowerCase();
      if (raw === 'tours' || raw === 'group tours' || raw === 'տուրեր' || raw === 'խմբային տուրեր' || raw === 'туры' || raw === 'групповые туры') {
        const a = el.closest('a');
        if (a && !a.__hasGroupListener) {
          a.__hasGroupListener = true;
          a.href = '#mnt-tour-types-section';
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const menuTrigger = document.querySelector('[data-framer-name="Menu"], .framer-qeznpr');
            if (menuTrigger) menuTrigger.click();
            setTimeout(scrollToGroupTours, 150);
          });
        }
      } else if (raw === 'blogs' || raw === 'visa assistance' || raw === 'visa' || raw === 'բլոգ' || raw === 'վիզայի աջակցություն' || raw === 'блог' || raw === 'визовая поддержка') {
        const a = el.closest('a');
        if (a && !a.__hasVisaListener) {
          a.__hasVisaListener = true;
          a.href = '#mnt-visa-section';
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const menuTrigger = document.querySelector('[data-framer-name="Menu"], .framer-qeznpr');
            if (menuTrigger) menuTrigger.click();
            setTimeout(() => {
              const v = document.getElementById('mnt-visa-section');
              if (v) v.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          });
        }
      }
    }
  });


  // Always enforce proper destination texts (China, Rome, London, Spain) in tickers and cards
  const destTranslations = {
    china: { en: "China", ru: "Китай", hy: "Չինաստան", sub: { en: "Ancient dynasties, Great Wall & futuristic metropolises", ru: "Древние династии, Великая стена и футуризм", hy: "Հնագույն դինաստիաներ, Մեծ պարիսպ և ապագա" } },
    rome: { en: "Rome", ru: "Рим", hy: "Հռոմ", sub: { en: "Eternal city, Colosseum & rich culinary art", ru: "Вечный город, Колизей и гастрономия", hy: "Հավերժական քաղաք, Կոլիզեյ և մշակույթ" } },
    london: { en: "London", ru: "Лондон", hy: "Լոնդոն", sub: { en: "Historic royalty, iconic landmarks & culture", ru: "Королевское величие, Биг Бен и культура", hy: "Թագավորական պատմություն, Բիգ Բեն և մշակույթ" } },
    spain: { en: "Spain", ru: "Испания", hy: "Իսպանիա", sub: { en: "Sunny coasts, flamenco passion & architectural wonders", ru: "Солнечные побережья, фламенко и шедевры", hy: "Արևոտ ափեր, ֆլամենկո և ճարտարապետություն" } }
  };
  const activeL = (typeof currentAppLang !== "undefined") ? currentAppLang : "en";

  // Fix all cards and tickers text
  document.querySelectorAll(".framer-1mgzw7s h3, .framer-lfx149 h4").forEach(el => {
    const raw = el.textContent.trim().toLowerCase();
    if (raw === "japan" || raw === "china" || raw === "китай" || raw === "չինաստան") {
      el.textContent = destTranslations.china[activeL];
    } else if (raw === "switzerland" || raw === "swizerland" || raw === "rome" || raw === "рим" || raw === "հռոմ") {
      el.textContent = destTranslations.rome[activeL];
    } else if (raw === "paris" || raw === "london" || raw === "лондон" || raw === "լոնդոն") {
      el.textContent = destTranslations.london[activeL];
    } else if (raw === "new york" || raw === "spain" || raw === "испания" || raw === "իսպանիա") {
      el.textContent = destTranslations.spain[activeL];
    }
  });

  // Fix card subtexts
  document.querySelectorAll(".framer-uh94ha p").forEach(el => {
    const raw = el.textContent.trim().toLowerCase();
    if (raw.includes("nightlife") || raw.includes("great wall") || raw.includes("династии") || raw.includes("դինաստիաներ")) {
      el.textContent = destTranslations.china.sub[activeL];
    } else if (raw.includes("colosseum") || raw.includes("колизей") || raw.includes("կոլիզեյ")) {
      el.textContent = destTranslations.rome.sub[activeL];
    } else if (raw.includes("royalty") || raw.includes("биг бен") || raw.includes("բիգ բեն")) {
      el.textContent = destTranslations.london.sub[activeL];
    } else if (raw.includes("flamenco") || raw.includes("фламенко") || raw.includes("ֆլամենկո") || raw.includes("skyline")) {
      el.textContent = destTranslations.spain.sub[activeL];
    }
  });

  // Fix tour package cards
  const tourTranslations = [
    {
      title: {
        hy: "MSC WORLD ASIA. 4 ԵՐԿԻՐ, 8 ՔԱՂԱՔ, ԵՎ ԵՎՐՈՊԱԿԱՆ ԱՆՄՈՌԱՆԱԼԻ ԱՐԿԱԾՆԵՐ։",
        ru: "MSC WORLD ASIA: 4 страны, 8 городов и незабываемый европейский круиз",
        en: "MSC WORLD ASIA: 4 Countries, 8 Cities & Unforgettable European Cruise"
      },
      days: {
        hy: "10 Օր / 9 Գիշեր",
        ru: "10 Дней / 9 Ночей",
        en: "10 Days / 9 Nights"
      },
      dates: "11.04.2027 - 20.04.2027",
      route: {
        hy: "Իտալիա • Իսպանիա • Ֆրանսիա • Մալթա",
        ru: "Италия • Испания • Франция • Мальта",
        en: "Italy • Spain • France • Malta"
      },
      intro: {
        hy: "Պատկերացրե՛ք՝ մեկ անմոռանալի ուղևորության ընթացքում բացահայտում եք Իտալիայի, Իսպանիայի, Ֆրանսիայի և Մալթայի ամենագեղեցիկ քաղաքներն ու տեսարժան վայրերը: 🚢 MSC WORLD ASIA շքեղ զբոսանավով սպասվում է եվրոպական անմոռանալի կրուիզ՝ Միջերկրական ծովի գեղատեսիլ ափերով:",
        ru: "Представьте: за одно незабываемое путешествие вы откроете для себя самые красивые города и достопримечательности Италии, Испании, Франции и Мальты! 🚢 На борту роскошного лайнера MSC WORLD ASIA вас ждет незабываемый европейский круиз по живописным берегам Средиземного моря.",
        en: "Imagine: in one unforgettable journey you discover the most beautiful cities and landmarks of Italy, Spain, France, and Malta! 🚢 Aboard the luxury cruise liner MSC WORLD ASIA, an unforgettable European cruise along the picturesque Mediterranean shores awaits you."
      },
      stops: {
        hy: [
          { name: "📍 Հռոմ", desc: "հավերժական քաղաքի հմայքը" },
          { name: "📍 Վատիկան", desc: "արվեստի և պատմության բացառիկ աշխարհ" },
          { name: "📍 Սիցիլիա", desc: "իտալական իսկական մթնոլորտ" },
          { name: "📍 Վալետա", desc: "Մալթայի պատմական գեղեցկությունը" },
          { name: "📍 Բարսելոնա", desc: "ճարտարապետություն և իսպանական էներգիա" },
          { name: "📍 Մարսել", desc: "ֆրանսիական ռոմանտիկա" },
          { name: "📍 Ջենովա", desc: "իտալական ծովային հմայք" },
          { name: "📍 Նեապոլ", desc: "պիցցայի հայրենիքն ու հարավային Իտալիայի ոգին" }
        ],
        ru: [
          { name: "📍 Рим", desc: "очарование вечного города" },
          { name: "📍 Ватикан", desc: "исключительный мир искусства и истории" },
          { name: "📍 Сицилия", desc: "настоящая итальянская атмосфера" },
          { name: "📍 Валлетта", desc: "историческая красота Мальты" },
          { name: "📍 Барселона", desc: "архитектура и испанская энергия" },
          { name: "📍 Марсель", desc: "французская романтика" },
          { name: "📍 Генуя", desc: "итальянский морской шарм" },
          { name: "📍 Неаполь", desc: "родина пиццы и дух южной Италии" }
        ],
        en: [
          { name: "📍 Rome", desc: "charm of the eternal city" },
          { name: "📍 Vatican", desc: "exclusive world of art and history" },
          { name: "📍 Sicily", desc: "authentic Italian atmosphere" },
          { name: "📍 Valletta", desc: "historical beauty of Malta" },
          { name: "📍 Barcelona", desc: "architecture and Spanish vibrancy" },
          { name: "📍 Marseille", desc: "French romance" },
          { name: "📍 Genoa", desc: "Italian maritime charm" },
          { name: "📍 Naples", desc: "home of pizza and Southern Italian spirit" }
        ]
      },
      price: "€ 1,850",
      img: "/images/tours/cruise_med.jpg"
    },
    {
      title: {
        hy: "ԳԱՐՈՒՆԸ ՉԻՆԱՍՏԱՆՈՒՄ․ Վեց կանգառ, մեկ ճանապարհորդություն",
        ru: "Весна в Китае: 6 остановок, одно грандиозное путешествие",
        en: "Spring in China: 6 Stops, One Grand Journey"
      },
      days: {
        hy: "14 Օր / 13 Գիշեր",
        ru: "14 Дней / 13 Ночей",
        en: "14 Days / 13 Nights"
      },
      dates: "25.03.2027 - 07.04.2027",
      route: {
        hy: "Երևան - Դոհա - Պեկին - Շանհայ - Ֆուռոնգ - Ջիանջիաձիե - Չունցին - Չենդու - Դոհա - Երևան",
        ru: "Ереван - Доха - Пекин - Шанхай - Фужун - Чжанцзяцзе - Чунцин - Чэнду - Доха - Ереван",
        en: "Yerevan - Doha - Beijing - Shanghai - Furong - Zhangjiajie - Chongqing - Chengdu - Doha - Yerevan"
      },
      intro: {
        hy: "Պատկերացրե՛ք՝ մի օր Ձեր առջև Չինական մեծ պատն է, մի քանի օր անց՝ ամպերի միջից բարձրացող ժայռերը, իսկ երեկոյան զբոսնում եք հնագույն քաղաքի նրբանցքներով՝ ջրվեժի ձայնի ներքո: Բացահայտեք Չինաստանի վեց տարբեր դեմքերը՝ կայսերական Պեկինից մինչև լեռնային Չունցին ու պանդաների Չենդու:",
        ru: "Представьте: один день перед вами Великая Китайская стена, через пару дней — парящие среди облаков горы «Аватара», а вечером вы гуляете по улочкам древнего города под шум водопада. Откройте 6 разных граней Китая: от императорского Пекина до горного Чунцина и милых панд в Чэнду:",
        en: "Imagine: one day you stand before the Great Wall of China, a few days later amid floating mountain peaks rising through the clouds, and in the evening stroll ancient town alleys to the sound of waterfalls. Discover the 6 faces of China: from imperial Beijing to mountainous Chongqing and giant pandas in Chengdu:"
      },
      stops: {
        hy: [
          { name: "🏯 Պեկին", desc: "կայսերական պալատներ, հին թաղամասեր և լեռնաշղթաներով ձգվող Չինական մեծ պատը" },
          { name: "🏙️ Շանհայ", desc: "երեկոյան լուսավորված երկնաքերեր, գետափնյա զբոսավայր և քաղաքի հին ու նոր թաղամասերը" },
          { name: "⛰️ Ջանջիաձիե", desc: "ամպերի միջից բարձրացող քարե սյուներ ու խոր կիրճեր («Ավատարի» լողացող լեռները)" },
          { name: "🏮 Ֆուռոնգ", desc: "ժայռի եզրին կառուցված հնագույն քաղաք, որի տների տակով ջրվեժ է թափվում" },
          { name: "🚝 Չունցին", desc: "քաղաք, որտեղ գնացքն անցնում է բնակելի շենքի միջով, իսկ գետափը վառվում է հազարավոր լույսերով" },
          { name: "🐼 Չենդու", desc: "հսկա պանդաների, ավանդական թեյատների ու Սիչուանի կծու խոհանոցի քաղաքը" }
        ],
        ru: [
          { name: "🏯 Пекин", desc: "императорские дворцы, хутуны и Великая Китайская стена" },
          { name: "🏙️ Шанхай", desc: "небоскребы в огнях, набережная Вайтань и контраст эпох" },
          { name: "⛰️ Чжанцзяцзе", desc: "каменные столбы и ущелья, вдохновившие парящие горы «Аватара»" },
          { name: "🏮 Фужун", desc: "древний город на вершине водопада, оживающий в свете вечерних фонарей" },
          { name: "🚝 Чунцин", desc: "киберпанк-мегаполис, где поезд проходит сквозь жилой дом" },
          { name: "🐼 Чэнду", desc: "родина гигантских панд, чайных традиций и сычуаньской кухни" }
        ],
        en: [
          { name: "🏯 Beijing", desc: "imperial palaces, historic hutongs, and the Great Wall winding across mountain ridges" },
          { name: "🏙️ Shanghai", desc: "illuminated futuristic skylines, the Bund promenade, and old meets new" },
          { name: "⛰️ Zhangjiajie", desc: "soaring stone pillars and dramatic gorges that inspired Avatar's floating mountains" },
          { name: "🏮 Furong", desc: "ancient town perched right on cliff edges with cascading waterfalls beneath houses" },
          { name: "🚝 Chongqing", desc: "futuristic 3D city where light rails pass directly through residential high-rises" },
          { name: "🐼 Chengdu", desc: "home of giant pandas, traditional tea houses, and renowned Sichuan cuisine" }
        ]
      },
      price: "€ 2,600",
      img: "/images/tours/china_spring.jpg"
    },
    {
      title: {
        hy: "ԱՆԳԼԻԱ – ՇՈՏԼԱՆԴԻԱ․ Բրիտանական լեգենդները․ ազնվականություն, հեքիաթային բնություն",
        ru: "Англия – Шотландия: Британские легенды, аристократизм и сказочная природа",
        en: "England & Scotland: British Legends, Aristocracy & Fairytale Nature"
      },
      days: {
        hy: "8 Օր / 7 Գիշեր",
        ru: "8 Дней / 7 Ночей",
        en: "8 Days / 7 Nights"
      },
      dates: "26.04.2027 - 03.05.2027",
      route: {
        hy: "Երևան - Լոնդոն - Էդինբուրգ - Լոնդոն - Երևան",
        ru: "Ереван - Лондон - Эдинбург - Лондон - Ереван",
        en: "Yerevan - London - Edinburgh - London - Yerevan"
      },
      intro: {
        hy: "Բացահայտե՛ք Անգլիայի և Շոտլանդիայի ամենագեղեցիկ քաղաքները մեկ ճանապարհորդության ընթացքում: Ձեզ սպասում են թագավորական պալատներ, միջնադարյան ամրոցներ, աշխարհի ամենահայտնի համալսարաններից մեկը, Լոնդոնի խորհրդանշական տեսարժան վայրերը և անմոռանալի նավարկություն Թեմզա գետով:",
        ru: "Откройте для себя самые красивые города Англии и Шотландии за одно путешествие! Вас ждут королевские дворцы, средневековые замки, один из старейших университетов мира, культовые достопримечательности Лондона и незабываемый круиз по Темзе.",
        en: "Discover the most beautiful cities of England and Scotland in one magnificent journey! Royal palaces, medieval castles, prestigious world-renowned universities, iconic London landmarks, and an unforgettable Thames river cruise await you."
      },
      stops: {
        hy: [
          { name: "👑 Լոնդոն", desc: "Բիգ Բեն, Թաուեր կամուրջ, Բուքինգհեմյան պալատ և Թեմզա գետի նավարկություն" },
          { name: "🏰 Էդինբուրգ", desc: "Շոտլանդիայի հպարտ մայրաքաղաքը, Էդինբուրգի հնագույն ամրոցը և Ռոյալ Մայլը" },
          { name: "🎓 Օքսֆորդ / Քեմբրիջ", desc: "հնագույն համալսարանական քաղաքների ազնվական ճարտարապետությունը" },
          { name: "🏞️ Շոտլանդական բնաշխարհ", desc: "մշուշոտ լեռներ, կանաչ հովիտներ և լեգենդներով լի լճեր" }
        ],
        ru: [
          { name: "👑 Лондон", desc: "Биг Бен, Тауэрский мост, Букингемский дворец и круиз по Темзе" },
          { name: "🏰 Эдинбург", desc: "величественная столица Шотландии, старинный замок и Королевская миля" },
          { name: "🎓 Оксфорд / Кембридж", desc: "аристократическая атмосфера старейших университетов мира" },
          { name: "🏞️ Горная Шотландия", desc: "живописные туманные долины, замки и легендарные озера" }
        ],
        en: [
          { name: "👑 London", desc: "Big Ben, Tower Bridge, Buckingham Palace, and scenic Thames river cruise" },
          { name: "🏰 Edinburgh", desc: "Scotland's proud capital, historic Edinburgh Castle, and the Royal Mile" },
          { name: "🎓 Oxford / Cambridge", desc: "aristocratic collegiate Gothic architecture and timeless libraries" },
          { name: "🏞️ Scottish Highlands", desc: "mist-shrouded hills, dramatic lochs, and storybook countryside" }
        ]
      },
      price: "£ 1,950",
      img: "/images/tours/uk_scotland.jpg"
    },
    {
      title: {
        hy: "Ճապոնիա և Չինաստան․ ճանապարհորդություն դեպի ապագա և հնագույն քաղաքակրթություններ",
        ru: "Япония и Китай: Путешествие в будущее и древние цивилизации",
        en: "Japan & China: Journey to the Future & Ancient Civilizations"
      },
      days: {
        hy: "12 Օր / 11 Գիշեր",
        ru: "12 Дней / 11 Ночей",
        en: "12 Days / 11 Nights"
      },
      dates: "27.02.2027 - 09.03.2027",
      route: {
        hy: "Երևան - Տոկիո - Օսակա - Պեկին - Երևան",
        ru: "Ереван - Токио - Осака - Пекин - Ереван",
        en: "Yerevan - Tokyo - Osaka - Beijing - Yerevan"
      },
      intro: {
        hy: "Մեկ ճանապարհորդություն՝ երկու բացառիկ աշխարհ: Պատրաստվում ենք միասին բացահայտել աշխարհի ամենաառաջադեմ երկրներից երկուսը՝ Ճապոնիան և Չինաստանը: Այստեղ ապագայի տեխնոլոգիաները համադրվում են հազարամյա ավանդույթների հետ, իսկ ժամանակակից մեգապոլիսներին հաջորդում են հնագույն տաճարներն ու շունչ կտրող բնապատկերները:",
        ru: "Одно путешествие — два исключительных мира! Мы вместе откроем две самые передовые страны планеты — Японию и Китай. Здесь технологии будущего гармонично сочетаются с тысячелетними традициями, а ультрасовременные мегаполисы сменяются древними храмами и захватывающими дух пейзажами.",
        en: "One journey, two extraordinary worlds! Together we explore two of the most advanced nations on earth — Japan and China. Here, cutting-edge technologies blend seamlessly with millennia-old traditions, while futuristic metropolises lead to ancient temples and breathtaking landscapes."
      },
      stops: {
        hy: [
          { name: "🗼 Տոկիո", desc: "նեոնային փողոցներ, Սիբույա խաչմերուկ, Շինջուկու և Ասակուսայի հնագույն տաճարը" },
          { name: "🏯 Օսակա և Կիոտո", desc: "հազարավոր կարմիր տորիի դարպասներ, ավանդական գեյշաների թաղամաս և ճապոնական գաստրոնոմիա" },
          { name: "🗻 Ֆուջի լեռ", desc: "Ճապոնիայի խորհրդանիշ հանդիսացող ձյունածածկ հրաբխի գեղատեսիլ տեսարանները" },
          { name: "🐉 Պեկին", desc: "Արգելված քաղաք, Երկնքի տաճար և Չինական մեծ պարիսպ" }
        ],
        ru: [
          { name: "🗼 Токио", desc: "неоновые огни, перекресток Сибуя, футуризм Синдзюку и древний храм Асакуса" },
          { name: "🏯 Осака и Киото", desc: "тысячи ворот тории, кварталы гейш и знаменитая японская кухня" },
          { name: "🗻 Гора Фудзи", desc: "величественный символ Японии и живописные горные озера" },
          { name: "🐉 Пекин", desc: "Запретный город, Храм Неба и Великая Китайская стена" }
        ],
        en: [
          { name: "🗼 Tokyo", desc: "neon streets, Shibuya crossing, futuristic Shinjuku, and historic Senso-ji temple" },
          { name: "🏯 Osaka & Kyoto", desc: "thousands of vermilion torii gates, geisha districts, and iconic street food" },
          { name: "🗻 Mount Fuji", desc: "breathtaking panoramic views of Japan's sacred snow-capped volcano" },
          { name: "🐉 Beijing", desc: "the Forbidden City, Temple of Heaven, and the Great Wall" }
        ]
      },
      price: "€ 2,800",
      img: "/images/tours/japan_china.jpg"
    }
  ];
  window.__tourTranslationsData = tourTranslations;
  const tourCards = document.querySelectorAll('.framer-jws0bp-container');
  if (tourCards.length >= 4) {
    tourCards.forEach((card, idx) => {
      const data = tourTranslations[idx % 4];
      if (!data) return;

      const titleEl = card.querySelector('.framer-xcq6qy h5');
      if (titleEl) {
        titleEl.textContent = data.title[activeL] || data.title.hy;
        titleEl.style.fontSize = '18px';
        titleEl.style.lineHeight = '1.35';
      }

      const daysEl = card.querySelector('.framer-vw22ea p');
      if (daysEl) daysEl.textContent = data.days[activeL] || data.days.hy;

      const priceEl = card.querySelector('.framer-ihwm3f h6');
      if (priceEl) priceEl.textContent = data.price;

      // Meta container for dates & route
      let metaWrap = card.querySelector('.mnt-tour-meta-row');
      if (!metaWrap) {
        metaWrap = document.createElement('div');
        metaWrap.className = 'mnt-tour-meta-row';
        const contentParent = card.querySelector('.framer-1cpgu58') || card.querySelector('.framer-1jd9yqr')?.parentElement || card.querySelector('.framer-1p5ff79') || card;
        if (contentParent) contentParent.appendChild(metaWrap);
      }
      if (metaWrap) {
        const ctaText = activeL === 'hy' ? 'Դիտել մանրամասները' : (activeL === 'ru' ? 'Подробнее о туре' : 'View Tour Details');
        metaWrap.innerHTML = `
          <div class="mnt-tour-date-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>${data.dates}</span>
          </div>
          <div class="mnt-tour-route-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="mnt-tour-route-text">${data.route[activeL] || data.route.hy}</span>
          </div>
          <div class="mnt-tour-card-cta" onclick="event.preventDefault(); event.stopPropagation(); openTourDetailModal(${idx % 4});">
            <span>${ctaText}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        `;
      }

      const imgEl = card.querySelector('.framer-1ga9dig img');
      if (imgEl) {
        if (!imgEl.src.includes(data.img)) {
          imgEl.src = data.img;
        }
        imgEl.removeAttribute('srcset');
        imgEl.srcset = '';
      }

      // Clicking whole card opens the large expanded modal
      const link = card.querySelector('a');
      if (link && !link.__mntClickHooked) {
        link.__mntClickHooked = true;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openTourDetailModal(idx % 4);
        });
      }
    });
  }
// Enforce sticky destination backgrounds
  const destBg1 = document.querySelector('[data-framer-name="Image 1"] img');
  if (destBg1 && !destBg1.src.includes('/images/destinations/china1.jpg')) {
    destBg1.src = '/images/destinations/china1.jpg';
    destBg1.srcset = '';
  }
  const destBg2 = document.querySelector('[data-framer-name="Image 2"] img');
  if (destBg2 && !destBg2.src.includes('/images/destinations/rome1.jpeg')) {
    destBg2.src = '/images/destinations/rome1.jpeg';
    destBg2.srcset = '';
  }
  const destBg3 = document.querySelector('[data-framer-name="Image 3"] img');
  if (destBg3 && !destBg3.src.includes('/images/destinations/london1.jpg')) {
    destBg3.src = '/images/destinations/london1.jpg';
    destBg3.srcset = '';
  }
  const destBg4 = document.querySelector('[data-framer-name="Image 4"] img');
  if (destBg4 && !destBg4.src.includes('/images/destinations/spanien1.jpg')) {
    destBg4.src = '/images/destinations/spanien1.jpg';
    destBg4.srcset = '';
  }

  // Enforce active destination card images based on heading
  const destCardHeading = document.querySelector('.framer-lfx149 h4');
  if (destCardHeading) {
    const headingText = destCardHeading.textContent.trim().toLowerCase();
    let mainImgSrc = '';
    let floatImgs = [];
    if (headingText === 'china' || headingText === 'китай' || headingText === 'չինաստան') {
      mainImgSrc = '/images/destinations/china1.jpg';
      floatImgs = ['/images/destinations/china2.jpg', '/images/destinations/china3.jpg', '/images/destinations/china4.jpg'];
    } else if (headingText === 'rome' || headingText === 'рим' || headingText === 'հռոմ') {
      mainImgSrc = '/images/destinations/rome1.jpeg';
      floatImgs = ['/images/destinations/rome2.jpg', '/images/destinations/rome3.jpg', '/images/destinations/rome4.jpg'];
    } else if (headingText === 'london' || headingText === 'лондон' || headingText === 'լոնդոն') {
      mainImgSrc = '/images/destinations/london1.jpg';
      floatImgs = ['/images/destinations/london2.jpg', '/images/destinations/london3.jpg', '/images/destinations/london4.jpg'];
    } else if (headingText === 'spain' || headingText === 'испания' || headingText === 'իսպանիա') {
      mainImgSrc = '/images/destinations/spanien1.jpg';
      floatImgs = ['/images/destinations/spanien2.jpg', '/images/destinations/spanien3.jpg', '/images/destinations/spanien4.jpg'];
    }

    if (mainImgSrc) {
      const cardCoverImg = document.querySelector('.framer-vn9vcb img');
      if (cardCoverImg && !cardCoverImg.src.includes(mainImgSrc)) {
        cardCoverImg.src = mainImgSrc;
        cardCoverImg.srcset = '';
      }
      const galleryImgs = document.querySelectorAll('.framer-1p99867 figure img');
      galleryImgs.forEach((gImg, gIdx) => {
        if (floatImgs[gIdx] && !gImg.src.includes(floatImgs[gIdx])) {
          gImg.src = floatImgs[gIdx];
          gImg.srcset = '';
        }
      });
    }
  }

  // Enforce travel styles ("Choose your perfect travel style")
  const styleImgs = [
    '/images/experience/style1.jpg',
    '/images/experience/style2.jpg',
    '/images/experience/style3.jpg',
    '/images/experience/style4.jpg'
  ];
  const styleTitles = [
    { en: 'City Skylines', ru: 'Городские туры', hy: 'Քաղաքային տուրեր' },
    { en: 'Cultural Journeys', ru: 'Культура и история', hy: 'Մշակույթ և պատմություն' },
    { en: 'Metropolitan & Coast', ru: 'Мегаполисы и побережья', hy: 'Մեգապոլիսներ և ափեր' },
    { en: 'Zen & Nature', ru: 'Природа и релакс', hy: 'Բնություն և հանգիստ' }
  ];

  const styleCards = document.querySelectorAll('.framer-1t3u0zy > a, [data-framer-name="Choose your style"] .framer-1t3u0zy > a');
  if (styleCards.length >= 4) {
    styleCards.forEach((card, idx) => {
      const img = card.querySelector('img');
      const targetSrc = styleImgs[idx % 4];
      if (img) {
        if (!img.src.includes(targetSrc)) {
          img.src = targetSrc;
        }
        img.srcset = targetSrc;
        img.removeAttribute('srcset');
      }
      const titleEl = card.querySelector('h5');
      if (titleEl && styleTitles[idx % 4]) {
        titleEl.textContent = styleTitles[idx % 4][activeL] || styleTitles[idx % 4].en;
      }
    });
  }

  // Enforce hero video
  const heroVideos = document.querySelectorAll("header#hero video, header video, video");
  heroVideos.forEach(v => {
    if (!v.src.endsWith("/videos/hero.mp4")) {
      v.src = "/videos/hero.mp4";
    }
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('autoplay', '');
    v.playsInline = true;
    v.play().catch(() => {});
  });

  // Replace Logo SVG everywhere (navbar, overlay menu, footer)
  // Update footer social links to official handles
  document.querySelectorAll('a[data-framer-name="Instagram"], a.framer-ru7vy4').forEach(a => {
    a.href = 'https://instagram.com/my.next_trip';
  });
  document.querySelectorAll('.framer-1d2ezg7 img, .framer-10n2m19 img, a[data-framer-name="Logo"] img, img[src*="v6EkJgSa5PCNm2Q3kt5iu8B8tJo"]').forEach(img => {
    if (!img.src.includes('v=mynexttrip') && !img.src.endsWith('/images/v6EkJgSa5PCNm2Q3kt5iu8B8tJo.svg')) {
      img.src = '/images/v6EkJgSa5PCNm2Q3kt5iu8B8tJo.svg?v=mynexttrip';
      img.removeAttribute('srcset');
      img.srcset = '';
    }
  });

  // Replace any hardcoded Traavellio or old emails in all elements and links
  document.querySelectorAll('span, p, h1, h2, h3, h4, h5, h6, a').forEach(el => {
    if (el.children.length === 0) {
      const text = el.textContent;
      if (text.trim().toLowerCase() === 'traavellio' || text.trim().toLowerCase() === 'travellio') {
        el.textContent = 'MyNextTrip';
      } else if (text.includes('info@traavellio.co') || text.includes('hello@travellio.tour') || text.includes('traavellio.co') || text.includes('travellio.tour')) {
        el.textContent = 'info@mynexttrip.am';
      } else if (text.includes('@Traavellio') || text.includes('@travellio')) {
        el.textContent = text.replace(/@traavellio/gi, '@MyNextTrip');
      } else if (text.includes('#VibeWithTravellio') || text.includes('#VibeWithTraavellio')) {
        el.textContent = text.replace(/#VibeWithTra?vellio/gi, '#VibeWithMyNextTrip');
      } else if (text.includes('fremix') || text.includes('Jitu Raut') || text.toLowerCase().includes('designed by')) {
        el.textContent = 'designed by @astrodesign';
      }
    }
    if (el.tagName === 'A' && el.href) {
      if (el.href.includes('mailto:')) {
        el.href = 'mailto:info@mynexttrip.am';
      }
    }
  });

  // Also in document title
  if (document.title.includes('Traavellio') || document.title.includes('Travellio')) {
    document.title = document.title.replace(/Tra?vellio/gi, 'MyNextTrip');
  }
}

// Modal control
function openMyNextTripModal(mode, prefill) {
  const modal = document.getElementById('mnt-modal-wrap');
  if (modal) {
    const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'hy';
    const vTexts = (window.__visaSectionTexts && window.__visaSectionTexts[lang]) ? window.__visaSectionTexts[lang] : window.__visaSectionTexts.hy;
    const tTexts = (window.__tourTypesTexts && window.__tourTypesTexts[lang]) ? window.__tourTypesTexts[lang] : window.__tourTypesTexts.hy;

    const titleEl = document.getElementById('mnt-modal-title');
    const subEl = document.getElementById('mnt-modal-subtitle');
    const btnSpan = document.getElementById('mnt-btn-text');
    const destSelect = document.getElementById('mnt-select-dest') || document.getElementById('mnt-dest');
    const departInput = document.getElementById('mnt-input-depart');
    const returnInput = document.getElementById('mnt-input-return');
    const travTotal = document.getElementById('mnt-select-travelers-total');
    const adultsSelect = document.getElementById('mnt-select-adults');

    if (mode === 'visa') {
      if (titleEl) titleEl.textContent = vTexts.modalTitle;
      if (subEl) subEl.textContent = vTexts.modalSubtitle;
      if (btnSpan) btnSpan.textContent = vTexts.bannerBtn;
    } else if (mode === 'group') {
      if (titleEl) titleEl.textContent = tTexts.group.title;
      if (subEl) subEl.textContent = tTexts.group.desc;
      if (btnSpan) btnSpan.textContent = tTexts.group.btn;
    } else {
      if (titleEl) titleEl.textContent = tTexts.individual.title;
      if (subEl) subEl.textContent = tTexts.individual.desc;
      if (btnSpan) btnSpan.textContent = tTexts.individual.btn;
    }

    // Apply prefill if provided from hero search
    if (prefill) {
      if (prefill.dest && destSelect) {
        for (let i = 0; i < destSelect.options.length; i++) {
          if (destSelect.options[i].value.toLowerCase() === prefill.dest.toLowerCase()) {
            destSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (prefill.departDate && departInput) {
        departInput.value = prefill.departDate;
      }
      if (prefill.returnDate && returnInput) {
        returnInput.value = prefill.returnDate;
      }
      if (prefill.travelers) {
        if (prefill.travelers.includes('1') && travTotal) travTotal.value = '1';
        else if (prefill.travelers.includes('2') && travTotal) travTotal.value = '2';
        else if (prefill.travelers.includes('3') && travTotal) travTotal.value = '3';
        else if (prefill.travelers.includes('5') && travTotal) travTotal.value = '5+';
        else if (travTotal) travTotal.value = '2';

        if (adultsSelect) {
          if (prefill.travelers.includes('1')) adultsSelect.value = '1';
          else if (prefill.travelers.includes('2')) adultsSelect.value = '2';
          else if (prefill.travelers.includes('3')) adultsSelect.value = '3';
          else adultsSelect.value = '2';
        }
      }
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeMyNextTripModal() {
  const modal = document.getElementById('mnt-modal-wrap');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleMntSubmit(e) {
  e.preventDefault();
  const t = websiteTranslations[currentAppLang].modal;
  const successBox = document.getElementById('mnt-success-box');
  const form = document.getElementById('mnt-tour-form');
  
  if (successBox) {
    document.getElementById('mnt-success-text').textContent = t.successMsg;
    successBox.style.display = 'flex';
  }
  if (form) {
    form.reset();
  }
  setTimeout(() => {
    closeMyNextTripModal();
    if (successBox) successBox.style.display = 'none';
  }, 4000);
}

function renderModalContent() {
  const lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';
  const t = (websiteTranslations[lang] && websiteTranslations[lang].modal) ? websiteTranslations[lang].modal : websiteTranslations.en.modal;
  if (!t) return;

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };
  const setPh = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.placeholder = val;
  };

  setTxt('mnt-modal-title', t.title);
  setTxt('mnt-modal-subtitle', t.subtitle);
  setTxt('mnt-back-text', t.back);
  setTxt('mnt-step1-title', t.step1);
  setTxt('mnt-lbl-dest', t.dest);
  setTxt('mnt-lbl-depart', t.departDate);
  setTxt('mnt-lbl-return', t.returnDate);
  setTxt('mnt-lbl-travelers', lang === 'hy' ? 'Ուղևորների քանակ *' : (lang === 'ru' ? 'Количество пассажиров *' : 'Number of Travelers *'));
  setTxt('mnt-lbl-adults', t.adults);
  setTxt('mnt-lbl-children', t.children);
  setTxt('mnt-children-help', t.childrenHelp);
  setTxt('mnt-lbl-hotel', t.hotelCat);
  setTxt('mnt-lbl-meal', t.meal);
  setTxt('mnt-lbl-budget', t.budget);
  setTxt('mnt-lbl-notes', t.notes);
  setPh('mnt-input-notes', t.notesPh);

  setTxt('mnt-step2-title', t.step2);
  setTxt('mnt-lbl-name', t.name);
  setPh('mnt-input-name', t.namePh);
  setTxt('mnt-lbl-phone', t.phone);
  setPh('mnt-input-phone', t.phonePh);
  setTxt('mnt-lbl-email', t.email);
  setPh('mnt-input-email', t.emailPh);

  setTxt('mnt-step3-title', t.step3);
  setTxt('mnt-channel-hint', lang === 'hy' ? 'Ընտրեք, թե ինչպես եք ցանկանում, որ մենք կապ հաստատենք ձեզ հետ:' : (lang === 'ru' ? 'Выберите, как с вами связаться:' : 'Choose how you would like us to contact you:'));
  setTxt('mnt-channel-call', t.call);
  setTxt('mnt-channel-whatsapp', t.whatsapp);
  setTxt('mnt-channel-email', 'Email');
  setTxt('mnt-sec-title', t.securityTitle);
  setTxt('mnt-sec-desc', t.securityDesc);
  setTxt('mnt-btn-text', t.submitBtn);
}
function initMyNextTrip() {
  // Enforce custom assets immediately
  enforceCustomAssets();
  initBackToTop();
  initWhatsAppFloat();
  initVisaModal();
  renderHeroSearchBar(typeof currentAppLang !== 'undefined' ? currentAppLang : 'hy');
  renderTourTypesSection();
  renderVisaSection();
  renderWhyMyNextTrip();
  renderContactSection();

    // Inject Top Navigation & Mobile Drawer
  if (!document.getElementById('mnt-top-bar')) {
    const langBar = document.createElement('header');
    langBar.id = 'mnt-top-bar';
    langBar.innerHTML = `
      <div class="mnt-bar-inner">
        <!-- Logo -->
        <div class="mnt-brand-badge" onclick="window.scrollTo({top:0, behavior:'smooth'})">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          <div class="mnt-brand-text">
            <strong>MyNextTrip</strong>
            <span>TRAVEL AGENCY</span>
          </div>
        </div>

        <!-- 5 Desktop Nav Links in Exact Specified Order -->
        <nav class="mnt-desktop-nav">
          <a href="#individual" class="mnt-nav-item" id="mnt-nav-indiv" onclick="handleMenuNav(event, 'individual')">Private Tours</a>
          <a href="#group" class="mnt-nav-item" id="mnt-nav-group" onclick="handleMenuNav(event, 'group')">Group Tours</a>
          <a href="#visa" class="mnt-nav-item" id="mnt-nav-visa" onclick="handleMenuNav(event, 'visa')">Visa Assistance</a>
          <a href="#why" class="mnt-nav-item" id="mnt-nav-why" onclick="handleMenuNav(event, 'why')">Why MyNextTrip</a>
          <a href="#contact" class="mnt-nav-item" id="mnt-nav-contact" onclick="handleMenuNav(event, 'contact')">Contact</a>
        </nav>

        <!-- Right Controls -->
        <div class="mnt-controls">
          <div class="mnt-lang-switcher">
            <button class="mnt-lang-btn active" data-lang="hy">ՀԱՅ</button>
            <button class="mnt-lang-btn" data-lang="ru">RU</button>
            <button class="mnt-lang-btn" data-lang="en">EN</button>
          </div>
          <button class="mnt-book-btn" onclick="openMyNextTripModal('individual')">
            <span id="mnt-book-btn-text">Submit Inquiry</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <!-- Mobile Hamburger Toggle -->
          <button class="mnt-mob-toggle" onclick="toggleMobileDrawer()" aria-label="Toggle Navigation">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(langBar);

    // Create Mobile Full-Screen Drawer
    const drawer = document.createElement('div');
    drawer.id = 'mnt-mobile-drawer';
    drawer.innerHTML = `
      <div class="mnt-drawer-backdrop" onclick="closeMobileDrawer()"></div>
      <div class="mnt-drawer-panel">
        <div class="mnt-drawer-header">
          <div class="mnt-brand-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            <span style="font-weight: 700; color: #fff; font-size: 17px;">MyNextTrip</span>
          </div>
          <button class="mnt-drawer-close" onclick="closeMobileDrawer()">✕</button>
        </div>
        <nav class="mnt-drawer-nav">
          <a href="#individual" class="mnt-mob-link" id="mnt-mob-indiv" onclick="handleMenuNav(event, 'individual')">Private Tours</a>
          <a href="#group" class="mnt-mob-link" id="mnt-mob-group" onclick="handleMenuNav(event, 'group')">Group Tours</a>
          <a href="#visa" class="mnt-mob-link" id="mnt-mob-visa" onclick="handleMenuNav(event, 'visa')">Visa Assistance</a>
          <a href="#why" class="mnt-mob-link" id="mnt-mob-why" onclick="handleMenuNav(event, 'why')">Why MyNextTrip</a>
          <a href="#contact" class="mnt-mob-link" id="mnt-mob-contact" onclick="handleMenuNav(event, 'contact')">Contact</a>
        </nav>
      </div>
    `;
    document.body.appendChild(drawer);

    // Event listener for language buttons
    document.querySelectorAll('.mnt-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mnt-lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLanguageToWholePage(btn.dataset.lang);
      });
    });
  }

  // Hook all booking and CTA buttons across the entire page
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;
    const text = (target.textContent || '').trim().toLowerCase();
    if (
      text.includes('book a trip') || 
      text.includes('view packages') || 
      text.includes('plan your journey') || 
      text.includes('забронировать') || 
      text.includes('ամրագրել') ||
      target.getAttribute('href') === './book-a-trip'
    ) {
      e.preventDefault();
      e.stopPropagation();
      openMyNextTripModal();
    }
  }, true);

// Inject Modal
  if (!document.getElementById('mnt-modal-wrap')) {
    const modalWrap = document.createElement('div');
    modalWrap.id = 'mnt-modal-wrap';
    modalWrap.style.display = 'none';
    modalWrap.innerHTML = `
      <div class="mnt-modal-backdrop" onclick="closeMyNextTripModal()">
        <div class="mnt-modal-card" onclick="event.stopPropagation()">
          
          <!-- Top Bar with Logo and Back Button -->
          <div class="mnt-modal-topbar">
            <div class="mnt-modal-brand">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
              <div>
                <strong>My Next Trip</strong>
                <span>TRAVEL AGENCY</span>
              </div>
            </div>
            <button class="mnt-modal-back-btn" onclick="closeMyNextTripModal()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span id="mnt-back-text">Հետ վերադառնալ</span>
            </button>
          </div>

          <!-- Hero Heading with Coastline Background -->
          <div class="mnt-modal-banner">
            <div class="mnt-modal-banner-bg"></div>
            <div class="mnt-modal-banner-content">
              <h2 id="mnt-modal-title">Անհատական տուրի հարցում</h2>
              <p id="mnt-modal-subtitle">Նշեք ձեր նախընտրությունները, և մենք կգտնենք ձեզ համապատասխան տարբերակներ:</p>
            </div>
          </div>

          <!-- Modal Body / Form Container -->
          <div class="mnt-modal-body">
            <div id="mnt-success-box" style="display:none;" class="mnt-success-alert">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
              <p id="mnt-success-text"></p>
            </div>

            <form id="mnt-tour-form" onsubmit="handleMntSubmit(event)">
              <div class="mnt-form-columns">
                
                <!-- Left Column: 1. Travel Details -->
                <div class="mnt-panel">
                  <div class="mnt-panel-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                    <span id="mnt-step1-title">Ճանապարհորդության տվյալներ</span>
                  </div>

                  <!-- Destination -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-dest">Ուղղություն *</label>
                    <div class="mnt-input-with-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <select id="mnt-select-dest" required>
                        <option value="" disabled selected>Ընտրեք ուղղություն</option>
                        <option value="Dubai">🇦🇪 Դուբայ (Dubai)</option>
                        <option value="Egypt">🇪🇬 Եգիպտոս (Egypt)</option>
                        <option value="Italy">🇮🇹 Իտալիա (Italy)</option>
                        <option value="Spain">🇪🇸 Իսպանիա (Spain)</option>
                        <option value="France">🇫🇷 Ֆրանսիա (France)</option>
                        <option value="Greece">🇬🇷 Հունաստան (Greece)</option>
                        <option value="Maldives">🇲🇻 Մալդիվներ (Maldives)</option>
                        <option value="Bali">🇮🇩 Բալի (Bali)</option>
                        <option value="Other">🌍 Այլ ուղղություն (Other)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Dates -->
                  <div class="mnt-field-row">
                    <div class="mnt-field">
                      <label id="mnt-lbl-depart">Մեկնելու ամսաթիվ *</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <input type="date" required id="mnt-input-depart" />
                      </div>
                    </div>
                    <div class="mnt-field">
                      <label id="mnt-lbl-return">Վերադարձի ամսաթիվ *</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <input type="date" required id="mnt-input-return" />
                      </div>
                    </div>
                  </div>

                  <!-- Travelers Total -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-travelers">Ուղևորների քանակ *</label>
                    <div class="mnt-input-with-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <select id="mnt-select-travelers-total" required>
                        <option value="" disabled selected>Ընտրեք քանակը</option>
                        <option value="1">1 ուղևոր</option>
                        <option value="2">2 ուղևոր</option>
                        <option value="3">3 ուղևոր</option>
                        <option value="4">4 ուղևոր</option>
                        <option value="5+">5+ ուղևոր</option>
                      </select>
                    </div>
                  </div>

                  <!-- Adults & Children -->
                  <div class="mnt-field-row">
                    <div class="mnt-field">
                      <label id="mnt-lbl-adults">Մեծահասակներ *</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <select id="mnt-select-adults" required>
                          <option value="1">1</option>
                          <option value="2" selected>2</option>
                          <option value="3">3</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    </div>
                    <div class="mnt-field">
                      <label id="mnt-lbl-children">Երեխաներ</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <select id="mnt-select-children">
                          <option value="0" selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3+</option>
                        </select>
                      </div>
                      <span class="mnt-helper" id="mnt-children-help">Նշեք երեխաների տարիքները, եթե ունեք</span>
                    </div>
                  </div>

                  <!-- Hotel Category & Meal -->
                  <div class="mnt-field-row">
                    <div class="mnt-field">
                      <label id="mnt-lbl-hotel">Հյուրանոցի նախընտրելի կատեգորիա</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 21V11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10M9 9h6M9 13h6M9 17h6"/></svg>
                        <select id="mnt-select-hotel">
                          <option value="" disabled selected>Ընտրեք կատեգորիա</option>
                          <option value="3-star">3★ Standard</option>
                          <option value="4-star">4★ Comfort</option>
                          <option value="5-star">5★ Luxury</option>
                          <option value="boutique">Boutique & Villa</option>
                        </select>
                      </div>
                    </div>
                    <div class="mnt-field">
                      <label id="mnt-lbl-meal">Սննդի նախընտրություն</label>
                      <div class="mnt-input-with-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2M15 2v18M5 2v6a3 3 0 0 0 3 3 3 3 0 0 0 3-3V2M8 2v18"/></svg>
                        <select id="mnt-select-meal">
                          <option value="" disabled selected>Ընտրեք սնունդ</option>
                          <option value="RO">Room Only (Առանց սննդի)</option>
                          <option value="BB">Breakfast (Նախաճաշ)</option>
                          <option value="HB">Half Board (2-անգամյա)</option>
                          <option value="FB">Full Board (3-անգամյա)</option>
                          <option value="AI">All Inclusive (Ամեն ինչ ներառված)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Budget -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-budget">Բյուջե (ըստ ցանկության)</label>
                    <div class="mnt-input-with-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 6v2M12 16v2"/></svg>
                      <select id="mnt-select-budget">
                        <option value="" disabled selected>Ընտրեք բյուջե</option>
                        <option value="500-1000">$500 – $1,000</option>
                        <option value="1000-2000">$1,000 – $2,000</option>
                        <option value="2000-3500">$2,000 – $3,500</option>
                        <option value="3500-5000">$3,500 – $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                    </div>
                  </div>

                  <!-- Additional Notes Textarea with 0/500 char counter -->
                  <div class="mnt-field">
                    <div class="mnt-field-label-row">
                      <label id="mnt-lbl-notes" style="display:flex; align-items:center; gap:6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        Լրացուցիչ ցանկություններ / մեկնաբանություններ
                      </label>
                    </div>
                    <textarea id="mnt-input-notes" maxlength="500" rows="3" placeholder="Օրինակ՝ նախընտրում եմ ծովափնյա հանգիստ, հետաքրքրված եմ էքսկուրսիաներով, հանգիստ վայրեր և այլն..." oninput="document.getElementById('mnt-notes-count').textContent = this.value.length + '/500'"></textarea>
                    <div class="mnt-char-counter" id="mnt-notes-count">0/500</div>
                  </div>
                </div>

                <!-- Right Column: 2. Contact Information & 3. Channel -->
                <div class="mnt-panel">
                  
                  <!-- Step 2 -->
                  <div class="mnt-panel-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span id="mnt-step2-title">Կոնտակտային տվյալներ</span>
                  </div>

                  <!-- Name -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-name">Անուն *</label>
                    <div class="mnt-input-with-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input type="text" id="mnt-input-name" required placeholder="Մուտքագրեք ձեր անունը" />
                    </div>
                  </div>

                  <!-- Phone Number with Armenia Flag +374 -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-phone">Հեռախոսահամար *</label>
                    <div class="mnt-phone-group">
                      <div class="mnt-phone-prefix">
                        <span class="mnt-flag">🇦🇲</span>
                        <span class="mnt-dial">+374</span>
                      </div>
                      <input type="tel" id="mnt-input-phone" required placeholder="Մուտքագրեք համարը" />
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="mnt-field">
                    <label id="mnt-lbl-email">Email *</label>
                    <div class="mnt-input-with-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <input type="email" id="mnt-input-email" required placeholder="Մուտքագրեք ձեր email-ը" />
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="mnt-panel-title" style="margin-top: 24px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span id="mnt-step3-title">Նախընտրելի կապի եղանակ</span>
                  </div>

                  <p class="mnt-channel-hint" id="mnt-channel-hint">Ընտրեք, թե ինչպես եք ցանկանում, որ մենք կապ հաստատենք ձեզ հետ:</p>

                  <div class="mnt-channels-list">
                    <label class="mnt-channel-option">
                      <input type="radio" name="mnt-channel" value="phone" checked />
                      <span class="mnt-channel-radio-custom"></span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span id="mnt-channel-call">Հեռախոս</span>
                    </label>

                    <label class="mnt-channel-option">
                      <input type="radio" name="mnt-channel" value="whatsapp" />
                      <span class="mnt-channel-radio-custom"></span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.5 12c0 2.5-2 4.5-4.5 4.5a4.48 4.48 0 0 1-2.4-.7L6 17l1.2-3.6a4.48 4.48 0 0 1-.7-2.4c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5z"/></svg>
                      <span id="mnt-channel-whatsapp">WhatsApp</span>
                    </label>

                    <label class="mnt-channel-option">
                      <input type="radio" name="mnt-channel" value="email" />
                      <span class="mnt-channel-radio-custom"></span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <span id="mnt-channel-email">Email</span>
                    </label>
                  </div>

                  <!-- Security Badge -->
                  <div class="mnt-security-card">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <div>
                      <strong id="mnt-sec-title">Ձեր տվյալները անվտանգ են</strong>
                      <p id="mnt-sec-desc">Մենք չենք փոխանցում ձեր անձնական տվյալները երրորդ կողմերին:</p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Bottom Submit Button -->
              <div class="mnt-submit-row">
                <button type="submit" class="mnt-submit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(45deg);"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                  <span id="mnt-btn-text">Ուղարկել հարցումը</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalWrap);
  }

  // Simple initial setup without freezing MutationObserver
  setTimeout(() => {
    enforceCustomAssets();
    applyLanguageToWholePage('hy');
  }, 300);
  setTimeout(() => {
    enforceCustomAssets();
    applyLanguageToWholePage('hy');
  }, 1500);

  // Sync on scroll so scrolling through sticky section updates images immediately
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = requestAnimationFrame(() => {
        enforceCustomAssets();
        scrollTimeout = null;
      });
    }
  }, { passive: true });

  // Instantly enforce assets when menu is clicked or overlay is opened
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest && (e.target.closest('[data-framer-name="Menu"]') || e.target.closest('.framer-qeznpr') || e.target.closest('.framer-vhbhi3'))) {
      setTimeout(enforceCustomAssets, 30);
      setTimeout(enforceCustomAssets, 150);
      setTimeout(enforceCustomAssets, 400);
    }
  }, true);

  // Observe template-overlay for menu opening
  const overlayObserver = new MutationObserver(() => {
    enforceCustomAssets();
  });
  const overlayContainer = document.getElementById('template-overlay') || document.body;
  overlayObserver.observe(overlayContainer, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMyNextTrip);
} else {
  initMyNextTrip();
}
