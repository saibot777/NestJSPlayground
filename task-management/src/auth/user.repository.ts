import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);

    await user.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
