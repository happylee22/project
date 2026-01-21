import { MovieCard } from "@/component/tabIcons/movieCard";
import { SearchyBar } from "@/component/tabIcons/searchyBar";
import { colors } from "@/constants";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: movieloading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.smallImage} />
        {movieloading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 40, alignSelf: "center" }}
          />
        ) : movieError || trendingError ? (
          <Text> Error: {movieError?.message || trendingError?.message}</Text>
        ) : (
          <View style={{ flex: 1, marginTop: 20 }}>
            <SearchyBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "white",
                    marginBottom: 13,
                  }}
                >
                  Trending Movies{" "}
                </Text>
              </View>
            )}
            <>
              <Text style={styles.latestMoviesText}>Latest Movies</Text>
              <FlatList
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <Text style={{ color: "white", fontSize: 14 }}>
                    {item.title}
                  </Text>
                )}
              />

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "center",
                  gap: 16,
                  marginVertical: 16,
                }}
                style={styles.flatList}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
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
  latestMoviesText: {
    color: "white",

    fontWeight: "bold",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  flatList: {
    marginTop: 10,
    paddingBottom: 128,
  },
});
