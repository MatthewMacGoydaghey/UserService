import { BadRequestError, ForbiddenError, NotFoundError } from "routing-controllers";
import { RegUserDTO } from "../DTO/regUserDTO";
import { DB } from "../dataBase";
import { User } from "../entity/userEntity";
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { ACCESS_SECRET, ModifiedRequest } from "../middleware/verifyJWT";
import { LoginDTO } from "../DTO/loginDTO";
import { UpdProfileDTO } from "../DTO/updateProfileDTO";
import { File } from "../controllers/userController";
import path from 'path'
import * as fs from 'fs'

const userRepository = DB.getRepository(User)
interface payload {
  userID: number
}

export class UserService {


  async regUser(body: RegUserDTO) {
    const {name, email, password} = body
    if (!name || !email || !password) {
      return new BadRequestError(`name, email or password not found`)
    }
    const newUser = new User()
    newUser.name = name
    newUser.email = email
    const hashedPassword = await bcrypt.hash(password, 5)
    newUser.password = hashedPassword
    const savedUser = await userRepository.save(newUser)
    const payload = {
      userID: savedUser.id
    }
    const token = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '1h'})
    return token
  }

  async login(body: LoginDTO) {
    const {email, password} = body
    if (!email || !password) {
      return new BadRequestError(`email or password not found`)
    }
    const foundUser = await userRepository.findOneBy({email})
    if (!foundUser) {
      return new NotFoundError(`User with email ${email} not found`)
    }
    const correctPassword = bcrypt.compareSync(password, foundUser.password)
    if (!correctPassword) {
      return new ForbiddenError(`Incorrect password`)
    }
    const payload = {
      userID: foundUser.id
    }
    const token = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '1h'})
    return token
  }


  async updateUser(id: number, body: UpdProfileDTO, user: payload, file: File) {
    const {surname, email, gender, photo} = body
    if (id !== user.userID) {
      return new ForbiddenError('You can only update your profile')
    }
    const foundUser = await userRepository.findOneBy({id})
    if (!foundUser) {
      return new NotFoundError('User not found')
    }
    foundUser.surname = surname
    foundUser.email = email
    foundUser.gender = gender
    if (file) {
      const result = this.uploadFile(file)
      if (!result) {
        return new BadRequestError('Incorrect size (>10mb) or mimetype (image/jpeg only) of file')
      }
      foundUser.photo = file.originalname
  }
    const updatedUser = await userRepository.save(foundUser)
    return updatedUser
  }

  async findUser(id: number) {
    const foundUser = await userRepository.findOneBy({id})
    if (!foundUser) {
      return new NotFoundError('User not found')
    }
    return foundUser
  }

  async findUsers(page: number) {
    let offset = 0
    if (page) {
      offset =  (page - 1) * 10 
    }
    const foundUser = userRepository.createQueryBuilder('user')
    .select('user.id', 'id')
    .addSelect('user.name', 'name')
    .addSelect('user.surname', 'surname')
    .addSelect('user.email', 'email')
    .addSelect('user.gender', 'gender')
    .addSelect('user.photo', 'photo')
    .addSelect('user.createdAt', 'createdAt')
    .orderBy('createdAt', 'DESC')
    .offset(offset || 0)
    .limit(10)
    .getRawMany()
    return foundUser
  }


  private uploadFile(file: File) {
    if (file.size > 1024 * 1024 || file.mimetype !== 'image/jpeg') {
      return false
    }
    const filePath = path.resolve(__dirname, '..', 'images')
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {recursive: true})
}
fs.writeFileSync(path.join(filePath, file.originalname), file.buffer)
  return file.originalname
  }
}
