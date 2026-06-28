import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. 靜態資料與常數配置
// ==========================================

const TIMELINE_DATA = [
  {
    era: "起源：唐朝",
    title: "文成公主與松贊干布",
    desc: "文成公主將茶葉傳入西藏，與當地人用牛奶、羊奶熬煮茶。被譽為「寧可三日無糧，不可一日無茶」，拉開了茶與奶結合的序幕。",
    icon: (
      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    era: "創新：1980年代",
    title: "臺灣人發明珍珠奶茶",
    desc: "臺灣人將冰紅茶、牛奶、糖與黑糖粉圓大膽結合，創造了現代的「珍珠奶茶」。進而衍生出波霸、青蛙下蛋等兼具嚼勁與茶香的多元飲品。",
    icon: (
      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    era: "傳播：21世紀",
    title: "風行全球的臺灣之光",
    desc: "在倫敦蘇活區、紐約時代廣場，打著「原料來自臺灣」的珍奶店大排長龍，將具有嚼勁美感的茶飲文化推向世界，成為另類外交使者。",
    icon: (
      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m4-3.5a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// 小吃範例資料庫
const FOOD_TEMPLATES = {
  蚵仔煎: {
    name: "蚵仔煎",
    step1: "在煎盤上鋪滿新鮮蚵仔，淋上太白粉水與鮮美蔬菜煎至邊緣金黃酥脆",
    step2: "打入一顆雞蛋劃破，待蛋香四溢後翻面煎熟，盛盤淋上特製甜辣紅醬",
    main: "鮮甜多汁的蚵仔與滑嫩煎蛋",
    partner: "甜中帶鹹的紅醬與爽脆茼蒿",
    reason: "紅醬的微甜能完美襯托出海鮮的鮮甜，茼蒿的清爽則中和了煎粉漿的油膩感，達到酥爽、滑嫩、鮮甜的完美和諧。"
  },
  臭豆腐: {
    name: "臭豆腐",
    step1: "將發酵好的豆腐切塊，投入高溫油鍋中炸至外皮膨脹並呈現金黃色澤",
    step2: "撈起後在豆腐中間挖洞，填入蒜泥與醬油膏，使其充分吸收醬汁",
    main: "外酥內軟、發酵香氣獨特的熱油炸豆腐",
    partner: "酸甜清脆的台式高麗菜泡菜",
    reason: "高溫炸豆腐積聚了濃郁的發酵香氣與油脂，而冰涼酸甜的泡菜能即時解膩，在一冷一熱、一酥一脆間，激盪出絕妙平衡。"
  },
  滷肉飯: {
    name: "滷肉飯",
    step1: "將帶皮五花肉切細條，與紅蔥頭爆香後加入醬油、冰糖慢火燉煮至膠質釋出",
    step2: "將熱騰騰、飽滿Ｑ彈的白米飯盛碗，均勻澆淋上一大匙香氣濃郁的滷肉與滷汁",
    main: "香濃軟糯、入口即化的手工慢熬滷肉汁",
    partner: "微酸帶鹹、解膩爽口的黃色醃蘿蔔片",
    reason: "濃郁飽滿的動物油脂與膠質黏唇濃香，極易產生飽脹感；此時搭配一片清脆、微酸的醃蘿蔔，能瞬間洗滌味蕾，讓人想一口接一口。"
  }
};

// 評量題目
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "根據《珍珠奶茶》一文，關於奶茶與茶的歷史，下列哪一項敘述是正確的？",
    options: [
      { key: "A", text: "珍珠奶茶是一九八〇年代由唐朝文成公主發明的。" },
      { key: "B", text: "茶和奶的結合可能起源於唐朝，由文成公主傳入西藏。" },
      { key: "C", text: "西藏人因為討厭奶茶，所以說「寧可三日無糧，不可一日無茶」。" }
    ],
    answer: "B",
    explain: "茶與奶結合的歷史可追溯至唐朝文成公主遠嫁松贊干布時，將茶葉及烹茶技術引入西藏，與當地人用牛羊奶熬煮，深受喜愛。而現代珍珠奶茶則是1980年代由臺灣人發明的。"
  },
  {
    id: 2,
    question: "「在多元化的社會裡，我們不僅需要擁有開放的心態，更需要能夠欣賞不同文化的內涵。」這句話屬於什麼句型？",
    options: [
      { key: "A", text: "選擇複句" },
      { key: "B", text: "遞進複句" },
      { key: "C", text: "因果複句" }
    ],
    answer: "B",
    explain: "這句話使用了「不僅……更……」關聯詞，後者分句的語意比前者更進一層，屬於典型的「遞進複句」。"
  },
  {
    id: 3,
    question: "課文中提到「部分商家為了令粉圓產生彈牙的嚼感，而加入有害健康的添加物」，對此，作者提出了什麼反思？",
    options: [
      { key: "A", text: "我們應該鼓勵商家多加人造添加物，增加飲料香氣。" },
      { key: "B", text: "當味覺習慣了香濃的人造「娛樂食物」，就會難以接受真實而美好的原味。" },
      { key: "C", text: "只要喝起來好喝，我們不需要在乎粉圓是不是老老實實做出來的。" }
    ],
    answer: "B",
    explain: "作者焦桐提醒我們，過度依賴化學香精與有害添加物製成的「娛樂食物」，會讓味覺變得遲鈍，喪失欣賞食物天然原味、老老實實手作美感的能力。"
  },
  {
    id: 4,
    question: "「各式各樣的豆腐是怎麼來的呢？把豆腐拿去油炸，就變成油豆腐；把豆腐放進冷凍庫凝結冰晶，就成了火鍋裡的凍豆腐。」這段話主要使用哪一種說明手法？",
    options: [
      { key: "A", text: "分解說明（依步驟詳細說明豆腐的製作過程）" },
      { key: "B", text: "舉例說明（列舉出油豆腐、凍豆腐等具體實例）" },
      { key: "C", text: "比較說明" }
    ],
    answer: "B",
    explain: "此處列舉了「油豆腐」與「凍豆腐」兩個生活中的常見實例，用來支持與證實豆腐多樣變化的特點，屬於「舉例說明法」。"
  },
  {
    id: 5,
    question: "小明想寫一個「選擇複句」來表達自己今天放學要喝哪一種飲料，下列哪一項最正確？",
    options: [
      { key: "A", text: "小明不僅喜歡喝珍珠奶茶，更喜歡去買大杯烏龍茶。" },
      { key: "B", text: "放學後，我不知道要去買微糖的四季春，還是喝白開水比較健康？" },
      { key: "C", text: "因為我想健康生活，所以我不喝含糖的珍珠奶茶。" }
    ],
    answer: "B",
    explain: "選項(B)使用了「是……還是……」（此處略寫「是」，用「要去買...還是...」代表二擇一的選擇關係），屬於選擇複句；選項(A)為遞進複句，選項(C)為因果複句。"
  }
];

// ==========================================
// 2. 主程式組件
// ==========================================

export default function App() {
  // --- UI 全局狀態 ---
  const [activeSection, setActiveSection] = useState("guide");
  const [studentName, setStudentName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  // --- 互動狀態一：遞進複句拼圖 ---
  const puzzle1PiecesInit = [
    { id: "p1-1", text: "不僅需要擁有開放的心態，" },
    { id: "p1-2", text: "更需要能夠欣賞不同文化的內涵。" },
    { id: "p1-3", text: "我們" },
    { id: "p1-4", text: "在多元化的社會裡，" }
  ];
  const [p1Pool, setP1Pool] = useState(puzzle1PiecesInit);
  const [p1Slots, setP1Slots] = useState([null, null, null, null]);
  const [p1Checked, setP1Checked] = useState(false);
  const [p1IsCorrect, setP1IsCorrect] = useState(false);

  // --- 互動狀態二：遞進複句填空 ---
  const [fillInput1, setFillInput1] = useState("");
  const [fillFeedback1, setFillFeedback1] = useState("");

  // --- 互動狀態三：選擇複句拼圖 ---
  const puzzle2PiecesInit = [
    { id: "p2-1", text: "這首古詩的作者" },
    { id: "p2-2", text: "是李白，" },
    { id: "p2-3", text: "還是王維，" },
    { id: "p2-4", text: "我已經記不清楚了。" }
  ];
  const [p2Pool, setP2Pool] = useState(puzzle2PiecesInit);
  const [p2Slots, setP2Slots] = useState([null, null, null, null]);
  const [p2Checked, setP2Checked] = useState(false);
  const [p2IsCorrect, setP2IsCorrect] = useState(false);

  // --- 互動狀態四：選擇複句填空 ---
  const [fillInput2, setFillInput2] = useState("");
  const [fillFeedback2, setFillFeedback2] = useState("");

  // --- 互動狀態五：說明手法連連看 ---
  const [matchingAnswers, setMatchingAnswers] = useState({ qA: "", qB: "" });
  const [matchChecked, setMatchChecked] = useState(false);

  // --- 互動狀態六：粉圓演算法智慧工廠 ---
  const initialFactoryBlocks = [
    { id: "b1", text: "加水攪拌", step: 1 },
    { id: "b2", text: "搓揉成粒", step: 2 },
    { id: "b3", text: "篩去餘粉", step: 3 },
    { id: "b4", text: "滾水煮熟", step: 4 },
    { id: "b5", text: "拌黑糖漿", step: 5 }
  ];
  const [factoryPool, setFactoryPool] = useState([]);
  const [factorySlots, setFactorySlots] = useState([null, null, null, null, null]);
  const [compiling, setCompiling] = useState(false);
  const [compilerLogs, setCompilerLogs] = useState(["系統就緒。請編排 5 大粉圓製作時序積木，點擊「啟動組裝線」進行診斷編譯。"]);
  const [compilerStatus, setCompilerStatus] = useState("STANDBY"); // STANDBY, COMPILING, SUCCESS, ERROR
  const [cookingProgress, setCookingProgress] = useState(0);

  // --- 互動狀態七：台灣小吃寫作結構產生器 ---
  const [foodName, setFoodName] = useState("");
  const [foodStep1, setFoodStep1] = useState("");
  const [foodStep2, setFoodStep2] = useState("");
  const [foodMain, setFoodMain] = useState("");
  const [foodPartner, setFoodPartner] = useState("");
  const [foodReason, setFoodReason] = useState("");

  // --- 綜合評量挑戰賽狀態 ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // --- Canvas 證書引用 ---
  const canvasRef = useRef(null);

  // --- 初始化與重置函式 ---
  useEffect(() => {
    shufflePuzzles();
    resetFactory();
  }, []);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 3500);
  };

  // 打亂拼圖
  const shufflePuzzles = () => {
    setP1Pool([...puzzle1PiecesInit].sort(() => Math.random() - 0.5));
    setP1Slots([null, null, null, null]);
    setP1Checked(false);
    setP1IsCorrect(false);

    setP2Pool([...puzzle2PiecesInit].sort(() => Math.random() - 0.5));
    setP2Slots([null, null, null, null]);
    setP2Checked(false);
    setP2IsCorrect(false);
  };

  // 句型一：拼圖填裝
  const handleP1TileClick = (tile, fromSlotIndex = null) => {
    setP1Checked(false);
    if (fromSlotIndex !== null) {
      // 從 Slot 退回 Pool
      const newSlots = [...p1Slots];
      newSlots[fromSlotIndex] = null;
      setP1Slots(newSlots);
      setP1Pool([...p1Pool, tile]);
    } else {
      // 從 Pool 填入第一個空 Slot
      const emptyIdx = p1Slots.findIndex(s => s === null);
      if (emptyIdx !== -1) {
        const newSlots = [...p1Slots];
        newSlots[emptyIdx] = tile;
        setP1Slots(newSlots);
        setP1Pool(p1Pool.filter(p => p.id !== tile.id));
      } else {
        showToast("拼圖欄位已滿，請先點擊已填入的拼圖來移除它！", "warning");
      }
    }
  };

  const checkP1Result = () => {
    if (p1Slots.includes(null)) {
      showToast("請先將所有拼圖填入插槽！", "warning");
      return;
    }
    const order = p1Slots.map(s => s.id);
    // 正確語序：我們(p1-3) -> 在多元化的社會裡，(p1-4) -> 不僅需要擁有開放的心態，(p1-1) -> 更需要能夠欣賞不同文化的內涵。(p1-2)
    const isCorrect = order[0] === "p1-3" && order[1] === "p1-4" && order[2] === "p1-1" && order[3] === "p1-2";
    setP1IsCorrect(isCorrect);
    setP1Checked(true);
    if (isCorrect) {
      showToast("🎉 太棒了！遞進拼圖完全正確！", "success");
      // 答對加分回饋效果
    } else {
      showToast("❌ 排序好像不太通順，再試試看喔！", "error");
    }
  };

  // 句型二：拼圖填裝
  const handleP2TileClick = (tile, fromSlotIndex = null) => {
    setP2Checked(false);
    if (fromSlotIndex !== null) {
      const newSlots = [...p2Slots];
      newSlots[fromSlotIndex] = null;
      setP2Slots(newSlots);
      setP2Pool([...p2Pool, tile]);
    } else {
      const emptyIdx = p2Slots.findIndex(s => s === null);
      if (emptyIdx !== -1) {
        const newSlots = [...p2Slots];
        newSlots[emptyIdx] = tile;
        setP2Slots(newSlots);
        setP2Pool(p2Pool.filter(p => p.id !== tile.id));
      } else {
        showToast("拼圖欄位已滿！", "warning");
      }
    }
  };

  const checkP2Result = () => {
    if (p2Slots.includes(null)) {
      showToast("請先將所有拼圖填入插槽！", "warning");
      return;
    }
    const order = p2Slots.map(s => s.id);
    // 正確語序：這首古詩的作者(p2-1) -> 是李白，(p2-2) -> 還是王維，(p2-3) -> 我已經記不清楚了。(p2-4)
    const isCorrect = order[0] === "p2-1" && order[1] === "p2-2" && order[2] === "p2-3" && order[3] === "p2-4";
    setP2IsCorrect(isCorrect);
    setP2Checked(true);
    if (isCorrect) {
      showToast("🎉 恭喜！選擇複句拼圖完全正確！", "success");
    } else {
      showToast("❌ 句子的順序似乎不夠符合邏輯，請重試！", "error");
    }
  };

  // 遞進複句填空檢查
  const submitFill1 = () => {
    if (!fillInput1.trim()) {
      showToast("請先輸入您的答案！", "warning");
      return;
    }
    const text = fillInput1.trim();
    if (text.includes("更") && text.length > 5) {
      setFillFeedback1("👍 寫得真好！你成功運用「更」字作出了具有深度遞進邏輯的句子！");
      showToast("寫作挑戰成功！", "success");
    } else {
      setFillFeedback1("💡 提示：你的答案需要包含「更」這個字，並試著遞進到健康的考量（例如：「更要注意食材是否安全無毒」）。");
    }
  };

  // 選擇複句填空檢查
  const submitFill2 = () => {
    if (!fillInput2.trim()) {
      showToast("請先輸入您的答案！", "warning");
      return;
    }
    const text = fillInput2.trim();
    if ((text.includes("還是") || text.includes("或")) && text.length > 5) {
      setFillFeedback2("👍 太棒了！二擇一的選擇邏輯非常清晰，很有批判思考的精神！");
      showToast("寫作挑戰成功！", "success");
    } else {
      setFillFeedback2("💡 提示：試著使用「還是...」來對比出不健康的娛樂食物與健康無糖飲品（例如：「還是富含天然維生素、無防腐劑的鮮榨天然果汁呢？」）。");
    }
  };

  // 說明手法連連看檢查
  const checkMatching = () => {
    if (!matchingAnswers.qA || !matchingAnswers.qB) {
      showToast("請將 A、B 兩個段落的說明手法都選好！", "warning");
      return;
    }
    setMatchChecked(true);
    if (matchingAnswers.qA === "example" && matchingAnswers.qB === "decompose") {
      showToast("🎉 連連看完全答對！你已掌握說明文雙雄！", "success");
    } else {
      showToast("❌ 哎呀，有一題選錯囉，請再仔細閱讀段落！", "error");
    }
  };

  // --- 智慧工廠邏輯 ---
  const resetFactory = () => {
    setFactoryPool([...initialFactoryBlocks].sort(() => Math.random() - 0.5));
    setFactorySlots([null, null, null, null, null]);
    setCompilerStatus("STANDBY");
    setCompilerLogs(["系統就緒。請拼裝 5 大粉圓製作時序積木，點擊下方「啟動組裝線」進行演算法診斷編譯。"]);
    setCookingProgress(0);
    setCompiling(false);
  };

  const handleFactoryTileClick = (block, fromSlotIndex = null) => {
    if (compiling) return;
    setCompilerStatus("STANDBY");
    if (fromSlotIndex !== null) {
      const newSlots = [...factorySlots];
      newSlots[fromSlotIndex] = null;
      setFactorySlots(newSlots);
      setFactoryPool([...factoryPool, block]);
    } else {
      const emptyIdx = factorySlots.findIndex(s => s === null);
      if (emptyIdx !== -1) {
        const newSlots = [...factorySlots];
        newSlots[emptyIdx] = block;
        setFactorySlots(newSlots);
        setFactoryPool(factoryPool.filter(p => p.id !== block.id));
      } else {
        showToast("組裝線插槽已滿！", "warning");
      }
    }
  };

  // 執行智慧診斷與編譯
  const runDiagnostics = () => {
    if (factorySlots.includes(null)) {
      showToast("請先將 5 個步驟原料積木全部放上組裝線！", "warning");
      return;
    }

    setCompiling(true);
    setCompilerStatus("COMPILING");
    setCompilerLogs(["[LOG] 啟動認知編譯器 V2.6...", "[LOG] 偵測組裝線插槽..."]);

    const logs = [];
    const steps = factorySlots.map(s => s.step);

    setTimeout(() => {
      setCompilerLogs(prev => [...prev, "[LOG] 進行時序相依性分析中..."]);
    }, 800);

    setTimeout(() => {
      // 開始分析各步驟是否合乎物理/語意邏輯
      let isCorrect = true;
      let errorIndex = -1;
      let advice = "";

      // 正確順序：1, 2, 3, 4, 5
      // 1. 加水攪拌
      // 2. 搓揉成粒
      // 3. 篩去餘粉
      // 4. 滾水煮熟
      // 5. 拌黑糖漿

      for (let i = 0; i < steps.length; i++) {
        const currentStep = steps[i];
        // 檢查前置邏輯
        if (currentStep === 4) { // 煮熟
          // 必須在 1(攪拌) 2(搓揉) 之後
          const idx1 = steps.indexOf(1);
          const idx2 = steps.indexOf(2);
          if (idx1 > i || idx2 > i) {
            isCorrect = false;
            errorIndex = i;
            advice = "【時序衝突警告】在乾地瓜粉攪拌搓揉前，直接將多餘粉末或滾水引入，會導致乾粉瞬間化為無形，無法結成顆粒！整鍋融化成地瓜水啦！";
            break;
          }
        }
        if (currentStep === 5) { // 拌黑糖漿
          // 必須在 4(煮熟) 之後
          const idx4 = steps.indexOf(4);
          if (idx4 > i) {
            isCorrect = false;
            errorIndex = i;
            advice = "【邏輯因果警告】生粉圓不可先拌黑糖漿！如果尚未放入滾水煮熟就先拌糖，糖分高會阻礙澱粉顆粒糊化，使粉圓煮不透、中心僵硬，且黑糖會在滾水中脫色流失！";
            break;
          }
        }
        if (currentStep === 3) { // 篩去餘粉
          // 必須在 2(成粒) 之後，在 4(滾水煮熟) 之前
          const idx2 = steps.indexOf(2);
          const idx4 = steps.indexOf(4);
          if (idx2 > i) {
            isCorrect = false;
            errorIndex = i;
            advice = "【序列拓撲異常】尚未「搓揉成粒」前就進行「篩去餘粉」，此時全是粉狀，篩子會讓粉末漏光，完全無法留下任何東西！";
            break;
          }
          if (idx4 < i) {
            isCorrect = false;
            errorIndex = i;
            advice = "【物理程序警告】必須在「滾水煮熟」之前「篩去餘粉」！如果直接將黏有餘粉的生粉圓倒進鍋子，外表的乾粉會使整鍋滾水變成濃稠的地瓜粉糊，粉圓會全部黏在一起變成一團巨大的麵糊！";
            break;
          }
        }
      }

      if (isCorrect && JSON.stringify(steps) !== JSON.stringify([1, 2, 3, 4, 5])) {
        // 如果上面放寬的邏輯恰好過關，但順序仍不是最完美的 1->2->3->4->5
        isCorrect = false;
        advice = "【時序演算法未最佳化】步驟之間的因果順序有細微衝突。最完美的珍珠製造演算法應為：加水攪拌 ➔ 搓揉成粒 ➔ 篩去餘粉 ➔ 滾水煮熟 ➔ 拌黑糖漿。";
      }

      if (isCorrect) {
        setCompilerStatus("SUCCESS");
        setCompilerLogs(prev => [
          ...prev,
          "[✓] 演算法時序拓撲校驗：100% 穩定！",
          "[✓] 未發現時序衝突或物理逻辑崩潰風險！",
          "[STATUS] 成功產出完美彈牙珍珠！啟動美味物理模擬..."
        ]);
        setCompiling(false);
        // 觸發 3 秒的物理烹煮動畫進度
        let p = 0;
        const interval = setInterval(() => {
          p += 10;
          setCookingProgress(p);
          if (p >= 100) {
            clearInterval(interval);
            showToast("🎉 粉圓完美製作成功！大腦編譯順暢無阻！", "success");
          }
        }, 300);
      } else {
        setCompilerStatus("ERROR");
        setCompilerLogs(prev => [
          ...prev,
          `[❌ ERROR] 編譯失敗！發現嚴重邏輯衝突 (SLOT_0${errorIndex + 1})`,
          `[診斷分析] ${advice}`,
          "[STATUS] 系統進入安全模式，請調整積木順序後重新編譯。"
        ]);
        setCompiling(false);
        showToast("❌ 編譯邏輯有誤，請閱讀診斷日誌！", "error");
      }
    }, 2000);
  };

  // 載入小吃結構產生器模版
  const loadFoodTemplate = (key) => {
    const t = FOOD_TEMPLATES[key];
    if (t) {
      setFoodName(t.name);
      setFoodStep1(t.step1);
      setFoodStep2(t.step2);
      setFoodMain(t.main);
      setFoodPartner(t.partner);
      setFoodReason(t.reason);
      showToast(`已成功載入經典小吃「${t.name}」結構配置！`, "info");
    } else {
      // 清空
      setFoodName("");
      setFoodStep1("");
      setFoodStep2("");
      setFoodMain("");
      setFoodPartner("");
      setFoodReason("");
      showToast("結構產生器已重置，請自由發揮！", "info");
    }
  };

  // 生成的短文內容
  const generatedEssayText = `【${foodName || "未命名台灣小吃"}】是臺灣極具代表性的美味。它的製作過程宛如一條精密的演算法：首先，${foodStep1 || "（尚未輸入步驟一）"}；緊接著，${foodStep2 || "（尚未輸入步驟二）"}。除了主體製作，這道美食最精妙之處在於完美的搭配美感。將主角「${foodMain || "（主角）"}」與靈魂配角「${foodPartner || "（配角）"}」相結合，之所以能達到美味的平衡，是因為${foodReason || "（平衡分析）"}。這樣兼具邏輯時序與食材關聯的結構搭配，正是這道臺灣小吃的靈魂所在！`;

  // 複製生成的說明文
  const copyEssayToClipboard = () => {
    // 複製相容
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = generatedEssayText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      showToast("📋 說明文已成功複製到剪貼簿！可以貼到班級討論板（如 Padlet 或 Google Classroom）囉！", "success");
    } catch (err) {
      showToast("複製失敗，請手動全選文字進行複製！", "error");
    }
    document.body.removeChild(tempTextArea);
  };

  // --- 評量挑戰邏輯 ---
  const handleQuizSelect = (qId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const submitQuiz = () => {
    if (Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length) {
      showToast("請回答所有題目後再送出評量！", "warning");
      return;
    }
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.answer) {
        score += 20;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    showToast(`評量提交成功！您的得分：${score} 分！`, score >= 80 ? "success" : "warning");
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    showToast("評量已重置，可以重新挑戰囉！", "info");
  };

  // --- 證書 Canvas 繪製與下載功能 ---
  useEffect(() => {
    if (activeSection === "certificate" || (quizSubmitted && quizScore >= 80)) {
      drawCertificate();
    }
  }, [studentName, quizScore, activeSection]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清空並設置高畫質
    canvas.width = 800;
    canvas.height = 560;

    // 1. 繪製復古高貴背景
    ctx.fillStyle = "#FDFBF7";
    ctx.fillRect(0, 0, 800, 560);

    // 2. 繪製古典奢華外框
    ctx.strokeStyle = "#854D0E"; // 琥珀深棕色
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, 760, 520);

    ctx.strokeStyle = "#CA8A04"; // 金色內框
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 740, 500);

    // 3. 繪製精緻的角落花紋 (SVG感點綴)
    ctx.fillStyle = "#CA8A04";
    const corners = [
      [35, 35], [765, 35], [35, 525], [765, 525]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. 繪製主標題
    ctx.textAlign = "center";
    ctx.fillStyle = "#713F12"; // 沉穩咖啡褐
    ctx.font = "bold 34px 'Noto Sans TC', 'Microsoft JhengHei', sans-serif";
    ctx.fillText("珍珠奶茶結構工程師", 400, 95);

    ctx.font = "italic bold 16px sans-serif";
    ctx.fillStyle = "#A16207";
    ctx.fillText("HONORARY CERTIFICATE OF ACHIEVEMENT", 400, 130);

    // 5. 繪製裝飾分隔線
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(550, 150);
    ctx.strokeStyle = "#EAB308";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 繪製中間的小珍珠裝飾
    ctx.fillStyle = "#1E293B";
    ctx.beginPath();
    ctx.arc(400, 150, 8, 0, Math.PI * 2);
    ctx.fill();

    // 6. 內文
    ctx.fillStyle = "#334155";
    ctx.font = "18px 'Noto Sans TC', sans-serif";
    ctx.fillText("茲證明本學堂優秀學子", 400, 205);

    // 學生姓名
    ctx.fillStyle = "#1E293B";
    ctx.font = "bold 28px 'Noto Sans TC', sans-serif";
    const displayName = studentName.trim() || "【 優秀學習者 】";
    ctx.fillText(displayName, 400, 255);

    // 姓名底線
    ctx.beginPath();
    ctx.moveTo(240, 268);
    ctx.lineTo(560, 268);
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 詳細證詞
    ctx.fillStyle = "#475569";
    ctx.font = "15px/1.8 'Noto Sans TC', sans-serif";
    
    // 斷行處理
    const line1 = "於 國語六上第六課《珍珠奶茶》跨領域學習挑戰賽中表現卓越，";
    const line2 = `成功克服句型特訓與說明法拆解，並以 ${quizScore || 100} 分之優異成績通過審查！`;
    const line3 = "特此證明已完全理解說明文之「分解說明演算法」與「舉例說明搭配美感」，";
    const line4 = "具備卓越的跨領域資訊傳播結構與健康飲食科技素養。";

    ctx.fillText(line1, 400, 310);
    ctx.fillText(line2, 400, 340);
    ctx.fillText(line3, 400, 370);
    ctx.fillText(line4, 400, 400);

    // 7. 認證底標與蓋章
    ctx.beginPath();
    ctx.moveTo(100, 435);
    ctx.lineTo(700, 435);
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "13px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("認證機構：AI 跨領域智慧教學網", 100, 465);
    ctx.fillText("課程配合：國語六上第六課《珍珠奶茶》", 100, 490);

    ctx.textAlign = "right";
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    ctx.fillText(`發證日期：${dateStr}`, 700, 465);
    ctx.fillStyle = "#059669";
    ctx.fillText("時序邏輯檢驗核可 ✓", 700, 490);

    // 8. 繪製精美紅印章 / 勳章 (SVG/向量點綴)
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(220, 38, 38, 0.15)";
    ctx.strokeStyle = "rgba(220, 38, 38, 0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(400, 480, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.font = "bold 13px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
    ctx.fillText("教學研發", 400, 475);
    ctx.fillText("認證章", 400, 495);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${studentName.trim() || "學生"}_珍珠奶茶大師榮譽證書.png`;
    link.href = url;
    link.click();
    showToast("💖 證書 PNG 下載成功！恭喜你！", "success");
  };

  const copyShareText = () => {
    const text = `🎉 太開心了！我剛剛在《珍珠奶茶互動教學網》中完成了所有句型與時序演算法特訓，並且在綜合評量挑戰中獲得了 ${quizScore} 分的好成績，成功領取了「珍珠奶茶結構工程師」榮譽證書！大家也快來挑戰，當個有邏輯的珍奶大師吧！🥤`;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      showToast("📋 分享賀詞已成功複製到剪貼簿！可以貼給爸爸媽媽看或分享到群組囉！", "success");
    } catch (err) {
      showToast("複製失敗，請手動複製！", "error");
    }
    document.body.removeChild(tempTextArea);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased selection:bg-amber-100 selection:text-amber-900 pb-12">
      
      {/* 浮動式 Toast 通知 */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center px-5 py-3 rounded-xl shadow-xl transition-all duration-300 transform translate-y-0 max-w-md ${
          toast.type === "success" ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500" :
          toast.type === "error" ? "bg-rose-50 text-rose-800 border-l-4 border-rose-500" :
          toast.type === "warning" ? "bg-amber-50 text-amber-800 border-l-4 border-amber-500" :
          "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
        }`}>
          <span className="text-xl mr-3">
            {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "⚠"}
          </span>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* 頂部極簡高貴 Header 暨學習進度條 */}
      <header className="sticky top-0 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-amber-100 shadow-sm z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🧋</span>
              <div>
                <h1 className="text-lg font-bold text-amber-900 leading-tight">珍珠奶茶互動教學網</h1>
                <p className="text-xs text-amber-700">語文、寫作與資訊結構工程跨領域平台</p>
              </div>
            </div>

            {/* 桌面端導航列 */}
            <nav className="hidden md:flex space-x-1">
              {[
                { id: "guide", label: "精華導讀" },
                { id: "grammar", label: "句型特訓" },
                { id: "factory", label: "結構演算法" },
                { id: "quiz", label: "綜合評量" },
                { id: "certificate", label: "榮譽證書" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === tab.id
                      ? "bg-amber-700 text-white"
                      : "text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-500 block">挑戰得分</span>
                <span className="text-sm font-bold text-amber-800">{quizSubmitted ? `${quizScore}/100` : "未提交"}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold border border-amber-200">
                {quizSubmitted ? "🏆" : "★"}
              </div>
            </div>
          </div>
        </div>
        
        {/* 進度裝飾線 */}
        <div className="h-1 w-full bg-slate-100">
          <div 
            className="h-full bg-amber-600 transition-all duration-500" 
            style={{ 
              width: activeSection === "guide" ? "20%" : 
                     activeSection === "grammar" ? "45%" : 
                     activeSection === "factory" ? "70%" : 
                     activeSection === "quiz" ? "85%" : "100%" 
            }} 
          />
        </div>
      </header>

      {/* 主體區 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-16">
        
        {/* 頂部 Hero 橫幅 */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5F0E6] to-[#E8DCB9] p-8 md:p-12 shadow-sm border border-amber-100">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <span className="text-[250px] select-none">🧋</span>
          </div>
          
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-800 text-amber-50">
              小六國語・第六課
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-amber-950 mt-4 leading-tight">
              當珍珠奶茶遇上<br className="sm:hidden" /><span className="text-amber-700">資訊結構工程</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 mt-4 leading-relaxed">
              原本不相交的「粉圓」與「奶茶」，在臺灣人的巧思大膽融合下，創造出風靡全球的奇蹟。
              本平台將帶領你透過「資訊工程師」的嚴謹邏輯，拆解說明文的寫作結構、精煉複句，並在智慧工廠中調製專屬於你的頂級珍奶！
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  document.getElementById("grammar")?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection("grammar");
                }}
                className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-xl transition shadow"
              >
                開始句型特訓 ➔
              </button>
              <button
                onClick={() => {
                  document.getElementById("factory")?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection("factory");
                }}
                className="bg-white/80 hover:bg-white text-amber-900 font-semibold px-6 py-3 rounded-xl border border-amber-200 transition"
              >
                啟動智慧工廠
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            1. 課文精華導讀 (Guide)
           ========================================== */}
        <section id="guide" className="scroll-mt-20">
          <div className="flex items-center space-x-2 mb-6">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">🏺</span>
            <h3 className="text-2xl font-bold text-slate-800">單元一：課文精華導讀</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側：精華介紹與飲食反思 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100/50">
                <h4 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                  <span className="mr-2">🧋</span> 永不交集的平行線，創造激賞奇蹟
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  第六課《珍珠奶茶》改寫自名飲食作家焦桐的作品。作者用生動流暢的筆觸，敘述原本毫無交集的「粉圓」與「奶茶」是如何在臺灣人的巧思下，融合為風靡全球的「臺灣之光」。課文不僅介紹了奶茶的歷史，更詳細說明了粉圓的製作過程與美味的關鍵。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-100/60">
                    <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-1">美味關鍵</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      粉圓製作極度講究彈性勁道、不可黏稠。每一顆都要老老實實地製作，不能依靠有害健康的添加物。
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50/40 rounded-xl border border-rose-100/60">
                    <span className="text-xs text-rose-800 font-bold uppercase tracking-wider block mb-1">飲食反思與 SDGs</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      作者提醒我們，莫沉迷於高熱量、高糖高鹽的化學「娛樂食物」，應學會欣賞食材原本純真且美好的天然原味。
                    </p>
                  </div>
                </div>
              </div>

              {/* 橫向時間軸 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/50">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">珍珠奶茶演進歷史軌跡</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  {TIMELINE_DATA.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-xs font-bold text-amber-700">{item.era}</span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右側：補救教學小提醒 */}
            <div className="bg-gradient-to-b from-amber-900 to-amber-950 text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs bg-amber-800 text-amber-200 px-3 py-1 rounded-full font-bold uppercase tracking-widest">補救教學專家小提醒</span>
                <h4 className="text-xl font-bold mt-4 mb-3 text-amber-100">本課核心攻克要點</h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  本課除了學習健康飲食素養，在修辭與文法上的重點是理解和運用：
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-start">
                    <span className="bg-amber-800 text-amber-200 text-xs w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                    <div>
                      <strong className="text-sm text-white block">遞進複句 (不僅……更……)</strong>
                      <span className="text-xs text-amber-200/80">後者分句要在程度、範圍上更深一層。</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-800 text-amber-200 text-xs w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                    <div>
                      <strong className="text-sm text-white block">選擇複句 (是……還是……)</strong>
                      <span className="text-xs text-amber-200/80">提供兩者並列的選項以供理性的批判抉擇。</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-800 text-amber-200 text-xs w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                    <div>
                      <strong className="text-sm text-white block">說明文兩大基本功</strong>
                      <span className="text-xs text-amber-200/80">學習如何交替運用「分解說明法」與「舉例說明法」。</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-amber-800/60 mt-6">
                <button
                  onClick={() => {
                    document.getElementById("grammar")?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection("grammar");
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition text-center"
                >
                  前往句型與語文特訓 ➔
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. 語文句型特訓室 (Grammar)
           ========================================== */}
        <section id="grammar" className="scroll-mt-20">
          <div className="flex items-center space-x-2 mb-6">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">➕</span>
            <h3 className="text-2xl font-bold text-slate-800">單元二：語文句型特訓室</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 遞進複句特訓區 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">遞進複句特訓</span>
                  <span className="text-xs text-slate-400">「不僅……更……」</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">什麼是「遞進複句」？</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  後面分句所表達的意思，比前面分句在範圍、數量、程度或時間上，<strong>更進一層</strong>。
                  <br />
                  <em className="text-amber-800 block mt-1">課文例句：「粉圓的口感不僅講究彈勁，不可黏稠，更不可加入有害人體的物質。」</em>
                </p>

                {/* 互動一：詞牌排序 */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                    拖曳/點擊詞牌拼圖：
                  </h5>
                  
                  {/* 插槽區 */}
                  <div className="grid grid-cols-1 gap-2 p-3 bg-amber-50/30 rounded-xl border border-dashed border-amber-200 min-h-[140px]">
                    {p1Slots.map((slot, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-xs text-amber-700/60 font-mono w-16">SLOT {idx+1}:</span>
                        {slot ? (
                          <button
                            onClick={() => handleP1TileClick(slot, idx)}
                            className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-xs px-3 py-2 rounded-lg text-left shadow-sm transition transform active:scale-95 flex justify-between items-center"
                          >
                            <span>{slot.text}</span>
                            <span className="text-[10px] text-amber-200 bg-amber-900 px-1.5 py-0.5 rounded">移除</span>
                          </button>
                        ) : (
                          <div className="flex-1 border border-dashed border-amber-300 rounded-lg h-9 bg-[#FDFBF7]" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 候選池 */}
                  <div className="mt-4">
                    <span className="text-xs text-slate-400 block mb-2">點擊以下積木送上組裝線：</span>
                    <div className="flex flex-wrap gap-2">
                      {p1Pool.map((piece) => (
                        <button
                          key={piece.id}
                          onClick={() => handleP1TileClick(piece)}
                          className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs px-3 py-2 rounded-lg border border-amber-200 transition shadow-sm transform active:scale-95"
                        >
                          {piece.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 判定按鈕與結果 */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={checkP1Result}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold py-2 px-4 rounded-xl transition"
                      >
                        檢查語序
                      </button>
                      <button
                        onClick={shufflePuzzles}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition"
                      >
                        重置
                      </button>
                    </div>
                    {p1Checked && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${p1IsCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {p1IsCorrect ? "✓ 完全正確！" : "✕ 順序有些不對"}
                      </span>
                    )}
                  </div>
                </div>

                {/* 互動二：句型寫作填空 */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                    創意遞進寫作挑戰：
                  </h5>
                  <div className="bg-[#FDFBF7] p-4 rounded-xl border border-amber-100 text-xs space-y-3">
                    <p className="text-slate-600 leading-relaxed">
                      <strong>情境提示：</strong> 媽媽做菜非常講究，（先說原味，再遞進到健康與誠實安全）
                    </p>
                    <p className="text-slate-700">
                      「媽媽煮的菜不僅<strong>呈現食材真實的原味</strong>，」
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-800 text-sm">更</span>
                      <input
                        type="text"
                        value={fillInput1}
                        onChange={(e) => setFillInput1(e.target.value)}
                        placeholder="在此輸入後半句... (需包含「更」字，例：更拒絕使用任何化學添加物。)"
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={submitFill1}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition"
                      >
                        送出答案
                      </button>
                      <span className="text-[10px] text-slate-400">點擊送出即可獲得 AI 邏輯診斷</span>
                    </div>
                    {fillFeedback1 && (
                      <p className="mt-2 text-[11px] text-amber-900 bg-amber-50/60 p-2.5 rounded border border-amber-100/60 leading-relaxed">
                        {fillFeedback1}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* 選擇複句特訓區 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">選擇複句特訓</span>
                  <span className="text-xs text-slate-400">「是……還是……」</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">什麼是「選擇複句」？</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  說出兩種或兩種以上的情況，要求從中<strong>選擇一種</strong>。
                  <br />
                  <em className="text-amber-800 block mt-1">課文例句：「想一想，現今大眾是會在乎珍珠奶茶的發明者是誰，還是會在乎是誰認真泡茶、老老實實的製作粉圓？」</em>
                </p>

                {/* 互動一：詞牌排序 */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                    拖曳/點擊詞牌拼圖：
                  </h5>
                  
                  {/* 插槽區 */}
                  <div className="grid grid-cols-1 gap-2 p-3 bg-amber-50/30 rounded-xl border border-dashed border-amber-200 min-h-[140px]">
                    {p2Slots.map((slot, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-xs text-amber-700/60 font-mono w-16">SLOT {idx+1}:</span>
                        {slot ? (
                          <button
                            onClick={() => handleP2TileClick(slot, idx)}
                            className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-xs px-3 py-2 rounded-lg text-left shadow-sm transition transform active:scale-95 flex justify-between items-center"
                          >
                            <span>{slot.text}</span>
                            <span className="text-[10px] text-amber-200 bg-amber-900 px-1.5 py-0.5 rounded">移除</span>
                          </button>
                        ) : (
                          <div className="flex-1 border border-dashed border-amber-300 rounded-lg h-9 bg-[#FDFBF7]" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 候選池 */}
                  <div className="mt-4">
                    <span className="text-xs text-slate-400 block mb-2">點擊以下積木送上組裝線：</span>
                    <div className="flex flex-wrap gap-2">
                      {p2Pool.map((piece) => (
                        <button
                          key={piece.id}
                          onClick={() => handleP2TileClick(piece)}
                          className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs px-3 py-2 rounded-lg border border-amber-200 transition shadow-sm transform active:scale-95"
                        >
                          {piece.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 判定按鈕與結果 */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={checkP2Result}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold py-2 px-4 rounded-xl transition"
                      >
                        檢查語序
                      </button>
                      <button
                        onClick={shufflePuzzles}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition"
                      >
                        重置
                      </button>
                    </div>
                    {p2Checked && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${p2IsCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {p2IsCorrect ? "✓ 完全正確！" : "✕ 順序有些不對"}
                      </span>
                    )}
                  </div>
                </div>

                {/* 互動二：句型寫作填空 */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                    <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                    批判思考選擇挑戰：
                  </h5>
                  <div className="bg-[#FDFBF7] p-4 rounded-xl border border-amber-100 text-xs space-y-3">
                    <p className="text-slate-600 leading-relaxed">
                      <strong>情境提示：</strong> 購買飲料時，你會選擇短暫刺激的人造高糖食品，還是有益長遠健康的飲品？
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      「為了身體的健康，我們在挑選飲品時應該深思：<br />
                      是<strong>要選擇滿足短暫快感的高熱量奶精奶茶</strong>，」
                    </p>
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-amber-800 text-sm mt-1">還是</span>
                      <textarea
                        rows={2}
                        value={fillInput2}
                        onChange={(e) => setFillInput2(e.target.value)}
                        placeholder="在此輸入後半句... (需包含「還是」或「選擇...」，例如：還是要選擇無糖、零負擔的天然鮮奶茶，來愛護自己的身體？)"
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <button
                        onClick={submitFill2}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition"
                      >
                        送出答案
                      </button>
                      <span className="text-[10px] text-slate-400">點擊送出獲得分析</span>
                    </div>
                    {fillFeedback2 && (
                      <p className="mt-2 text-[11px] text-amber-900 bg-amber-50/60 p-2.5 rounded border border-amber-100/60 leading-relaxed">
                        {fillFeedback2}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            3. 說明手法大拆解 (Explanation Methods)
           ========================================== */}
        <section className="scroll-mt-20">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">📊</span>
                <h4 className="text-xl font-bold text-slate-800">說明手法大拆解：分解說明 vs 舉例說明</h4>
              </div>
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">說明文精髓</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm text-slate-600">
              <div className="p-5 bg-[#FDFBF7] rounded-xl border border-amber-100">
                <h5 className="font-bold text-amber-900 text-base mb-2 flex items-center">
                  <span className="mr-2">①</span> 分解說明法（時序演算法）
                </h5>
                <p className="text-xs leading-relaxed">
                  將一個複雜的「動態過程」或「結構組成」，依據「時間」或「因果」順序拆解成一個個具體、可單獨執行的微小步驟，便於讀者照做。
                  <br />
                  <em className="text-amber-800 block mt-2 font-mono">粉圓作法：加水攪拌 ➡️ 搓揉成粒 ➡️ 篩去餘粉 ➡️ 滾水煮熟 ➡️ 拌黑糖漿。</em>
                </p>
              </div>

              <div className="p-5 bg-[#FDFBF7] rounded-xl border border-amber-100">
                <h5 className="font-bold text-amber-900 text-base mb-2 flex items-center">
                  <span className="mr-2">②</span> 舉例說明法（模式與關聯）
                </h5>
                <p className="text-xs leading-relaxed">
                  當要表達一個抽象或生疏的概念（如「搭配的美感」）時，引用數個讀者熟悉、具體的實例，來支持與證實論點，使文章極具說服力。
                  <br />
                  <em className="text-amber-800 block mt-2 font-mono">美食搭配：泡菜 ＆ 臭豆腐、油條 ＆ 豆漿、五味醬 ＆ 章魚。</em>
                </p>
              </div>
            </div>

            {/* 連連看實戰 */}
            <div className="border-t border-slate-100 pt-6">
              <h5 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                🎯 現學現賣：說明方法連連看 (配合小學語文習作內容)
              </h5>
              <div className="space-y-4">
                {/* 題目 A */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl gap-3">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-amber-800 text-white text-[10px] mr-2">段落 A</span>
                    <span className="text-xs text-slate-700 font-medium">「豆腐流傳到世界各地，出現了各種好吃的料理，例如：韓國的豆腐鍋、日本的味噌豆腐湯、臺灣的皮蛋豆腐等……。」</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMatchingAnswers(p => ({ ...p, qA: "example" }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        matchingAnswers.qA === "example"
                          ? "bg-amber-800 text-white border-amber-800"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      舉例說明
                    </button>
                    <button
                      onClick={() => setMatchingAnswers(p => ({ ...p, qA: "decompose" }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        matchingAnswers.qA === "decompose"
                          ? "bg-amber-800 text-white border-amber-800"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      分解說明
                    </button>
                  </div>
                </div>

                {/* 題目 B */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl gap-3">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-amber-800 text-white text-[10px] mr-2">段落 B</span>
                    <span className="text-xs text-slate-700 font-medium">「首先，把泡軟的黃豆加水磨成汁，接著用紗布過濾豆渣，再把過濾後的豆漿加熱熬煮，最後點滷水凝固，美味的豆腐就完成了。」</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMatchingAnswers(p => ({ ...p, qB: "example" }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        matchingAnswers.qB === "example"
                          ? "bg-amber-800 text-white border-amber-800"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      舉例說明
                    </button>
                    <button
                      onClick={() => setMatchingAnswers(p => ({ ...p, qB: "decompose" }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        matchingAnswers.qB === "decompose"
                          ? "bg-amber-800 text-white border-amber-800"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      分解說明
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={checkMatching}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition"
                >
                  校對解答
                </button>
                {matchChecked && (
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                    matchingAnswers.qA === "example" && matchingAnswers.qB === "decompose"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}>
                    {matchingAnswers.qA === "example" && matchingAnswers.qB === "decompose"
                      ? "✓ 完全正確！太棒了，你對這兩大說明手法的特徵瞭若指掌！"
                      : "✕ 哎呀，有一題放錯位置了，請再回憶一下定義喔！"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. 智慧演算法工廠 (Factory)
           ========================================== */}
        <section id="factory" className="scroll-mt-20">
          <div className="flex items-center space-x-2 mb-6">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">⚙️</span>
            <h3 className="text-2xl font-bold text-slate-800">單元三：資訊與寫作結構工廠</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 左側：粉圓演算法工廠 - 佔 7 欄 */}
            <div className="lg:col-span-7 bg-slate-900 text-slate-100 p-6 md:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[10px] font-mono bg-slate-800 text-cyan-400 px-2 py-0.5 rounded tracking-widest uppercase">COGNITIVE COMPILER V2.6</span>
                    <h4 className="text-lg md:text-xl font-bold text-white mt-1">⚙️ 粉圓製作演算法智慧工廠</h4>
                  </div>
                  <button
                    onClick={resetFactory}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-1.5 px-3 rounded-lg border border-slate-700 transition"
                  >
                    重置組裝線
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  說明文的<strong>「分解說明」</strong>，就像軟體開發中的<strong>「時序演算法」</strong>。步驟的前後因果邏輯一旦發生衝突衝突，大腦編譯系統就會當機，做出的粉圓也會徹底融化！
                  請將下方「原料積木」按正確時序點擊送上組裝線！
                </p>

                {/* 積木原料池 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">🛠️ 步驟原料池（隨機打亂中）</span>
                  <div className="flex flex-wrap gap-2">
                    {factoryPool.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleFactoryTileClick(block)}
                        disabled={compiling}
                        className="bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 border border-slate-700 font-medium px-3.5 py-2 rounded-lg text-xs transition duration-200 shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        {block.text}
                      </button>
                    ))}
                    {factoryPool.length === 0 && (
                      <span className="text-xs text-slate-600 italic">所有原料已送入組裝線...</span>
                    )}
                  </div>
                </div>

                {/* 插槽組裝線 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-3">⚙️ 時序分解演算法組裝線 (FLOW DIAGRAM)</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {factorySlots.map((slot, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-[11px] font-mono text-cyan-500 w-16">SLOT_0{idx+1}</span>
                        {slot ? (
                          <button
                            onClick={() => handleFactoryTileClick(slot, idx)}
                            disabled={compiling}
                            className="flex-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-100 border border-cyan-800/80 rounded-lg px-3.5 py-2.5 text-xs text-left transition transform active:scale-95 flex justify-between items-center"
                          >
                            <span className="font-semibold">{slot.text}</span>
                            <span className="text-[9px] bg-cyan-900 text-cyan-300 px-1.5 py-0.5 rounded tracking-wide uppercase">點擊收回</span>
                          </button>
                        ) : (
                          <div className="flex-1 border border-dashed border-slate-800 rounded-lg h-10 bg-slate-900/30 flex items-center px-4">
                            <span className="text-[11px] text-slate-600 italic">空插槽 - 點選上方積木填入</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 動態物理模擬器 SVG */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">PHYSICAL PROCESS SIMULATION</span>
                    <span className="text-xs font-bold text-slate-400">
                      工廠狀態：
                      <span className={
                        compilerStatus === "SUCCESS" ? "text-emerald-400 font-bold" :
                        compilerStatus === "ERROR" ? "text-rose-500 font-bold" :
                        compilerStatus === "COMPILING" ? "text-amber-400 animate-pulse" : "text-slate-500"
                      }>
                        {compilerStatus === "SUCCESS" ? "編譯完成 ✓" :
                         compilerStatus === "ERROR" ? "邏輯崩潰 ✕" :
                         compilerStatus === "COMPILING" ? "動態分析中..." : "待機中 (STANDBY)"}
                      </span>
                    </span>
                  </div>

                  <div className="h-28 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* SVG 烹煮與攪拌動畫 */}
                    <div className="flex items-center space-x-8 z-10">
                      {/* 加水攪拌 */}
                      <div className={`flex flex-col items-center transition-all ${cookingProgress > 0 ? "scale-105" : "opacity-30"}`}>
                        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span className="text-[10px] mt-1 text-slate-400">粉團塑模</span>
                      </div>

                      {/* 篩子 */}
                      <div className={`flex flex-col items-center transition-all ${cookingProgress > 25 ? "scale-105" : "opacity-30"}`}>
                        <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[10px] mt-1 text-slate-400">篩選微粒</span>
                      </div>

                      {/* 滾水鍋子 */}
                      <div className={`flex flex-col items-center relative transition-all ${cookingProgress > 50 ? "scale-105" : "opacity-30"}`}>
                        <div className={`absolute -top-3 left-3 flex space-x-1 ${cookingProgress > 50 ? "animate-bounce" : ""}`}>
                          <span className="w-1 h-2 bg-slate-500/50 rounded-full" />
                          <span className="w-1 h-3 bg-slate-500/50 rounded-full" />
                          <span className="w-1 h-2 bg-slate-500/50 rounded-full" />
                        </div>
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-[10px] mt-1 text-slate-400">大火糊化</span>
                      </div>

                      {/* 珍珠黑糖拌勻 */}
                      <div className={`flex flex-col items-center transition-all ${cookingProgress > 80 ? "scale-105" : "opacity-30"}`}>
                        <div className="flex items-center space-x-0.5 h-6">
                          <span className={`w-2 h-2 rounded-full bg-slate-950 block ${cookingProgress > 80 ? "animate-ping" : ""}`} />
                          <span className="w-2 h-2 rounded-full bg-slate-950 block" />
                          <span className="w-2 h-2 rounded-full bg-slate-950 block" />
                        </div>
                        <span className="text-[10px] text-slate-400">焦香糖漬</span>
                      </div>
                    </div>

                    {/* 當成功時的滾動珍珠背景 */}
                    {cookingProgress > 0 && compilerStatus === "SUCCESS" && (
                      <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-[1px] pointer-events-none flex flex-wrap gap-2 p-2 overflow-hidden items-end">
                        {Array.from({ length: 45 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-4.5 h-4.5 rounded-full bg-slate-950 shadow-md animate-bounce"
                            style={{ 
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: "1s"
                            }} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 控制台日誌 Console Logs */}
                <div className="bg-[#0b1019] p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block mb-2">▶ COMPILER DIAGNOSTIC LOGS:</span>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto scrollbar-thin">
                    {compilerLogs.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={
                          log.includes("[✓]") ? "text-emerald-400 font-bold" :
                          log.includes("[❌") ? "text-rose-500 font-bold" :
                          log.includes("[STATUS]") ? "text-cyan-400 font-bold" :
                          log.includes("[診斷分析]") ? "text-amber-300 font-semibold leading-relaxed" : "text-slate-400"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 啟動按鈕區 */}
              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <button
                  onClick={runDiagnostics}
                  disabled={compiling}
                  className={`w-full text-center py-3 px-4 rounded-xl font-bold transition flex items-center justify-center space-x-2 ${
                    compiling 
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                      : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg"
                  }`}
                >
                  {compiling ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>智慧診斷編譯中...</span>
                    </>
                  ) : (
                    <>
                      <span>啟動組裝線 (RUN DIAGNOSTICS)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 右側：寫作結構產生器 - 佔 5 欄 */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                  🎨 台灣小吃寫作結構產生器
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  融合「分解說明（演算法）」與「舉例說明（模式關聯）」，為台灣經典美食繪製一張高科技風格的「結構工程藍圖」。
                </p>

                {/* 快速模版按鈕 */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-amber-900 block mb-2">快速載入經典寫作配置模版：</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["蚵仔煎", "臭豆腐", "滷肉飯"].map((name) => (
                      <button
                        key={name}
                        onClick={() => loadFoodTemplate(name)}
                        className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-[10px] font-bold py-1 px-1.5 rounded-lg border border-amber-200 transition"
                      >
                        {name === "蚵仔煎" ? "🍳 " : name === "臭豆腐" ? "🪵 " : "🍚 "}
                        {name}
                      </button>
                    ))}
                    <button
                      onClick={() => loadFoodTemplate("clear")}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-500 text-[10px] py-1 px-1.5 rounded-lg border border-slate-200 transition"
                    >
                      🧹 清空
                    </button>
                  </div>
                </div>

                {/* 輸入表單 */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">小吃名稱 (Food Name)</label>
                    <input
                      type="text"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      placeholder="例如：鹽酥雞"
                      className="w-full bg-[#FDFBF7] border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-slate-700 font-semibold"
                    />
                  </div>

                  {/* 分解說明：時序步驟 */}
                  <div className="p-3 bg-amber-50/20 rounded-xl border border-amber-100">
                    <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block mb-2">Decomposition（時序演算法步驟）</span>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">步驟 1：主材料製作與初熟</span>
                        <input
                          type="text"
                          value={foodStep1}
                          onChange={(e) => setFoodStep1(e.target.value)}
                          placeholder="例如：將嫩雞肉塊裹上細地瓜粉，投入高溫油鍋..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">步驟 2：副材料加入與熟透</span>
                        <input
                          type="text"
                          value={foodStep2}
                          onChange={(e) => setFoodStep2(e.target.value)}
                          placeholder="例如：起鍋前三十秒投入翠綠九層塔爆香，瀝乾油脂並撒上椒鹽粉"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 舉例說明：搭配關聯 */}
                  <div className="p-3 bg-cyan-50/20 rounded-xl border border-cyan-100">
                    <span className="text-[10px] font-mono text-cyan-800 font-bold uppercase tracking-wider block mb-2">Exemplification（關係對應與關聯）</span>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block">主角 (Main)</span>
                          <input
                            type="text"
                            value={foodMain}
                            onChange={(e) => setFoodMain(e.target.value)}
                            placeholder="例如：椒鹽酥脆雞肉塊"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">靈魂配角 (Partner)</span>
                          <input
                            type="text"
                            value={foodPartner}
                            onChange={(e) => setFoodPartner(e.target.value)}
                            placeholder="例如：高溫爆香九層塔"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">為什麼這兩者是完美平衡？(原因)</span>
                        <textarea
                          rows={2}
                          value={foodReason}
                          onChange={(e) => setFoodReason(e.target.value)}
                          placeholder="例如：九層塔的強烈精油芳香，能瞬間穿透並中和油脂的厚重感，而椒鹽粉的微辛更能勾勒出炸雞多汁鮮美的層次感。"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 即時藍圖與說明文複製 */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <div className="bg-cyan-950 text-cyan-400 p-4 rounded-xl border border-cyan-800 font-mono text-xs shadow-inner">
                  <div className="flex justify-between items-center mb-3 border-b border-cyan-900 pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-cyan-500">DWG NO: TAIWAN-FOOD-ST-06</span>
                    <span className="text-[10px] uppercase text-cyan-500">SCALE: 1:1 ACTIVE</span>
                  </div>
                  <h5 className="font-bold text-white mb-2 text-sm flex items-center">
                    🎨 【{foodName || "未命名台灣小吃"}】結構分析短文預覽
                  </h5>
                  <p className="leading-relaxed text-cyan-300 text-[11px] h-28 overflow-y-auto scrollbar-thin">
                    {generatedEssayText}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={copyEssayToClipboard}
                    className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>📋 複製說明文</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            5. 綜合評量挑戰賽 (Quiz)
           ========================================== */}
        <section id="quiz" className="scroll-mt-20">
          <div className="flex items-center space-x-2 mb-6">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">🏆</span>
            <h3 className="text-2xl font-bold text-slate-800">單元四：珍珠奶茶大師綜合評量挑戰賽</h3>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-amber-100/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
              <div>
                <span className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest">實力檢驗區</span>
                <p className="text-xs text-slate-400 mt-2">本區共有 5 題單選題。答對 4 題（80分）以上即可解鎖並領取「臺灣之光・珍珠奶茶大師」榮譽證書！加油！</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center space-x-4">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">目前狀態</span>
                  <span className={`text-xs font-bold ${quizSubmitted ? "text-amber-800" : "text-slate-500"}`}>
                    {quizSubmitted ? "已提交" : "進行中"}
                  </span>
                </div>
                <div className="h-8 w-px bg-amber-200" />
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">獲得分數</span>
                  <span className="text-lg font-black text-amber-800">{quizSubmitted ? `${quizScore} 分` : "?? 分"}</span>
                </div>
              </div>
            </div>

            {/* 題目列表 */}
            <div className="space-y-8">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="p-5 bg-[#FDFBF7]/60 rounded-2xl border border-amber-100/40 relative">
                  <div className="absolute top-4 left-4 w-6 h-6 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div className="pl-8">
                    <h4 className="font-bold text-slate-800 text-sm md:text-base mb-4 leading-relaxed">{q.question}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {q.options.map((opt) => {
                        const isSelected = quizAnswers[q.id] === opt.key;
                        const isCorrectAnswer = q.answer === opt.key;
                        
                        let optStyle = "bg-white border-slate-200 text-slate-700 hover:bg-amber-50/50";
                        if (isSelected) {
                          optStyle = "bg-amber-800 text-white border-amber-800";
                        }
                        if (quizSubmitted) {
                          if (isCorrectAnswer) {
                            optStyle = "bg-emerald-50 text-emerald-800 border-emerald-500 font-bold ring-2 ring-emerald-500/20";
                          } else if (isSelected) {
                            optStyle = "bg-rose-50 text-rose-800 border-rose-300 font-bold";
                          } else {
                            optStyle = "bg-white text-slate-400 border-slate-100 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleQuizSelect(q.id, opt.key)}
                            disabled={quizSubmitted}
                            className={`flex items-start text-left p-3 rounded-xl border text-xs leading-relaxed transition ${optStyle}`}
                          >
                            <span className="font-mono font-bold mr-2 uppercase">({opt.key})</span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* 診斷詳解說明 */}
                    {quizSubmitted && (
                      <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 text-xs text-slate-600 leading-relaxed">
                        <strong className="text-amber-800 block mb-1">【大師解惑分析】</strong>
                        {q.explain}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 提交控制區 */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex space-x-2">
                {!quizSubmitted ? (
                  <button
                    onClick={submitQuiz}
                    className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition shadow"
                  >
                    送出評量解答
                  </button>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition shadow"
                  >
                    重置評量挑戰
                  </button>
                )}
              </div>
              
              {quizSubmitted && quizScore >= 80 && (
                <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 animate-bounce">
                  <span className="text-xl">🏆</span>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">恭喜通過珍珠大師考核！</span>
                    <button
                      onClick={() => {
                        setActiveSection("certificate");
                        setTimeout(() => {
                          document.getElementById("certificate")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="text-xs font-black text-emerald-600 hover:underline"
                    >
                      點我前往領取榮譽證書 ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================
            6. 領取榮譽證書 (Certificate)
           ========================================== */}
        <section id="certificate" className="scroll-mt-20">
          <div className="flex items-center space-x-2 mb-6">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-lg text-lg">📜</span>
            <h3 className="text-2xl font-bold text-slate-800">單元五：臺灣之光・珍珠奶茶大師認證殿堂</h3>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-amber-100/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* 左側：自訂名字 */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest">成就系統證書發放</span>
                <h4 className="text-xl font-bold text-slate-800 leading-snug">
                  恭喜你成功通過<br />句型特訓、演算法工廠與綜合評量！
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  請在下方輸入你的姓名，我們將即時為你客製化生成極具紀念價值的「珍珠奶茶結構工程師」大師榮譽證書。你可以下載高清圖檔或直接列印保存。
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2">請輸入您的真實姓名或學號：</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="例如：王小明"
                    className="w-full bg-[#FDFBF7] border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-800"
                  />
                </div>

                {/* 說明或限制 */}
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100/60">
                  <span className="text-xs text-amber-800 font-bold block mb-1">💡 證書獲取資格審查說明：</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    任何挑戰者只需在「第四單元：綜合評量挑戰賽」中獲得 80 分（含）以上即可解鎖證書下載功能。
                    {!quizSubmitted && "（您目前尚未提交評量答案，預設名字欄位將處於預覽狀態。）"}
                    {quizSubmitted && quizScore < 80 && `（您目前得分為 ${quizScore} 分，建議重置並重新挑戰至 80 分以上解鎖認證印章！）`}
                    {quizSubmitted && quizScore >= 80 && `（恭喜！您已成功以 ${quizScore} 分的高分資格通過審查，認證印章已順利蓋印核可！）`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={downloadCertificate}
                    disabled={quizSubmitted && quizScore < 80}
                    className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-3 px-5 rounded-xl transition shadow flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>💾 下載高清 PNG 證書</span>
                  </button>
                  <button
                    onClick={copyShareText}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-3 px-4 rounded-xl transition shadow flex items-center space-x-1.5"
                  >
                    <span>📢 複製分享賀詞</span>
                  </button>
                  <button
                    onClick={printCertificate}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition"
                  >
                    <span>🖨️ 列印此證書</span>
                  </button>
                </div>
              </div>

              {/* 右側：Canvas 證書預覽渲染 */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 mb-2">【 大師榮譽證書即時渲染區 (HTML5 Canvas 高清渲染) 】</span>
                <div className="w-full max-w-full overflow-hidden border border-slate-200 rounded-2xl bg-[#FDFBF7] shadow-lg">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-auto aspect-[1.428] block"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 底部頁腳 */}
      <footer className="mt-20 border-t border-amber-100 pt-8 pb-12 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-2xl">🧋</span>
            <span className="font-bold text-amber-900">國語六上第六課：珍珠奶茶</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            【AI跨領域教學網站設計】配合國語六上第六課《珍珠奶茶》教材設計<br />
            融入 SDGs 2（消除飢餓與食品安全）與資訊科學時序演算法教育理念。
          </p>
          <div className="text-xs text-slate-300">
            「堅持傳統，大膽創新，激盪出美麗火花。」
          </div>
        </div>
      </footer>
    </div>
  );
}