import React from "react";
import { View, StyleSheet } from "react-native";
import connector from "../../../components/connector";
import renderSecondItem from "./ItemInput";
import { registeredStyles, colors } from "../../../utilities/theme";
import ViewItem from "../../../components/HeroViewSections";

const { Fragment } = React;

function ItemsView({
  lang,
  isRtl,
  withNameSearchSection,
  navigate,
  values,
  itemContainerStyle,
  withWrapper = true
}) {
  function handleNavigate(routName) {
    return function() {
      return navigate(routName);
    };
  }

  let fields = lang && [
    [
      {
        value: lang.SPEC
      },
      {
        value: renderSecondItem({
          title: lang.SPEC,
          value: values && values[withNameSearchSection ? 1 : 0],
          isRtl
        }),
        onPress: handleNavigate("Select Speciality")
      }
    ],
    [
      {
        value: lang.CITY
      },
      {
        value: renderSecondItem({
          title: lang.CITY,
          value: values && values[withNameSearchSection ? 2 : 1],
          isRtl
        }),
        onPress: handleNavigate("Select City")
      }
    ],
    [
      {
        value: lang.AREA
      },
      {
        value: renderSecondItem({
          title: lang.AREA,
          value: values && values[withNameSearchSection ? 3 : 2],
          isRtl
        }),
        onPress: handleNavigate("Select Area")
      }
    ]
  ];

  if (withNameSearchSection) {
    const title = lang.NAME;
    fields = [
      [
        {
          value: title
        },
        {
          value: renderSecondItem({
            title,
            value: values && values[0],
            isRtl
          }),
          onPress: handleNavigate("Select Doctor")
        }
      ],
      ...fields
    ];
  }

  const Wrapper = withWrapper ? View : Fragment;
  const WrapperProps = withWrapper
    ? {
        style: [styles.searchSelectorsWrapper, registeredStyles.shadowStyle]
      }
    : null;

  return (
    <Wrapper {...WrapperProps}>
      {fields &&
        fields.map((options, idx) => (
          <ViewItem
            containerStyle={[styles.viewItemContainerStyle, itemContainerStyle]}
            key={idx}
            options={options}
          />
        ))}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  searchSelectorsWrapper: {
    top: 15,
    backgroundColor: colors.white,
    paddingTop: 20,
    minHeight: 374,
    borderRadius: 10,
    elevation: 0
  },
  viewItemContainerStyle: {
    marginBottom: 12,
    marginHorizontal: 12,
    elevation: 0.5,
    height: 102
  }
});

export default connector({
  langProps: ["SPEC", "NAME", "CITY", "AREA"]
})(ItemsView);
