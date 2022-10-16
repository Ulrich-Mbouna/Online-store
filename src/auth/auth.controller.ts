import { Body, Controller, Get, Post, Redirect, Render, Req, Res } from "@nestjs/common";
import { UsersService } from "../models/users.service";
import { User } from "../models/user.entity";
import { UserValidator } from "../validators/user.validator";

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {
  }

  @Get('/register')
  @Render('auth/register')
  async register() {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User Register';

    return {
      viewData: viewData
    }
  }
  
  @Get('/login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'User Login - Onlune Store';
    viewData['subtitle'] = 'User Login';
    return {
      viewData: viewData,
    }
  }
  
  @Post('/connect')
  async connect(@Body() body, @Req() request, @Res() response) {
    const email = body.email;
    const pass = body.password;
    const user = await this.usersService.login(email, pass);
    if(user) {
      request.session.user = {
        id: user.getId(),
          name: user.getName(),
        role: user.getRole()
      }
      return response.redirect('/');
    }
    else{
      return  response.redirect('/auth/login')
    }
  }
  
  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
      request.session.user = null;
  }

  @Post('/store')
  async store(@Body() body, @Res() response, @Req() request) {
    const toValidate: string[] = ['name', 'email', 'password'];
    const errors: string[] = UserValidator.validate(body, toValidate);

    if(errors.length > 0) {
      request.session.flashErrors = errors;
      return response.redirect('/auth/register');
    }
    else {
      const newUser = new User();
      newUser.setName(body.name);
      newUser.setEmail(body.email);
      newUser.setPassword(body.password);
      newUser.setBalance(1000);
      newUser.setRole('client');

      await this.usersService.createOrUpdate(newUser);
      return response.redirect('/auth/login')
    }
  }
}
