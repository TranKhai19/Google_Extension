const codeFile = document.getElementById('codeFile');
const analyzeButton = document.getElementById('analyzeButton');
const resultsDiv = document.getElementById('results');

analyzeButton.addEventListener('click', async () => {
  const file = codeFile.files[0];
  if (!file) {
    resultsDiv.textContent = "Please select a code file.";
    return;
  }

  const fileContents = await readFile(file);
  const language = detectLanguage(file);

  try {
    const analysisResults = await analyzeCode(language, fileContents);
    displayResults(analysisResults);
  } catch (error) {
    resultsDiv.textContent = `Error: ${error.message}`;
  }
});

// Function to read the file contents
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Improved language detection with MIME types
function detectLanguage(file) {
  const ext = file.name.split('.').pop();
  const mimeType = file.type;

  if (ext === "js" || ext === "jsx" || mimeType.includes('javascript')) {
    return "javascript";
  } else if (ext === "py" || mimeType.includes('python')) {
    return "python";
  } else {
    return "unknown";
  }
}

// Unified analyzeCode function with language detection
async function analyzeCode(language, code) {
  if (language === "javascript") {
    return await analyzeJavaScript(code);
  } else if (language === "python") {
    return await analyzePython(code); // Implement Python analysis (placeholder)
  } else {
    throw new Error(`Unsupported language: ${language}`);
  }
}

// Placeholder function for JavaScript analysis using ESLint
async function analyzeJavaScript(code) {
  // You'll need to install ESLint: npm install eslint
  const ESLint = require('eslint').ESLint;

  const eslint = new ESLint();
  const report = await eslint.lintText(code);
  const messages = report[0].messages;

  const errors = messages.filter(message => message.severity === 1).length;
  const warnings = messages.filter(message => message.severity === 0).length;

  // Implement complexity, duplicates, and maintainability analysis (placeholder)
  const complexity = 0;
  const duplicates = 0;
  const maintainability = 0;

  return {
    errors,
    warnings,
    complexity,
    duplicates,
    maintainability,
  };
}

// Placeholder function for Python analysis (replace with PyLint integration)
async function analyzePython(code) {
  const response = await fetch('/analyze_python', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Error analyzing code: ${response.statusText}`);
  }

  const analysisResults = await response.json();
  return analysisResults;
}

// Display the analysis results
function displayResults(results) {
  resultsDiv.innerHTML = `
    <h3>Complexity: ${results.complexity}</h3>
    <h3>Errors: ${results.errors}</h3>
    <h3>Warnings: ${results.warnings}</h3>
    <h3>Duplicates: ${results.duplicates}</h3>
    <h3>Maintainability: ${results.maintainability}</h3>
  `;
}
