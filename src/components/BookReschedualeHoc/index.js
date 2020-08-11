import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import WithConnector from "../connector";
import HeroPage from "../HeroPage";
import Calender from "../Calender";
import Loader from "../AsyncAwaiter";
import LastButton from "../PageLastButton";

const { lazy, Suspense } = React;

const TimeSlotComponent = lazy(() => import("./TimeSlotComponent"));
const DoctorDetails = lazy(() => import("./DoctorDetails"));

export default function(WrappedComponent, isBookView = true) {
  function ViewComponent(props) {
    const {
      data = values,
      isRtl,
      lang,
      isLoading,
      error,
      navigation: { navigate }
    } = props;

    const { isTimeSlot, timeSlot, whSlot, ...otherData } = data;

    const fSectionHeaderValue =
      lang && isTimeSlot ? lang.TIMSLOT : lang.WORKINGHOURS;

    const fSectionValues = isTimeSlot ? timeSlot : whSlot;
    const buttonTitle = lang && isBookView ? lang.BOK : lang.RESCHUAL;

    function onPressDone() {
      navigate("Appointment Confirmation", {
        data
      });
    }

    return (
      <WrappedComponent {...props}>
        <HeroPage spacerStyle={styles.spacerStyle}>
          <ScrollView
            shouldRasterizeIOS
            showsVerticalScrollIndicator={false}
            style={styles.scrollStyle}
          >
            {Calender({ isRtl })}

            <Loader isLoading={isLoading} error={error}>
              {!isLoading && data && (
                <Suspense fallback={<View />}>
                  <TimeSlotComponent
                    headerValue={fSectionHeaderValue}
                    items={fSectionValues}
                  />
                  <DoctorDetails isRtl={isRtl} data={otherData} />
                </Suspense>
              )}
            </Loader>
          </ScrollView>

          {LastButton({
            title: buttonTitle,
            disabled: isLoading || !data || !!error,
            onPress: onPressDone
          })}
        </HeroPage>
      </WrappedComponent>
    );
  }

  return WithConnector({
    langProps: ["TIMSLOT", "WORKINGHOURS", "BOK", "RESCHUAL"]
  })(ViewComponent);
}

const styles = StyleSheet.create({
  spacerStyle: {
    height: 180
  },
  scrollStyle: {
    marginHorizontal: 12,
    minWidth: "90%",
    marginBottom: 90
  }
});

const values = {
  isTimeSlot: true,
  whSlot: "Working hours from 11 am to 11 pm",
  timeSlot: [
    "11 am",
    "10 am",
    "12 am",
    "1 pm",
    "12am",
    "2 pm",
    "8 am",
    "2 am",
    "2 pm",
    "8 am",
    "2 am"
  ],
  fees: "150 LE",
  name: "Salwa Hassan",
  speciality: "Dentist",
  time: "11 am - 11 pm",
  date: "wed, April 2018",
  address: "14 Gamal El-deen Afifi St, Of Hassan Elmamoon St, Nasr City",
  id: 2,
  image:
    "http://cdn.24.co.za/files/Cms/General/d/7670/dfb245cb68c040a69730f51860c75322.jpg",
  reservationId: 15252512
};
