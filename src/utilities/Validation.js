import { I18nManager } from "react-native";

const isRtl = I18nManager.isRTL;

export const validateEmail = email => {
  const filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (filter.test(email)) return true;
  else return false;
};

export const isValidURL = url => {
  const pattern = new RegExp(
    "^(https?://)?" + // protocol
    "((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|" + // domain name
    "((d{1,3}.){3}d{1,3}))" + // OR ip (v4) address
    "(:d+)?(/[-a-zd%_.~+]*)*" + // port and path
    "(?[;&a-zd%_.~+=-]*)?" + // query string
      "(#[-a-zd_]*)?$",
    "i"
  ); // fragment locater
  if (pattern.test(url)) return true;
  else return false;
};

export const hasValue = value => {
  return value && (typeof value === "string" || Array.isArray(value))
    ? value.length > 0
    : value && typeof value === "object"
    ? Object.keys(value).length > 0
    : false;
};

export const validateSigninForm = ({ email, password }) => ({
  emailError: !validateEmail(email) ? "invalid email" : "",
  passwordError: !password || !hasValue(password) ? "Password is Required" : ""
});

export const validateSignupOrProfileForm = ({
  name,
  first_name,
  email,
  password,
  confirmPassword,
  isProfile
}) => {
  const fPass = hasValue(password);
  const sPass = hasValue(confirmPassword);
  const nameCheck = value => !(hasValue(value) && value.length >= 3);
  return {
    nameError: isProfile
      ? nameCheck(first_name)
      : nameCheck(name)
      ? isRtl
        ? " عدد حروف الاسم لا يجب ان تكون اقل من ٣"
        : "Full Name should be At Least 3 characters"
      : undefined,
    emailError: !validateEmail(email) ? "Please Enter valid email" : "",
    passwordError: !(fPass && password.trim() && password.length >= 8)
      ? isRtl
        ? "عدد حروف الباسورد لا يجب ان تكون اقل من ٨"
        : "Password should be At Least 8 characters"
      : undefined,
    confirmPasswordError: !(
      sPass &&
      confirmPassword.trim() &&
      confirmPassword.length >= 8
    )
      ? isRtl
        ? "عدد حروف الباسورد لا يجب ان تكون اقل من ٨"
        : "password Confirmation should be At Least 8 characters"
      : undefined,
    arePassMatch: !(fPass && sPass && password === confirmPassword)
      ? isRtl
        ? "حقول الباسودر لا تتطابق"
        : `Password doesn't match`
      : undefined
  };
};

export const validateProfileForm = ({
  userName,
  photoURl,
  phone,
  displayName,
  firstName,
  lastName
}) => {
  return {
    userName: !validateEmail(userName) ? "invalid email" : "",
    photoURl:
      photoURl && hasValue(photoURl)
        ? isValidURL(photoURl)
          ? ""
          : "invalid photo url"
        : "",
    displayName: displayName
      ? hasValue(displayName)
        ? ""
        : "please enter display name"
      : "",
    phone: phone
      ? hasValue(phone) && validatePhone(phone)
        ? ""
        : "invalid phone"
      : "",
    firstName: firstName
      ? hasValue(firstName)
        ? ""
        : "please enter firstName"
      : "",
    lastName: lastName
      ? hasValue(lastName)
        ? ""
        : "please enter lastName"
      : ""
  };
};
