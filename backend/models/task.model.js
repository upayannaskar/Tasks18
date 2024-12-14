import User from "./user.model.js"

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, // Reference the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  reminderTime: {
    type: Date, // Store the specific time for reminders (optional)
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update updatedAt on changes
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual field for formatted due date (optional)
taskSchema.virtual('formattedDueDate').get(function () {
  if (this.dueDate) {
    return this.dueDate.toLocaleDateString(); // Customize formatting as needed
  }
  return null;
});

// Instance methods for task completion and reminder setting (optional)
taskSchema.methods.complete = async function () {
  this.completed = true;
  await this.save();
};

taskSchema.methods.setReminder = async function (reminderTime) {
  this.reminder = true;
  this.reminderTime = reminderTime;
  await this.save();
};

module.exports = mongoose.model('Task', taskSchema);