import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "./Collapsible";
import Text from "../Text";
import Icon from "../Icon";
import { colors, registeredStyles } from "../../utilities/theme";

const { fullWidth, rtlRow, rowStyle, spaceBetweenItems } = registeredStyles;

function Accordion({
  onChange,
  activeSections,
  containerStyle,
  sections,
  renderContent,
  headerPropName = "header",
  disabled = false,
  expandMultiple = true,
  renderSectionTitle,
  onAnimationEnd,
  isRtl,
  mainkey,
  sectionContainerStyle,
  collapseibleProps = {
    align: "top" || "bottom" || "center",
    duration: 200,
    easing: "easeOutCubic",
    style: null
  }
}) {
  const isCurrentAccordion = activeSections.hasOwnProperty(mainkey);
  const isCurrentAccordionHasIndexs =
    isCurrentAccordion &&
    Boolean(activeSections[mainkey]) &&
    activeSections[mainkey];
  const indexs = isCurrentAccordionHasIndexs || [];

  function _toggleSection(sectionkey, isActiveKey) {
    return function() {
      if (!disabled) {
        let updatedSections = {};
        const newItem = { [mainkey]: [sectionkey] };
        if (isActiveKey) {
          const filteredIndexs = indexs.filter(k => sectionkey !== k);
          updatedSections = filteredIndexs.length
            ? { [mainkey]: filteredIndexs }
            : {};
        } else if (expandMultiple) {
          if (isCurrentAccordion) {
            updatedSections = {
              [mainkey]: [...indexs, sectionkey]
            };
          } else {
            updatedSections = newItem;
          }
        } else {
          updatedSections = newItem;
        }
        return onChange && onChange(updatedSections);
      }
    };
  }

  function renderCollapsible(section, key, isActiveKey) {
    function _onAnimationEnd() {
      return onAnimationEnd && onAnimationEnd(section, key);
    }

    return (
      <Collapsible
        collapsed={!isActiveKey}
        onAnimationEnd={_onAnimationEnd}
        collapsedHeight={0}
        {...collapseibleProps}
      >
        {renderContent({
          section,
          key
        })}
      </Collapsible>
    );
  }

  return (
    <View style={containerStyle} key={mainkey}>
      {renderSectionTitle}

      {sections.map((section, key) => {
        const isActiveKey = indexs.includes(key);
        return (
          <View key={key} style={sectionContainerStyle}>
            <TouchableOpacity
              onPress={_toggleSection(key, isActiveKey)}
              disabled={disabled}
              style={[fullWidth, isRtl ? rtlRow : rowStyle, spaceBetweenItems]}
            >
              {Text({
                style: styles.headerStyle,
                children: section[headerPropName],
                applyRtlStyle: isRtl
              })}

              {Icon({
                color: isActiveKey ? colors.appPrimary : colors.placeholder,
                size: 27,
                name: isActiveKey ? "keyboard-arrow-up" : "keyboard-arrow-down"
              })}
            </TouchableOpacity>

            {renderCollapsible(section, key, isActiveKey)}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 15,
    color: colors.appPrimary,
    height: 19,
    fontFamily: "Montserrat-Regular"
  }
});

export default Accordion;
