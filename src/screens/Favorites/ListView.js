import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { registeredStyles, colors } from "../../utilities/theme";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";
import renderBodyItem from "./IconWithText";

function ListViewItem({
  image,
  name,
  speciality,
  waitingTime,
  fees,
  location,
  lang
}) {
  return (
    <View style={[registeredStyles.shadowStyle, styles.itemContainerStyle]}>
      <View style={[styles.sectionStyle, styles.firstSection]}>
        <View
          style={[
            styles.sectionInnerWrapper,
            registeredStyles.verticalCenteredFlex
          ]}
        >
          <View
            style={[
              registeredStyles.rowStyle,
              registeredStyles.spaceBetweenItems
            ]}
          >
            <View style={styles.headerTextContainer}>
              {Text({
                children: name,
                style: styles.headerText
              })}

              {Text({
                children: speciality,
                style: styles.specialityText
              })}
            </View>
            {Icon({
              color: colors.appPrimary,
              size: 24,
              name: "favorite"
            })}
          </View>
        </View>
      </View>

      <View style={[styles.sectionStyle, styles.secondSection]}>
        <View
          style={[
            styles.sectionInnerWrapper,
            registeredStyles.verticalCenteredFlex
          ]}
        >
          <View
            style={[
              registeredStyles.rowStyle,
              registeredStyles.spaceBetweenItems
            ]}
          >
            {[0, 1, 2].map(item =>
              renderBodyItem({
                title: !item
                  ? lang && lang.FEES
                  : item === 1
                  ? lang && lang.WAITTIME
                  : lang && lang.LOCATION,
                value: !item ? fees : item === 1 ? waitingTime : location
              })
            )}
          </View>
        </View>
      </View>

      {Avatar({
        source: { uri: image },
        containerStyle: [styles.avatarContainerStyle, styles.avatarStyle],
        avatarStyle: styles.avatarStyle
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    height: 98,
    borderRadius: 8,
    backgroundColor: colors.white,
    ...Platform.select({ ios: null, android: { elevation: 0.75 } }),
    marginBottom: 10
  },
  sectionStyle: {
    height: 48
  },
  firstSection: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: colors.whityGrey,
    alignItems: "flex-end"
  },
  secondSection: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.white,
    alignItems: "flex-end"
  },
  sectionInnerWrapper: {
    width: "75%",
    height: 48,
    paddingEnd: 9
  },
  avatarStyle: {
    width: 83,
    height: 83,
    borderRadius: 8
  },
  avatarContainerStyle: {
    position: "absolute",
    zIndex: 1000,
    top: 8,
    left: 5
  },
  headerTextContainer: {
    marginLeft: 5
  },
  headerText: {
    height: 18,
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: colors.appPrimary
  },
  specialityText: {
    height: 15,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.appPrimary
  }
});

function mapStateToProps({ langReducer: { lang } }) {
  return {
    lang: lang && {
      FEES: lang.FEES,
      LOCATION: lang.LOCATION,
      WAITTIME: lang.WAITTIME
    }
  };
}

export default connect(
  mapStateToProps,
  null
)(ListViewItem);
