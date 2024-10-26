const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Mocked function to parse rule string to AST
const parseRuleToAST = (ruleString) => {
    // Example implementation, convert the string to an AST object
    return { type: 'operator', value: 'AND', left: null, right: null };
  };
  
  // Mocked function to evaluate rule
  const evaluateAST = (ast, userData) => {
    // Evaluate AST logic against user data
    return true;
  };
  
  // Create rule from string
  app.post('/create_rule', (req, res) => {
    const { rule_string } = req.body;
    const ast = parseRuleToAST(rule_string);
    res.json(ast);
  });
  
  // Combine multiple rules into one AST
  app.post('/combine_rules', (req, res) => {
    const { rules } = req.body;
    // Combine logic here (simplified)
    const combinedAST = rules.map(parseRuleToAST);
    res.json(combinedAST);
  });
  
  // Evaluate rule
  app.post('/evaluate_rule', (req, res) => {
    const { ast, userData } = req.body;
    const result = evaluateAST(ast, userData);
    res.json({ result });
  });

const mongoose = require('mongoose');

 mongoose.connect('http://localhost:5000/', { useNewUrlParser: true, useUnifiedTopology: true });

const ruleSchema = new mongoose.Schema({
  ruleString: String,
  ast: Object,
});

const Rule = mongoose.model('Rule', ruleSchema);
