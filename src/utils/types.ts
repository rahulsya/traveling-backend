export type CreateUser = {
  username: string;
  email: string;
  password: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};
