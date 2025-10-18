// Основная логика чата (чистый JS)
(function(){
  // DOM
  const chatFab = document.getElementById('chatFab');
  const chatWindow = document.getElementById('chatWindow');
  const openChat = document.getElementById('openChat');
  const openChat2 = document.getElementById('openChat2');
  const closeChat = document.getElementById('closeChat');
  const sendBtn = document.getElementById('sendBtn');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const quickActions = document.getElementById('quickActions');
  const quickButtons = document.querySelectorAll('.quick-btn');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navFabBtns = [chatFab, openChat, openChat2].filter(Boolean);

  // initial message
  const messages = [
    {type:'bot', text:'Здравствуйте! Я AI-помощник KZ Project Group. Чем могу помочь?'}
  ];

  function renderMessages(){
    chatBody.innerHTML = '';
    messages.forEach(m => {
      const div = document.createElement('div');
      div.className = 'msg ' + (m.type === 'user' ? 'user' : 'bot');
      div.textContent = m.text;
      chatBody.appendChild(div);
    });
    // scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // generate bot response (copied logic from оригинала)
  function generateBotResponse(inputRaw){
    const input = (inputRaw || '').toLowerCase();
    if (!input) return 'Пожалуйста, напишите ваш вопрос.';
    if (input.includes('услуг') || input.includes('сервис')) {
      return 'Мы предлагаем полный спектр проектных услуг: архитектурное проектирование, инженерные системы, BIM-моделирование, консалтинг и сопровождение проектов. Имеем лицензии ГСЛ-КР №002187 и ГСЛ№ 23017135. Какая услуга вас интересует?';
    } else if (input.includes('цен') || input.includes('стоимост')) {
      return 'Стоимость зависит от масштаба и сложности проекта. Оставьте заявку, и наши специалисты подготовят индивидуальное коммерческое предложение в течение 24 часов.';
    } else if (input.includes('контакт') || input.includes('связ') || input.includes('телефон') || input.includes('whatsapp')) {
      return 'Контакты:\n📧 Email: kzprojectgroup@mail.ru\n📞 Телефон/WhatsApp: +7-708-888-00-98\n📍 Адрес: Казахстан, Алматинская область, Талгарский район, г. Талгар, ул. Қазанғап, дом 4А, кв. 17, 041600';
    } else if (input.includes('портфол') || input.includes('проект')) {
      return 'За годы работы мы реализовали множество проектов: жилые комплексы, коммерческие центры, промышленные объекты. Хотите посмотреть примеры наших работ?';
    } else if (input.includes('лицензи') || input.includes('документ')) {
      return 'Наши лицензии:\n• ГСЛ-КР №002187 от 08.02.2023\n• ГСЛ№ 23017135 от 31.07.2023\n• БИН: 021240006983\n\nВсе документы оформлены в соответствии с законодательством РК.';
    } else if (input.includes('директор') || input.includes('руководств')) {
      return 'Директор ТОО «Kz Project Group» - Петров М.В.\n\nНаша команда состоит из опытных специалистов в области архитектуры и проектирования.';
    } else if (input.includes('банк') || input.includes('реквизит') || input.includes('иик')) {
      return 'Банковские реквизиты:\nИИК: KZ33601A861012861021\nБИК: HSBKKZKX\nБанк: АО «Народный Банк Казахстан»\nБИН: 021240006983';
    } else {
      return 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для детальной консультации. Могу рассказать подробнее об услугах, ценах, проектах, лицензиях или реквизитах компании.';
    }
  }

  // send message
  function sendMessage(text){
    if (!text || !text.trim()) return;
    messages.push({type:'user', text: text.trim()});
    renderMessages();

    // simulate typing / bot response
    setTimeout(() => {
      const bot = generateBotResponse(text);
      messages.push({type:'bot', text: bot});
      renderMessages();
    }, 600);
  }

  // events
  if (chatFab) chatFab.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
  });

  if (openChat) openChat.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    // render initial messages if not present
    renderMessages();
  });

  if (openChat2) openChat2.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    renderMessages();
  });

  if (closeChat) closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  if (sendBtn) sendBtn.addEventListener('click', () => {
    sendMessage(chatInput.value);
    chatInput.value = '';
    chatInput.focus();
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // quick actions
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      chatInput.value = action;
      sendBtn.click();
    });
  });

  // nav toggle for mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') navLinks.style.display = 'none';
      else navLinks.style.display = 'flex';
    });
  }

  // initial render
  renderMessages();

})();
