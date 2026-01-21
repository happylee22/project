import { COLLECTION_ID, DATABASE_ID, PROJECT_ID } from "@/config";
import { Client, Databases, ID, Query } from "react-native-appwrite";

// track the searches made by users
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);
// function to update search count
export const updateSearchCount = async (query: string, movie?: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovies = result.documents[0];
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovies.$id,
        {
          count: existingMovies.count + 1,
        }
      );
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie?.id,
        count: 1,
        title: movie?.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
      });

      // check if a record of that search has already been stored
      //if a document is found increment the searchCount field
      // if no document is found
      //create a new document in Appwrite database
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// second fuction to get trending movies.
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
