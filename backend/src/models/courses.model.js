import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
},
    {
        timestamps: true
    }
)


export const Course = mongoose.model("Course", courseSchema);