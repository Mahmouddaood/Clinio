import AppointmentDetailsView from "./index";
import connector from "../connector";

export default function(
  WrappedComponent,
  { headerLangTxt, selectionView, onPresspageButton }
) {
  function withDetailsHoc({ navigation, isRtl, lang }) {
    const {
      goBack,
      getParam,
      navigate,
      state: { routeName }
    } = navigation;
    const data = getParam("data");

    let detailProps = null;

    if (routeName === "Appointment Cancellation") {
      detailProps = {
        headIconName: "close",
        buttonTitle: lang && `${lang.CANCLE} ${lang.APOINT}`,
        headerLastText: lang && lang.CANCLMSG,
        scrollEnabled: true
      };
    } else if (routeName === "Appointment Confirmation") {
      detailProps = {
        headIconName: "check",
        buttonTitle: lang && lang.DONE,
        headerLastText: lang && lang.CONFMSG,
        scrollEnabled: true
      };
    }

    function handleGoBack() {
      return goBack();
    }

    function handlePressbtn() {
      onPresspageButton && onPresspageButton(navigate);
    }

    return WrappedComponent({
      navigation,
      children: AppointmentDetailsView({
        handleGoBack,
        isRtl,
        headerText: lang && lang[headerLangTxt],
        ...detailProps,
        appointmentData: data,
        onPresspageButton: handlePressbtn,
        selectionView:
          selectionView &&
          selectionView({
            isRtl,
            lang: lang && [lang.RESCHUAL, lang.CANCLE],
            navigate,
            data
          })
      })
    });
  }

  return connector({
    langProps: [
      "CANCLE",
      "APOINT",
      "APOINTDET",
      "CANCLMSG",
      "DONE",
      "CONFMSG",
      "RESCHUAL",
      headerLangTxt
    ]
  })(withDetailsHoc);
}
