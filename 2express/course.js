const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Node' },
  { id: 4, name: 'MongoDB' },
];

// GET request
router.get('/', (req, res) => {
  res.send(courses);
});
router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course with the given ID doesnt exist!!!');
  res.send(course);
});

// POST request
router.post('/', (req, res) => {
  // Input Validation
  const { error } = validateBody(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(200).send(course);
});

// PUT request
router.put('/:id', (req, res) => {
  // Check whether this particular course exist or not
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course with the given ID doesnt exist!!!');

  // If exist validate the request body
  const { error } = validateBody(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Upadte the cousre
  course.name = req.body.name;
  res.send(course);
});

// DELETE request
router.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course with the given ID doesnt exist!!!');
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
