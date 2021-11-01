import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserBody, LoginUserBody, UpdateUserBody } from './users.dto';
import { getConnection } from 'typeorm';
import { users_user } from 'src/entities/users_user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { cart } from 'src/entities/cart.entity';

@Injectable()
export class UserService {
  async createUser(createUserBody: CreateUserBody) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserBody.password, salt);

    const user = await getConnection().getRepository(users_user).insert({
      username: createUserBody.username,
      email: createUserBody.email,
      password: password,
      address: createUserBody.address,
      last_login: null,
      created_on: new Date(),
      updated_on: new Date(),
      active: true,
    });

    return user ? true : false;
  }

  async loginUser(loginUserBody: LoginUserBody) {
    let userObj = await getConnection()
      .getRepository(users_user)
      .findOne({ email: loginUserBody.email });

    if (userObj) {
      const isMatch = await bcrypt.compare(
        loginUserBody.password,
        userObj.password,
      );

      if (isMatch) {
        userObj.last_login = new Date();
        getConnection().getRepository(users_user).save(userObj);

        let token = jwt.sign(
          {
            username: userObj.username,
            user_id: userObj.id,
            email: userObj.email,
            address: userObj.address,
          },
          process.env.TOKEN_SECRET,
        );
        return token;
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  }

  async logOutUser(user_id: number) {
    let userObj = await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });

    userObj.updated_on = new Date();

    return await getConnection().getRepository(users_user).save(userObj);
  }

  async getUser(user_id: number) {
    return await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });
  }

  async updateUser(updateUserBody: UpdateUserBody, user_id: number) {
    let userObj = await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });

    userObj.username = updateUserBody.username;
    userObj.address = updateUserBody.address;
    userObj.updated_on = new Date();

    return await getConnection().getRepository(users_user).save(userObj);
  }

  async deleteUser(user_id: number) {
    let userObj = await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });

    userObj.active = false;
    userObj.updated_on = new Date();

    return await getConnection().getRepository(users_user).save(userObj);
  }
}
