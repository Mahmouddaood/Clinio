import AppointmentDetailsHoc from "../../components/AppointmentDetailsView/Hoc";

export default AppointmentDetailsHoc(
  function({ children }) {
    return children;
  },
  {
    headerLangTxt: "CONFAPPOINT",
    onPresspageButton: function(navigate) {
      return navigate("ThnksPage");
    }
  }
);
