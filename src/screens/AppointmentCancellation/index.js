import AppointmentDetailsHoc from "../../components/AppointmentDetailsView/Hoc";

export default AppointmentDetailsHoc(
  function({ children }) {
    return children;
  },
  {
    headerLangTxt: "CANCLELATION"
  }
);
