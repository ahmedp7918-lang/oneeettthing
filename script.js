(function () {
  'use strict';

  /* ============================================================
     STORAGE
     ============================================================ */
  const KEY = 'tapfast_v3';
  const DEFAULT = {
    best: 0,
    coins: 0,
    xp: 0,
    level: 1,
    purchased: [],
    equipped: {
      target: 'classic_circle',
      theme: 'classic',
      effect: 'ripple',
      button: 'classic',
      background: 'clean_white'
    },
    achievements: {},
    stats: {
      games: 0,
      taps: 0,
      hits: 0,
      misses: 0,
      totalReaction: 0,
      reactionSamples: 0,
      bestCombo: 0,
      totalCoins: 0
    },
    settings: {
      sound: true,
      music: true,
      haptics: true,
      notifications: true,
      targetFeedback: true,
      animations: true,
      difficulty: 'normal',
      language: 'en',
      appearance: 'system'
    }
  };

  function loadData() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return deepMerge(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(raw));
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT));
  }
  function deepMerge(a, b) {
    const out = JSON.parse(JSON.stringify(a));
    for (const k in b) {
      if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k])) out[k] = deepMerge(out[k] || {}, b[k]);
      else out[k] = b[k];
    }
    return out;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(G.data)); } catch (e) {}
  }

  /* ============================================================
     STATE
     ============================================================ */
  const G = {
    data: loadData(),
    stack: ['splashScreen'],
    game: {
      active: false,
      paused: false,
      score: 0,
      timeLeft: 30,
      duration: 30,
      timerInt: null,
      countInt: null,
      spawnTO: null,
      targetEl: null,
      lastTap: 0,
      combo: 0,
      maxCombo: 0,
      hits: 0,
      misses: 0,
      taps: 0,
      reactionTotal: 0,
      reactionCount: 0,
      startTime: 0,
      difficulty: 0
    },
    storeCat: 'targets',
    // Active select sheet
    sheet: { open: false, onPick: null },
    // Active confirm dialog
    confirm: { open: false }
  };

  const $ = (id) => document.getElementById(id);

  /* ============================================================
     I18N — English / Arabic
     ============================================================ */
  const I18N = {
    en: {
      tagline: 'Tap the target. Beat the clock.',
      best: 'Best',
      level: 'Level',
      coins: 'Coins',
      play: 'Play',
      store: 'Store',
      stats: 'Stats',
      settings: 'Settings',
      score: 'Score',
      time: 'Time',
      timesUp: "Time's Up",
      newBest: 'New Best',
      bestScore: 'Best Score',
      accuracy: 'Accuracy',
      avgReaction: 'Avg Reaction',
      misses: 'Misses',
      coinsEarned: 'Coins Earned',
      xpEarned: 'XP Earned',
      playAgain: 'Play Again',
      home: 'Home',
      targets: 'Targets',
      themes: 'Themes',
      effects: 'Effects',
      buttons: 'Buttons',
      backgrounds: 'Backgrounds',
      achievements: 'Achievements',
      achievementsSection: 'Achievements',
      generalSection: 'General',
      feedbackSection: 'Feedback',
      gameplaySection: 'Gameplay',
      storeSection: 'Store',
      dataSection: 'Data',
      legalSection: 'Legal',
      language: 'Language',
      appearance: 'Appearance',
      sound: 'Sound',
      music: 'Music',
      haptics: 'Haptics',
      notifications: 'Notifications',
      targetFeedback: 'Target Feedback',
      targetFeedbackSub: 'Extra visual pulse on hit',
      animations: 'Animations',
      difficulty: 'Difficulty',
      restore: 'Restore Purchases',
      resetProgress: 'Reset Progress',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cancel: 'Cancel',
      confirm: 'Confirm',
      selectLanguage: 'Language',
      selectAppearance: 'Appearance',
      selectDifficulty: 'Difficulty',
      appearanceLight: 'Light',
      appearanceDark: 'Dark',
      appearanceSystem: 'System',
      difficultyEasy: 'Easy',
      difficultyNormal: 'Normal',
      difficultyHard: 'Hard',
      resetTitle: 'Reset Progress',
      resetMessage: 'This will permanently erase all your scores, coins, and unlocks. This cannot be undone.',
      resetConfirm: 'Reset',
      resetDone: 'Progress reset',
      restoreTitle: 'Restore Purchases',
      restoreMessage: 'Your purchases are stored locally on this device and are automatically restored when you open the app.',
      privacyTitle: 'Privacy Policy',
      privacyMessage: 'Tap Fast stores all data locally on your device. No personal information is collected, transmitted, or shared. Your scores, coins, and settings never leave your phone.',
      termsTitle: 'Terms of Service',
      termsMessage: 'Tap Fast is provided as-is for entertainment purposes. Have fun and play responsibly.',
      exitTitle: 'Exit Game?',
      exitMessage: 'Your current round will be lost.',
      exitContinue: 'Continue Playing',
      exitConfirm: 'Exit',
      pausedTitle: 'Paused',
      pausedMessage: 'Tap Continue to resume your round.',
      pausedContinue: 'Continue',
      ok: 'OK',
      purchased: 'Purchased',
      notEnoughCoins: 'Not enough coins',
      buyTitle: 'Unlock item?',
      buyConfirm: 'Buy',
      languageEnglish: 'English',
      languageArabic: 'العربية',
      achievement: 'Achievement',
      combo: 'Combo',
      buy: 'Buy',
      equip: 'Equip',
      equipped: 'Equipped',
      locked: 'Locked',
      owned: 'Owned',
      coinsShort: 'coins',
      levelShort: 'Level',
      gamesPlayed: 'Games Played',
      totalTaps: 'Total Taps',
      successfulTaps: 'Successful Taps',
      missedTaps: 'Missed Taps',
      highestCombo: 'Highest Combo',
      totalCoins: 'Total Coins',
      xp: 'XP',
      unlockedOf: 'of',
      unlocked: 'unlocked',
      purchaseSheet: 'Unlock this item for',
      purchaseQuestion: 'coins?'
    },
    ar: {
      tagline: 'اضغط الهدف. اهزم الوقت.',
      best: 'الأفضل',
      level: 'المستوى',
      coins: 'العملات',
      play: 'ابدأ',
      store: 'المتجر',
      stats: 'الإحصاءات',
      settings: 'الإعدادات',
      score: 'النقاط',
      time: 'الوقت',
      timesUp: 'انتهى الوقت',
      newBest: 'رقم قياسي جديد',
      bestScore: 'أفضل نتيجة',
      accuracy: 'الدقة',
      avgReaction: 'متوسط الاستجابة',
      misses: 'الأخطاء',
      coinsEarned: 'العملات المكتسبة',
      xpEarned: 'الخبرة المكتسبة',
      playAgain: 'العب مرة أخرى',
      home: 'الرئيسية',
      targets: 'الأهداف',
      themes: 'الثيمات',
      effects: 'المؤثرات',
      buttons: 'الأزرار',
      backgrounds: 'الخلفيات',
      achievements: 'الإنجازات',
      achievementsSection: 'الإنجازات',
      generalSection: 'عام',
      feedbackSection: 'التنبيهات',
      gameplaySection: 'اللعب',
      storeSection: 'المتجر',
      dataSection: 'البيانات',
      legalSection: 'قانوني',
      language: 'اللغة',
      appearance: 'المظهر',
      sound: 'الصوت',
      music: 'الموسيقى',
      haptics: 'الاهتزاز',
      notifications: 'الإشعارات',
      targetFeedback: 'تنبيه الهدف',
      targetFeedbackSub: 'نبضة مرئية إضافية عند الضغط',
      animations: 'الحركات',
      difficulty: 'الصعوبة',
      restore: 'استعادة المشتريات',
      resetProgress: 'إعادة تعيين التقدم',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      selectLanguage: 'اللغة',
      selectAppearance: 'المظهر',
      selectDifficulty: 'الصعوبة',
      appearanceLight: 'فاتح',
      appearanceDark: 'داكن',
      appearanceSystem: 'النظام',
      difficultyEasy: 'سهل',
      difficultyNormal: 'عادي',
      difficultyHard: 'صعب',
      resetTitle: 'إعادة تعيين التقدم',
      resetMessage: 'سيؤدي هذا إلى حذف جميع نتائجك وعملاتك وعناصرك المفتوحة نهائيًا. لا يمكن التراجع عن هذا الإجراء.',
      resetConfirm: 'إعادة تعيين',
      resetDone: 'تمت إعادة التعيين',
      restoreTitle: 'استعادة المشتريات',
      restoreMessage: 'يتم تخزين مشترياتك محليًا على هذا الجهاز وتُستعاد تلقائيًا عند فتح التطبيق.',
      privacyTitle: 'سياسة الخصوصية',
      privacyMessage: 'يخزن Tap Fast جميع البيانات محليًا على جهازك. لا يتم جمع أي معلومات شخصية أو إرسالها أو مشاركتها. لا تغادر نتائجك وعملاتك وإعداداتك هاتفك أبدًا.',
      termsTitle: 'شروط الخدمة',
      termsMessage: 'يتم تقديم Tap Fast كما هو لأغراض الترفيه. استمتع والعب بمسؤولية.',
      exitTitle: 'إنهاء اللعبة؟',
      exitMessage: 'سيتم فقدان الجولة الحالية.',
      exitContinue: 'متابعة اللعب',
      exitConfirm: 'خروج',
      pausedTitle: 'متوقف مؤقتًا',
      pausedMessage: 'اضغط متابعة لاستئناف الجولة.',
      pausedContinue: 'متابعة',
      ok: 'حسنًا',
      purchased: 'تم الشراء',
      notEnoughCoins: 'عملات غير كافية',
      buyTitle: 'فتح العنصر؟',
      buyConfirm: 'شراء',
      languageEnglish: 'English',
      languageArabic: 'العربية',
      achievement: 'إنجاز',
      combo: 'سلسلة',
      buy: 'شراء',
      equip: 'تفعيل',
      equipped: 'مفعّل',
      locked: 'مقفل',
      owned: 'مملوك',
      coinsShort: 'عملة',
      levelShort: 'مستوى',
      gamesPlayed: 'الجولات',
      totalTaps: 'إجمالي الضغطات',
      successfulTaps: 'الضغطات الناجحة',
      missedTaps: 'الضغطات الفاشلة',
      highestCombo: 'أعلى سلسلة',
      totalCoins: 'إجمالي العملات',
      xp: 'الخبرة',
      unlockedOf: 'من',
      unlocked: 'مفتوح',
      purchaseSheet: 'فتح هذا العنصر مقابل',
      purchaseQuestion: 'عملة؟'
    }
  };

  const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  function t(key) {
    const lang = G.data.settings.language || 'en';
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });

    // Specific dynamic labels
    $('languageValue').textContent = G.data.settings.language === 'ar' ? t('languageArabic') : t('languageEnglish');
    $('appearanceValue').textContent =
      G.data.settings.appearance === 'light' ? t('appearanceLight') :
      G.data.settings.appearance === 'dark' ? t('appearanceDark') : t('appearanceSystem');
    $('difficultyValue').textContent =
      G.data.settings.difficulty === 'easy' ? t('difficultyEasy') :
      G.data.settings.difficulty === 'hard' ? t('difficultyHard') : t('difficultyNormal');

    // Data-i18n-text attributes for buttons inside store cards etc.
    document.querySelectorAll('[data-i18n-text]').forEach(el => {
      const key = el.getAttribute('data-i18n-text');
      const val = t(key);
      if (val) el.textContent = val;
    });
  }

  function applyDirection() {
    const lang = G.data.settings.language || 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }

  /* ============================================================
     APPEARANCE
     ============================================================ */
  const mqlDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function applyAppearance() {
    const mode = G.data.settings.appearance || 'system';
    let theme = 'light';
    if (mode === 'dark') theme = 'dark';
    else if (mode === 'light') theme = 'light';
    else theme = (mqlDark && mqlDark.matches) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B0B0D' : '#FFFFFF');
  }

  if (mqlDark) {
    const handler = () => {
      if ((G.data.settings.appearance || 'system') === 'system') applyAppearance();
    };
    if (mqlDark.addEventListener) mqlDark.addEventListener('change', handler);
    else if (mqlDark.addListener) mqlDark.addListener(handler);
  }

  /* ============================================================
     ICONS
     ============================================================ */
  const ICONS = {
    bolt: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    hand: '<svg viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 1 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
    star: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/></svg>',
    check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    crown: '<svg viewBox="0 0 24 24"><path d="M3 6l4 6 5-8 5 8 4-6-2 14H5z"/></svg>',
    hundred: '<svg viewBox="0 0 24 24"><path d="M5 8h4v10"/><circle cx="15" cy="13" r="4"/></svg>'
  };

  /* ============================================================
     AUDIO
     ============================================================ */
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }
  function tone(freq, dur, type, vol) {
    if (!G.data.settings.sound || !audioCtx) return;
    try {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type || 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.05, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }
  const sfxTap = () => tone(880, 0.06, 'sine', 0.04);
  const sfxMiss = () => tone(150, 0.1, 'sine', 0.035);
  const sfxCount = () => tone(660, 0.09, 'sine', 0.045);
  const sfxResult = () => { tone(660, 0.13, 'sine', 0.045); setTimeout(() => tone(990, 0.22, 'sine', 0.045), 120); };

  /* ============================================================
     HAPTICS
     ============================================================ */
  function haptic(ms) {
    if (G.data.settings.haptics && navigator.vibrate) {
      try { navigator.vibrate(ms || 8); } catch (e) {}
    }
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function go(id, mode) {
    mode = mode || 'push';
    const fromId = G.stack[G.stack.length - 1];
    if (fromId === id) return;
    const from = $(fromId);
    const to = $(id);
    if (!from || !to) return;

    if (mode === 'push') G.stack.push(id);
    else if (mode === 'pop') G.stack.pop();
    else if (mode === 'replace') G.stack[G.stack.length - 1] = id;

    transition(from, to, mode);
  }

  function transition(from, to, mode) {
    to.classList.remove('hidden');
    to.style.transition = 'none';
    to.style.willChange = 'transform, opacity';

    if (mode === 'push') { to.style.transform = 'translateX(100%)'; to.style.opacity = '1'; }
    else if (mode === 'pop') { to.style.transform = 'translateX(-30%)'; to.style.opacity = '0.5'; }
    else { to.style.transform = 'translateX(0)'; to.style.opacity = '0'; }
    void to.offsetHeight;

    const dur = G.data.settings.animations ? '0.32s' : '0s';
    const ease = 'cubic-bezier(0.32, 0.72, 0, 1)';
    to.style.transition = `transform ${dur} ${ease}, opacity ${dur} ${ease}`;
    from.style.transition = `transform ${dur} ${ease}, opacity ${dur} ${ease}`;
    from.style.willChange = 'transform, opacity';

    to.style.transform = 'translateX(0)';
    to.style.opacity = '1';

    if (mode === 'push') { from.style.transform = 'translateX(-30%)'; from.style.opacity = '0.5'; }
    else if (mode === 'pop') { from.style.transform = 'translateX(100%)'; from.style.opacity = '0'; }
    else { from.style.opacity = '0'; }

    setTimeout(() => {
      from.classList.add('hidden');
      from.style.transition = '';
      from.style.transform = '';
      from.style.opacity = '';
      from.style.willChange = '';
      to.style.transition = '';
      to.style.transform = '';
      to.style.opacity = '';
      to.style.willChange = '';
    }, G.data.settings.animations ? 340 : 10);
  }

  /* ============================================================
     UNIFIED SELECT SHEET
     ============================================================ */
  const selectOverlay = $('selectSheetOverlay');
  const selectTitleEl = $('selectTitle');
  const selectOptionsEl = $('selectOptions');

  function openSelect(config) {
    // config: { title, options: [{value, label, sub, preview, selected}], onPick }
    if (G.sheet.open) closeSelect(false);

    selectTitleEl.textContent = config.title || '';
    selectOptionsEl.innerHTML = '';

    config.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'select-option' + (opt.selected ? ' selected' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', opt.selected ? 'true' : 'false');

      // Optional appearance preview
      if (opt.preview) {
        const prev = document.createElement('div');
        prev.className = 'appearance-preview ' + opt.preview;
        btn.appendChild(prev);
      }

      const main = document.createElement('div');
      main.className = 'select-option-label';
      main.textContent = opt.label;
      if (opt.sub) {
        const sub = document.createElement('div');
        sub.className = 'select-option-sub';
        sub.textContent = opt.sub;
        main.appendChild(sub);
      }
      btn.appendChild(main);

      const check = document.createElement('div');
      check.className = 'select-option-check';
      check.innerHTML = ICONS.check;
      btn.appendChild(check);

      btn.addEventListener('click', () => {
        haptic(8);
        // Update all options visually
        selectOptionsEl.querySelectorAll('.select-option').forEach(el => {
          el.classList.remove('selected');
          el.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');

        // Commit after a brief pause so the check animates
        setTimeout(() => {
          if (typeof config.onPick === 'function') config.onPick(opt.value);
          closeSelect(true);
        }, 160);
      });

      selectOptionsEl.appendChild(btn);
    });

    G.sheet.open = true;
    G.sheet.onPick = config.onPick || null;

    selectOverlay.classList.remove('hidden');
    // Force reflow then add showing class for transition
    void selectOverlay.offsetHeight;
    requestAnimationFrame(() => selectOverlay.classList.add('showing'));
  }

  function closeSelect(animated) {
    if (!G.sheet.open) return;
    G.sheet.open = false;
    selectOverlay.classList.remove('showing');
    const delay = animated === false || !G.data.settings.animations ? 0 : 320;
    setTimeout(() => {
      selectOverlay.classList.add('hidden');
      selectOptionsEl.innerHTML = '';
      G.sheet.onPick = null;
    }, delay);
  }

  // Backdrop dismissal
  selectOverlay.querySelector('[data-dismiss]').addEventListener('click', () => {
    haptic(6);
    closeSelect(true);
  });

  /* ============================================================
     CONFIRM DIALOG
     ============================================================ */
  const confirmOverlay = $('confirmOverlay');
  const confirmTitleEl = $('confirmTitle');
  const confirmMessageEl = $('confirmMessage');
  const confirmActionsEl = $('confirmActions');

  function openConfirm(config) {
    if (G.confirm.open) return;
    G.confirm.open = true;

    confirmTitleEl.textContent = config.title || '';
    confirmMessageEl.textContent = config.message || '';
    confirmActionsEl.innerHTML = '';

    (config.actions || [{ label: t('ok'), bold: true }]).forEach(action => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = action.label;
      if (action.bold) btn.classList.add('bold');
      if (action.destructive) btn.classList.add('destructive');
      btn.addEventListener('click', () => {
        haptic(8);
        closeConfirm(true);
        if (typeof action.onClick === 'function') {
          setTimeout(action.onClick, 180);
        }
      });
      confirmActionsEl.appendChild(btn);
    });

    confirmOverlay.classList.remove('hidden');
    void confirmOverlay.offsetHeight;
    requestAnimationFrame(() => confirmOverlay.classList.add('showing'));
  }

  function closeConfirm(animated) {
    if (!G.confirm.open) return;
    G.confirm.open = false;
    confirmOverlay.classList.remove('showing');
    const delay = animated === false || !G.data.settings.animations ? 0 : 280;
    setTimeout(() => {
      confirmOverlay.classList.add('hidden');
      confirmActionsEl.innerHTML = '';
    }, delay);
  }

  confirmOverlay.querySelector('[data-confirm-dismiss]').addEventListener('click', () => {
    closeConfirm(true);
  });

  /* ============================================================
     TOAST
     ============================================================ */
  let toastTO = null;
  function showToast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('showing');
    clearTimeout(toastTO);
    toastTO = setTimeout(() => el.classList.remove('showing'), 1800);
  }

  /* ============================================================
     COSMETICS
     ============================================================ */
  const COSMETICS = {
    targets: [
      { id: 'classic_circle', name: 'Classic Circle', price: 0, shape: 'circle' },
      { id: 'ring', name: 'Ring', price: 150, shape: 'ring' },
      { id: 'square', name: 'Square', price: 200, shape: 'square' },
      { id: 'star', name: 'Star', price: 350, shape: 'star' },
      { id: 'hexagon', name: 'Hexagon', price: 300, shape: 'hexagon' },
      { id: 'pulse', name: 'Pulse', price: 450, shape: 'pulse' },
      { id: 'neon_ring', name: 'Neon Ring', price: 600, shape: 'ring' },
      { id: 'minimal', name: 'Minimal', price: 500, shape: 'minimal' }
    ],
    themes: [
      { id: 'classic', name: 'Classic', price: 0, color: '#0A84FF' },
      { id: 'ocean', name: 'Ocean', price: 120, color: '#00B4D8' },
      { id: 'sunset', name: 'Sunset', price: 180, color: '#FF9500' },
      { id: 'electric', name: 'Electric', price: 250, color: '#5856D6' },
      { id: 'mono', name: 'Mono', price: 200, color: '#1C1C1E' },
      { id: 'retro', name: 'Retro', price: 300, color: '#FF3B30' },
      { id: 'soft', name: 'Soft', price: 280, color: '#AF52DE' },
      { id: 'cosmic', name: 'Cosmic', price: 500, color: '#5E5CE6' }
    ],
    effects: [
      { id: 'ripple', name: 'Ripple', price: 0, type: 'ring' },
      { id: 'circle_burst', name: 'Circle Burst', price: 100, type: 'fill' },
      { id: 'spark', name: 'Spark', price: 180, type: 'spark' },
      { id: 'pulse', name: 'Pulse', price: 220, type: 'pulse' },
      { id: 'ring_expansion', name: 'Ring Expansion', price: 280, type: 'ring' },
      { id: 'soft_particles', name: 'Soft Particles', price: 400, type: 'particles' }
    ],
    buttons: [
      { id: 'classic', name: 'Classic', price: 0, radius: '14px' },
      { id: 'rounded', name: 'Rounded', price: 80, radius: '22px' },
      { id: 'capsule', name: 'Capsule', price: 120, radius: '100px' },
      { id: 'minimal', name: 'Minimal', price: 100, radius: '8px' },
      { id: 'soft', name: 'Soft', price: 150, radius: '18px' }
    ],
    backgrounds: [
      { id: 'clean_white', name: 'Clean White', price: 0, bg: '#FAFAFB' },
      { id: 'soft_gray', name: 'Soft Gray', price: 60, bg: '#F2F2F5' },
      { id: 'blue', name: 'Blue', price: 120, bg: '#EFF6FF' },
      { id: 'dark', name: 'Dark', price: 100, bg: '#1C1C1E' },
      { id: 'gradient', name: 'Gradient', price: 200, bg: 'linear-gradient(180deg, #FAFAFB 0%, #E5E5EA 100%)' },
      { id: 'grid', name: 'Grid', price: 180, bg: 'repeating-linear-gradient(0deg, #FAFAFB 0px, #FAFAFB 28px, #EEEEF2 28px, #EEEEF2 29px)' },
      { id: 'minimal_dots', name: 'Minimal Dots', price: 160, bg: 'radial-gradient(circle, #D1D1D6 1px, transparent 1px) 0 0 / 22px 22px, #FAFAFB' }
    ]
  };

  const LEVEL_UNLOCKS = {
    ring: 3, square: 5, star: 8, hexagon: 7, pulse: 10, neon_ring: 12, minimal: 14,
    ocean: 2, sunset: 6, electric: 8, mono: 10, retro: 12, soft: 13, cosmic: 18,
    circle_burst: 4, spark: 6, pulse_effect: 9, ring_expansion: 11, soft_particles: 15,
    rounded: 2, capsule: 5, minimal_btn: 7, soft_btn: 9,
    soft_gray: 2, blue: 4, dark: 6, gradient: 10, grid: 12, minimal_dots: 14
  };

  function findItem(id) {
    for (const cat of Object.values(COSMETICS)) {
      const f = cat.find(i => i.id === id);
      if (f) return f;
    }
    return null;
  }
  const getPrice = (id) => { const it = findItem(id); return it ? it.price : 0; };
  const isOwned = (id) => G.data.purchased.includes(id) || getPrice(id) === 0;
  function isUnlocked(id) {
    const req = LEVEL_UNLOCKS[id];
    return !req || G.data.level >= req;
  }
  function eqKey(cat) {
    return { targets: 'target', themes: 'theme', effects: 'effect', buttons: 'button', backgrounds: 'background' }[cat];
  }
  function getEquipped(cat) {
    const k = eqKey(cat);
    const val = G.data.equipped[k];
    if (val && findItem(val)) return val;
    return COSMETICS[cat][0].id;
  }

  /* ============================================================
     ACHIEVEMENTS
     ============================================================ */
  const ACHIEVEMENTS = [
    { id: 'first_tap', icon: 'hand', color: '#0A84FF', title: 'First Tap', desc: 'Tap your first target', reward: 10 },
    { id: 'speed_demon', icon: 'bolt', color: '#FF9500', title: 'Speed Demon', desc: 'Score 30 in one round', reward: 50 },
    { id: 'perfect_run', icon: 'star', color: '#FFCC00', title: 'Perfect Run', desc: 'Score 50 with no misses', reward: 100 },
    { id: 'hundred_club', icon: 'hundred', color: '#34C759', title: '100 Club', desc: 'Reach a score of 100', reward: 200 },
    { id: 'tap_master', icon: 'crown', color: '#AF52DE', title: 'Tap Master', desc: 'Score 150 in one round', reward: 300 },
    { id: 'no_miss', icon: 'target', color: '#5E5CE6', title: 'No Miss', desc: 'Complete a round with zero misses', reward: 75 },
    { id: 'high_score', icon: 'chart', color: '#FF3B30', title: 'High Score', desc: 'Beat your best score 5 times', reward: 150 }
  ];

  function checkAchievements() {
    const a = G.data.achievements;
    const g = G.game;
    const newly = [];
    const unlock = (id) => { if (!a[id]) { a[id] = true; newly.push(id); } };

    if (G.data.stats.taps > 0) unlock('first_tap');
    if (g.score >= 30) unlock('speed_demon');
    if (g.score >= 50 && g.misses === 0 && g.hits >= 50) unlock('perfect_run');
    if (g.score >= 100) unlock('hundred_club');
    if (g.score >= 150) unlock('tap_master');
    if (g.misses === 0 && g.hits >= 20) unlock('no_miss');
    if (G.data.stats.games >= 5 && g.score >= G.data.best && g.score > 0) unlock('high_score');

    newly.forEach(id => {
      const ach = ACHIEVEMENTS.find(x => x.id === id);
      if (ach) G.data.coins += ach.reward;
    });
    if (newly.length) save();
    return newly;
  }

  /* ============================================================
     PROGRESSION
     ============================================================ */
  function xpForLevel(l) {
    if (l >= 20) return Infinity;
    return Math.floor(100 * Math.pow(1.35, l - 1));
  }
  function addXp(amount) {
    G.data.xp += amount;
    while (G.data.level < 20 && G.data.xp >= xpForLevel(G.data.level)) {
      G.data.xp -= xpForLevel(G.data.level);
      G.data.level++;
    }
    save();
  }
  function addCoins(amount) {
    G.data.coins += amount;
    G.data.stats.totalCoins += amount;
    save();
  }

  /* ============================================================
     APPLY COSMETICS
     ============================================================ */
  function applyCosmetics() {
    const eq = G.data.equipped;
    const bg = findItem(eq.background);
    const bgVal = bg ? bg.bg : '';
    // Only apply background if not overridden by theme — default clean
    const bgColor = bgVal || '';

    document.body.style.background = '';
    $('app').style.background = '';
    document.querySelectorAll('.screen').forEach(s => { s.style.background = ''; });

    // Apply button radius
    const btn = findItem(eq.button);
    const radius = btn ? btn.radius : '14px';
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(b => {
      b.style.borderRadius = radius;
    });
    document.querySelectorAll('.store-card-btn').forEach(b => {
      b.style.borderRadius = Math.min(parseInt(radius), 100) + 'px';
    });

    if (G.data.settings.animations) document.body.classList.remove('no-anim');
    else document.body.classList.add('no-anim');
  }

  function getThemeColor() {
    const t = findItem(G.data.equipped.theme);
    return t ? t.color : '#0A84FF';
  }

  /* ============================================================
     HOME
     ============================================================ */
  function updateHome() {
    $('homeBest').textContent = G.data.best;
    $('homeLevel').textContent = G.data.level;
    $('homeCoins').textContent = G.data.coins;
  }

  /* ============================================================
     STORE UI
     ============================================================ */
  function renderStore() {
    $('storeCoins').textContent = G.data.coins;
    const cat = G.storeCat;
    const items = COSMETICS[cat];
    const grid = $('storeGrid');
    grid.innerHTML = '';

    items.forEach(item => {
      const owned = isOwned(item.id);
      const unlocked = isUnlocked(item.id);
      const equipped = getEquipped(cat) === item.id;

      const card = document.createElement('div');
      card.className = 'store-card';

      const preview = document.createElement('div');
      preview.className = 'store-card-preview';
      preview.appendChild(buildPreview(cat, item));

      if (equipped) addBadge(preview, t('equipped'), 'owned');
      else if (owned) addBadge(preview, t('owned'), 'owned');
      else if (!unlocked) addBadge(preview, t('levelShort') + ' ' + LEVEL_UNLOCKS[item.id], 'level');
      else if (item.price >= 300) addBadge(preview, 'Premium', 'premium');
      else if (item.price === 0) addBadge(preview, 'Free', 'free');

      card.appendChild(preview);

      const body = document.createElement('div');
      body.className = 'store-card-body';

      const name = document.createElement('div');
      name.className = 'store-card-name';
      name.textContent = item.name;
      body.appendChild(name);

      const meta = document.createElement('div');
      meta.className = 'store-card-meta';
      meta.textContent = owned ? t('owned') : (unlocked ? item.price + ' ' + t('coinsShort') : t('levelShort') + ' ' + LEVEL_UNLOCKS[item.id]);
      body.appendChild(meta);

      const btn = document.createElement('button');
      btn.className = 'store-card-btn';
      if (equipped) { btn.classList.add('equipped'); btn.textContent = t('equipped'); }
      else if (owned) {
        btn.classList.add('equip'); btn.textContent = t('equip');
        btn.addEventListener('click', () => equipItem(cat, item.id));
      } else if (!unlocked) {
        btn.classList.add('locked'); btn.textContent = t('locked');
      } else {
        btn.classList.add('buy'); btn.textContent = t('buy');
        btn.addEventListener('click', () => tryBuy(cat, item));
      }
      body.appendChild(btn);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function addBadge(parent, text, cls) {
    const b = document.createElement('div');
    b.className = 'badge ' + (cls || '');
    b.textContent = text;
    parent.appendChild(b);
  }

  function buildPreview(cat, item) {
    const wrap = document.createElement('div');
    const color = getThemeColor();

    if (cat === 'targets') {
      const s = 58;
      wrap.style.width = s + 'px';
      wrap.style.height = s + 'px';
      const shape = document.createElement('div');
      shape.style.width = s + 'px';
      shape.style.height = s + 'px';
      shape.className = 'shape-' + item.shape;
      if (item.shape === 'ring') {
        shape.style.border = '6px solid ' + color;
        shape.style.background = 'transparent';
      } else {
        shape.style.background = color;
      }
      if (item.id === 'minimal') {
        shape.style.opacity = '0.7';
        shape.style.width = '38px';
        shape.style.height = '38px';
      }
      wrap.style.display = 'flex';
      wrap.style.alignItems = 'center';
      wrap.style.justifyContent = 'center';
      wrap.appendChild(shape);
    } else if (cat === 'themes') {
      const dot = document.createElement('div');
      dot.style.width = '46px';
      dot.style.height = '46px';
      dot.style.borderRadius = '50%';
      dot.style.background = item.color;
      dot.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(255,255,255,0.25)';
      wrap.appendChild(dot);
    } else if (cat === 'effects') {
      const ring = document.createElement('div');
      ring.style.width = '44px';
      ring.style.height = '44px';
      ring.style.borderRadius = '50%';
      if (item.type === 'fill') {
        ring.style.background = color;
        ring.style.opacity = '0.85';
      } else if (item.type === 'ring') {
        ring.style.border = '3px solid ' + color;
      } else {
        ring.style.border = '2px solid ' + color;
        ring.style.boxShadow = '0 0 0 6px ' + hexA(color, 0.15);
      }
      wrap.appendChild(ring);
    } else if (cat === 'buttons') {
      const pill = document.createElement('div');
      pill.style.width = '58px';
      pill.style.height = '28px';
      pill.style.background = color;
      pill.style.borderRadius = item.radius;
      wrap.appendChild(pill);
    } else if (cat === 'backgrounds') {
      const sw = document.createElement('div');
      sw.style.width = '52px';
      sw.style.height = '52px';
      sw.style.borderRadius = '12px';
      sw.style.background = item.bg;
      sw.style.boxShadow = 'inset 0 0 0 1px rgba(60,60,67,0.10)';
      wrap.appendChild(sw);
    }
    return wrap;
  }

  function hexA(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function tryBuy(cat, item) {
    if (G.data.coins < item.price) {
      showToast(t('notEnoughCoins'));
      haptic(12);
      return;
    }
    openConfirm({
      title: item.name,
      message: t('purchaseSheet') + ' ' + item.price + ' ' + t('purchaseQuestion'),
      actions: [
        { label: t('cancel') },
        { label: t('buyConfirm'), bold: true, onClick: () => {
          if (G.data.coins < item.price) { showToast(t('notEnoughCoins')); return; }
          G.data.coins -= item.price;
          G.data.purchased.push(item.id);
          G.data.equipped[eqKey(cat)] = item.id;
          save();
          applyCosmetics();
          renderStore();
          updateHome();
          haptic(18);
          showToast(t('purchased'));
        }}
      ]
    });
  }

  function equipItem(cat, id) {
    G.data.equipped[eqKey(cat)] = id;
    save();
    applyCosmetics();
    renderStore();
    haptic(8);
  }

  /* ============================================================
     STATS UI
     ============================================================ */
  function renderStats() {
    const s = G.data.stats;
    const avg = s.reactionSamples > 0 ? (s.totalReaction / s.reactionSamples) : 0;
    $('statHeroBest').textContent = G.data.best;

    const rows = [
      [t('gamesPlayed'), s.games],
      [t('totalTaps'), s.taps],
      [t('successfulTaps'), s.hits],
      [t('missedTaps'), s.misses],
      [t('avgReaction'), avg > 0 ? Math.round(avg) + ' ms' : '—'],
      [t('highestCombo'), s.bestCombo],
      [t('totalCoins'), s.totalCoins],
      [t('level'), G.data.level],
      [t('xp'), G.data.xp + ' / ' + (xpForLevel(G.data.level) === Infinity ? 'MAX' : xpForLevel(G.data.level))]
    ];

    const list = $('statsList');
    list.innerHTML = '';
    rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'group-row no-icon';
      row.innerHTML = `<div class="row-main"><div class="row-title">${label}</div></div><div class="row-value num">${value}</div>`;
      list.appendChild(row);
    });

    const unlockedCount = ACHIEVEMENTS.filter(a => G.data.achievements[a.id]).length;
    $('achievementsProgress').textContent = unlockedCount + ' ' + t('unlockedOf') + ' ' + ACHIEVEMENTS.length + ' ' + t('unlocked');
  }

  /* ============================================================
     ACHIEVEMENTS UI
     ============================================================ */
  function renderAchievements() {
    const list = $('achievementsList');
    list.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const unlocked = !!G.data.achievements[a.id];
      const row = document.createElement('div');
      row.className = 'group-row achv-row' + (unlocked ? '' : ' locked');
      row.innerHTML = `
        <div class="row-icon" style="background: ${a.color};">${ICONS[a.icon] || ''}</div>
        <div class="row-main">
          <div class="row-title">${a.title}</div>
          <div class="row-sub">${a.desc}</div>
          <div class="achv-reward">+${a.reward} ${t('coinsShort')}</div>
        </div>
        <div class="achv-check">${unlocked ? ICONS.check : ''}</div>
      `;
      list.appendChild(row);
    });
  }

  /* ============================================================
     SETTINGS UI
     ============================================================ */
  function renderSettings() {
    const s = G.data.settings;
    ['sound', 'music', 'haptics', 'notifications', 'targetFeedback', 'animations'].forEach(k => {
      const sw = $('sw-' + k);
      if (sw) sw.classList.toggle('on', !!s[k]);
    });
    applyTranslations();
  }

  /* ============================================================
     GAME LOGIC
     ============================================================ */
  const DIFFICULTY = {
    easy:   { duration: 36, baseSize: 96, minSize: 62, ramp: 160 },
    normal: { duration: 30, baseSize: 84, minSize: 50, ramp: 120 },
    hard:   { duration: 24, baseSize: 74, minSize: 44, ramp: 90 }
  };

  function startGame() {
    initAudio();
    const diff = DIFFICULTY[G.data.settings.difficulty] || DIFFICULTY.normal;

    const g = G.game;
    g.active = false;
    g.paused = false;
    g.score = 0;
    g.timeLeft = diff.duration;
    g.duration = diff.duration;
    g.combo = 0;
    g.maxCombo = 0;
    g.hits = 0;
    g.misses = 0;
    g.taps = 0;
    g.reactionTotal = 0;
    g.reactionCount = 0;
    g.lastTap = 0;
    g.difficulty = 0;

    $('gameScore').textContent = '0';
    $('gameTimer').textContent = diff.duration.toFixed(1);
    $('timerBar').style.width = '100%';
    $('timerBar').classList.remove('warn', 'danger');
    $('gameCombo').classList.remove('show');

    if (g.targetEl) { g.targetEl.remove(); g.targetEl = null; }
    if (g.spawnTO) { clearTimeout(g.spawnTO); g.spawnTO = null; }

    go('gameScreen', 'push');

    let count = 3;
    $('countdownNumber').textContent = count;
    $('countdownOverlay').classList.remove('hidden');
    sfxCount();
    haptic(12);

    g.countInt = setInterval(() => {
      count--;
      if (count > 0) {
        $('countdownNumber').textContent = count;
        const el = $('countdownNumber');
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = 'countPop 0.55s cubic-bezier(0.34, 1.4, 0.5, 1) both';
        sfxCount();
        haptic(12);
      } else {
        clearInterval(g.countInt);
        g.countInt = null;
        $('countdownOverlay').classList.add('hidden');
        haptic(22);
        g.active = true;
        g.startTime = performance.now();
        startTimer();
        spawnTarget();
      }
    }, 650);
  }

  function startTimer() {
    const g = G.game;
    const start = performance.now();
    const totalMs = g.duration * 1000;

    g.timerInt = setInterval(() => {
      if (!g.active) return;
      if (g.paused) { start += 50; return; }
      const elapsed = performance.now() - start;
      g.timeLeft = Math.max(0, (totalMs - elapsed) / 1000);
      const tleft = g.timeLeft;
      $('gameTimer').textContent = tleft.toFixed(1);
      const pct = tleft / g.duration * 100;
      const bar = $('timerBar');
      bar.style.width = pct + '%';
      bar.classList.toggle('warn', pct <= 50 && pct > 20);
      bar.classList.toggle('danger', pct <= 20);
      if (g.timeLeft <= 0) endGame();
    }, 50);
  }

  function spawnTarget() {
    const g = G.game;
    if (!g.active) return;
    if (g.targetEl) { g.targetEl.remove(); g.targetEl = null; }

    const area = $('gameArea');
    const W = area.clientWidth;
    const H = area.clientHeight;
    if (W <= 0 || H <= 0) return;

    const diff = DIFFICULTY[G.data.settings.difficulty] || DIFFICULTY.normal;
    const rampT = Math.min(1, g.score / diff.ramp);
    g.difficulty = rampT;

    const size = Math.round(diff.baseSize - rampT * (diff.baseSize - diff.minSize));
    const pad = Math.max(16, Math.round(size * 0.35));
    const maxX = W - size - pad * 2;
    const maxY = H - size - pad * 2;
    if (maxX < 0 || maxY < 0) return;

    const x = pad + Math.random() * maxX;
    const y = pad + Math.random() * maxY;

    const target = document.createElement('div');
    target.className = 'target appear';

    const shapeItem = findItem(G.data.equipped.target);
    const shape = shapeItem ? shapeItem.shape : 'circle';
    target.classList.add('shape-' + shape);

    const color = getThemeColor();
    if (shape === 'ring') {
      target.style.border = '6px solid ' + color;
      target.style.background = 'transparent';
    } else {
      target.style.background = color;
    }
    if (G.data.equipped.target === 'minimal') {
      target.style.opacity = '0.75';
    }

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.dataset.cx = (x + size / 2);
    target.dataset.cy = (y + size / 2);
    target.dataset.size = size;

    target.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onHit(target);
    }, { passive: false });

    area.appendChild(target);
    g.targetEl = target;
  }

  function onHit(target) {
    const g = G.game;
    if (!g.active || g.paused || !target || !target.parentNode) return;

    const now = performance.now();
    const rt = g.lastTap > 0 ? now - g.lastTap : 0;
    if (rt > 0 && rt < 2500) { g.reactionTotal += rt; g.reactionCount++; }
    g.lastTap = now;

    g.score++;
    g.combo++;
    if (g.combo > g.maxCombo) g.maxCombo = g.combo;
    g.hits++;
    g.taps++;

    const scoreEl = $('gameScore');
    scoreEl.textContent = g.score;
    scoreEl.classList.add('pop');
    setTimeout(() => scoreEl.classList.remove('pop'), 140);

    if (g.combo >= 3) {
      const cEl = $('gameCombo');
      cEl.textContent = t('combo') + ' ×' + g.combo;
      cEl.classList.add('show');
    }

    G.data.stats.taps++;
    G.data.stats.hits++;
    if (g.maxCombo > G.data.stats.bestCombo) G.data.stats.bestCombo = g.maxCombo;
    if (rt > 0 && rt < 2500) {
      G.data.stats.totalReaction += rt;
      G.data.stats.reactionSamples++;
    }

    sfxTap();
    haptic(7);

    target.classList.add('hit');
    const cx = parseFloat(target.dataset.cx);
    const cy = parseFloat(target.dataset.cy);
    const size = parseFloat(target.dataset.size);
    spawnEffect(cx, cy, size);

    setTimeout(() => {
      if (target.parentNode) target.remove();
      if (g.targetEl === target) g.targetEl = null;
    }, 160);

    if (g.spawnTO) clearTimeout(g.spawnTO);
    g.spawnTO = setTimeout(() => { if (g.active && !g.paused) spawnTarget(); }, 50);
  }

  function onMiss() {
    const g = G.game;
    if (!g.active || g.paused) return;
    g.combo = 0;
    g.misses++;
    g.taps++;
    G.data.stats.taps++;
    G.data.stats.misses++;
    sfxMiss();
    haptic(5);
    $('gameCombo').classList.remove('show');

    const area = $('gameArea');
    area.style.transition = 'background 0.14s ease';
    area.style.background = 'rgba(255, 59, 48, 0.05)';
    setTimeout(() => { area.style.background = 'transparent'; }, 130);
  }

  function spawnEffect(cx, cy, size) {
    const effectItem = findItem(G.data.equipped.effect);
    const type = effectItem ? effectItem.type : 'ring';
    const color = getThemeColor();
    const area = $('gameArea');

    if (type === 'spark') {
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i;
        const el = document.createElement('div');
        el.className = 'hit-effect';
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.width = '7px';
        el.style.height = '7px';
        el.style.background = color;
        el.style.animation = 'none';
        area.appendChild(el);
        const dx = Math.cos(angle) * 42;
        const dy = Math.sin(angle) * 42;
        requestAnimationFrame(() => {
          el.style.transition = 'transform 0.44s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.44s ease';
          el.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0.2)`;
          el.style.opacity = '0';
        });
        setTimeout(() => el.remove(), 500);
      }
      return;
    }

    const el = document.createElement('div');
    el.className = 'hit-effect';
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';

    if (type === 'fill') {
      el.style.width = size + 'px'; el.style.height = size + 'px';
      el.style.background = color; el.style.opacity = '0.30';
    } else if (type === 'particles') {
      el.style.width = size * 1.2 + 'px'; el.style.height = size * 1.2 + 'px';
      el.style.background = hexA(color, 0.18);
    } else {
      el.style.width = size + 'px'; el.style.height = size + 'px';
      el.style.border = '3px solid ' + color; el.style.background = 'transparent';
    }
    area.appendChild(el);
    setTimeout(() => el.remove(), 550);

    if (G.data.settings.targetFeedback) {
      const pulse = document.createElement('div');
      pulse.className = 'hit-effect';
      pulse.style.left = cx + 'px';
      pulse.style.top = cy + 'px';
      pulse.style.width = size * 0.6 + 'px';
      pulse.style.height = size * 0.6 + 'px';
      pulse.style.border = '2px solid ' + color;
      pulse.style.background = 'transparent';
      pulse.style.opacity = '0.5';
      area.appendChild(pulse);
      setTimeout(() => pulse.remove(), 550);
    }
  }

  $('gameArea').addEventListener('pointerdown', (e) => {
    if (!G.game.active || G.game.paused) return;
    if (e.target.closest('.target')) return;
    if (G.game.targetEl) onMiss();
  });

  function endGame() {
    const g = G.game;
    if (!g.active) return;
    g.active = false;
    g.paused = false;

    if (g.timerInt) { clearInterval(g.timerInt); g.timerInt = null; }
    if (g.countInt) { clearInterval(g.countInt); g.countInt = null; }
    if (g.spawnTO) { clearTimeout(g.spawnTO); g.spawnTO = null; }
    if (g.targetEl) { g.targetEl.remove(); g.targetEl = null; }

    const coinsEarned = Math.floor(g.score * 1.5) + Math.floor(g.maxCombo * 2);
    const xpEarned = Math.floor(g.score * 2) + 10;
    const accuracy = g.taps > 0 ? Math.round(g.hits / g.taps * 100) : 0;
    const avgReaction = g.reactionCount > 0 ? Math.round(g.reactionTotal / g.reactionCount) : 0;

    G.data.stats.games++;

    const isNewBest = g.score > G.data.best;
    if (isNewBest) G.data.best = g.score;

    addCoins(coinsEarned);
    addXp(xpEarned);
    save();

    const newly = checkAchievements();

    sfxResult();
    haptic(28);

    $('resultScore').textContent = g.score;
    $('resultBest').textContent = G.data.best;
    $('resultAccuracy').textContent = accuracy + '%';
    $('resultReaction').textContent = avgReaction > 0 ? avgReaction + ' ms' : '—';
    $('resultMisses').textContent = g.misses;
    $('resultCoins').textContent = '+' + coinsEarned;
    $('resultXp').textContent = '+' + xpEarned;
    $('newBestBadge').classList.toggle('hidden', !isNewBest);

    go('resultScreen', 'replace');

    if (newly.length) {
      const first = ACHIEVEMENTS.find(a => a.id === newly[0]);
      if (first) setTimeout(() => showToast(t('achievement') + ': ' + first.title), 700);
    }
  }

  /* ============================================================
     PAUSE / RESUME / ABANDON
     ============================================================ */
  function pauseGame() {
    const g = G.game;
    if (!g.active) return;
    g.paused = true;
    if (g.spawnTO) { clearTimeout(g.spawnTO); g.spawnTO = null; }
    if (g.targetEl) { g.targetEl.style.pointerEvents = 'none'; }
  }

  function resumeGame() {
    const g = G.game;
    if (!g.active) return;
    g.paused = false;
    if (g.targetEl) { g.targetEl.style.pointerEvents = 'auto'; }
    if (!g.targetEl) spawnTarget();
  }

  function abandonGame() {
    const g = G.game;
    g.active = false;
    g.paused = false;
    if (g.timerInt) { clearInterval(g.timerInt); g.timerInt = null; }
    if (g.countInt) { clearInterval(g.countInt); g.countInt = null; }
    if (g.spawnTO) { clearTimeout(g.spawnTO); g.spawnTO = null; }
    if (g.targetEl) { g.targetEl.remove(); g.targetEl = null; }
  }

  /* ============================================================
     LANGUAGE SELECTION
     ============================================================ */
  function openLanguageSheet() {
    openSelect({
      title: t('selectLanguage'),
      options: [
        {
          value: 'en',
          label: 'English',
          selected: (G.data.settings.language || 'en') === 'en'
        },
        {
          value: 'ar',
          label: 'العربية',
          selected: (G.data.settings.language || 'en') === 'ar'
        }
      ],
      onPick: (val) => {
        if (val === G.data.settings.language) return;
        G.data.settings.language = val;
        save();
        applyDirection();
        applyTranslations();
        renderSettings();
        // Re-render screens whose visible strings depend on language
        renderStats();
        renderAchievements();
        if (G.stack.indexOf('storeScreen') !== -1) renderStore();
      }
    });
  }

  /* ============================================================
     APPEARANCE SELECTION
     ============================================================ */
  function openAppearanceSheet() {
    openSelect({
      title: t('selectAppearance'),
      options: [
        {
          value: 'light',
          label: t('appearanceLight'),
          preview: 'light',
          selected: (G.data.settings.appearance || 'system') === 'light'
        },
        {
          value: 'dark',
          label: t('appearanceDark'),
          preview: 'dark',
          selected: (G.data.settings.appearance || 'system') === 'dark'
        },
        {
          value: 'system',
          label: t('appearanceSystem'),
          sub: 'Follows device settings',
          preview: 'system',
          selected: (G.data.settings.appearance || 'system') === 'system'
        }
      ],
      onPick: (val) => {
        G.data.settings.appearance = val;
        save();
        applyAppearance();
        applyTranslations();
      }
    });
  }

  /* ============================================================
     DIFFICULTY SELECTION
     ============================================================ */
  function openDifficultySheet() {
    openSelect({
      title: t('selectDifficulty'),
      options: [
        { value: 'easy',   label: t('difficultyEasy'),   selected: G.data.settings.difficulty === 'easy' },
        { value: 'normal', label: t('difficultyNormal'), selected: G.data.settings.difficulty === 'normal' },
        { value: 'hard',   label: t('difficultyHard'),   selected: G.data.settings.difficulty === 'hard' }
      ],
      onPick: (val) => {
        G.data.settings.difficulty = val;
        save();
        applyTranslations();
      }
    });
  }

  /* ============================================================
     EVENT BINDINGS
     ============================================================ */

  // Splash → Home
  setTimeout(() => {
    const splash = $('splashScreen');
    splash.classList.add('splash-out');
    setTimeout(() => {
      go('homeScreen', 'replace');
      G.stack = ['homeScreen'];
    }, 420);
  }, 1500);

  // Home
  $('playBtn').addEventListener('click', () => { haptic(10); startGame(); });
  $('storeBtn').addEventListener('click', () => { haptic(8); renderStore(); go('storeScreen', 'push'); });
  $('statsBtn').addEventListener('click', () => { haptic(8); renderStats(); go('statsScreen', 'push'); });
  $('settingsBtn').addEventListener('click', () => { haptic(8); renderSettings(); go('settingsScreen', 'push'); });

  // Store
  $('storeBackBtn').addEventListener('click', () => { haptic(6); go('homeScreen', 'pop'); });
  document.querySelectorAll('#storeSegments button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#storeSegments button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      G.storeCat = btn.dataset.cat;
      haptic(6);
      renderStore();
    });
  });

  // Stats
  $('statsBackBtn').addEventListener('click', () => { haptic(6); go('homeScreen', 'pop'); });
  $('achievementsBtn').addEventListener('click', () => { haptic(6); renderAchievements(); go('achievementsScreen', 'push'); });
  $('achievementsBackBtn').addEventListener('click', () => { haptic(6); go('statsScreen', 'pop'); });

  // Settings
  $('settingsBackBtn').addEventListener('click', () => { haptic(6); go('homeScreen', 'pop'); });

  // Settings selectors
  $('languageBtn').addEventListener('click', () => { haptic(8); openLanguageSheet(); });
  $('appearanceBtn').addEventListener('click', () => { haptic(8); openAppearanceSheet(); });
  $('difficultyBtn').addEventListener('click', () => { haptic(8); openDifficultySheet(); });

  // Toggles
  ['sound', 'music', 'haptics', 'notifications', 'targetFeedback', 'animations'].forEach(k => {
    const sw = $('sw-' + k);
    if (!sw) return;
    sw.addEventListener('click', () => {
      G.data.settings[k] = !G.data.settings[k];
      save();
      sw.classList.toggle('on', G.data.settings[k]);
      haptic(8);
      if (k === 'animations') applyCosmetics();
      if (k === 'sound' && G.data.settings[k]) initAudio();
    });
  });

  // Restore / reset / legal
  $('restoreBtn').addEventListener('click', () => {
    haptic(8);
    openConfirm({
      title: t('restoreTitle'),
      message: t('restoreMessage'),
      actions: [{ label: t('ok'), bold: true }]
    });
  });

  $('resetProgressBtn').addEventListener('click', () => {
    haptic(10);
    openConfirm({
      title: t('resetTitle'),
      message: t('resetMessage'),
      actions: [
        { label: t('cancel') },
        { label: t('resetConfirm'), destructive: true, bold: true, onClick: () => {
          localStorage.removeItem(KEY);
          G.data = JSON.parse(JSON.stringify(DEFAULT));
          save();
          applyDirection();
          applyAppearance();
          applyCosmetics();
          applyTranslations();
          renderSettings();
          updateHome();
          showToast(t('resetDone'));
          go('homeScreen', 'pop');
        }}
      ]
    });
  });

  $('privacyBtn').addEventListener('click', () => {
    haptic(6);
    openConfirm({
      title: t('privacyTitle'),
      message: t('privacyMessage'),
      actions: [{ label: t('ok'), bold: true }]
    });
  });
  $('termsBtn').addEventListener('click', () => {
    haptic(6);
    openConfirm({
      title: t('termsTitle'),
      message: t('termsMessage'),
      actions: [{ label: t('ok'), bold: true }]
    });
  });

  // Result
  $('playAgainBtn').addEventListener('click', () => { haptic(10); startGame(); });
  $('homeFromResultBtn').addEventListener('click', () => {
    haptic(6);
    updateHome();
    go('homeScreen', 'pop');
  });

  // Game Exit
  $('gameExitBtn').addEventListener('click', () => {
    const g = G.game;
    if (!g.active) {
      abandonGame();
      updateHome();
      go('homeScreen', 'pop');
      return;
    }
    haptic(10);
    pauseGame();
    openConfirm({
      title: t('exitTitle'),
      message: t('exitMessage'),
      actions: [
        { label: t('exitContinue'), bold: true, onClick: () => { resumeGame(); } },
        { label: t('exitConfirm'), destructive: true, onClick: () => {
          abandonGame();
          updateHome();
          go('homeScreen', 'pop');
        }}
      ]
    });
  });

  /* ============================================================
     GLOBAL LISTENERS
     ============================================================ */
  document.addEventListener('pointerdown', function once() {
    initAudio();
    document.removeEventListener('pointerdown', once);
  }, { once: true });

  document.addEventListener('touchmove', (e) => {
    if (e.target.closest('#gameScreen') || e.target.closest('#homeScreen')) {
      if (!e.target.closest('.screen-content') && !e.target.closest('.home-inner')) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && G.game.active && !G.game.paused) {
      pauseGame();
      openConfirm({
        title: t('pausedTitle'),
        message: t('pausedMessage'),
        actions: [{ label: t('pausedContinue'), bold: true, onClick: () => resumeGame() }]
      });
    }
  });

  // Android Back button / Escape key — dismiss topmost overlay first
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (G.sheet.open) { closeSelect(true); return; }
    if (G.confirm.open) { closeConfirm(true); return; }
  });

  // Re-place target on resize / orientation change
  let resizeTO = null;
  function handleResize() {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      if (G.game.targetEl && G.game.active && !G.game.paused) {
        const t = G.game.targetEl;
        t.remove();
        G.game.targetEl = null;
        spawnTarget();
      }
    }, 150);
  }
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(handleResize, 200);
  });

  /* ============================================================
     INIT
     ============================================================ */
  applyDirection();
  applyAppearance();
  applyCosmetics();
  applyTranslations();
  updateHome();
  renderSettings();

})();
