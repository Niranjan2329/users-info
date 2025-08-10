// models/Student39.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: Number,
  course: String,
});

// Model name = 'Student39', collection name = 'student39'
const Student = mongoose.model('Student39', studentSchema, 'student');

module.exports = Student;
