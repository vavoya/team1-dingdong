export const phoneNumberFormat = (value: string) => {
  let convertValue = value.replace(/[^0-9]/g, ""); // 숫자만 남기기

  if (convertValue.length > 3 && convertValue.length <= 7) {
    convertValue = `${convertValue.slice(0, 3)}-${convertValue.slice(3)}`;
  } else if (convertValue.length > 7) {
    convertValue = `${convertValue.slice(0, 3)}-${convertValue.slice(
      3,
      7
    )}-${convertValue.slice(7, 11)}`;
  }
  return convertValue;
};

export const isValidNameFormat = (text: string) => {
  const koreanRegex = /^[가-힣]{2,8}$/;
  return koreanRegex.test(text);
};

export const isValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
};
