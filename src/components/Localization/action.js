import { SET_LOCALIZATION, SET_COUNTRY } from "./type";

export const setLocalization = langType => ({
  type: SET_LOCALIZATION,
  langType
});

export const setCountry = country => ({
  type: SET_COUNTRY,
  country
});
