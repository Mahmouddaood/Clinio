import React from "react";
import Text from "../../components/Text";
import Accordion from "../../components/Accordion";
import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

function ReportsComponent({
  isRtl,
  title,
  activeSections,
  shadowStyle,
  handleUpdateSection,
  reports,
  accordContainerStyle
}) {
  return (
    <React.Fragment>
      {Text({
        style: [styles.reportsTextStyle, isRtl && styles.rtlText],
        children: title
      })}

      {reports &&
        reports.map(({ doctor, date, sections }) => {
          const sectionTitle = renderSectionTitle({
            doctor,
            date
          });
          return Accordion({
            mainkey: doctor,
            isRtl,
            sectionContainerStyle: styles.sectionContainerStyle,
            containerStyle: [shadowStyle, accordContainerStyle],
            renderSectionTitle: sectionTitle,
            sections,
            renderContent,
            activeSections,
            onChange: handleUpdateSection
          });
        })}
    </React.Fragment>
  );
}

function renderSectionTitle({ doctor, date }) {
  return (
    <React.Fragment>
      {Text({
        style: styles.titleStyle,
        children: doctor
      })}

      {Text({
        style: [styles.subtitleStyle, styles.contentTextStyle],
        children: date
      })}
    </React.Fragment>
  );
}

function renderContent({ section }) {
  return Text({
    children: section.content,
    style: styles.contentTextStyle
  });
}

const styles = StyleSheet.create({
  reportsTextStyle: {
    height: 25,
    fontSize: 15,
    color: colors.appPrimary
  },
  sectionContainerStyle: {
    marginVertical: 12,
    paddingHorizontal: 10
  },
  titleStyle: {
    height: 24,
    marginBottom: 5,
    marginTop: 12,
    marginHorizontal: 12,
    fontSize: 20,
    color: colors.appPrimary
  },
  subtitleStyle: {
    height: 25,
    borderBottomWidth: 0.35,
    marginHorizontal: 12,
    borderBottomColor: colors.placeholder
  },
  contentTextStyle: {
    fontSize: 12,
    color: colors.placeholder
  },
  rtlText: {
    writingDirection: "rtl"
  }
});

export default ReportsComponent;
