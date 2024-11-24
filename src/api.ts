import axios from "axios";

export interface FetchPhotoResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}

export interface Photo {
  id: string;
  alt_description: string;
  description?: string | null;

  urls: {
    small: string;
    regular: string;
    full: string;
  };
}

axios.defaults.baseURL = "https://api.unsplash.com/";

export const FetchPhoto = async (
  searchValue: string,
  page: number
): Promise<FetchPhotoResponse> => {
  const axiosSearchParams = {
    params: {
      client_id: "aRXK_PxV_MgRCe9RpGRWZ1gQ4xBKxYm9fNztMatkJUA",
      page: page,
      per_page: 10,
      query: searchValue,
    },
  };
  const fetchValue = await axios.get<FetchPhotoResponse>(
    "search/photos",
    axiosSearchParams
  );
  return fetchValue.data;
};
