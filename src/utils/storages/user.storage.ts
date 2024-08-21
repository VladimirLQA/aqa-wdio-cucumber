export interface ILoggedUser {
  email: string;
  token: string;
}

export class UserStorage {
  private static instance: UserStorage;
  private users: ILoggedUser[] = [];

  constructor() {
    if (UserStorage.instance) {
      return UserStorage.instance
    }
    UserStorage.instance = this;
  }

  setToken(token: string, email?: string) {
    email
      ? this.findUserByUsername(email).token = token
      : this.users[this.users.length - 1].token = token;
  }

  getToken(email?: string): string {
    return email
      ? this.findUserByUsername(email)?.token
      : this.users[this.users.length - 1]?.token;
  }

  setUser(email: string, token: string) {
    this.users.push({ email, token: this.convertToBearerToken(token) });
    console.log('users', this.users)
  }

  // getClientForUser(email?: string) {
  //   return new ApiClient({ authorization: this.getSID(email) });
  // }

  removeToken(email?: string) {
    email
      ? this.findUserByUsername(email).token = ""
      : this.users[this.users.length - 1].token = "";
  }

  private findUserByUsername(email: string) {
    return this.users[this.findUserIndex(email)];
  }

  private findUserIndex(email: string) {
    return this.users.findIndex((user) => user.email === email);
  }

  private convertToBearerToken(token: string) {
    return `Bearer ${token}`;
  }
}