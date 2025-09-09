// import AppError from '../errors/AppError';
// import { catchAsync } from '../utils/catchAsync';

// export const parseBody = catchAsync(async (req, res, next) => {
//   console.log("Incoming req.body:", req.body);

//   if (!req.body.data) {
//     throw new AppError(400, 'Please provide data in the body under data key');
//   }
//   req.body = JSON.parse(req.body.data);
//   console.log("Parsed req.body:", req.body);

//   next();
// });


import AppError from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';

export const parseBody = catchAsync(async (req, res, next) => {
  console.log("Incoming req.body:", req.body);

  // Check if req.body exists at all
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new AppError(400, 'Request body is empty');
  }

  // If data key exists, parse it if needed
  if (req.body.data) {
    // If data is a string (form-data), parse it
    req.body = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data;
  } else {
    // If no data key, use req.body directly (raw JSON)
    req.body = req.body;
  }

  console.log("Parsed req.body:", req.body);

  next();
});
