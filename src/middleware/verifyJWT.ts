import * as jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"


const ACCESS_SECRET = 'dsa'

interface ModifiedRequest extends Request {
  user: any
}

export const authorization = (req: ModifiedRequest, res: Response, next: NextFunction) => {
const bearer = req.header('Authorization')
if (!bearer) {
  return res.status(403).json('Bearer not found')
}
const token = bearer.split(' ')[1]
try {
  const verified = jwt.verify(token, ACCESS_SECRET)
req.user = verified
next()
} catch (error) {
  res.status(403).json(error)
}
}