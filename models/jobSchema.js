import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title."],
    minLength: [3, "Job title must contain atleast 3 characters."],
    maxLength: [50, "Job title can not exceed 50 characters."],
  },
  description: {
    type: String,
    required: [true, "Job description is required."],
    minLength: [3, "Job description must contain atleast 3 characters."],
    maxLength: [350, "Job description can not exceed 350 characters."],
  },
  country: {
    type: String,
    required: [true, "Job country is required."],
  },
  city: {
    type: String,
    required: [true, "Job city is required."],
  },
  location: {
    type: String,
    required: [true, "Please provide exact locaton."],
    minLength: [50, "Job location must contain at least 50 characters."],
  },
  fixedSalary: {
    type: Number,
    minlength: [4, "Fixed salary must contain at least 4 digits."],
    maxLength: [9, "Fixed salary cannot exceed 9 digits."],
  },
  salaryFrom: {
    type: Number,
    minlength: [4, "Salary from must contain at least 4 digits."],
    maxLength: [4, "Salary form must must not exceed 9 digits."],
  },
  salaryTo: {
    type: Number,
    minlength: [4, "SalaryTo must contain at least 4 digits."],
    maxLength: [4, "SalaryTos form must must not exceed 9 digits."],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
