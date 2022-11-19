const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/modelling', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model(
  'Author',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    // 1) Refrencing documents
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // Using the populate method to get all the details of refrential data
  const courses = await Course.find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}

// createAuthor('Akash', 'My AutoBio', 'My Website');

// createCourse('Node Course', '636a6a10b71ab039b06b63c6');

listCourses();
