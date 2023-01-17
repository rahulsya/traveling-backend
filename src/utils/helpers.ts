import { hashSync, genSaltSync } from 'bcrypt';
export const hashPassword = (plaintPassword: string) => {
  const salt = genSaltSync(10);
  return hashSync(plaintPassword, salt);
};
