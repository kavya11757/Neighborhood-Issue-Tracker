const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/neighborhood-tracker')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

const IssueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', IssueSchema);

app.get('/api/issues', async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json(issues);
});

app.post('/api/issues', async (req, res) => {
  const newIssue = new Issue(req.body);
  await newIssue.save();
  res.json(newIssue);
});

app.put('/api/issues/:id', async (req, res) => {
  const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.listen(5000, () => console.log("Server running on port 5000"));