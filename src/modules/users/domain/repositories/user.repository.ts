import { UserModel } from '../models';

interface UserRepository {
  create(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<UserModel>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
}

export { UserRepository };
