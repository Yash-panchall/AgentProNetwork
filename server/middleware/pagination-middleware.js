const paginationMiddleware = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 5;
  
      const skip = (page - 1) * limit;
  
      req.skip = skip;
      req.limit = limit;
  
      next();
    } catch (error) {
      res.json({ "Pagination Error": error });
      next(error);
    }
  };
  
  module.exports = paginationMiddleware;  