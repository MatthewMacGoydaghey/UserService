import { Body, Controller, CurrentUser, Get, Param, Post, Put, QueryParam, Req, UploadedFile, UseBefore } from 'routing-controllers';
   import 'reflect-metadata';
import { UserService } from '../handlers/userService';
import { RegUserDTO } from '../DTO/regUserDTO';
import { ModifiedRequest, authorization } from '../middleware/verifyJWT';
import { LoginDTO } from '../DTO/loginDTO';
import { UpdProfileDTO } from '../DTO/updateProfileDTO';
import { User } from '../entity/userEntity';
const userService = new UserService()

export interface File {
   originalname: string
   buffer: string
   size: number
   mimetype: string
}

   @Controller()
   export class UserController {

     @Post('/user/register')
     regUser (@Body({validate: true}) body: RegUserDTO) {
      console.log(body)
      return userService.regUser(body)
     }

     @Post('/user/login')
     login(@Body() body: LoginDTO) {
      return userService.login(body)
     }

     @UseBefore(authorization)

     @Put('/profile/:id')
     updateProfile(@Param('id') id: number, @Body() body: UpdProfileDTO, @Req() req: ModifiedRequest, @UploadedFile('image') image: File) {
      return userService.updateUser(id, body, req.user, image)
     }

     @Get('/profile/:id')
     findProfile(@Param('id') id: number) {
      return userService.findUser(id)
     }

     @Get('/profiles')
     findProfiles(@QueryParam('page') page: number) {
      return userService.findUsers(page)
     }


   }