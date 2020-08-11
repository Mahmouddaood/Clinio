import { SET_LOCALIZATION, SET_COUNTRY } from "./type";
import arLang from "./i18n/ar";
import enLang from "./i18n/en";

const initialState = {
  lang: enLang,
  langType: undefined,
  country: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALIZATION:
      const { langType } = action;
      return {
        ...state,
        langType,
        lang: langType === "ar" ? arLang : enLang
      };

    case SET_COUNTRY:
      return {
        ...state,
        country: action.country
      };

    default:
      return state;
  }
}
