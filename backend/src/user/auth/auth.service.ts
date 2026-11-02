// import {
//   ConflictException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';

// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UserEntity } from '../entity/user.entity.js';
// import { RegisterDTO } from '../dto/register.dto.js';
// import { LoginDTO } from '../dto/login.dto.js';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private userRepo: Repository<UserEntity>,

//     private jwtService: JwtService,
//   ) {}

//   async register(data: RegisterDTO) {
//     const existingUser = await this.userRepo.findOne({
//       where: { email: data.email },
//     });

//     if (existingUser) {
//       throw new ConflictException('Email already exists');
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const user = this.userRepo.create({
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//     });

//     const savedUser = await this.userRepo.save(user);

//     const access_token = await this.jwtService.signAsync({
//       sub: savedUser.id,
//       email: savedUser.email,
//     });

//     return {
//       message: 'Registration successful',
//       user: {
//         id: savedUser.id,
//         name: savedUser.name,
//         email: savedUser.email,
//       },
//     };
//   }

//   async login(data: LoginDTO) {
//     const user = await this.userRepo.findOne({
//       where: { email: data.email },
//     });

//     if (!user) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const isMatch = await bcrypt.compare(data.password, user.password);

//     if (!isMatch) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const access_token = await this.jwtService.signAsync({
//       sub: user.id,
//       email: user.email,
//     });

//     return {
//       message: 'Login successful',
//       access_token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     };
//   }

//   async logout() {
//     return {
//       message: 'Logout successful. Please login again to continue.',
//     };
//   }
// }

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entity/user.entity.js';
import { RegisterDTO } from '../dto/register.dto.js';
import { LoginDTO } from '../dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(data: RegisterDTO) {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);

    return {
      message: 'Registration successful',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    };
  }

  // Login an existing user
  async login(data: LoginDTO) {
    // Explicitly select the password hash because UserEntity uses select: false
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: data.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT access token
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // Logout
  async logout() {
    return {
      message: 'Logout successful. Please login again to continue.',
    };
  }
}
