import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { registeredStyles, colors } from "../../utilities/theme";
import PageWithSearchHeader from "../../components/SearchPageWrapper";
import HeroPage from "../../components/HeroPage";
import Text from "../../components/Text";
import Loader from "../../components/AsyncAwaiter";
import { getUpcomingAppoints } from "../Appointments/modules/actions";

const { flexStyle, selfCentered, shadowStyle } = registeredStyles;

const { Suspense, lazy, useEffect, useState } = React;
const AdsSlider = lazy(() => import("./SliderAds"));
const Button = lazy(() => import("../../components/Button"));
const SelectorsView = lazy(() => import("./selectorsView"));
const FirstSignUpAppionts = lazy(() => import("./FirstSignUpAppoints"));
const MainHomeView = lazy(() => import("./HomeView"));

const loaderView = Loader({ isLoading: true });

function HomeScreen({
  navigation: { getParam, navigate },
  isRtl,
  lang,
  userImg,
  goFetchUpcomingAppoints,
  upcomingValues
}) {
  const [isGetStarted, setPageContentType] = useState(false);
  const { isFirstSignUp, ...upcomingAppoints } = upcomingValues;

  const isSelectorWiSlider = isFirstSignUp || isGetStarted;

  function onPageRenderer() {
    const isViewer = Boolean(getParam("getStarted"));
    if (isViewer) {
      return setPageContentType(true);
    } else {
      return goFetchUpcomingAppoints();
    }
  }

  useEffect(() => {
    onPageRenderer();
  }, [isGetStarted, upcomingAppoints.data]);

  function handlePressSignUp() {
    return navigate("SignUp");
  }

  function navigateToDocsSector() {
    return navigate("Select Doctor");
  }

  function onPressLoadMoreAppoints() {
    return navigate("Appointments");
  }

  return PageWithSearchHeader({
    placeholder: lang && lang.SEARCHDOC,
    onPress: navigateToDocsSector,
    isRtl,
    children: HeroPage({
      spacerStyle: [styles.spacerStyle, styles.homeSpacerStyle],
      children: (
        <ScrollView
          style={[flexStyle, styles.wrapperStyle]}
          shouldRasterizeIOS
          shouldActivateOnStart
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentStyle}
        >
          {Text({
            style: [styles.headerTextStyle, isRtl && styles.rtlText],
            children:
              lang && isSelectorWiSlider
                ? isLocalPm
                  ? lang.EVENINING
                  : lang.MORMING
                : `${lang.UPCOMING}  ${lang.APPOINTS}`
          })}

          <Suspense fallback={loaderView}>
            {isFirstSignUp && (
              <FirstSignUpAppionts
                appoints={{
                  appointsText: lang && lang.APPOINTS,
                  value: lang && lang.NOVALUE
                }}
                lastCheck={{
                  checkValue: lang && lang.NEVER,
                  lastCheckText: lang && lang.LASTCHK
                }}
                userImg={userImg}
              />
            )}

            {isSelectorWiSlider && <AdsSlider isFirstSignUp={isFirstSignUp} />}

            {isGetStarted && (
              <Button
                backgroundColor={colors.mango}
                color={colors.white}
                title={lang && lang.SGNUP}
                fontSize={15}
                fontWeight="500"
                onPress={handlePressSignUp}
                buttonStyle={styles.buttonStyle}
                containerViewStyle={[
                  styles.signUpBtnStyle,
                  selfCentered,
                  shadowStyle
                ]}
              />
            )}

            {isSelectorWiSlider ? (
              <SelectorsView
                searchText={lang && lang.SEARCH}
                isFirstSignUp={isFirstSignUp}
                navigate={navigate}
                rtlTextStyle={isRtl && styles.selectorsRtlText}
              />
            ) : (
              <MainHomeView
                isRtl={isRtl}
                seeMoreText={lang && lang.SEEMORE}
                onPressLoadMore={onPressLoadMoreAppoints}
                upcomingAppoitments={upcomingAppoints}
                navigate={navigate}
              />
            )}
          </Suspense>
        </ScrollView>
      )
    })
  });
}

const isLocalPm = (function formatPM() {
  const date = new Date();
  const hours = date.getHours();
  return hours >= 12;
})();

function mapStateToProps({
  langReducer: { lang, langType },
  profile: { profileData },
  appointmentsReducer: { upcomingValues }
}) {
  return {
    isRtl: langType === "ar",
    lang,
    userImg: profileData && profileData.data && profileData.data.image,
    upcomingValues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goFetchUpcomingAppoints: function() {
      return dispatch(getUpcomingAppoints());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
