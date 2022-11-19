const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongoDB on playground'))
  .catch((err) => console.log('Error connecting to the mongoDB:', err));

// Creating the schema

const cousreSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});
// Creating the model analogous to Class
const Course = mongoose.model('Course', cousreSchema);

// Create
async function createCourse() {
  // Creating the document analogous to object
  const course = new Course({
    name: 'Angular',
    author: 'Jason',
    tags: ['advanced'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
// Get
async function getCourses() {
  // Comparison opertors
  // eq:equal to
  // ne:not equal to
  // gt:greater than
  // gte:greater than equal to
  // lt:less han
  // lte: less than equal to
  // in: in
  // nin: not in
  // use case:
  // const res = await data.find({
  //  $gte: 10
  // })
  const courses = await Course.find({
    name: 'JavaScript',
    isPublished: true,
  })
    .sort({
      author: 1,
    })
    .limit(5)
    .select({ name: 1, author: 1 });
  // .count(); ot get count of documents instead of documents themselves
  console.log(courses);
}

async function updateCourses(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: true,
    author: 'Akash',
  });

  const result = await course.save();
  console.log(result);
}
getCourses();
// updateCourses('636765319bea8a51606ccd3c');
