import { UserModel } from '../../domain/models';
import { UserRepository } from '../../domain/repositories';

class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export { GetAllUsersUseCase };
