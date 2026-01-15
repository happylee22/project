import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={styles.touch}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
          }}
          style={styles.imageStyle}
          contentFit="cover"
        />
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.viewStyle}>
          <Image source={icons.star} style={styles.star} />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View style={styles.secondViewStyle}>
          <Text style={styles.split}>{release_date?.split("-")[0]}</Text>
          <Text style={styles.movie}>Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: "30%",
  },
  imageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  viewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 4,
  },
  star: {
    width: 16,
    height: 16,
  },
  secondViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  split: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  movie: {
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
    textTransform: "uppercase",
  },
});
