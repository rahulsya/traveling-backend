import { hashSync, genSaltSync, compareSync } from 'bcrypt';
export const hashPassword = (plaintPassword: string) => {
  const salt = genSaltSync(10);
  return hashSync(plaintPassword, salt);
};

export const comparePassword = (
  plaintPassword: string,
  hashPassword: string,
): boolean => {
  return compareSync(plaintPassword, hashPassword);
};
