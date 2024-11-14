import { UserModel } from '../../domain/models';
import { UserRepository } from '../../domain/repositories';
import { UserDto } from '../../infrastructure/dtos';

class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UserDto): Promise<UserModel> {
    const user = data as UserModel;
    const updatedUser = await this.userRepository.update(user);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
