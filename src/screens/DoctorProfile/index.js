import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { registeredStyles, colors } from "../../utilities/theme";
import Loader from "../../components/AsyncAwaiter";
import HeaderBackGround from "../UserProfile/HeaderBackground";

const { lazy, Suspense, useEffect, useState } = React;
const MainDetails = lazy(() => import("./MainDetails"));
const AvailabilityView = lazy(() => import("./AvailabiltyView"));
const DoctorServices = lazy(() => import("./DoctorServices"));
const InsuranceProvider = lazy(() => import("./InsuranceProvider"));

const { flexStyle } = registeredStyles;

function DoctorProfile({
  navigation: { getParam, ...otherNavs },
  isRtl,
  lang
}) {
  const docId = getParam("id", 1);
  const [state, updateStateHandler] = useState({
    isLoading: false,
    error: undefined,
    data: undefined
  });

  useEffect(() => {
    fetchDoctorData();
  }, [docId]);

  function fetchDoctorData() {
    updateStateHandler({ ...state, isLoading: true });
    setTimeout(() => {
      updateStateHandler({ ...state, isLoading: false, data: localDocData });
    }, 400);
  }

  function navigateToReviews() {
    return otherNavs.navigate("Patients' Reviews");
  }

  function onPressbooking() {
    return otherNavs.navigate("Book");
  }

  const { isLoading, error, data } = state;

  return (
    <View style={[styles.containerViewStyle, flexStyle]}>
      {HeaderBackGround({
        isRtl,
        navigation: otherNavs,
        navigateBackTo: false
      })}
      {Loader({
        isLoading,
        error,
        children: (
          <ScrollView
            shouldRasterizeIOS
            style={[styles.scrollViewStyle, flexStyle]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentScrollStyle}
          >
            {!isLoading && data && (
              <Suspense fallback={<View />}>
                <MainDetails
                  data={data}
                  onPressReviews={navigateToReviews}
                  langData={
                    lang && {
                      buttonText: lang.PASHREVS,
                      FEES: lang.FEES,
                      WAITTIME: lang.WAITTIME,
                      LOCATION: lang.LOCATION
                    }
                  }
                />
                <AvailabilityView
                  avaliabilityDataArr={data.avaliabilityDataArr}
                  onPressbooking={onPressbooking}
                />

                <DoctorServices
                  headerValue={lang && lang.DOCSERVS}
                  bodyItems={data.services}
                />
                <InsuranceProvider
                  headerValue={lang && lang.INSU}
                  bodyItems={data.insurances}
                />
              </Suspense>
            )}
          </ScrollView>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerViewStyle: {
    backgroundColor: colors.lightGrey
  },
  scrollViewStyle: {
    marginTop: 58
  },
  contentScrollStyle: {
    padding: 12,
    zIndex: 500
  }
});

function mapStateToProps({ langReducer: { lang, langType } }) {
  return {
    lang,
    isRtl: langType === "ar"
  };
}

export default connect(
  mapStateToProps,
  null
)(DoctorProfile);

const localDocData = {
  name: "Dr.Khaled Abdelziz",
  image:
    "http://cdn.24.co.za/files/Cms/General/d/7670/dfb245cb68c040a69730f51860c75322.jpg",
  speciality: "Dentist",
  rates: 4,
  aboutDoctor:
    "Dentist specialized in Adult Dentistry, Elder Dentistry, Orthodontics, Endodontics, Cosmetic Dentistry, Implantology, Oral and Maxillofacial Surgery, Periodontics and Prosthodontics.",
  fees: "200 LE",
  location: "Sheikh Al Bishri",
  address: "25 Al Sheikh Al Bishri St. Kabary",
  waitingTime: "20 minutes",
  availability: "Available starting 11 April",
  id: 1,
  avaliabilityDataArr: [
    "Today   | 5pm to 10pm",
    "Today   | 5pm to 10pm",
    "Today   | 5pm to 10pm"
  ],
  services: [
    "Digital Smile Design",
    "Dental Veneers",
    "Dental Implant",
    "Teeth Whitening"
  ],
  insurances: ["AlMashreq", "Metlife Alico", "Egycare", "Unicare"]
};
