import { images } from "@/constants/images";
import { Image } from "expo-image";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export const TabIcon = ({ icon, title, focused }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={styles.backgroundImageStyle}
      >
        <Image
          source={icon}
          tintColor="#151312"
          style={styles.smallImageStyle}
        />
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    );
  }
  return (
    <View style={styles.subImageView}>
      <Image
        source={icon}
        style={styles.smallImageStyle}
        tintColor={"#A8B5DB"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    minWidth: 112,
    minHeight: 58,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 64,
    overflow: "hidden",
  },
  smallImageStyle: {
    width: 20,
    height: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 8,
  },
  subImageView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 54,
  },
  subImage: {},
});
