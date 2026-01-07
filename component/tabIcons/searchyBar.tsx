import { colors } from "@/constants";
import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface props {
  placeholder: string;
  onPress: () => void;
}
export const SearchyBar = ({ onPress, placeholder }: props) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.image}
        tintColor={"#ab8bff"}
        contentFit="contain"
      />
      <TextInput
        style={styles.textInput}
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#a8b5db"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark[200],
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    color: "#FFFFFF",
  },
});
