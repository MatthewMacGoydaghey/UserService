import { BadRequestError } from "routing-controllers";
import { RegUserDTO } from "../DTO/regUserDTO";
import { DB } from "../dataBase";
import { User } from "../entity/userEntity";
import * as bcrypt from 'bcrypt'

const userRepository = DB.getRepository(User)

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
    return userRepository.save(newUser)
  }

  async login(body: object) {

  }

  async updateUser(body: object) {

  }

  async findUser(id: number) {

  }

  async findUsers(pagination: object) {

  }
}
