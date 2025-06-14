(function() {
  const exprEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  let expr = '';
  let ans = '';

  function updateDisplay() {
    exprEl.textContent = expr;
    resultEl.textContent = ans;
  }

  function safeEval(input) {
    try {
      const sanitized = input.replace(/×/g, '*').replace(/÷/g, '/');
      return eval(sanitized);
    } catch {
      return null;
    }
  }

  document.getElementById('calculator').addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') return;
    const action = e.target.getAttribute('data-action');
    const value = e.target.getAttribute('data-value');

    switch(action) {
      case 'append':
        expr += value;
        break;
      case 'delete':
        expr = expr.slice(0, -1);
        break;
      case 'clear':
        expr = '';
        ans = '';
        break;
      case 'calculate':
        const calc = safeEval(expr);
        ans = calc !== null ? calc : 'Error';
        break;
      case 'sqrt':
        const sq = safeEval(expr);
        if (sq !== null) { ans = Math.sqrt(sq); expr = ans.toString(); } else ans = 'Error';
        break;
      case 'percent':
        const pct = safeEval(expr);
        if (pct !== null) { ans = pct / 100; expr = ans.toString(); } else ans = 'Error';
        break;
      case 'plus-minus':
        if (expr) expr = expr.startsWith('-') ? expr.slice(1) : '-' + expr;
        break;
      case 'use-ans':
        expr = ans.toString();
        break;
    }

    updateDisplay();
  });

  updateDisplay();
})();