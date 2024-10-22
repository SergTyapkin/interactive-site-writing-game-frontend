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
  description: String,
  userId: {
    type: String,
    from: 'user_id',
    optional: true,
  },
  userUsername: {
    type: String,
    from: 'user_username',
    optional: true,
  },
  milestoneId: {
    type: Number,
    from: "milestone_id",
  },
  defaultText: {
    type: String,
    from: "default_text",
  },
  text: String,
  hardness: Number
}


export const FragmentShortModel = {
  id: String,
  name: String,
  userId: {
    type: String,
    from: 'user_id',
  },
  userUsername: {
    type: String,
    from: 'user_username',
  },
  description: String,
  text: String,
}
