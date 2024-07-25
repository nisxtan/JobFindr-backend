import { json } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });

  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  //   const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this resource", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new Error("Please provide full job details.", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please either provide fixed salary or ranged salary.")
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    new ErrorHandler("Cannot enter fixed salary and ranged salary together.");
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job posted successfully.",
    job,
  });
});

export const getMyJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this resource", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

//update job
export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});

export const getJobsByCategory = catchAsyncError(async (req, res, next) => {
  const { category } = req.query;

  console.log(`Category received: ${category}`); // Debugging log

  if (!category) {
    return next(new ErrorHandler("Category is required", 400));
  }

  const allowedCategories = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "MEVN Stack Development",
    "Data Entry Operator",
  ];

  if (!allowedCategories.includes(category)) {
    return next(new ErrorHandler("Invalid category", 400));
  }

  try {
    const jobs = await Job.find({ category, expired: false });

    console.log(`Jobs found: ${jobs.length}`); // Debugging log

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error); // Debugging log
    next(new ErrorHandler("Failed to fetch jobs", 500));
  }
});

export const getCategories = catchAsyncError(async (req, res, next) => {
  try {
    // This should return an array of all categories
    const categories = [
      "Graphics & Design",
      "Mobile App Development",
      "Frontend Web Development",
      "MERN Stack Development",
      "Account & Finance",
      "Artificial Intelligence",
      "Video Animation",
      "MEAN Stack Development",
      "MEVN Stack Development",
      "Data Entry Operator",
    ];

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    next(new ErrorHandler("Failed to fetch categories", 500));
  }
});
