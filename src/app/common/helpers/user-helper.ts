import { UserInfo, UserInfoPagination, UserStatus, UserType } from '../models/user-info';

// Helper export function to generate random numbers
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper export function to generate random status and user types
export function getRandomUserType(): UserType {
  const types = Object.values(UserType);
  return types[Math.floor(Math.random() * types.length)];
}

export function getRandomUserStatus(): UserStatus {
  const statuses = Object.values(UserStatus);
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Generate random user info
export function generateRandomUserInfo(id: number): UserInfo {
  const randomDate = () => Date.now() - getRandomNumber(1, 1000000000);

  return {
    alt_phone: `+1-555-${getRandomNumber(100, 999)}-${getRandomNumber(1000, 9999)}`,
    created_time: randomDate(),
    email: `user${id}@example.com`,
    first_name: `FirstName${id}`,
    id: id,
    last_login_time: randomDate(),
    last_name: `LastName${id}`,
    parent: `Parent${id}`,
    password: `password${id}`,
    phone: `+1-555-${getRandomNumber(100, 999)}-${getRandomNumber(1000, 9999)}`,
    status: getRandomUserStatus(),
    updated_by: getRandomNumber(1, 100),
    updated_time: randomDate(),
    user_img: `assets/icons/human-icon.png`,
    user_type: getRandomUserType(),
    username: `username${id}`,
  };
}

// Generate paginated user data
export function generateRandomUserInfoPagination(totalRecords: number): UserInfoPagination {
  const users: UserInfoPagination = {
    userInfo: [],
    totalRecord: totalRecords
  };

  for (let i = 1; i <= totalRecords; i++) {
    users.userInfo.push(generateRandomUserInfo(i));
  }
  return users;
}
