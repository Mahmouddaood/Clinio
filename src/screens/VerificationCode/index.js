import React from "react";
import { View, StatusBar } from "react-native";
import connector from "../../components/connector";
import styles from "./styles";
import { colors, registeredStyles } from "../../utilities/theme";
import HeroPage from "../../components/HeroPage";
import Text from "../../components/Text";
import Input from "../../components/Input";
import PageLastButton from "../../components/PageLastButton";

const { Fragment, useState } = React;
const {
  flexStyle,
  selfCentered,
  shadowStyle,
  fullHeight,
  fullWidth,
  rowStyle,
  spaceBetweenItems
} = registeredStyles;

function VerificationScreen({ navigation, lang }) {
  const [verCode_1, onChangeCode_0] = useState(undefined);
  const [verCode_2, onChangeCode_1] = useState(undefined);
  const [verCode_3, onChangeCode_2] = useState(undefined);
  const [verCode_4, onChangeCode_3] = useState(undefined);

  const { getParam, navigate } = navigation;
  const phoneNumber = getParam("phone");

  function onPressDone() {
    return navigate("VerifySuccess", {
      name: getParam("name")
    });
  }

  const inputProps = {
    keyboardType: "numeric",
    style: styles.inputStyle
  };

  return (
    <Fragment>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.appPrimary}
        translucent={false}
      />
      <HeroPage>
        <View style={[flexStyle, selfCentered, styles.contentContainerStyle]}>
          <View style={[styles.formSection, shadowStyle]}>
            {Text({
              center: true,
              children: lang && lang.VERCODEMSG,
              style: styles.headerTextStyle
            })}

            {Text({
              center: true,
              style: [styles.headerTextStyle, styles.verfTextStyle],
              children: `${lang && lang.SENT2}  ${`(${phoneNumber})`}`
            })}

            <View style={styles.fieldsContainer}>
              <View
                style={[fullHeight, fullWidth, rowStyle, spaceBetweenItems]}
              >
                {Input({
                  value: verCode_1,
                  ...inputProps
                })}

                {Input({
                  value: verCode_2,
                  ...inputProps
                })}

                {Input({
                  value: verCode_3,
                  ...inputProps
                })}

                {Input({
                  value: verCode_4,
                  ...inputProps
                })}
              </View>
            </View>
          </View>

          {Text({
            center: true,
            style: [styles.headerTextStyle, styles.codeLinkStyle],
            children: lang && lang.RESNTCOD
          })}
        </View>

        {PageLastButton({
          title: lang && lang.DONE,
          onPress: onPressDone
          // disabled: !(verCode_1 || verCode_2 || verCode_3 || verCode_4)
        })}
      </HeroPage>
    </Fragment>
  );
}

export default connector({
  langProps: ["VERCODEMSG", "SENT2", "DONE", "RESNTCOD"]
})(VerificationScreen);
