from flask import Flask, request, jsonify
import pylint

app = Flask(__name__)

@app.route('/analyze_python', methods=['POST'])
def analyze_python():
  code = request.get_json()['code']
  (linter, _) = pylint.run_string(code, return_std=True)
  errors = len(linter.lints)

  complexity = 0  # Improved complexity calculation (example)
  for message in linter.lints:
    if message.msg_id.startswith('(too-many-'):
      complexity += 1
    elif message.msg_id.startswith('(cyclomatic-complexity)'):
      # Example for more specific complexity analysis using message details
      complexity += int(message.msg_id.split(':')[-1])

  # Implement duplicate code detection logic (placeholder)
  duplicates = 0
  # ... (e.g., analyze line numbers or token sequences in messages)

  # Improved maintainability score calculation (example)
  maintainability = 0
  for message in linter.lints:
    if message.msg_id.startswith('(too-many-'):
      maintainability -= 1
    elif message.msg_id.startswith('(bad-smell)'):
      maintainability -= 2  # Higher penalty for potential code smells

  results = {
      'errors': errors,
      'complexity': complexity,
      'duplicates': duplicates,
      'maintainability': maintainability
  }
  return jsonify(results)

if __name__ == '__main__':
  app.run(debug=True)
