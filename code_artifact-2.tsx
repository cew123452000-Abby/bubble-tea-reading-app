import React, { useState, useEffect, useRef } from 'react';

// --- 太魯閣語第一冊 10 課完整單字庫 ---
const VOCABULARY_DATA = [
  {
    lessonId: 1,
    lessonTitle: "第1課：Embiyax su hug? (你好嗎？)",
    words: [
      { id: "1-1", word: "embiyax", phonetic: "em-bi-yah", translation: "好、健康的", example: "Embiyax su hug?", exampleTranslation: "你身體好嗎？（你好嗎？）", icon: "😊" },
      { id: "1-2", word: "balay", phonetic: "ba-lay", translation: "很、非常", example: "Embiyax ku balay.", exampleTranslation: "我很好。", icon: "✨" },
      { id: "1-3", word: "hug", phonetic: "hug", translation: "嗎（疑問助詞）", example: "Mtgsa su hug?", exampleTranslation: "你是老師嗎？", icon: "❓" },
      { id: "1-4", word: "isu", phonetic: "i-su", translation: "你（獨立格）", example: "Embiyax su ka isu hug?", exampleTranslation: "你呢？你也好嗎？", icon: "👤" },
      { id: "1-5", word: "ku", phonetic: "ku", translation: "我（附著格）", example: "Laqi ku matas.", exampleTranslation: "我是學生（我是讀書的孩子）。", icon: "🙋" },
      { id: "1-6", word: "su", phonetic: "su", translation: "你（附著格）", example: "Embiyax su hug?", exampleTranslation: "你好嗎？", icon: "👉" },
      { id: "1-7", word: "uri", phonetic: "u-ri", translation: "也", example: "Embiyax ku balay uri.", exampleTranslation: "我也很好。", icon: "🤝" }
    ]
  },
  {
    lessonId: 2,
    lessonTitle: "第2課：Laqi ku matas ka yaku (我是學生)",
    words: [
      { id: "2-1", word: "yaku", phonetic: "ya-ku", translation: "我（獨立格）", example: "Laqi ku matas ka yaku.", exampleTranslation: "我是學生。", icon: "🎒" },
      { id: "2-2", word: "hiya", phonetic: "hi-ya", translation: "他、她", example: "Ima ka hiya?", exampleTranslation: "他是誰？", icon: "👥" },
      { id: "2-3", word: "ima", phonetic: "i-ma", translation: "誰", example: "Ima su ka isu hug?", exampleTranslation: "你是誰？", icon: "🔍" },
      { id: "2-4", word: "laqi matas", phonetic: "la-qi ma-tas", translation: "學生", example: "Laqi matas ka hiya.", exampleTranslation: "他是學生。", icon: "✏️" },
      { id: "2-5", word: "mtgsa", phonetic: "m-tg-sa", translation: "老師、教導者", example: "Mtgsa ka hiya.", exampleTranslation: "他是老師。", icon: "👩‍🏫" },
      { id: "2-6", word: "aji", phonetic: "a-ji", translation: "不是", example: "Aji mtgsa ka hiya.", exampleTranslation: "他不是老師。", icon: "❌" }
    ]
  },
  {
    lessonId: 3,
    lessonTitle: "第3課：Hiyug hug! (請起立！)",
    words: [
      { id: "3-1", word: "hiyug", phonetic: "hi-yug", translation: "起立", example: "Hiyug hug!", exampleTranslation: "請起立！", icon: "🚶" },
      { id: "3-2", word: "qbahang", phonetic: "q-ba-hang", translation: "聽", example: "Qbahang mnan.", exampleTranslation: "聽我們說。", icon: "👂" },
      { id: "3-3", word: "binaw", phonetic: "bi-naw", translation: "試看看", example: "Hiyug binaw.", exampleTranslation: "起立試試看。", icon: "🎯" },
      { id: "3-4", word: "taga", phonetic: "ta-ga", translation: "坐下", example: "Taga hini.", exampleTranslation: "坐在這裡。", icon: "🪑" },
      { id: "3-5", word: "uyas", phonetic: "u-yas", translation: "唱歌", example: "Meuyas ku.", exampleTranslation: "我唱歌。", icon: "🎵" },
      { id: "3-6", word: "grbu", phonetic: "g-r-bu", translation: "早上、早晨", example: "Mgrbu da.", exampleTranslation: "早晨到了。", icon: "🌅" }
    ]
  },
  {
    lessonId: 4,
    lessonTitle: "第4課：Kuyuh ka yaku (我是女生)",
    words: [
      { id: "4-1", word: "snaw", phonetic: "s-naw", translation: "男生、男人", example: "Snaw ka yaku.", exampleTranslation: "我是男生。", icon: "👦" },
      { id: "4-2", word: "kuyuh", phonetic: "ku-yuh", translation: "女生、女人", example: "Kuyuh ka hiya.", exampleTranslation: "她是女生。", icon: "👧" },
      { id: "4-3", word: "laqi", phonetic: "la-qi", translation: "小孩", example: "Laqi ku.", exampleTranslation: "我是小孩。", icon: "👶" },
      { id: "4-4", word: "yami", phonetic: "ya-mi", translation: "我們（不含聽話者）", example: "Snaw ka yami.", exampleTranslation: "我們是男生（不包括你）。", icon: "🧑‍🤝‍🧑" },
      { id: "4-5", word: "yamu", phonetic: "ya-mu", translation: "你們", example: "Kuyuh ka yamu.", exampleTranslation: "你們是女生。", icon: "🙌" }
    ]
  },
  {
    lessonId: 5,
    lessonTitle: "第5課：Snaw ka yami, kuyuh ka yamu (我們是男生，你們是女生)",
    words: [
      { id: "5-1", word: "rudan", phonetic: "ru-dan", translation: "老人、長輩", example: "Rudan ka baki.", exampleTranslation: "阿公是長輩。", icon: "👵" },
      { id: "5-2", word: "risaw", phonetic: "ri-saw", translation: "青年、年輕男子", example: "Risaw ka hiya.", exampleTranslation: "他是青年。", icon: "🧑" },
      { id: "5-3", word: "wauwa", phonetic: "wau-wa", translation: "少女、年輕女子", example: "Wauwa ka hiya.", exampleTranslation: "她是少女。", icon: "👩" },
      { id: "5-4", word: "sejiq", phonetic: "se-jiq", translation: "人、族人", example: "Truku ka sejiq nii.", exampleTranslation: "這個人是太魯閣族人。", icon: "🌍" }
    ]
  },
  {
    lessonId: 6,
    lessonTitle: "第6課：Huling mu (我的狗)",
    words: [
      { id: "6-1", word: "huling", phonetic: "hu-ling", translation: "狗", example: "Huling mu ka nii.", exampleTranslation: "這是我的狗。", icon: "🐕" },
      { id: "6-2", word: "mqalux", phonetic: "m-qa-lux", translation: "黑色", example: "Mqalux ka huling mu.", exampleTranslation: "我的狗是黑色的。", icon: "⚫" },
      { id: "6-3", word: "mdamay", phonetic: "m-da-may", translation: "棕色、咖啡色", example: "Mdamay ka huling hiya.", exampleTranslation: "他的狗是棕色的。", icon: "🟤" },
      { id: "6-4", word: "kiyig", phonetic: "ki-yig", translation: "旁邊", example: "Gaga kiyig mu.", exampleTranslation: "在我旁邊。", icon: "↔️" },
      { id: "6-5", word: "manu", phonetic: "ma-nu", translation: "什麼", example: "Manu ka nii?", exampleTranslation: "這是什麼？", icon: "❓" },
      { id: "6-6", word: "mu", phonetic: "mu", translation: "我的", example: "Huling mu.", exampleTranslation: "我的狗。", icon: "🏠" },
      { id: "6-7", word: "gaga", phonetic: "ga-ga", translation: "在那裡（指遠處）", example: "Gaga kiyig su hug?", exampleTranslation: "在你的旁邊嗎？", icon: "👉" }
    ]
  },
  {
    lessonId: 7,
    lessonTitle: "第7課：Nii hini ka mtgsa (老師在這裡)",
    words: [
      { id: "7-1", word: "hini", phonetic: "hi-ni", translation: "這裡", example: "Nii hini ka mtgsa.", exampleTranslation: "老師在這裡。", icon: "📍" },
      { id: "7-2", word: "inu", phonetic: "i-nu", translation: "哪裡", example: "Gaga inu ka ppatas su?", exampleTranslation: "你的筆在哪裡？", icon: "🗺️" },
      { id: "7-3", word: "nii", phonetic: "nii", translation: "在這裡、正在", example: "Nii hini.", exampleTranslation: "在這裡。", icon: "👇" },
      { id: "7-4", word: "ppatas", phonetic: "p-pa-tas", translation: "筆", example: "Ppatas mu ka nii.", exampleTranslation: "這是我的筆。", icon: "🖊️" },
      { id: "7-5", word: "patas", phonetic: "pa-tas", translation: "書、文字", example: "Patas mu ka gaga.", exampleTranslation: "我的書在那裡。", icon: "📖" }
    ]
  },
  {
    lessonId: 8,
    lessonTitle: "第8課：Manu ka nii? (這是什麼？)",
    words: [
      { id: "8-1", word: "kiya", phonetic: "ki-ya", translation: "是的、那樣", example: "Kiya, tluan mu ka nii.", exampleTranslation: "是的，這是我的桌子。", icon: "👍" },
      { id: "8-2", word: "shjil", phonetic: "sh-jil", translation: "重、沈重", example: "Shjil bi ka tluan nii.", exampleTranslation: "這張桌子非常重。", icon: "🏋️" },
      { id: "8-3", word: "tluan", phonetic: "t-lu-an", translation: "桌子、座位", example: "Tluan matas ka nii.", exampleTranslation: "這是書桌。", icon: "🪵" },
      { id: "8-4", word: "tluan matas", phonetic: "t-lu-an ma-tas", translation: "書桌、寫字桌", example: "Shjil ka tluan matas mu.", exampleTranslation: "我的書桌很重。", icon: "🏫" }
    ]
  },
  {
    lessonId: 9,
    lessonTitle: "第9課：Mha nami bbuyu (我們要去山上)",
    words: [
      { id: "9-1", word: "bbuyu", phonetic: "b-bu-yu", translation: "森林、野外、山上", example: "Mha nami bbuyu.", exampleTranslation: "我們將要去山上。", icon: "🌲" },
      { id: "9-2", word: "musa", phonetic: "mu-sa", translation: "去", example: "Musa bbuyu ka tama.", exampleTranslation: "爸爸去山上。", icon: "🏃" },
      { id: "9-3", word: "miyah", phonetic: "mi-yah", translation: "來", example: "Miyah hini.", exampleTranslation: "來到這裡。", icon: "👋" },
      { id: "9-4", word: "mkan", phonetic: "m-kan", translation: "吃", example: "Mkan uqun.", exampleTranslation: "吃食物。", icon: "🍎" },
      { id: "9-5", word: "uqun", phonetic: "u-qun", translation: "食物", example: "Malu bi uqun nii.", exampleTranslation: "這食物非常好吃。", icon: "🍲" }
    ]
  },
  {
    lessonId: 10,
    lessonTitle: "第10課：Suxan o mha nami mqaras da (明天我們會很快樂)",
    words: [
      { id: "10-1", word: "suxan", phonetic: "su-xan", translation: "明天", example: "Suxan o mha nami bbuyu.", exampleTranslation: "明天我們要去山上。", icon: "📆" },
      { id: "10-2", word: "sayang", phonetic: "sa-yang", translation: "今天", example: "Sayang o mqaras nami.", exampleTranslation: "今天我們很快樂。", icon: "☀️" },
      { id: "10-3", word: "mqaras", phonetic: "m-qa-ras", translation: "快樂、高興", example: "Mqaras bi ka laqi.", exampleTranslation: "小孩子非常高興。", icon: "🎉" },
      { id: "10-4", word: "truku", phonetic: "tru-ku", translation: "太魯閣族、人", example: "Truku ka yami.", exampleTranslation: "我們是太魯閣族人。", icon: "🏹" }
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'learn', 'quiz', 'certificate'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [quizScores, setQuizScores] = useState({});
  const [quizPassed, setQuizPassed] = useState(new Set());
  
  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Certificate state
  const [studentName, setStudentName] = useState('太魯閣勇士/織女');
  const [certificateStyle, setCertificateStyle] = useState('traditional'); // 'traditional', 'royal', 'nature'
  const [showConfetti, setShowConfetti] = useState(false);

  const canvasRef = useRef(null);

  // Load progress from localStorage on start
  useEffect(() => {
    try {
      const savedLearned = localStorage.getItem('truku_learned');
      const savedScores = localStorage.getItem('truku_scores');
      const savedPassed = localStorage.getItem('truku_passed');
      const savedName = localStorage.getItem('truku_name');

      if (savedLearned) setLearnedWords(new Set(JSON.parse(savedLearned)));
      if (savedScores) setQuizScores(JSON.parse(savedScores));
      if (savedPassed) setQuizPassed(new Set(JSON.parse(savedPassed)));
      if (savedName) setStudentName(savedName);
    } catch (e) {
      console.warn("Could not load from localStorage: ", e);
    }
  }, []);

  // Sync learned words
  const toggleLearned = (wordId) => {
    const updated = new Set(learnedWords);
    if (updated.has(wordId)) {
      updated.delete(wordId);
    } else {
      updated.add(wordId);
    }
    setLearnedWords(updated);
    try {
      localStorage.setItem('truku_learned', JSON.stringify([...updated]));
    } catch (e) {}
  };

  // Pronounce word using custom phonetic TTS simulation
  const speakWord = (wordText) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(true);
      
      // Since standard TTS engines lack native Truku support,
      // we utilize Italian/Spanish phonetic rules which match Truku's open-vowel system perfectly.
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      
      // Look for a romantic voice (Italian or Spanish sounds best for Austronesian Romanization)
      const voices = window.speechSynthesis.getVoices();
      const idealVoice = voices.find(v => v.lang.startsWith('it') || v.lang.startsWith('es') || v.lang.startsWith('id')) || voices[0];
      if (idealVoice) {
        utterance.voice = idealVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Audio fallback simulation
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1000);
    }
  };

  // Generate Multiple Choice Questions dynamically
  const startQuiz = (lesson) => {
    setSelectedLesson(lesson);
    const questions = [];
    const lessonWords = lesson.words;

    // Create 5 questions per lesson
    const numQuestions = Math.min(5, lessonWords.length);
    const shuffledWords = [...lessonWords].sort(() => 0.5 - Math.random());

    for (let i = 0; i < numQuestions; i++) {
      const correctWord = shuffledWords[i];
      const questionType = Math.random() > 0.5 ? 'truku_to_zh' : 'zh_to_truku';
      
      // Gather pool for wrong options
      let wrongOptionsPool = VOCABULARY_DATA.flatMap(l => l.words)
        .filter(w => w.word !== correctWord.word);
      
      const wrongOptions = [];
      const usedTranslations = new Set([correctWord.translation]);
      const usedWords = new Set([correctWord.word]);

      while (wrongOptions.length < 3 && wrongOptionsPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * wrongOptionsPool.length);
        const candidate = wrongOptionsPool[randomIndex];
        wrongOptionsPool.splice(randomIndex, 1);

        if (questionType === 'truku_to_zh' && !usedTranslations.has(candidate.translation)) {
          wrongOptions.push(candidate);
          usedTranslations.add(candidate.translation);
        } else if (questionType === 'zh_to_truku' && !usedWords.has(candidate.word)) {
          wrongOptions.push(candidate);
          usedWords.add(candidate.word);
        }
      }

      // If we couldn't find enough, backfill from other lessons
      const options = [
        { text: questionType === 'truku_to_zh' ? correctWord.translation : correctWord.word, isCorrect: true, wordObj: correctWord },
        ...wrongOptions.map(w => ({
          text: questionType === 'truku_to_zh' ? w.translation : w.word,
          isCorrect: false,
          wordObj: w
        }))
      ].sort(() => 0.5 - Math.random());

      questions.push({
        type: questionType,
        correctWord: correctWord,
        options: options
      });
    }

    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setCurrentView('quiz');
  };

  const handleAnswerSelection = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (quizQuestions[currentQuestionIndex].options[optionIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Calculate results
      const finalPercentage = Math.round((score / quizQuestions.length) * 100);
      const isPass = finalPercentage >= 80;

      // Update quiz score in state & localStorage
      const updatedScores = { ...quizScores, [selectedLesson.lessonId]: Math.max(quizScores[selectedLesson.lessonId] || 0, finalPercentage) };
      setQuizScores(updatedScores);
      localStorage.setItem('truku_scores', JSON.stringify(updatedScores));

      if (isPass) {
        const updatedPassed = new Set(quizPassed);
        updatedPassed.add(selectedLesson.lessonId);
        setQuizPassed(updatedPassed);
        localStorage.setItem('truku_passed', JSON.stringify([...updatedPassed]));
        
        // Show confetti celebrate!
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      setQuizFinished(true);
    }
  };

  // Certificate Render & Export
  useEffect(() => {
    if (currentView === 'certificate') {
      drawCertificate();
    }
  }, [studentName, certificateStyle, currentView]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear and draw background
    ctx.clearRect(0, 0, 800, 560);
    
    // Base container style
    let primaryColor = '#8b1e1e'; // Red
    let darkColor = '#1f1f1f'; // Charcoal
    let accentColor = '#d4af37'; // Gold
    let bgGradient = ctx.createLinearGradient(0, 0, 800, 560);

    if (certificateStyle === 'traditional') {
      bgGradient.addColorStop(0, '#fffbf4');
      bgGradient.addColorStop(1, '#f5ebe0');
      primaryColor = '#b22222';
      darkColor = '#111111';
    } else if (certificateStyle === 'royal') {
      bgGradient.addColorStop(0, '#fafafa');
      bgGradient.addColorStop(1, '#eaeaea');
      primaryColor = '#1e293b';
      darkColor = '#0f172a';
    } else { // Nature
      bgGradient.addColorStop(0, '#f0fdf4');
      bgGradient.addColorStop(1, '#dcfce7');
      primaryColor = '#065f46';
      darkColor = '#064e3b';
      accentColor = '#22c55e';
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 560);

    // Dynamic Border drawing
    if (certificateStyle === 'traditional') {
      // Draw Truku weaving diamond design border
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 14;
      ctx.strokeRect(20, 20, 760, 520);

      // Tribal Diamond pattern around border
      ctx.fillStyle = primaryColor;
      const drawDiamonds = (x, y, size) => {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
      };

      for (let x = 40; x <= 760; x += 40) {
        drawDiamonds(x, 20, 6);
        drawDiamonds(x, 540, 6);
      }
      for (let y = 40; y <= 520; y += 40) {
        drawDiamonds(20, y, 6);
        drawDiamonds(780, y, 6);
      }
    } else if (certificateStyle === 'royal') {
      // Elegant gold and navy lines
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 10;
      ctx.strokeRect(25, 25, 750, 510);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(35, 35, 730, 490);
    } else { // Nature
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 8;
      ctx.strokeRect(25, 25, 750, 510);
      // Corner leaves decoration
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(40, 40, 15, 0, Math.PI*2);
      ctx.arc(760, 40, 15, 0, Math.PI*2);
      ctx.arc(40, 520, 15, 0, Math.PI*2);
      ctx.arc(760, 520, 15, 0, Math.PI*2);
      ctx.fill();
    }

    // Title Block
    ctx.textAlign = 'center';
    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 36px "PingFang TC", "Microsoft JhengHei", sans-serif';
    ctx.fillText('太魯閣族語學習證書', 400, 100);

    ctx.fillStyle = darkColor;
    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillText('Kari Truku Level 1 Course Completion', 400, 135);

    // Divider Line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(550, 160);
    ctx.stroke();

    // Recipient Content
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "PingFang TC", sans-serif';
    ctx.fillText('茲證明學生', 400, 205);

    ctx.fillStyle = darkColor;
    ctx.font = 'bold 38px "PingFang TC", sans-serif';
    ctx.fillText(studentName, 400, 265);

    // Decorative underline
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400 - (studentName.length * 20), 285);
    ctx.lineTo(400 + (studentName.length * 20), 285);
    ctx.stroke();

    // Main Certificate Text
    ctx.fillStyle = '#334155';
    ctx.font = '18px "PingFang TC", sans-serif';
    ctx.fillText('成功修畢《太魯閣語學習手冊第一冊》全部課程，', 400, 335);
    ctx.fillText('並通過各課之數位拼讀與字彙考核，成績優異特頒此證。', 400, 370);

    // Gold Seal / Achievement Ribbon
    ctx.save();
    ctx.translate(400, 450);
    // Draw seal back
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    for (let i = 0; i < 30; i++) {
      const angle = (i * Math.PI * 2) / 30;
      const x = Math.cos(angle) * 35;
      const y = Math.sin(angle) * 35;
      ctx.lineTo(x, y);
      const x2 = Math.cos(angle + Math.PI/30) * 30;
      const y2 = Math.sin(angle + Math.PI/30) * 30;
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fill();

    // Inner circle
    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI*2);
    ctx.fill();

    // Star icon inside seal
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px sans-serif';
    ctx.fillText('⭐', 0, 8);
    ctx.restore();

    // Signature Area Left
    ctx.fillStyle = '#64748b';
    ctx.font = '14px "PingFang TC", sans-serif';
    ctx.fillText('太魯閣族語數位學習園地', 180, 460);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 485);
    ctx.lineTo(280, 485);
    ctx.stroke();
    ctx.fillStyle = darkColor;
    ctx.font = 'bold 16px "PingFang TC", sans-serif';
    ctx.fillText('線上學習系統認證官', 180, 510);

    // Date Area Right
    ctx.fillStyle = '#64748b';
    ctx.font = '14px "PingFang TC", sans-serif';
    const today = new Date();
    const formattedDate = `${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`;
    ctx.fillText('頒發日期', 620, 460);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(520, 485);
    ctx.lineTo(720, 485);
    ctx.stroke();
    ctx.fillStyle = darkColor;
    ctx.font = '16px "PingFang TC", sans-serif';
    ctx.fillText(formattedDate, 620, 510);
  };

  // Download Certificate as PNG file
  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `太魯閣族語證書-${studentName}.png`;
    link.href = url;
    link.click();
  };

  // Set default student name in localStorage
  const handleNameChange = (e) => {
    const name = e.target.value;
    setStudentName(name);
    try {
      localStorage.setItem('truku_name', name);
    } catch (err) {}
  };

  // Overall Statistics
  const totalWords = VOCABULARY_DATA.reduce((acc, curr) => acc + curr.words.length, 0);
  const totalLearnedCount = learnedWords.size;
  const learnedPercentage = Math.round((totalLearnedCount / totalWords) * 100);
  const completedQuizzesCount = quizPassed.size;
  const totalQuizzesCount = VOCABULARY_DATA.length;
  const canUnlockCertificate = completedQuizzesCount >= 5 || completedQuizzesCount === totalQuizzesCount;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col transition-colors duration-300">
      
      {/* TRUKU WEAVING PATTERN TOP BAR */}
      <div className="w-full h-4 bg-repeat-x flex" style={{
        backgroundImage: `linear-gradient(45deg, #8b1e1e 25%, transparent 25%), 
                          linear-gradient(-45deg, #8b1e1e 25%, transparent 25%), 
                          linear-gradient(45deg, transparent 75%, #1f1f1f 75%), 
                          linear-gradient(-45deg, transparent 75%, #1f1f1f 75%)`,
        backgroundSize: '16px 16px',
        backgroundColor: '#f5f5f5'
      }}></div>

      {/* CONFETTI ANIMATION OVERLAY */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/15 transition-opacity"></div>
          <div className="text-center animate-bounce p-8 bg-white/95 rounded-3xl shadow-2xl border-4 border-emerald-500 max-w-sm mx-4">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-emerald-800">Qparung Balay!</h3>
            <p className="text-stone-600 mt-2">恭喜你表現卓越！完美達成測驗或解鎖了重要的里程碑！</p>
            <button className="mt-4 px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition" onClick={() => setShowConfetti(false)}>
              太棒了
            </button>
          </div>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="bg-white border-b border-stone-200 py-4 px-6 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏹</span>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-red-800 flex items-center gap-2">
                太魯閣族語第一冊教材 <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Kari Truku</span>
              </h1>
              <p className="text-xs text-stone-500 font-medium">數位互動學習卡與證書認證系統</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Stat Box 1 */}
            <div className="bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-center">
              <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider">已記單字</span>
              <span className="text-sm font-extrabold text-stone-800">{totalLearnedCount} / {totalWords} ({learnedPercentage}%)</span>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-center">
              <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider">通過測驗</span>
              <span className="text-sm font-extrabold text-rose-700">{completedQuizzesCount} / {totalQuizzesCount} 課</span>
            </div>

            {/* Certificate Button */}
            <button
              onClick={() => setCurrentView('certificate')}
              className={`px-4 py-2 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 ${
                canUnlockCertificate 
                ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse' 
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              disabled={!canUnlockCertificate}
              title={canUnlockCertificate ? "解鎖並客製化你的學習證書" : `需要通過至少 5 課測驗才能解鎖證書（目前 ${completedQuizzesCount} 課）`}
            >
              👑 獲得證書
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-8">
        
        {/* VIEW 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="animate-fadeIn">
            {/* Greeting card */}
            <div className="bg-gradient-to-r from-red-800 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 text-9xl transform translate-y-10 translate-x-10 pointer-events-none">🏹</div>
              <div className="relative z-10 max-w-2xl">
                <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider text-white">Smalu ksun! 歡迎！</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-3">Embiyax su hug? 你身體好嗎？</h2>
                <p className="text-stone-100 mt-2 text-sm md:text-base">
                  這是為您量身打造的太魯閣族語（Kari Truku）數位學習卡系統。在這裡，您可以逐步學習第一冊共 10 課的主題詞彙，並透過情境測驗挑戰自己。累積通過測驗，就能下載太魯閣族的榮譽完成證書！
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => {
                    // Pick first lesson to learn
                    setSelectedLesson(VOCABULARY_DATA[0]);
                    setCurrentWordIndex(0);
                    setIsFlipped(false);
                    setCurrentView('learn');
                  }} className="bg-white text-red-900 font-bold px-5 py-2.5 rounded-xl hover:bg-stone-100 shadow transition text-sm">
                    🚀 開始第一課
                  </button>
                  <button onClick={() => {
                    const passCountLeft = 5 - completedQuizzesCount;
                    if(passCountLeft > 0) {
                      alert(`再通過 ${passCountLeft} 課測驗就可以免費生成精美太魯閣證書！加油！`);
                    } else {
                      setCurrentView('certificate');
                    }
                  }} className="bg-red-900/40 hover:bg-red-900/60 border border-white/30 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm flex items-center gap-2">
                    👑 製作學習證書 
                    {completedQuizzesCount < 5 && <span className="text-xs bg-red-600/60 text-white/90 px-2 py-0.5 rounded-md">{completedQuizzesCount}/5</span>}
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Selection Grid */}
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-700 rounded-full"></span>
                太魯閣語 10 課全套教材
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOCABULARY_DATA.map((lesson) => {
                  const passed = quizPassed.has(lesson.lessonId);
                  const score = quizScores[lesson.lessonId] || 0;
                  const lessonLearnedCount = lesson.words.filter(w => learnedWords.has(w.id)).length;
                  const totalLessonWords = lesson.words.length;
                  const isStudied = lessonLearnedCount === totalLessonWords;

                  return (
                    <div key={lesson.lessonId} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                      <div>
                        {/* Header status */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded-md">
                            第 {lesson.lessonId} 課
                          </span>
                          <div className="flex items-center gap-2">
                            {isStudied && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">✓ 已自學</span>}
                            {passed && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">★ 已通關</span>}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-extrabold text-lg text-stone-800 mb-1 leading-snug">
                          {lesson.lessonTitle.split('：')[1] || lesson.lessonTitle}
                        </h4>
                        <p className="text-xs text-stone-500 mb-4">本課包含 {totalLessonWords} 個基礎核心詞彙與實用生活會話。</p>
                      </div>

                      {/* Progress Metrics & Action buttons */}
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1">
                            <span>學習進度 ({lessonLearnedCount}/{totalLessonWords})</span>
                            <span>{Math.round((lessonLearnedCount/totalLessonWords)*100)}%</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-700 h-full rounded-full transition-all duration-300" style={{ width: `${(lessonLearnedCount/totalLessonWords)*100}%` }}></div>
                          </div>
                        </div>

                        {/* Quiz Highscore indicator */}
                        {score > 0 && (
                          <div className="mb-4 flex items-center justify-between bg-stone-50 p-2 rounded-lg border border-stone-200">
                            <span className="text-xs text-stone-500 font-medium">測驗最高分：</span>
                            <span className={`text-xs font-bold ${score >= 80 ? 'text-emerald-600' : 'text-stone-600'}`}>{score} 分</span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setCurrentWordIndex(0);
                              setIsFlipped(false);
                              setCurrentView('learn');
                            }}
                            className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold py-2 px-3 rounded-xl transition text-center"
                          >
                            📖 單字學習卡
                          </button>
                          <button
                            onClick={() => startQuiz(lesson)}
                            className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition text-center"
                          >
                            📝 自我挑戰
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FLASHCARD SYSTEM */}
        {currentView === 'learn' && selectedLesson && (
          <div className="max-w-xl mx-auto animate-fadeIn">
            {/* Navigation back and header info */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentView('dashboard')} className="text-stone-600 hover:text-stone-800 text-sm font-bold flex items-center gap-1.5 transition">
                ← 返回主控制台
              </button>
              <span className="text-xs text-stone-500 font-bold bg-stone-100 px-3 py-1 rounded-full">
                第 {selectedLesson.lessonId} 課 • 單字 {currentWordIndex + 1}/{selectedLesson.words.length}
              </span>
            </div>

            <h3 className="text-xl font-bold text-stone-800 mb-1 text-center">{selectedLesson.lessonTitle}</h3>
            <p className="text-xs text-stone-500 mb-6 text-center">點擊卡片可進行翻面查看中文對照與例句教學</p>

            {/* Core Flashcard component with Flipping Anim */}
            <div className="relative w-full h-[380px] perspective mb-6">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`absolute w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front Side of Card */}
                <div className="absolute w-full h-full backface-hidden bg-white border border-stone-200 rounded-3xl p-6 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-red-200">
                  {/* Card head */}
                  <div className="flex justify-between items-start">
                    <div className="text-red-700 font-black text-sm tracking-wider uppercase bg-red-50 px-2.5 py-1 rounded-lg">Kari Truku</div>
                    <span className="text-4xl">{selectedLesson.words[currentWordIndex].icon}</span>
                  </div>

                  {/* Core Word Content */}
                  <div className="text-center my-auto py-4">
                    <h2 className="text-4xl md:text-5xl font-black text-stone-800 tracking-tight select-all">
                      {selectedLesson.words[currentWordIndex].word}
                    </h2>
                    <p className="text-sm text-stone-400 font-mono mt-2 tracking-wider">
                      Phonetic: / {selectedLesson.words[currentWordIndex].phonetic} /
                    </p>

                    {/* Simulating Audio Wave */}
                    <div className="mt-6 flex justify-center items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(selectedLesson.words[currentWordIndex].word);
                        }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isPlayingAudio 
                          ? 'bg-red-100 text-red-700 border-2 border-red-500 scale-105' 
                          : 'bg-red-700 text-white hover:bg-red-800 hover:scale-105 shadow-md'
                        }`}
                        title="播放族語語音讀音"
                      >
                        {isPlayingAudio ? (
                          <div className="flex items-center gap-0.5 justify-center">
                            <span className="w-1 h-4 bg-red-600 rounded-full animate-audio-wave"></span>
                            <span className="w-1 h-6 bg-red-600 rounded-full animate-audio-wave-delayed-1"></span>
                            <span className="w-1 h-3 bg-red-600 rounded-full animate-audio-wave-delayed-2"></span>
                          </div>
                        ) : (
                          <span className="text-xl">🔊</span>
                        )}
                      </button>
                      <span className="text-xs text-stone-500 font-semibold bg-stone-100 px-2.5 py-1 rounded-full">聽讀發音</span>
                    </div>
                  </div>

                  {/* Card Bottom tip */}
                  <div className="text-center text-xs text-stone-400 border-t border-stone-100 pt-3">
                    💡 點擊卡片查看背面的中文翻譯與例句
                  </div>
                </div>

                {/* Back Side of Card */}
                <div className="absolute w-full h-full backface-hidden bg-stone-900 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between rotate-y-180 border border-stone-800">
                  {/* Back side header */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-stone-400 bg-stone-800 px-2.5 py-1 rounded-lg">中文對照</span>
                    <span className="text-4xl opacity-50">{selectedLesson.words[currentWordIndex].icon}</span>
                  </div>

                  {/* Word translation details */}
                  <div className="text-center my-auto py-2">
                    <span className="text-sm text-red-400 uppercase tracking-wider font-bold">字義解釋</span>
                    <h3 className="text-3xl font-extrabold text-white mt-1 mb-6">
                      {selectedLesson.words[currentWordIndex].translation}
                    </h3>

                    {/* Example section */}
                    <div className="bg-stone-800/80 rounded-2xl p-4 text-left border border-stone-700/50">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">生活例句 / Pnatas matas</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWord(selectedLesson.words[currentWordIndex].example);
                          }}
                          className="text-xs text-stone-400 hover:text-white p-1"
                        >
                          🔊 讀句
                        </button>
                      </div>
                      <p className="text-base font-bold text-white tracking-wide">
                        {selectedLesson.words[currentWordIndex].example}
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        {selectedLesson.words[currentWordIndex].exampleTranslation}
                      </p>
                    </div>
                  </div>

                  {/* Bottom hint */}
                  <div className="text-center text-xs text-stone-500 border-t border-stone-800 pt-3">
                    💡 點擊回到正面
                  </div>
                </div>
              </div>
            </div>

            {/* Flashcard Carousel Controls */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                disabled={currentWordIndex === 0}
                onClick={() => {
                  setCurrentWordIndex(prev => prev - 1);
                  setIsFlipped(false);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-sm ${
                  currentWordIndex === 0 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                  : 'bg-stone-800 hover:bg-stone-950 text-white'
                }`}
              >
                ← 上一個單字
              </button>

              {/* Study Toggle status */}
              <button
                onClick={() => toggleLearned(selectedLesson.words[currentWordIndex].id)}
                className={`py-3 px-6 rounded-xl font-bold transition text-sm flex items-center justify-center gap-1.5 ${
                  learnedWords.has(selectedLesson.words[currentWordIndex].id)
                  ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                }`}
              >
                {learnedWords.has(selectedLesson.words[currentWordIndex].id) ? '✓ 已學會' : '📖 標記已記熟'}
              </button>

              <button
                disabled={currentWordIndex === selectedLesson.words.length - 1}
                onClick={() => {
                  setCurrentWordIndex(prev => prev + 1);
                  setIsFlipped(false);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-sm ${
                  currentWordIndex === selectedLesson.words.length - 1 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                  : 'bg-stone-800 hover:bg-stone-950 text-white'
                }`}
              >
                下一個單字 →
              </button>
            </div>

            {/* Action at end of lesson */}
            {currentWordIndex === selectedLesson.words.length - 1 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center mt-6 animate-pulse">
                <span className="text-2xl">🎉</span>
                <h4 className="font-extrabold text-emerald-800 mt-1">恭喜完成了這一課的所有單字讀音自學！</h4>
                <p className="text-xs text-emerald-600 mt-1">準備好進入小學堂測驗挑戰自我，解鎖太魯閣學習證書了嗎？</p>
                <button
                  onClick={() => startQuiz(selectedLesson)}
                  className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-xl text-xs transition"
                >
                  🚀 進入本課測驗
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: INTERACTIVE QUIZ SYSTEM */}
        {currentView === 'quiz' && selectedLesson && quizQuestions.length > 0 && (
          <div className="max-w-xl mx-auto animate-fadeIn">
            
            {/* Quiz Result Panel */}
            {quizFinished ? (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-lg text-center animate-fadeIn">
                <span className="text-6xl mb-4 inline-block">
                  {score >= 4 ? '🏹' : '💪'}
                </span>
                <h2 className="text-3xl font-black text-stone-800">
                  {score >= 4 ? 'Qparung Balay! 太棒了！' : 'Smluhay binaw! 再挑戰看看！'}
                </h2>
                <p className="text-stone-500 mt-2 text-sm">
                  您在「{selectedLesson.lessonTitle}」的測驗中答對了 <span className="font-bold text-stone-800">{score}</span> 題（滿分 {quizQuestions.length} 題）。
                </p>

                {/* score circle */}
                <div className="my-8 inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-red-700 bg-red-50 text-red-800 relative shadow-inner">
                  <span className="text-xs font-bold tracking-widest uppercase">測驗成績</span>
                  <span className="text-4xl font-black">{Math.round((score / quizQuestions.length) * 100)}</span>
                  <span className="text-xs text-stone-400">分 / Pass 80+</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left mb-6 text-xs text-stone-600">
                  <h4 className="font-bold text-stone-700 mb-1">💡 太魯閣學習小提示：</h4>
                  {score >= 4 ? (
                    <p>您的族語字彙認讀能力非常好！這課的單字已成功歸入已通關紀錄，並朝向太魯閣學習證書邁進了一大步！</p>
                  ) : (
                    <p>沒關係的！您可以先點擊「單字學習卡」多聽多看幾次單字發音與例句，建立語感後再次測試。加油！</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => startQuiz(selectedLesson)}
                    className="py-3 px-4 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl text-sm transition"
                  >
                    🔄 重新挑戰一次
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-sm transition"
                  >
                    🏠 回到主控制台
                  </button>
                </div>
              </div>
            ) : (
              /* Active Quiz UI */
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setCurrentView('dashboard')} className="text-stone-600 hover:text-stone-800 text-sm font-bold transition flex items-center gap-1">
                    ← 返回主控制台
                  </button>
                  <span className="text-xs text-stone-500 font-bold bg-stone-100 px-3 py-1 rounded-full">
                    挑戰中 • 題 {currentQuestionIndex + 1}/{quizQuestions.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden mb-6">
                  <div className="bg-red-700 h-full rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}></div>
                </div>

                {/* Question panel */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm mb-6">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-lg">測驗題目 / Smniling</span>
                  
                  {quizQuestions[currentQuestionIndex].type === 'truku_to_zh' ? (
                    <div className="mt-4">
                      <h3 className="text-xs text-stone-400 font-bold uppercase tracking-wider">請問以下族語單字代表的中文是：</h3>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mt-2 select-none">
                        {quizQuestions[currentQuestionIndex].correctWord.word}
                      </h2>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => speakWord(quizQuestions[currentQuestionIndex].correctWord.word)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 transition"
                        >
                          🔊 聽音辨義
                        </button>
                        <span className="text-xs text-stone-400 font-mono self-center">/ {quizQuestions[currentQuestionIndex].correctWord.phonetic} /</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <h3 className="text-xs text-stone-400 font-bold uppercase tracking-wider">請問中文「 <span className="text-stone-800 font-black">{quizQuestions[currentQuestionIndex].correctWord.translation}</span> 」對應的太魯閣語單字是：</h3>
                      <h2 className="text-3xl font-extrabold text-stone-800 mt-2 select-none">
                        「{quizQuestions[currentQuestionIndex].correctWord.translation}」
                      </h2>
                    </div>
                  )}

                  {/* Answers lists */}
                  <div className="mt-8 space-y-3.5">
                    {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                      let buttonStyle = "border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700";
                      
                      if (isAnswered) {
                        if (option.isCorrect) {
                          buttonStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/20";
                        } else if (selectedAnswer === idx) {
                          buttonStyle = "bg-red-50 border-red-400 text-red-800 font-medium ring-2 ring-red-500/10";
                        } else {
                          buttonStyle = "bg-stone-50 border-stone-100 text-stone-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSelection(idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center justify-between text-base ${buttonStyle}`}
                        >
                          <span>{option.text}</span>
                          {isAnswered && (
                            <span>
                              {option.isCorrect ? '🟢 正確' : selectedAnswer === idx ? '🔴 錯誤' : ''}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback and next action */}
                {isAnswered && (
                  <div className="bg-stone-100/80 rounded-2xl p-4 border border-stone-200 text-stone-700 text-sm flex items-center justify-between animate-fadeIn mb-6">
                    <div>
                      {quizQuestions[currentQuestionIndex].options[selectedAnswer].isCorrect ? (
                        <p className="text-emerald-800 font-extrabold">🏆 答對了！太棒了！</p>
                      ) : (
                        <p className="text-red-800 font-semibold">
                          💡 答錯囉！正確答案是「{quizQuestions[currentQuestionIndex].correctWord.type === 'truku_to_zh' ? quizQuestions[currentQuestionIndex].correctWord.translation : quizQuestions[currentQuestionIndex].correctWord.word}」。
                        </p>
                      )}
                      <p className="text-xs text-stone-500 mt-1">
                        例句對應：{quizQuestions[currentQuestionIndex].correctWord.example} ({quizQuestions[currentQuestionIndex].correctWord.exampleTranslation})
                      </p>
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? '完成挑戰' : '下一題 →'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: CERTIFICATE EXPORTER */}
        {currentView === 'certificate' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            {/* Back button */}
            <div className="mb-6">
              <button onClick={() => setCurrentView('dashboard')} className="text-stone-600 hover:text-stone-800 text-sm font-bold flex items-center gap-1 transition">
                ← 返回主控制台
              </button>
            </div>

            <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Column: Settings Panel */}
              <div className="w-full lg:w-1/3 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
                    <span>👑</span>
                    客製化您的證書
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">恭喜您達成太魯閣族語第一冊的學習挑戰！輸入您的姓名製作專屬證書。</p>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">證書持有者姓名</label>
                  <input
                    type="text"
                    maxLength={15}
                    value={studentName}
                    onChange={handleNameChange}
                    placeholder="請輸入姓名"
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-[10px] text-stone-400">最多可輸入 15 個字（中英文皆可）</p>
                </div>

                {/* Style Chooser */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">選擇證書視覺風格</label>
                  <div className="grid grid-cols-1 gap-2">
                    {/* Style 1 */}
                    <button
                      onClick={() => setCertificateStyle('traditional')}
                      className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between ${
                        certificateStyle === 'traditional'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">🏮 太魯閣傳統編織款</span>
                        <span className="text-[10px] text-stone-500 font-normal">採用傳統紅、白、黑鑽石織紋，象徵祖靈祝福。</span>
                      </div>
                      {certificateStyle === 'traditional' && <span>✔</span>}
                    </button>

                    {/* Style 2 */}
                    <button
                      onClick={() => setCertificateStyle('royal')}
                      className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between ${
                        certificateStyle === 'royal'
                        ? 'border-slate-800 bg-slate-50 text-slate-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">⚜ 皇家精裝金邊款</span>
                        <span className="text-[10px] text-stone-500 font-normal">深靛藍與優雅燙金線條，大氣沉穩。</span>
                      </div>
                      {certificateStyle === 'royal' && <span>✔</span>}
                    </button>

                    {/* Style 3 */}
                    <button
                      onClick={() => setCertificateStyle('nature')}
                      className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between ${
                        certificateStyle === 'nature'
                        ? 'border-emerald-600 bg-emerald-50/30 text-emerald-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">🍃 綠意山林生態款</span>
                        <span className="text-[10px] text-stone-500 font-normal">大地綠色與自然葉脈，代表原住民山海倫理。</span>
                      </div>
                      {certificateStyle === 'nature' && <span>✔</span>}
                    </button>
                  </div>
                </div>

                {/* Exporter Button */}
                <div className="pt-4">
                  <button
                    onClick={downloadCertificate}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
                  >
                    📥 下載高解析度證書圖片 (PNG)
                  </button>
                  <p className="text-[10px] text-center text-stone-400 mt-2">
                    可以直接下載，或者將此視窗列印，永久留存此份成就。
                  </p>
                </div>
              </div>

              {/* Right Column: Dynamic Preview Canvas */}
              <div className="w-full lg:w-2/3 flex flex-col items-center">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">即時證書效果預覽</span>
                
                {/* Beautiful Responsive Canvas frame */}
                <div className="w-full border border-stone-200 rounded-2xl overflow-hidden shadow-lg bg-stone-100 p-2 md:p-4 flex items-center justify-center">
                  <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={560}
                    className="max-w-full h-auto aspect-[800/560] bg-white rounded-lg"
                  ></canvas>
                </div>

                <div className="mt-4 flex items-center gap-2 bg-stone-100 p-3 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-lg text-center">
                  <span>💡</span>
                  <span>
                    提示：證書上印有精美燙金印章和當天的認證日期。若字體未對齊，可以在左側重新輸入名字以完美契合版面。
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER BAR */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-6 text-center border-t border-stone-800 mt-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2 text-white">
            <span className="text-2xl">🌲</span>
            <span className="font-extrabold tracking-wider">Kari Truku Digital Center</span>
          </div>
          <p className="text-xs max-w-md mx-auto leading-relaxed text-stone-500">
            本教具單字基礎基於教育部部編九階《太魯閣語學習手冊第一冊》之生字、語境與例句整理開發，旨在推動本土原住民語言與智慧傳承。
          </p>
          <div className="text-[10px] text-stone-600 pt-4 border-t border-stone-800">
            © 2026 太魯閣族語數位教材發展小組. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}