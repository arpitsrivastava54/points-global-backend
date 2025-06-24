class Helper {
  generateRandomPassword = (length: number = 10): string => {
    return Math.random().toString(36).substring(2, length + 2);
  };

  generateRandomString = (length: number = 10): string => {
    return Math.random().toString(36).substring(2, length + 2);
  };
  
}

export const helper = new Helper();