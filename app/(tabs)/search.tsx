import { MovieCard } from "@/component/tabIcons/movieCard";
import { SearchyBar } from "@/component/tabIcons/searchyBar";
import { colors } from "@/constants";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: movieloading,
    error: movieError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0])
      updateSearchCount(searchQuery, movies[0]);
  }, [movies]);
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.image} contentFit="cover" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 20 }}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View style={styles.viewContainerStyle}>
              <Image source={icons.logo} style={styles.smallImg} />
            </View>
            <View style={{ marginVertical: 20 }}>
              <SearchyBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {movieloading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                style={{ marginVertical: 9 }}
              />
            )}
            {movieError && (
              <View style={{ marginVertical: 9 }}>
                <Text
                  style={{
                    color: "red",
                    paddingHorizontal: 20,
                    marginVertical: 9,
                  }}
                >
                  Error: {movieError?.message}
                </Text>
              </View>
            )}
            {!movieloading &&
              !movieError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  Search Results for{" "}
                  <Text style={{ color: colors.accent }}> {searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieloading && !movieError ? (
            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
              <Text style={{ textAlign: "center", color: "gray" }}>
                {searchQuery.trim()
                  ? "No movie Found"
                  : "Search for a movie...."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "40%",
  },
  viewContainerStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  smallImg: {
    width: 48,
    height: 40,
  },
});
