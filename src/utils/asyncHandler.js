const asyncHandler = (requestHandlerFn) => {
  (req, res, next) => {
    Promise.resolve(requestHandlerFn(req, res, next)).catch((err) => {
      console.log(err);
      next(err);
    });
  };
};

// const asyncHandler = (fn) => async(req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

export { asyncHandler };
