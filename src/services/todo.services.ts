// src/services/AuthService.ts
import { PostgresDataSource } from "../config/database";
import { Todo } from "../models/todo";
import { encrypt } from "../helpers/encrypt";
import {  TodoAddDTO } from "../dto/todo.dto";
// import { Address } from "../models/Address";
// import { AddressDTO } from "../dto/address.dto";
import { plainToClass } from "class-transformer";
import { sendUserMail } from "../utils/mailer";

const todoRepository = PostgresDataSource.getRepository(Todo);
// const addressRepository = PostgresDataSource.getRepository(Address);

export class TodoService {

//   static async login(email: string, password_input: string) {
//     //find user
//     const user = await todoRepository.findOne({ where: { email } });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     //compair password
//     const isPasswordValid = encrypt.comparepassword(
//       user.password_hash,
//       password_input
//     );

//     if (!isPasswordValid) {
//       throw new Error("Invalid credentials");
//     }

//     const payload = { userId: user.id };

//     const accessToken = encrypt.generateToken(payload);
//     const userId = user.id;
//     return { userId, accessToken, user };
//   }

  static async AddTodo(todoDto: TodoAddDTO) {
 

    const todo = new Todo();
console.log("todo",todo);
    // todo.name = todoDto.name;
    // todo.email = todoDto.email;
    // todo.password_hash = hashedPassword;
    // todo.role = todoDto.role;
    // todo.invited_by = todoDto.invited_by;

    // const savedUser = await todoRepository.save(todo);

    // return savedUser;
  }

//   static async invite(todoDto: UserAddDTO) {
//     console.log(todoDto, "dsnknksdn");
//     const existingUser = await todoRepository.findOne({
//       where: { email: todoDto.email },
//     });
//      if (existingUser) {
//       return false;
//     }
//     const existingAdmin = await todoRepository.findOne({
//       where: [
//         { email: todoDto.from_email },
//         { password_hash: todoDto.from_password },
//       ],
//     });

//     console.log(
//       "existingAdmin",
//       existingAdmin,
//       existingAdmin.role === "admin",
//       existingAdmin.id
//     );
   
//     if (existingAdmin && existingAdmin.role === "admin") {
//       const user = new User();
//       const hashedPassword = await encrypt.encryptpass(userDto.password);
//       const currentPassword= userDto.password;
//       console.log("currentPassword",currentPassword);
//       user.name = userDto.name;
//       user.email = userDto.email;
//       user.password_hash = hashedPassword;
//       user.role = userDto.role;
//       user.invited_by = existingAdmin.id;

//       const savedUser = await todoRepository.save(user);
//       const from: string = existingAdmin.email;
//       const to: string = user.email;
//       const subject: string = `You are invited to TodoBuddy`;
//       const mailTemplate: string = `<html>
//       <p>name :${ user.name}</p>
//       <p>email :${ user.email}</p>
//       <p>password :${currentPassword}</p>
//       </html>`

//       sendUserMail( from, to, subject, mailTemplate);
//       return savedUser;
//     }

//     return false;
//   }

//   static async getAllUsers() {
  
//     return await todoRepository.find();
//   }
//   static async getUserById(id: string) {
//     return await todoRepository.findOne({
//       where: { id },
//     });
//   }
//   static async getUsers() {
//     return await todoRepository.find();
//   }
}
