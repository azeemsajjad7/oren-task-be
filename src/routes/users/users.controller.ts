import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CreateUserBody, LoginUserBody, UpdateUserBody } from './users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() createUserBody: CreateUserBody) {
    try {
      return {
        success: true,
        result: await this.userService.createUser(createUserBody),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Post('login-user')
  async loginUser(@Body() loginUserBody: LoginUserBody) {
    try {
      return {
        success: true,
        token: await this.userService.loginUser(loginUserBody),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Put('logout-user/:user_id')
  async logoutUser(@Param() param) {
    try {
      return {
        success: true,
        result: (await this.userService.logOutUser(param.user_id))
          ? 'user_created'
          : 'error',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Get('get-user')
  @UseGuards(AuthGuard)
  async getUser(@Req() req) {
    try {
      return {
        success: true,
        result: await this.userService.getUser(req.decoded.user_id),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Post('update-user')
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateUserBody: UpdateUserBody, @Req() req) {
    try {
      return {
        success: true,
        result: await this.userService.updateUser(
          updateUserBody,
          req.decoded.user_id,
        ),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Put('delete-user/:user_id')
  async deleteUser(@Param() param) {
    try {
      return {
        success: true,
        result: await this.userService.deleteUser(param.user_id),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}
