import { SearchyBar } from "@/component/tabIcons/searchyBar";
import { colors } from "@/constants";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.smallImage} />
        <View style={{ flex: 1, marginTop: 20 }}>
          <SearchyBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "50%",
    zIndex: 0,
  },
  scrollStyle: {
    flex: 1,
    paddingHorizontal: 20,
  },
  smallImage: {
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
});
