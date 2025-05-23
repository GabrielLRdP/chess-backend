import { NextFunction, Request, Response } from 'express';
import { User } from '../domain/entities/User';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = {
      userName: req.body.userName,
      userId: req.body.userData?._id,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.body.accessToken = accessToken;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
