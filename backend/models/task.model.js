const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    due_date: {
        type: Date,
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update `updated_at` before saving
TaskSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
