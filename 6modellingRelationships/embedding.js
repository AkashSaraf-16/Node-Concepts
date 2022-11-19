const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/modelling', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    // Embedded  the documents directly
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId, authorId, updatedName) {
  // const course = await Course.update(
  //   { _id: courseId },
  //   {
  //     $set: {
  //       'author.name  ': 'Akash',
  //     },
  //   }
  // );
  const course = await Course.findById(courseId);
  const authors = course.authors;
  const author = authors.find((a) => '' + a._id == authorId);
  author.name = updatedName;
  course.save();
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
// updateCourse('636a7e53acb57452dc4e1326');
// createCourse('React.JS Course', [
//   new Author({ name: 'Allan' }),
//   new Author({ name: 'Max' }),
// ]);

// addAuthor('636bc620d6c881254cb55874', { name: 'Radha' });
// addAuthor('636bc620d6c881254cb55874', new Author({ name: 'Radha' }));
updateCourse('636bc620d6c881254cb55874', '636bc620d6c881254cb55873', 'Akash');

// Points to remember
// Mongo DB has nothing like transactions like that of SQL. It has two phase commit.
// We can use Fawn(npm) for imitating this feature in mongo DB
