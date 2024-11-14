class UserModel {
  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }

  uuid: string;
  givenName: string;
  familyName: string;
  identificationNumber: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export { UserModel };
