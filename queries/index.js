import axios from "axios";
import useSWR from "swr";

export const useArtists = () => {
  const { data, error } = useSWR("/api/artists", axios,
    {
      revalidateOnFocus: false,
    });

  return {
    artists: data?.data?.artists,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useArtist = (uuid, fallbackData) => {
  const { data, error } = useSWR(`/api/artist?uuid=${uuid}`, axios,
    {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    });

  return {
    freshArtist: data?.data?.artist?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
