import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import StaticSwitcher from "../../components/RoundedStaticSwitcher";
const { shadowStyle, flexStyle } = registeredStyles;

function AvailabilityView({ avaliabilityDataArr, onPressbooking }) {
  return (
    <View style={[styles.containerStyle, shadowStyle]}>
      <View style={[flexStyle, styles.innerContainer]}>
        {avaliabilityDataArr &&
          avaliabilityDataArr.map((item, idx) => (
            <StaticSwitcher
              key={idx}
              viewContainerStyle={styles.switcher}
              onPress={onPressbooking}
              options={[
                {
                  centerText: false,
                  containerStyle: styles.availabityContainer,
                  label: item
                },
                {
                  label: "Book"
                }
              ]}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 100,
    borderRadius: 10,
    marginBottom: 10
  },
  innerContainer: {
    marginVertical: 20
  },
  availabityContainer: {
    flex: 3,
    backgroundColor: colors.appPrimary
  },
  switcher: {
    marginVertical: 5,
    marginHorizontal: 22
  }
});

export default AvailabilityView;
