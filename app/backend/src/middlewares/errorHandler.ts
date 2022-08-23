import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.code) {
    res.status(err.code).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

export default errorHandler;
