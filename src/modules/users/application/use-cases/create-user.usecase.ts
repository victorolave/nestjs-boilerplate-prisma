import { UserModel } from '../../domain/models';
import { UserRepository } from '../../domain/repositories';
import { UserDto } from '../../infrastructure/dtos';
import * as bcrypt from 'bcrypt';

class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UserDto): Promise<UserModel> {
    const user = data as UserModel;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}

export { CreateUserUseCase };
