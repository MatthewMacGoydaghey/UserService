import { BadRequestError, ForbiddenError, NotFoundError } from "routing-controllers";
import { RegUserDTO } from "../DTO/regUserDTO";
import { DB } from "../dataBase";
import { User } from "../entity/userEntity";
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { ACCESS_SECRET } from "../middleware/verifyJWT";
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
    const newUser = new User()
    newUser.name = body.name
    newUser.email = body.email
    const duplicate = await userRepository.findOneBy({email: body.email})
    if (duplicate) {
      throw new BadRequestError(`User with email ${body.email} already exists`)
    }
    const hashedPassword = await bcrypt.hash(body.password, 5)
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
    const foundUser = await userRepository.findOneBy({email})
    if (!foundUser) {
      throw new NotFoundError(`User with email ${email} not found`)
    }
    const correctPassword = bcrypt.compareSync(password, foundUser.password)
    if (!correctPassword) {
      throw new ForbiddenError(`Incorrect password`)
    }
    const payload = {
      userID: foundUser.id
    }
    const token = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '1h'})
    return token
  }


  async updateUser(id: number, body: UpdProfileDTO, user: payload, file: File) {
    const {surname, email, gender} = body
    if (id !== user.userID) {
      throw new ForbiddenError('You can only update your profile')
    }
    const foundUser = await userRepository.findOneBy({id})
    if (!foundUser) {
      throw new NotFoundError('User not found')
    }
    foundUser.surname = surname
    foundUser.email = email
    foundUser.gender = gender
    if (file) {
      this.uploadFile(file)
      foundUser.photo = file.originalname
  }
    const updatedUser = await userRepository.save(foundUser)
    return updatedUser
  }

  async findUser(id: number) {
    const foundUser = await userRepository.findOneBy({id})
    if (!foundUser) {
      throw new NotFoundError('User not found')
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
      throw new BadRequestError('Incorrect size (>10mb) or mimetype (image/jpeg only) of file')
    }
    const filePath = path.resolve(__dirname, '..', 'images')
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {recursive: true})
}
fs.writeFileSync(path.join(filePath, file.originalname), file.buffer)
  }
}
