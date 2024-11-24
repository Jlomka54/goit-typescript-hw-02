import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const FetchPhoto = async (searchValue, page) => {
  const axiosSearchParams = {
    params: {
      client_id: "aRXK_PxV_MgRCe9RpGRWZ1gQ4xBKxYm9fNztMatkJUA",
      page: page,
      per_page: 10,
      query: searchValue,
    },
  };
  const fetchValue = await axios.get("search/photos", axiosSearchParams);
  return fetchValue;
};
