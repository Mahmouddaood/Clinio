import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Loader from "../../components/AsyncAwaiter";
import { connect } from "react-redux";
import { getProfileData } from "./actions";
import HeaderBackGround from "./HeaderBackground";

const { useState, useEffect, lazy, Suspense } = React;

const ReportsComponent = lazy(() => import("./reportsComponent"));
const MainDetails = lazy(() => import("./MainDetails"));
const { flexStyle, shadowStyle } = registeredStyles;

function UserProfileScreen({
  lang,
  isRtl,
  requestPatientProfile,
  profileData,
  isLoading,
  error,
  navigation
}) {
  const [activeSections, updateActiveSections] = useState({});

  useEffect(() => {
    requestPatientProfile();
  }, isLoading);

  function handleUpdateSection(updatedSections) {
    updateActiveSections(updatedSections);
  }

  const iconsSections = lang
    ? [
        [
          {
            ...iconData,
            title: lang.BIRTH,
            itemkey: "birth"
          },
          {
            ...iconData,
            title: lang.BLOOD,
            itemkey: "bloodFraction"
          },
          {
            ...iconData,
            title: lang.BLDPRESURE,
            itemkey: "bloodPressure"
          }
        ],
        [
          {
            ...iconData,
            title: lang.HEIGHT,
            itemkey: "height"
          },
          {
            ...iconData,
            title: lang.WEIGHT,
            itemkey: "weight"
          },
          {
            ...iconData,
            title: lang.TEMP,
            itemkey: "temperature"
          }
        ],
        [
          {
            ...iconData,
            title: lang.GLUCOSETST,
            itemkey: "rgt"
          },
          {
            ...iconData,
            title: lang.LASTCHK,
            itemkey: "lastChk"
          },
          {
            ...iconData,
            title: lang.APPOINTS,
            itemkey: "appointments"
          }
        ]
      ]
    : undefined;

  const suspenseFallBack = Loader({ isLoading: true });

  return (
    <View style={[styles.containerViewStyle, flexStyle]}>
      {HeaderBackGround({
        isRtl,
        navigation,
        withSettings: true
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
            {!isLoading && profileData && (
              <Suspense fallback={suspenseFallBack}>
                <MainDetails
                  btnTitle={lang && lang.UPDATE}
                  accordContainerStyle={styles.accordContainerStyle}
                  data={profileData && profileData.data}
                  iconsSections={iconsSections}
                />

                <ReportsComponent
                  title={lang && lang.REPORTS}
                  isRtl={isRtl}
                  handleUpdateSection={handleUpdateSection}
                  shadowStyle={shadowStyle}
                  accordContainerStyle={styles.accordContainerStyle}
                  activeSections={activeSections}
                  reports={profileData && profileData.reports}
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
  },
  accordContainerStyle: {
    borderRadius: 8,
    position: "relative",
    zIndex: 500,
    paddingHorizontal: 12,
    marginVertical: 9
  }
});

const iconData = {
  name: "calendar",
  type: "antDesign"
};

function mapStateToProps({
  langReducer: { lang, langType },
  profile: { profileData, isLoading, profileDataError }
}) {
  return {
    lang,
    isRtl: langType === "ar",
    profileData,
    isLoading,
    error: profileDataError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestPatientProfile: () => dispatch(getProfileData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen);
