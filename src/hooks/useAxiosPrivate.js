import { useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //* this will be first access token that we give initially or after we refresh the page so It means thats the initial attempt and authorization header was not set
        if (!config.headers["Authorization"]) {
          config.headersp["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        //* the !prevReq.sent is because we want to avoid infinite loop of 403 error
        if (error?.response.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          //* our refresh token
          const newAccessToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          //* now we return the prev req but this time it has the new access token
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );
    //* interceptors wont remove themselves so we have to do it
    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
