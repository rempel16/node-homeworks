require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./db');

const Publisher = require('./models/Publisher');
const Magazine = require('./models/Magazine');
const Tag = require('./models/Tag');
const Article = require('./models/Article');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

async function runDemo() {
  await Publisher.deleteMany({});
  await Magazine.deleteMany({});
  await Tag.deleteMany({});
  await Article.deleteMany({});

  const pub = await Publisher.create({ name: 'O’Reilly', location: 'CA' });
  await Magazine.create({ title: 'Node Weekly', issueNumber: 1, publisher: pub._id });
  await Magazine.create({ title: 'JS Monthly', issueNumber: 42, publisher: pub._id });

  const mags = await Magazine.find({ publisher: pub._id }).populate('publisher');
  console.log('Publisher -> Magazines count:', mags.length);
  console.log('Example magazine populated publisher name:', mags[0].publisher.name);

  const t1 = await Tag.create({ name: 'node' });
  const t2 = await Tag.create({ name: 'mongodb' });

  const a1 = await Article.create({ title: 'Intro', content: 'Hello', tags: [t1._id, t2._id] });
  const a2 = await Article.create({ title: 'Advanced', content: 'Deep', tags: [t1._id] });

  await Tag.updateOne({ _id: t1._id }, { $addToSet: { articles: { $each: [a1._id, a2._id] } } });
  await Tag.updateOne({ _id: t2._id }, { $addToSet: { articles: a1._id } });

  const articleWithTags = await Article.findById(a1._id).populate('tags');
  console.log('Article populated tags:', articleWithTags.tags.map(t => t.name));

  const tagWithArticles = await Tag.findById(t1._id).populate('articles');
  console.log('Tag populated articles:', tagWithArticles.articles.map(a => a.title));
}

(async () => {
  await connectDB(process.env.MONGODB_URI);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    try {
      await runDemo();
    } catch (e) {
      console.error('Demo error:', e.message);
    }
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
})();
