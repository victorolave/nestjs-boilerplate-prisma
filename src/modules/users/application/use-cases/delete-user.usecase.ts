import { UserRepository } from '../../domain/repositories';

class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    const isDeleted = await this.userRepository.delete(id);

    return isDeleted;
  }
}

export { DeleteUserUseCase };
