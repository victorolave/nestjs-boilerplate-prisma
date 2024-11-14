import { UserModel } from '../../domain/models';
import { UserRepository } from '../../domain/repositories';

class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);

    return user;
  }
}

export { GetUserUseCase };
