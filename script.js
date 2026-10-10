    (function() {
      'use strict';

      // ================================================================
      // TRANSLATIONS
      // ================================================================
      const TRANSLATIONS = {
        en: {
          onboard1Headline: "One thing is enough.",
          onboard1Sub: "Forget the endless to-do lists. Choose one thing that matters today.",
          onboard2Headline: "Choose. Do. Done.",
          stepChoose: "Choose",
          stepChooseText: "Pick one thing.",
          stepDo: "Do",
          stepDoText: "Give it your attention.",
          stepDone: "Done",
          stepDoneText: "Finish your day with something accomplished.",
          onboard3Headline: "What's your one thing today?",
          firstTaskPlaceholder: "Write one thing you want to accomplish today...",
          howLong: "How long? (optional)",
          howLong2: "How long? (optional)",
          time5: "5 min",
          time10: "10 min",
          time20: "20 min",
          time30: "30+ min",
          continue: "Continue",
          back: "‹ Back",
          startMyDay: "Start My Day",
          skipForNow: "Skip for now",
          greetingMorning: "Good morning",
          greetingAfternoon: "Good afternoon",
          greetingEvening: "Good evening",
          todayLabel: "TODAY",
          complete: "Complete",
          doneTitle: "Done.",
          doneSub: "You did your one thing today.",
          emptyTodayTitle: "Your day starts with one thing.",
          emptyTodaySub: "Choose something worth doing today.",
          chooseOneThing: "Choose One Thing",
          historyTitle: "Your Progress",
          noHistoryTitle: "No history yet.",
          noHistorySub: "Complete your first One Thing to start building your history.",
          thingsCompleted: "Things completed",
          activeDays: "Active days",
          currentStreak: "Current streak",
          last14Days: "Last 14 days",
          yourName: "Your Name",
          oneThingMember: "One Thing member",
          name: "Name",
          notSet: "Not set",
          appearance: "Appearance",
          appearanceLight: "Light",
          appearanceDark: "Dark",
          appearanceSystem: "System",
          language: "Language",
          langEnglish: "English",
          langArabic: "العربية",
          notifications: "Notifications",
          off: "Off",
          on: "On",
          reminderTime: "Reminder time",
          support: "Support",
          contactSupport: "Contact Support",
          about: "About",
          tagline: "One day. One thing.",
          navToday: "Today",
          navHistory: "History",
          navProfile: "Profile",
          modalTitle: "What's your one thing?",
          modalSub: "Choose something worth doing today.",
          modalPlaceholder: "Write one thing...",
          addOneThing: "Add One Thing",
          cancel: "Cancel",
          done: "Done",
          dayStreak: "day streak",
          days: "days",
          day: "day",
          thingCompleted: "thing completed",
          thingsCompletedLower: "things completed",
          enterName: "Enter your name:",
          enterReminderTime: "Enter reminder time (e.g., 9:00 AM):",
          chooseAppearance: "Choose appearance",
          chooseLanguage: "Choose language",
          noTaskForDay: "No task recorded for this day.",
          completedOn: "Completed"
        },
        ar: {
          onboard1Headline: "شيء واحد يكفي.",
          onboard1Sub: "انسَ قوائم المهام اللانهائية. اختر شيئًا واحدًا يهم اليوم.",
          onboard2Headline: "اختر. افعل. انتهيت.",
          stepChoose: "اختر",
          stepChooseText: "اختر شيئًا واحدًا.",
          stepDo: "افعل",
          stepDoText: "أعطه انتباهك.",
          stepDone: "انتهيت",
          stepDoneText: "أنهِ يومك بإنجاز شيء ما.",
          onboard3Headline: "ما هو الشيء الواحد اليوم؟",
          firstTaskPlaceholder: "اكتب شيئًا واحدًا تريد إنجازه اليوم...",
          howLong: "كم المدة؟ (اختياري)",
          howLong2: "كم المدة؟ (اختياري)",
          time5: "٥ دقائق",
          time10: "١٠ دقائق",
          time20: "٢٠ دقيقة",
          time30: "٣٠+ دقيقة",
          continue: "متابعة",
          back: "‹ رجوع",
          startMyDay: "ابدأ يومي",
          skipForNow: "تخطي الآن",
          greetingMorning: "صباح الخير",
          greetingAfternoon: "مساء الخير",
          greetingEvening: "مساء الخير",
          todayLabel: "اليوم",
          complete: "إكمال",
          doneTitle: "تم.",
          doneSub: "لقد أنجزت شيئك الواحد اليوم.",
          emptyTodayTitle: "يومك يبدأ بشيء واحد.",
          emptyTodaySub: "اختر شيئًا يستحق فعله اليوم.",
          chooseOneThing: "اختر شيئًا واحدًا",
          historyTitle: "تقدمك",
          noHistoryTitle: "لا يوجد سجل بعد.",
          noHistorySub: "أكمل أول شيء واحد لتبدأ بناء سجلك.",
          thingsCompleted: "أشياء مكتملة",
          activeDays: "أيام نشطة",
          currentStreak: "السلسلة الحالية",
          last14Days: "آخر ١٤ يومًا",
          yourName: "اسمك",
          oneThingMember: "عضو One Thing",
          name: "الاسم",
          notSet: "غير محدد",
          appearance: "المظهر",
          appearanceLight: "فاتح",
          appearanceDark: "داكن",
          appearanceSystem: "النظام",
          language: "اللغة",
          langEnglish: "English",
          langArabic: "العربية",
          notifications: "الإشعارات",
          off: "معطل",
          on: "مفعل",
          reminderTime: "وقت التذكير",
          support: "الدعم",
          contactSupport: "اتصل بالدعم",
          about: "حول",
          tagline: "يوم واحد. شيء واحد.",
          navToday: "اليوم",
          navHistory: "السجل",
          navProfile: "الملف الشخصي",
          modalTitle: "ما هو الشيء الواحد؟",
          modalSub: "اختر شيئًا يستحق فعله اليوم.",
          modalPlaceholder: "اكتب شيئًا واحدًا...",
          addOneThing: "أضف شيئًا واحدًا",
          cancel: "إلغاء",
          done: "تم",
          dayStreak: "يوم متتالي",
          days: "أيام",
          day: "يوم",
          thingCompleted: "شيء مكتمل",
          thingsCompletedLower: "أشياء مكتملة",
          enterName: "أدخل اسمك:",
          enterReminderTime: "أدخل وقت التذكير (مثال: ٩:٠٠ ص):",
          chooseAppearance: "اختر المظهر",
          chooseLanguage: "اختر اللغة",
          noTaskForDay: "لا توجد مهمة مسجلة لهذا اليوم.",
          completedOn: "مكتمل"
        }
      };

      // ================================================================
      // STATE
      // ================================================================
      const STORAGE_KEY = 'one_thing_app_state_v2';

      let state = {
        onboardingComplete: false,
        userName: null,
        currentTask: null,
        completedDates: [],
        totalCompleted: 0,
        activeDays: 0,
        streak: 0,
        reminderTime: '9:00 AM',
        notificationsEnabled: false,
        language: 'en',
        appearance: 'system'
      };

      let selectedCalendarDate = null;
      let calendarDisplayMonth = new Date().getMonth();
      let calendarDisplayYear = new Date().getFullYear();

      function loadState() {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            state = { ...state, ...parsed };
          }
        } catch (e) { /* ignore */ }
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* ignore */ }
      }

      // ================================================================
      // DATE HELPERS
      // ================================================================
      function todayStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      }

      function formatDateKey(year, month, day) {
        return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      }

      function computeStreak() {
        if (!state.completedDates.length) return 0;
        const sorted = [...state.completedDates].sort().reverse();
        const today = todayStr();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;

        const mostRecent = sorted[0];
        if (mostRecent !== today && mostRecent !== yesterdayStr) return 0;

        let streak = 1;
        for (let i = 1; i < sorted.length; i++) {
          const prev = new Date(sorted[i-1] + 'T12:00:00');
          const curr = new Date(sorted[i] + 'T12:00:00');
          const diffDays = Math.round((prev - curr) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) streak++;
          else break;
        }
        return streak;
      }

      function recomputeStats() {
        state.totalCompleted = state.completedDates.length;
        state.activeDays = new Set(state.completedDates).size;
        state.streak = computeStreak();
      }

      // ================================================================
      // THEME
      // ================================================================
      function applyTheme() {
        const root = document.documentElement;
        let theme = state.appearance;

        if (theme === 'system') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = prefersDark ? 'dark' : 'light';
        }

        root.setAttribute('data-theme', theme);
        root.setAttribute('lang', state.language);
        root.setAttribute('dir', state.language === 'ar' ? 'rtl' : 'ltr');
      }

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (state.appearance === 'system') applyTheme();
      });

      // ================================================================
      // TRANSLATION
      // ================================================================
      function t(key) {
        return TRANSLATIONS[state.language]?.[key] || TRANSLATIONS.en[key] || key;
      }

      function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.dataset.i18n;
          el.textContent = t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const key = el.dataset.i18nPlaceholder;
          el.placeholder = t(key);
        });
      }

      // ================================================================
      // DOM REFS
      // ================================================================
      const appContent = document.getElementById('appContent');
      const onboarding = document.getElementById('onboarding');
      const bottomNav = document.getElementById('bottomNav');
      const splashScreen = document.getElementById('splashScreen');

      const onboardScreen1 = document.getElementById('onboardScreen1');
      const onboardScreen2 = document.getElementById('onboardScreen2');
      const onboardScreen3 = document.getElementById('onboardScreen3');
      const onboardFooter = document.getElementById('onboardFooter');
      const progressDots = document.getElementById('progressDots');
      const firstTaskInput = document.getElementById('firstTaskInput');
      const timeOptions = document.getElementById('timeOptions');

      const todayScreen = document.getElementById('todayScreen');
      const historyScreen = document.getElementById('historyScreen');
      const profileScreen = document.getElementById('profileScreen');

      const taskActiveState = document.getElementById('taskActiveState');
      const taskCompletedState = document.getElementById('taskCompletedState');
      const emptyTodayState = document.getElementById('emptyTodayState');
      const completeBtn = document.getElementById('completeBtn');
      const taskTitle = document.getElementById('taskTitle');
      const taskMeta = document.getElementById('taskMeta');
      const chooseOneThingBtn = document.getElementById('chooseOneThingBtn');
      const greetingText = document.getElementById('greetingText');

      const flameWrapper = document.getElementById('flameWrapper');
      const streakNumber = document.getElementById('streakNumber');
      const streakLabel = document.getElementById('streakLabel');
      const flameWrapperCompleted = document.getElementById('flameWrapperCompleted');
      const streakNumberCompleted = document.getElementById('streakNumberCompleted');
      const streakLabelCompleted = document.getElementById('streakLabelCompleted');

      const statTotalCompleted = document.getElementById('statTotalCompleted');
      const statActiveDays = document.getElementById('statActiveDays');
      const statStreak = document.getElementById('statStreak');
      const calendarMonth = document.getElementById('calendarMonth');
      const calendarGrid = document.getElementById('calendarGrid');
      const prevMonthBtn = document.getElementById('prevMonthBtn');
      const nextMonthBtn = document.getElementById('nextMonthBtn');
      const dayDetail = document.getElementById('dayDetail');
      const historyEmptyState = document.getElementById('historyEmptyState');
      const calendarContainer = document.getElementById('calendarContainer');
      const historyStats = document.getElementById('historyStats');

      const profileStreak = document.getElementById('profileStreak');
      const profileTotalCompleted = document.getElementById('profileTotalCompleted');
      const profileActiveDays = document.getElementById('profileActiveDays');
      const profileName = document.getElementById('profileName');
      const profileAvatar = document.getElementById('profileAvatar');
      const profileNameValue = document.getElementById('profileNameValue');
      const appearanceValue = document.getElementById('appearanceValue');
      const languageValue = document.getElementById('languageValue');
      const notificationValue = document.getElementById('notificationValue');
      const reminderTimeValue = document.getElementById('reminderTimeValue');

      const taskModal = document.getElementById('taskModal');
      const modalTaskInput = document.getElementById('modalTaskInput');
      const modalTimeOptions = document.getElementById('modalTimeOptions');
      const modalAddBtn = document.getElementById('modalAddBtn');
      const modalCancelBtn = document.getElementById('modalCancelBtn');

      // Settings sheet elements
      const settingsSheetOverlay = document.getElementById('settingsSheetOverlay');
      const settingsSheet = document.getElementById('settingsSheet');
      const settingsSheetTitle = document.getElementById('settingsSheetTitle');
      const settingsSheetClose = document.getElementById('settingsSheetClose');
      const settingsSheetOptions = document.getElementById('settingsSheetOptions');

      // Time picker elements
      const timePickerOverlay = document.getElementById('timePickerOverlay');
      const timePickerSheet = document.getElementById('timePickerSheet');
      const timePickerTitle = document.getElementById('timePickerTitle');
      const timePickerClose = document.getElementById('timePickerClose');
      const hourScroll = document.getElementById('hourScroll');
      const minuteScroll = document.getElementById('minuteScroll');
      const periodScroll = document.getElementById('periodScroll');
      const timePickerPreview = document.getElementById('timePickerPreview');
      const timePickerConfirm = document.getElementById('timePickerConfirm');

      // ================================================================
      // NAVIGATION STATE
      // ================================================================
      let activeTab = 'today';
      let isOnboardingActive = false;

      // ================================================================
      // SETTINGS SHEET STATE
      // ================================================================
      let currentSettingsSheetType = null; // 'language' | 'appearance'

      // Time picker state
      let pickerHour = 9;
      let pickerMinute = '00';
      let pickerPeriod = 'AM';

      // ================================================================
      // ONBOARDING
      // ================================================================
      let onboardStep = 1;
      let selectedTime = null;
      let modalSelectedTime = null;

      function updateProgressDots() {
        const dots = progressDots.querySelectorAll('.progress-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === onboardStep - 1);
        });
      }

      function renderOnboardFooter() {
        onboardFooter.innerHTML = '';
        if (onboardStep === 1) {
          const btn = document.createElement('button');
          btn.className = 'btn-primary';
          btn.textContent = t('continue');
          btn.onclick = () => goToOnboardStep(2);
          onboardFooter.appendChild(btn);
        } else if (onboardStep === 2) {
          const btn = document.createElement('button');
          btn.className = 'btn-primary';
          btn.textContent = t('continue');
          btn.onclick = () => goToOnboardStep(3);
          onboardFooter.appendChild(btn);
          const back = document.createElement('button');
          back.className = 'back-button';
          back.textContent = t('back');
          back.onclick = () => goToOnboardStep(1);
          onboardFooter.appendChild(back);
        } else if (onboardStep === 3) {
          const btn = document.createElement('button');
          btn.className = 'btn-primary';
          btn.textContent = t('startMyDay');
          btn.onclick = () => finishOnboarding(false);
          onboardFooter.appendChild(btn);
          const skip = document.createElement('button');
          skip.className = 'btn-secondary';
          skip.textContent = t('skipForNow');
          skip.onclick = () => finishOnboarding(true);
          onboardFooter.appendChild(skip);
          const back = document.createElement('button');
          back.className = 'back-button';
          back.textContent = t('back');
          back.onclick = () => goToOnboardStep(2);
          onboardFooter.appendChild(back);
        }
      }

      function goToOnboardStep(step) {
        onboardStep = step;
        onboardScreen1.classList.add('hidden');
        onboardScreen2.classList.add('hidden');
        onboardScreen3.classList.add('hidden');
        if (step === 1) onboardScreen1.classList.remove('hidden');
        else if (step === 2) onboardScreen2.classList.remove('hidden');
        else if (step === 3) onboardScreen3.classList.remove('hidden');
        updateProgressDots();
        renderOnboardFooter();
      }

      timeOptions.addEventListener('click', (e) => {
        const opt = e.target.closest('.time-option');
        if (!opt) return;
        timeOptions.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
        opt.classList.add('selected');
        selectedTime = opt.dataset.time;
      });

      function finishOnboarding(skipped) {
        const taskTitleVal = firstTaskInput.value.trim();
        if (!skipped && taskTitleVal) {
          state.currentTask = {
            title: taskTitleVal,
            time: selectedTime || null
          };
        } else {
          state.currentTask = null;
        }
        state.onboardingComplete = true;
        saveState();

        isOnboardingActive = false;
        onboarding.classList.add('hidden');
        appContent.style.display = 'flex';
        bottomNav.style.display = 'flex';

        recomputeStats();
        renderToday();
        renderHistory();
        renderProfile();
        applyTranslations();
      }

      // ================================================================
      // REALISTIC FLAME IGNITION ANIMATION
      // ================================================================
      function igniteFlame(wrapper, streakNum, streakLbl, streakCount, isFirstTime) {
        if (!wrapper) return;

        if (streakNum) streakNum.textContent = streakCount;
        if (streakLbl) {
          streakLbl.textContent = t('dayStreak');
        }

        if (isFirstTime) {
          wrapper.classList.remove('ignited', 'flare', 'inactive');
          wrapper.classList.add('igniting');

          createSparks(wrapper, 6);

          setTimeout(() => {
            wrapper.classList.remove('igniting');
            wrapper.classList.add('ignited');
          }, 900);
        } else {
          wrapper.classList.remove('igniting');
          wrapper.classList.add('ignited', 'flare');
          createSparks(wrapper, 2);
          setTimeout(() => {
            wrapper.classList.remove('flare');
          }, 500);
        }

        if (streakNum) {
          streakNum.classList.remove('updating');
          void streakNum.offsetWidth;
          streakNum.classList.add('updating');
          setTimeout(() => streakNum.classList.remove('updating'), 400);
        }
      }

      function createSparks(wrapper, count) {
        for (let i = 0; i < count; i++) {
          const spark = document.createElement('div');
          spark.className = 'spark';
          const angle = (Math.PI * 0.6 * i) / count - Math.PI * 0.3 + (Math.random() - 0.5) * 0.5;
          const distance = 10 + Math.random() * 20;
          const x = Math.sin(angle) * distance;
          const y = -Math.cos(angle) * distance - 10;
          spark.style.setProperty('--spark-x', x + 'px');
          spark.style.setProperty('--spark-y', y + 'px');
          spark.style.left = '50%';
          spark.style.top = '50%';
          spark.style.background = i % 3 === 0 ? 'var(--flame-core)' : (i % 3 === 1 ? 'var(--flame-inner)' : 'var(--flame-mid-2)');
          spark.style.width = (2 + Math.random() * 2) + 'px';
          spark.style.height = spark.style.width;
          wrapper.appendChild(spark);

          requestAnimationFrame(() => {
            spark.classList.add('animate');
          });

          setTimeout(() => {
            if (spark.parentNode) spark.parentNode.removeChild(spark);
          }, 1100);
        }
      }

      // ================================================================
      // RENDER TODAY
      // ================================================================
      function renderToday() {
        const hour = new Date().getHours();
        let greetingKey = 'greetingMorning';
        if (hour >= 12 && hour < 18) greetingKey = 'greetingAfternoon';
        else if (hour >= 18) greetingKey = 'greetingEvening';
        greetingText.textContent = t(greetingKey);

        const hasTask = state.currentTask && state.currentTask.title;
        const isCompletedToday = state.completedDates.includes(todayStr());
        const streakCount = state.streak;

        taskActiveState.classList.add('hidden');
        taskCompletedState.classList.add('hidden');
        emptyTodayState.classList.add('hidden');

        if (streakCount > 0) {
          flameWrapper.classList.add('ignited');
          flameWrapper.classList.remove('inactive');
        } else {
          flameWrapper.classList.remove('ignited');
          flameWrapper.classList.add('inactive');
        }
        streakNumber.textContent = streakCount;
        streakLabel.textContent = t('dayStreak');

        if (isCompletedToday) {
          taskCompletedState.classList.remove('hidden');
          if (flameWrapperCompleted) {
            flameWrapperCompleted.classList.add('ignited');
            flameWrapperCompleted.classList.remove('inactive');
          }
          streakNumberCompleted.textContent = streakCount;
          streakLabelCompleted.textContent = t('dayStreak');
        } else if (hasTask) {
          taskActiveState.classList.remove('hidden');
          taskTitle.textContent = state.currentTask.title;
          taskMeta.textContent = state.currentTask.time || '';
        } else {
          emptyTodayState.classList.remove('hidden');
        }
      }

      completeBtn.addEventListener('click', () => {
        if (!state.currentTask) return;

        const wasFirstCompletion = state.completedDates.length === 0;

        const today = todayStr();
        if (!state.completedDates.includes(today)) {
          state.completedDates.push(today);
        }
        recomputeStats();
        saveState();

        completeBtn.style.transform = 'scale(0.96)';
        setTimeout(() => {
          completeBtn.style.transform = '';
          renderToday();
          renderHistory();
          renderProfile();

          const wrapper = document.getElementById('flameWrapperCompleted');
          const num = document.getElementById('streakNumberCompleted');
          const lbl = document.getElementById('streakLabelCompleted');
          if (wrapper) {
            igniteFlame(wrapper, num, lbl, state.streak, wasFirstCompletion);
          }
        }, 120);
      });

      chooseOneThingBtn.addEventListener('click', () => {
        modalTaskInput.value = '';
        modalSelectedTime = null;
        modalTimeOptions.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
        taskModal.classList.add('open');
        setTimeout(() => modalTaskInput.focus(), 300);
      });

      modalTimeOptions.addEventListener('click', (e) => {
        const opt = e.target.closest('.time-option');
        if (!opt) return;
        modalTimeOptions.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
        opt.classList.add('selected');
        modalSelectedTime = opt.dataset.time;
      });

      modalAddBtn.addEventListener('click', () => {
        const title = modalTaskInput.value.trim();
        if (!title) { modalTaskInput.focus(); return; }
        state.currentTask = { title: title, time: modalSelectedTime || null };
        saveState();
        taskModal.classList.remove('open');
        renderToday();
      });

      modalCancelBtn.addEventListener('click', () => taskModal.classList.remove('open'));
      taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) taskModal.classList.remove('open');
      });

      // ================================================================
      // SETTINGS SHEET (Language / Appearance)
      // ================================================================
      function openSettingsSheet(type) {
        currentSettingsSheetType = type;
        settingsSheetOptions.innerHTML = '';

        if (type === 'language') {
          settingsSheetTitle.textContent = t('language');
          const options = [
            { value: 'en', label: t('langEnglish') },
            { value: 'ar', label: t('langArabic') }
          ];
          options.forEach(opt => {
            const row = document.createElement('div');
            row.className = 'settings-option' + (state.language === opt.value ? ' selected' : '');
            row.innerHTML = `
              <span class="settings-option-label">${opt.label}</span>
              <span class="settings-option-check">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="check-stroke" d="M5 12.5L10 17.5L19 7"/>
                </svg>
              </span>
            `;
            row.addEventListener('click', () => {
              if (state.language !== opt.value) {
                state.language = opt.value;
                saveState();
                applyTheme();
                applyTranslations();
                renderToday();
                renderHistory();
                renderProfile();
              }
              closeSettingsSheet();
            });
            settingsSheetOptions.appendChild(row);
          });
        } else if (type === 'appearance') {
          settingsSheetTitle.textContent = t('appearance');
          const options = [
            { value: 'light', label: t('appearanceLight') },
            { value: 'dark', label: t('appearanceDark') },
            { value: 'system', label: t('appearanceSystem') }
          ];
          options.forEach(opt => {
            const row = document.createElement('div');
            row.className = 'settings-option' + (state.appearance === opt.value ? ' selected' : '');
            row.innerHTML = `
              <span class="settings-option-label">${opt.label}</span>
              <span class="settings-option-check">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="check-stroke" d="M5 12.5L10 17.5L19 7"/>
                </svg>
              </span>
            `;
            row.addEventListener('click', () => {
              if (state.appearance !== opt.value) {
                state.appearance = opt.value;
                saveState();
                applyTheme();
                renderProfile();
              }
              closeSettingsSheet();
            });
            settingsSheetOptions.appendChild(row);
          });
        }

        settingsSheetOverlay.classList.add('open');
      }

      function closeSettingsSheet() {
        settingsSheetOverlay.classList.remove('open');
        currentSettingsSheetType = null;
      }

      settingsSheetClose.addEventListener('click', closeSettingsSheet);
      settingsSheetOverlay.addEventListener('click', (e) => {
        if (e.target === settingsSheetOverlay) closeSettingsSheet();
      });

      // ================================================================
      // TIME PICKER SHEET
      // ================================================================
      function parseTimeString(timeStr) {
        // Parse strings like "9:00 AM" or "14:30"
        const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (!match) return { hour: 9, minute: '00', period: 'AM' };
        let hour = parseInt(match[1], 10);
        const minute = match[2];
        let period = (match[3] || '').toUpperCase();
        if (!period) {
          period = hour >= 12 ? 'PM' : 'AM';
          if (hour > 12) hour -= 12;
          if (hour === 0) hour = 12;
        }
        return { hour, minute, period };
      }

      function formatTimeString(hour, minute, period) {
        return `${hour}:${minute} ${period}`;
      }

      function updateTimePickerPreview() {
        timePickerPreview.textContent = formatTimeString(pickerHour, pickerMinute, pickerPeriod);
      }

      function setTimePickerScrollSelection() {
        // Hour
        hourScroll.querySelectorAll('.time-picker-item').forEach(item => {
          item.classList.toggle('selected', parseInt(item.dataset.value, 10) === pickerHour);
        });
        // Minute
        minuteScroll.querySelectorAll('.time-picker-item').forEach(item => {
          item.classList.toggle('selected', item.dataset.value === pickerMinute);
        });
        // Period
        periodScroll.querySelectorAll('.time-picker-item').forEach(item => {
          item.classList.toggle('selected', item.dataset.value === pickerPeriod);
        });
      }

      function scrollToSelectedInPicker() {
        const hourItem = hourScroll.querySelector('.time-picker-item.selected');
        const minuteItem = minuteScroll.querySelector('.time-picker-item.selected');
        const periodItem = periodScroll.querySelector('.time-picker-item.selected');
        if (hourItem) hourItem.scrollIntoView({ block: 'center' });
        if (minuteItem) minuteItem.scrollIntoView({ block: 'center' });
        if (periodItem) periodItem.scrollIntoView({ block: 'center' });
      }

      function openTimePicker() {
        const parsed = parseTimeString(state.reminderTime);
        pickerHour = parsed.hour;
        pickerMinute = parsed.minute;
        pickerPeriod = parsed.period;

        setTimePickerScrollSelection();
        updateTimePickerPreview();

        timePickerOverlay.classList.add('open');
        setTimeout(scrollToSelectedInPicker, 350);
      }

      function closeTimePicker() {
        timePickerOverlay.classList.remove('open');
      }

      timePickerClose.addEventListener('click', closeTimePicker);
      timePickerOverlay.addEventListener('click', (e) => {
        if (e.target === timePickerOverlay) closeTimePicker();
      });

      hourScroll.addEventListener('click', (e) => {
        const item = e.target.closest('.time-picker-item');
        if (!item) return;
        pickerHour = parseInt(item.dataset.value, 10);
        setTimePickerScrollSelection();
        updateTimePickerPreview();
      });

      minuteScroll.addEventListener('click', (e) => {
        const item = e.target.closest('.time-picker-item');
        if (!item) return;
        pickerMinute = item.dataset.value;
        setTimePickerScrollSelection();
        updateTimePickerPreview();
      });

      periodScroll.addEventListener('click', (e) => {
        const item = e.target.closest('.time-picker-item');
        if (!item) return;
        pickerPeriod = item.dataset.value;
        setTimePickerScrollSelection();
        updateTimePickerPreview();
      });

      timePickerConfirm.addEventListener('click', () => {
        state.reminderTime = formatTimeString(pickerHour, pickerMinute, pickerPeriod);
        saveState();
        renderProfile();
        closeTimePicker();
      });

      // ================================================================
      // RENDER HISTORY CALENDAR
      // ================================================================
      function renderCalendar() {
        const year = calendarDisplayYear;
        const month = calendarDisplayMonth;

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const startOffset = (firstDay === 0) ? 6 : firstDay - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarGrid.innerHTML = '';

        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = startOffset - 1; i >= 0; i--) {
          const dayNum = prevMonthDays - i;
          const cell = document.createElement('div');
          cell.className = 'calendar-day-cell other-month';
          cell.textContent = dayNum;
          calendarGrid.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const dateKey = formatDateKey(year, month, day);
          const isCompleted = state.completedDates.includes(dateKey);
          const isToday = dateKey === todayStr();

          const cell = document.createElement('div');
          cell.className = 'calendar-day-cell';
          cell.textContent = day;
          cell.dataset.date = dateKey;

          if (isCompleted) {
            cell.classList.add('completed');

            const prevDate = new Date(year, month, day - 1);
            const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth()+1).padStart(2,'0')}-${String(prevDate.getDate()).padStart(2,'0')}`;
            const nextDate = new Date(year, month, day + 1);
            const nextKey = `${nextDate.getFullYear()}-${String(nextDate.getMonth()+1).padStart(2,'0')}-${String(nextDate.getDate()).padStart(2,'0')}`;

            const prevCompleted = state.completedDates.includes(prevKey);
            const nextCompleted = state.completedDates.includes(nextKey);

            if (prevCompleted && nextCompleted) {
              cell.classList.add('streak-middle');
            } else if (prevCompleted) {
              cell.classList.add('streak-end');
            } else if (nextCompleted) {
              cell.classList.add('streak-start');
            }

            const dot = document.createElement('div');
            dot.className = 'day-flame-dot';
            cell.appendChild(dot);
          }

          if (isToday) {
            cell.classList.add('today');
          }

          if (selectedCalendarDate === dateKey) {
            cell.classList.add('selected');
          }

          cell.addEventListener('click', () => {
            selectedCalendarDate = dateKey;
            renderCalendar();
            renderDayDetail(dateKey);
          });

          calendarGrid.appendChild(cell);
        }

        const totalCells = startOffset + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let i = 1; i <= remainingCells; i++) {
          const cell = document.createElement('div');
          cell.className = 'calendar-day-cell other-month';
          cell.textContent = i;
          calendarGrid.appendChild(cell);
        }

        const now = new Date();
        if (year === now.getFullYear() && month === now.getMonth()) {
          nextMonthBtn.disabled = true;
        } else {
          nextMonthBtn.disabled = false;
        }
      }

      function renderDayDetail(dateKey) {
        const isCompleted = state.completedDates.includes(dateKey);
        const date = new Date(dateKey + 'T12:00:00');
        const formattedDate = date.toLocaleDateString(state.language === 'ar' ? 'ar-EG' : 'en-US', {
          weekday: 'long', month: 'long', day: 'numeric'
        });

        if (isCompleted) {
          dayDetail.innerHTML = `
            <div class="day-detail">
              <div class="day-detail-title">${formattedDate}</div>
              <div class="day-detail-sub" style="color: var(--flame-outer-1);">${t('completedOn')} ✓</div>
            </div>
          `;
        } else {
          dayDetail.innerHTML = `
            <div class="day-detail">
              <div class="day-detail-title">${formattedDate}</div>
              <div class="day-detail-sub">${t('noTaskForDay')}</div>
            </div>
          `;
        }
      }

      prevMonthBtn.addEventListener('click', () => {
        calendarDisplayMonth--;
        if (calendarDisplayMonth < 0) {
          calendarDisplayMonth = 11;
          calendarDisplayYear--;
        }
        selectedCalendarDate = null;
        dayDetail.innerHTML = '';
        renderCalendar();
      });

      nextMonthBtn.addEventListener('click', () => {
        const now = new Date();
        if (calendarDisplayYear === now.getFullYear() && calendarDisplayMonth === now.getMonth()) {
          return;
        }
        calendarDisplayMonth++;
        if (calendarDisplayMonth > 11) {
          calendarDisplayMonth = 0;
          calendarDisplayYear++;
        }
        selectedCalendarDate = null;
        dayDetail.innerHTML = '';
        renderCalendar();
      });

      // ================================================================
      // RENDER HISTORY
      // ================================================================
      function renderHistory() {
        const hasActivity = state.completedDates.length > 0;

        if (!hasActivity) {
          historyStats.classList.add('hidden');
          calendarContainer.classList.add('hidden');
          historyEmptyState.classList.remove('hidden');
          return;
        }

        historyStats.classList.remove('hidden');
        calendarContainer.classList.remove('hidden');
        historyEmptyState.classList.add('hidden');

        statTotalCompleted.textContent = state.totalCompleted;
        statActiveDays.textContent = state.activeDays;
        statStreak.textContent = state.streak;

        renderCalendar();
      }

      // ================================================================
      // RENDER PROFILE
      // ================================================================
      function renderProfile() {
        if (state.userName) {
          profileName.textContent = state.userName;
          profileAvatar.textContent = state.userName.charAt(0).toUpperCase();
          profileNameValue.innerHTML = state.userName + ' <span class="chevron">›</span>';
        } else {
          profileName.textContent = t('yourName');
          profileAvatar.textContent = '?';
          profileNameValue.innerHTML = `${t('notSet')} <span class="chevron">›</span>`;
        }

        const streak = state.streak;
        profileStreak.textContent = streak === 1 ? `1 ${t('day')}` : `${streak} ${t('days')}`;
        profileTotalCompleted.textContent = state.totalCompleted;
        profileActiveDays.textContent = state.activeDays;

        let appearanceLabel = t('appearanceSystem');
        if (state.appearance === 'light') appearanceLabel = t('appearanceLight');
        else if (state.appearance === 'dark') appearanceLabel = t('appearanceDark');
        appearanceValue.innerHTML = appearanceLabel + ' <span class="chevron">›</span>';

        const langLabel = state.language === 'ar' ? t('langArabic') : t('langEnglish');
        languageValue.innerHTML = langLabel + ' <span class="chevron">›</span>';

        notificationValue.innerHTML = (state.notificationsEnabled ? t('on') : t('off')) + ' <span class="chevron">›</span>';
        reminderTimeValue.innerHTML = state.reminderTime + ' <span class="chevron">›</span>';
      }

      // ================================================================
      // NAVIGATION
      // ================================================================
      function setActiveTab(tab) {
        if (activeTab === tab) return;
        activeTab = tab;

        todayScreen.classList.add('hidden');
        historyScreen.classList.add('hidden');
        profileScreen.classList.add('hidden');
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

        if (tab === 'today') {
          todayScreen.classList.remove('hidden');
          document.getElementById('navToday').classList.add('active');
          renderToday();
        } else if (tab === 'history') {
          historyScreen.classList.remove('hidden');
          document.getElementById('navHistory').classList.add('active');
          renderHistory();
        } else if (tab === 'profile') {
          profileScreen.classList.remove('hidden');
          document.getElementById('navProfile').classList.add('active');
          renderProfile();
        }
      }

      document.getElementById('navToday').addEventListener('click', () => setActiveTab('today'));
      document.getElementById('navHistory').addEventListener('click', () => setActiveTab('history'));
      document.getElementById('navProfile').addEventListener('click', () => setActiveTab('profile'));

      // Edit name
      document.getElementById('editNameRow').addEventListener('click', () => {
        const name = prompt(t('enterName'));
        if (name !== null && name.trim()) {
          state.userName = name.trim();
          saveState();
          renderProfile();
        }
      });

      // Appearance — use new settings sheet
      document.getElementById('appearanceRow').addEventListener('click', () => {
        openSettingsSheet('appearance');
      });

      // Language — use new settings sheet
      document.getElementById('languageRow').addEventListener('click', () => {
        openSettingsSheet('language');
      });

      // Support
      document.getElementById('supportRow').addEventListener('click', () => {
        window.location.href = 'mailto:ahmedp7918@gmail.com?subject=One%20Thing%20Support';
      });

      // Notifications
      document.getElementById('notificationRow').addEventListener('click', () => {
        state.notificationsEnabled = !state.notificationsEnabled;
        saveState();
        renderProfile();
      });

      // Reminder time — use new time picker
      document.getElementById('reminderTimeRow').addEventListener('click', () => {
        openTimePicker();
      });

      // ================================================================
      // BACK NAVIGATION
      // ================================================================
      window.addEventListener('popstate', function(event) {
        if (document.activeElement && document.activeElement.blur) {
          const activeEl = document.activeElement;
          if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
            activeEl.blur();
            history.pushState({ screen: activeTab }, '');
            return;
          }
        }

        if (timePickerOverlay.classList.contains('open')) {
          closeTimePicker();
          history.pushState({ screen: activeTab }, '');
          return;
        }

        if (settingsSheetOverlay.classList.contains('open')) {
          closeSettingsSheet();
          history.pushState({ screen: activeTab }, '');
          return;
        }

        if (taskModal.classList.contains('open')) {
          taskModal.classList.remove('open');
          history.pushState({ screen: activeTab }, '');
          return;
        }

        if (isOnboardingActive) {
          if (onboardStep === 3) {
            goToOnboardStep(2);
            history.pushState({ screen: 'onboarding', step: 2 }, '');
            return;
          } else if (onboardStep === 2) {
            goToOnboardStep(1);
            history.pushState({ screen: 'onboarding', step: 1 }, '');
            return;
          } else {
            history.pushState({ screen: 'onboarding', step: 1 }, '');
            return;
          }
        }

        if (activeTab !== 'today') {
          setActiveTab('today');
          history.pushState({ screen: 'today' }, '');
          return;
        }

        history.pushState({ screen: 'today' }, '');
      });

      history.replaceState({ screen: 'today' }, '');

      // ================================================================
      // INIT
      // ================================================================
      function init() {
        loadState();
        recomputeStats();
        applyTheme();
        applyTranslations();

        const splashDuration = 1200;

        setTimeout(() => {
          splashScreen.classList.add('hidden');
        }, splashDuration);

        setTimeout(() => {
          splashScreen.style.display = 'none';

          if (state.onboardingComplete) {
            isOnboardingActive = false;
            onboarding.classList.add('hidden');
            appContent.style.display = 'flex';
            bottomNav.style.display = 'flex';
            renderToday();
            renderHistory();
            renderProfile();
            history.replaceState({ screen: 'today' }, '');
          } else {
            isOnboardingActive = true;
            onboarding.classList.remove('hidden');
            appContent.style.display = 'none';
            bottomNav.style.display = 'none';
            goToOnboardStep(1);
            history.replaceState({ screen: 'onboarding', step: 1 }, '');
          }
        }, splashDuration + 400);
      }

      init();
    })();
