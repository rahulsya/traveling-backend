export type CreateUser = {
  username: string;
  email: string;
  password: string;
  role?: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export type ValidateCreateHotel = {
  name: string;
  location: string;
  isPopular: boolean;
  description: string;
  price: number;
  categoryId: number;
  facilitiesId?: number[];
};

export type ValidateCreateOrder = {
  start_date: Date;
  end_date: Date;
  hotelId: number;
  user: any;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_file: string;
  bank_name: string;
  sender_name: string;
};

export type ValidateCreateFacility = {
  name: string;
  desc: string;
};
