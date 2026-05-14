
document.addEventListener('DOMContentLoaded', () => {
  // --- DADOS E CONSTANTES ---
  const FOOD_ITEMS = [
    { word: 'Café', flavor: 'Doce', temperature: 'Quente' }, { word: 'Churros', flavor: 'Doce', temperature: 'Quente' },
    { word: 'Bolo', flavor: 'Doce', temperature: 'Quente' }, { word: 'Chá', flavor: 'Doce', temperature: 'Quente' },
    { word: 'Panqueca', flavor: 'Doce', temperature: 'Quente' }, { word: 'Sorvete', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Refrigerante', flavor: 'Doce', temperature: 'Frio' }, { word: 'Pudim', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Suco', flavor: 'Doce', temperature: 'Frio' }, { word: 'Iogurte', flavor: 'Doce', temperature: 'Frio' },
    { word: 'Sopa', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Pizza', flavor: 'Salgado', temperature: 'Quente' },
    { word: 'Batata Frita', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Hambúrguer', flavor: 'Salgado', temperature: 'Quente' },
    { word: 'Macarrão', flavor: 'Salgado', temperature: 'Quente' }, { word: 'Sanduíche', flavor: 'Salgado', temperature: 'Frio' },
    { word: 'Salada', flavor: 'Salgado', temperature: 'Frio' }, { word: 'Sushi', flavor: 'Salgado', temperature: 'Frio' },
    { word: 'Queijo', flavor: 'Salgado', temperature: 'Frio' }, { word: 'Presunto', flavor: 'Salgado', temperature: 'Frio' },
  ];
  const FOOD_MAP = new Map(FOOD_ITEMS.map(item => [item.word, item]));
  const preloadedImages = FOOD_ITEMS.map(({ word }) => {
    const img = new Image();
    img.src = `src/imagens/${encodeURIComponent(word)}.jpg`;
    return img;
  });
  const STAGE_1_TRIALS = [ 'Pudim', 'Sopa', 'Suco', 'Batata Frita', 'Pizza', 'Café', 'Café', 'Sanduíche', 'Panqueca', 'Presunto', 'Queijo', 'Sushi', 'Churros', 'Sushi', 'Sorvete', 'Macarrão', 'Hambúrguer', 'Iogurte', 'Panqueca', 'Sopa', 'Chá', 'Pizza', 'Sanduíche', 'Sorvete', 'Salada', 'Presunto', 'Bolo', 'Refrigerante', 'Salada', 'Iogurte', 'Queijo', 'Suco', 'Hambúrguer', 'Churros', 'Batata Frita', 'Pudim', 'Macarrão', 'Chá', 'Bolo', 'Refrigerante' ];
  const STAGE_2_TRIALS = [ 'Café', 'Panqueca', 'Presunto', 'Macarrão', 'Suco', 'Refrigerante', 'Sopa', 'Macarrão', 'Sushi', 'Sushi', 'Presunto', 'Sopa', 'Chá', 'Churros', 'Iogurte', 'Pudim', 'Sanduíche', 'Churros', 'Pudim', 'Sorvete', 'Salada', 'Pizza', 'Batata Frita', 'Iogurte', 'Suco', 'Queijo', 'Bolo', 'Hambúrguer', 'Salada', 'Pizza', 'Batata Frita', 'Café', 'Chá', 'Sanduíche', 'Sorvete', 'Bolo', 'Refrigerante', 'Hambúrguer', 'Queijo', 'Presunto' ];
  const STAGE_3_TRIALS = [ { word: 'Churros', criterion: 'Temperatura', isSwitch: false }, { word: 'Hambúrguer', criterion: 'Temperatura', isSwitch: false }, { word: 'Hambúrguer', criterion: 'Sabor', isSwitch: true }, { word: 'Pudim', criterion: 'Sabor', isSwitch: false }, { word: 'Sopa', criterion: 'Sabor', isSwitch: false }, { word: 'Bolo', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Sabor', isSwitch: false }, { word: 'Sanduíche', criterion: 'Sabor', isSwitch: false }, { word: 'Salada', criterion: 'Temperatura', isSwitch: true }, { word: 'Pizza', criterion: 'Sabor', isSwitch: true }, { word: 'Batata Frita', criterion: 'Sabor', isSwitch: false }, { word: 'Churros', criterion: 'Temperatura', isSwitch: true }, { word: 'Batata Frita', criterion: 'Temperatura', isSwitch: false }, { word: 'Chá', criterion: 'Sabor', isSwitch: true }, { word: 'Sorvete', criterion: 'Temperatura', isSwitch: true }, { word: 'Iogurte', criterion: 'Temperatura', isSwitch: false }, { word: 'Suco', criterion: 'Sabor', isSwitch: true }, { word: 'Pizza', criterion: 'Sabor', isSwitch: false }, { word: 'Salada', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Temperatura', isSwitch: true }, { word: 'Salada', criterion: 'Sabor', isSwitch: true }, { word: 'Sorvete', criterion: 'Sabor', isSwitch: false }, { word: 'Bolo', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Temperatura', isSwitch: false }, { word: 'Macarrão', criterion: 'Sabor', isSwitch: true }, { word: 'Sushi', criterion: 'Sabor', isSwitch: false }, { word: 'Macarrão', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Temperatura', isSwitch: false }, { word: 'Panqueca', criterion: 'Temperatura', isSwitch: false }, { word: 'Queijo', criterion: 'Sabor', isSwitch: true }, { word: 'Iogurte', criterion: 'Temperatura', isSwitch: true }, { word: 'Pizza', criterion: 'Temperatura', isSwitch: false }, { word: 'Iogurte', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Temperatura', isSwitch: true }, { word: 'Pudim', criterion: 'Sabor', isSwitch: true }, { word: 'Macarrão', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Temperatura', isSwitch: true }, { word: 'Refrigerante', criterion: 'Sabor', isSwitch: true }, { word: 'Sushi', criterion: 'Temperatura', isSwitch: true }, { word: 'Bolo', criterion: 'Temperatura', isSwitch: false }, { word: 'Refrigerante', criterion: 'Temperatura', isSwitch: false }, { word: 'Hambúrguer', criterion: 'Sabor', isSwitch: true }, { word: 'Suco', criterion: 'Temperatura', isSwitch: true }, { word: 'Queijo', criterion: 'Temperatura', isSwitch: false }, { word: 'Sushi', criterion: 'Sabor', isSwitch: true }, { word: 'Pudim', criterion: 'Temperatura', isSwitch: true }, { word: 'Sorvete', criterion: 'Temperatura', isSwitch: false }, { word: 'Iogurte', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Temperatura', isSwitch: true }, { word: 'Hambúrguer', criterion: 'Temperatura', isSwitch: false }, { word: 'Presunto', criterion: 'Sabor', isSwitch: true }, { word: 'Refrigerante', criterion: 'Temperatura', isSwitch: true }, { word: 'Salada', criterion: 'Temperatura', isSwitch: false }, { word: 'Sanduíche', criterion: 'Temperatura', isSwitch: false }, { word: 'Sanduíche', criterion: 'Temperatura', isSwitch: false }, { word: 'Macarrão', criterion: 'Temperatura', isSwitch: false }, { word: 'Panqueca', criterion: 'Sabor', isSwitch: true }, { word: 'Pizza', criterion: 'Temperatura', isSwitch: true }, { word: 'Pudim', criterion: 'Temperatura', isSwitch: false }, { word: 'Queijo', criterion: 'Temperatura', isSwitch: false }, { word: 'Churros', criterion: 'Sabor', isSwitch: true }, { word: 'Panqueca', criterion: 'Temperatura', isSwitch: true }, { word: 'Churros', criterion: 'Sabor', isSwitch: true }, { word: 'Suco', criterion: 'Temperatura', isSwitch: true }, { word: 'Batata Frita', criterion: 'Temperatura', isSwitch: false }, { word: 'Refrigerante', criterion: 'Sabor', isSwitch: true }, { word: 'Queijo', criterion: 'Sabor', isSwitch: false }, { word: 'Panqueca', criterion: 'Sabor', isSwitch: false }, { word: 'Presunto', criterion: 'Sabor', isSwitch: false }, { word: 'Suco', criterion: 'Sabor', isSwitch: false }, { word: 'Sorvete', criterion: 'Sabor', isSwitch: false }, { word: 'Chá', criterion: 'Temperatura', isSwitch: true }, { word: 'Bolo', criterion: 'Sabor', isSwitch: true }, { word: 'Batata Frita', criterion: 'Sabor', isSwitch: false }, { word: 'Sanduíche', criterion: 'Sabor', isSwitch: false }, { word: 'Café', criterion: 'Sabor', isSwitch: false }, { word: 'Sushi', criterion: 'Temperatura', isSwitch: true }, { word: 'Sopa', criterion: 'Sabor', isSwitch: true }, { word: 'Café', criterion: 'Temperatura', isSwitch: true } ];

  // --- VARIÁVEIS DE ESTADO ---
  let gameState = 'INSTRUCTIONS_1';
  let currentTrials = [];
  let currentIndex = 0;
  let stageNumber = 0;
  let pendingStage = null;
  let results = [];
  let stageResults = [];
  let startTime = 0;
  let errorCount = 0;
  let feedbackTimeout;

  // --- ELEMENTOS DO DOM ---
  const screens = {
    'INSTRUCTIONS_1': document.getElementById('instructions-1'),
    'INSTRUCTIONS_2': document.getElementById('instructions-2'),
    'INSTRUCTIONS_3': document.getElementById('instructions-3'),
    'POSITIONING': document.getElementById('positioning-screen'),
    'TEST': document.getElementById('test-screen'),
    'RESULTS': document.getElementById('results-screen')
  };
  const testCueEl = document.getElementById('test-cue');
  const testImageEl = document.getElementById('test-image');
  const testFeedbackEl = document.getElementById('test-feedback');
  const testProgressEl = document.getElementById('test-progress');
  const testKeyAMeaningEl = document.getElementById('test-key-a-meaning');
  const testKeyLMeaningEl = document.getElementById('test-key-l-meaning');
  const restartButton = document.getElementById('restart-button');

  const KEY_HINTS_BY_STAGE = {
    1: { a: 'FRIA', l: 'QUENTE' },
    2: { a: 'DOCE', l: 'SALGADA' },
    3: { a: 'FRIA<br>ou DOCE', l: 'QUENTE<br>ou SALGADA' },
  };

  // --- FUNÇÕES DE CONTROLE DE TELA ---
  function showScreen(screenKey) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenKey].classList.remove('hidden');
  }

  // --- LÓGICA DO TESTE ---
  function startStage() {
    clearTimeout(feedbackTimeout);
    window.removeEventListener('keydown', handleInstructionKey);

    const stageMap = {
      'INSTRUCTIONS_1': { next: 'STAGE_1', stageNum: 1, trials: STAGE_1_TRIALS },
      'INSTRUCTIONS_2': { next: 'STAGE_2', stageNum: 2, trials: STAGE_2_TRIALS },
      'INSTRUCTIONS_3': { next: 'STAGE_3', stageNum: 3, trials: STAGE_3_TRIALS },
    };

    const config = stageMap[gameState];
    if (!config) return;

    pendingStage = config;
    gameState = 'POSITIONING';
    showScreen('POSITIONING');
    window.addEventListener('keydown', handlePositioningKey);
  }

  function handlePositioningKey(event) {
    if (event.code !== 'Space') return;
    window.removeEventListener('keydown', handlePositioningKey);
    gameState = pendingStage.next;
    stageNumber = pendingStage.stageNum;
    currentTrials = pendingStage.trials;
    currentIndex = 0;
    stageResults = [];
    const hints = KEY_HINTS_BY_STAGE[stageNumber];
    testKeyAMeaningEl.innerHTML = hints.a;
    testKeyLMeaningEl.innerHTML = hints.l;
    showScreen('TEST');
    renderCurrentTrial();
    window.addEventListener('keydown', handleTestKey);
  }

  function renderCurrentTrial() {
    if (currentIndex >= currentTrials.length) {
      endStage();
      return;
    }

    const { word, criterion } = getTrialInfo();
    testCueEl.textContent = criterion === 'Temperatura' ? '🌡️' : '👄';
    testImageEl.src = `src/imagens/${encodeURIComponent(word)}.jpg`;
    testImageEl.alt = word;
    testFeedbackEl.classList.add('hidden');
    testProgressEl.textContent = `Progresso: ${currentIndex + 1} / ${currentTrials.length}`;
    
    errorCount = 0;
    startTime = Date.now();
  }
  
  function getTrialInfo() {
    const currentTrial = currentTrials[currentIndex];
    if (stageNumber < 3) {
      return { word: currentTrial, criterion: stageNumber === 1 ? 'Temperatura' : 'Sabor', isSwitchTrial: undefined };
    }
    return { word: currentTrial.word, criterion: currentTrial.criterion, isSwitchTrial: currentTrial.isSwitch };
  }

  function handleTestKey(event) {
    const key = event.key.toLowerCase();
    if (key !== 'a' && key !== 'l') return;
    if (!testFeedbackEl.classList.contains('hidden')) return;

    const { word, criterion, isSwitchTrial } = getTrialInfo();
    const foodItem = FOOD_MAP.get(word);
    if (!foodItem) return;

    let correctKey;
    if (criterion === 'Temperatura') {
        correctKey = foodItem.temperature === 'Frio' ? 'a' : 'l';
    } else { // Sabor
        correctKey = foodItem.flavor === 'Doce' ? 'a' : 'l';
    }

    if (key === correctKey) {
      const reactionTime = Date.now() - startTime;
      stageResults.push({
        trialIndex: currentIndex, stage: stageNumber, word, criterion,
        isSwitchTrial, reactionTime, errorCount, correctKey,
      });
      currentIndex++;
      renderCurrentTrial();
    } else {
      errorCount++;
      testFeedbackEl.classList.remove('hidden');
      feedbackTimeout = setTimeout(() => testFeedbackEl.classList.add('hidden'), 500);
    }
  }

  function endStage() {
    window.removeEventListener('keydown', handleTestKey);
    results.push(...stageResults);

    switch (gameState) {
      case 'STAGE_1':
        gameState = 'INSTRUCTIONS_2';
        showScreen('INSTRUCTIONS_2');
        window.addEventListener('keydown', handleInstructionKey);
        break;
      case 'STAGE_2':
        gameState = 'INSTRUCTIONS_3';
        showScreen('INSTRUCTIONS_3');
        window.addEventListener('keydown', handleInstructionKey);
        break;
      case 'STAGE_3':
        gameState = 'RESULTS';
        showScreen('RESULTS');
        break;
    }
  }
  
  function handleInstructionKey(event) {
      if (event.code === 'Space') {
          startStage();
      }
  }

  // --- DOWNLOAD CSV ---
  function downloadCSV() {
    const fields = ['indice_trial', 'etapa', 'palavra', 'criterio', 'eh_troca', 'tempo_reacao_ms', 'numero_erros', 'tecla_correta'];
    const rows = results.map((r, i) => [
      i + 1,
      r.stage,
      r.word,
      r.criterion,
      r.isSwitchTrial === undefined ? '' : (r.isSwitchTrial ? 'sim' : 'nao'),
      r.reactionTime,
      r.errorCount,
      r.correctKey
    ]);
    const headerRow = ['campo', ...rows.map((_, i) => i + 1)];
    const fieldRows = fields.map((field, fi) => [field, ...rows.map(row => row[fi])]);
    const csv = [headerRow, ...fieldRows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultados-task-switching-visual-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- INICIALIZAÇÃO E REINÍCIO ---
  function init() {
    gameState = 'INSTRUCTIONS_1';
    results = [];
    showScreen('INSTRUCTIONS_1');
    window.addEventListener('keydown', handleInstructionKey);
  }

  document.getElementById('download-csv-button').addEventListener('click', downloadCSV);
  restartButton.addEventListener('click', init);

  init();
});
