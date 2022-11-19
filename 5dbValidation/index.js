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
  // here we will inject the validators
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match:/pattern/
  },
  category: {
    type: String,
    enum: ['Web3', 'Computer Science', 'JavaScript'],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    // Custom vaildator two property validator and message
    validate: {
      // // This is synchronous validator
      // validator: function (v) {
      //   return v && v.length > 0 && v.length < 10;
      // },
      // message: ' Atleast one tag is mandatory!! ',
      // // Async validator
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // Do some Async work
          const result = v && v.length > 0 && v.length < 10;
          callback(result);
        }, 5000);
      },
      message: ' Atleast one tag is mandatory!! ',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  // We can use function also as value in 'required' field:
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 5,
    max: 100,
    // These are also imp schematype options
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});
// Creating the model analogous to Class
const Course = mongoose.model('Course', cousreSchema);

// Create
async function createCourse() {
  // Creating the document analogous to object
  const course = new Course({
    name: 'Angular',
    category: 'Web3',
    author: 'Jason',
    tags: [],
    isPublished: true,
    price: 10,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (exception) {
    // How to handle exception effeciently
    // This exception has error property whcih will contain error related to all the
    // different invalid fields like exception.error[tags]
    for (field in exception.errors)
      console.log(exception.errors[field].message);
  }
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
createCourse();
// updateCourses('636765319bea8a51606ccd3c');
