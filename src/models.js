export const UserModel = {
  id: String,
  username: String,
  isAdmin: {
    type: Boolean,
    from: 'is_admin',
  },
}

export const FragmentModel = {
  id: String,
  name: String,
  description: {
    type: String,
    optional: true,
  },
}
