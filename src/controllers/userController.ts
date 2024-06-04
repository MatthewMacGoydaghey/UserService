import { Body, Controller, Get, Param, Post, Put, QueryParam, UseBefore } from 'routing-controllers';
   import 'reflect-metadata';
import { UserService } from '../handlers/userService';
import { RegUserDTO } from '../DTO/regUserDTO';
import { authorization } from '../middleware/verifyJWT';
const userService = new UserService()

   @Controller()
   export class UserController {

     @Post('/user/register')
     regUser (@Body({validate: true}) body: RegUserDTO) {
      console.log(body)
      return userService.regUser(body)
     }

     @Post('/user/login')
     login(@Body() body: object) {
      return userService.login(body)
     }

     @Put('/profile/:id')
     updateProfile(@Body() body: object) {
      return userService.updateUser(body)
     }

     @Get('/profile/:id')
     findProfile(@Param('id') id: number) {
      return userService.findUser(id)
     }

     @Get('/profiles')
     findProfiles(@QueryParam('page') page: number) {
      return userService.findUser(page)
     }


   }