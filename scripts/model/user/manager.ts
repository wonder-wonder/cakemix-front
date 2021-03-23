// type
export type UserModel = {
  id: string
  uuid: string
  name: string
  icon: string
  color: string
}

export class UserManager {
  private users: UserModel[]

  constructor() {
    this.users = []
  }

  getUsers(): UserModel[] {
    return this.users
  }

  addUser(us: UserModel[]) {
    us.forEach(u => {
      this.users.push(u)
    })
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id)
  }
}
