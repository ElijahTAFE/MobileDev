import React from "react";
import { Image, StyleSheet, View } from "react-native";

const logoSource = require("../../CI_IntMobileAppDev_AE_Pro2of2_Appx_ProjectResources/Logo.jpg");

export function AppLogo() {
  return (
    <View style={styles.wrapper}>
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  logo: {
    height: 42,
    width: 108,
  },
});
