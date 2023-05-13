import { HttpException, HttpStatus } from '@nestjs/common';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import * as moment from 'moment';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

export const multerOptions = {
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${formatFileName(file)}`);
    },
  }),
};

export const formatFileName = (file): string => {
  const fileName = file.originalname.split('.');
  const fileExt = fileName[fileName.length - 1];

  return `${moment().format('YYYYMMDDss')}.${fileExt}`;
};

export const generateInvoiceNumber = (): string => {
  const DateForm = moment().format('YYYYMMDDss');
  return `INV-${DateForm}`;
};
