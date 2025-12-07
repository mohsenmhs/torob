import Axios, { AxiosError, AxiosRequestConfig } from "axios";

// Get base URL - works in both Next.js and React Native
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // Browser/Next.js
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.EXPO_PUBLIC_API_BASE_URL ||
      "https://torob.kolahghermezi.link/"
    );
  }
  // Node.js/Server-side
  return process.env.API_BASE_URL || "https://torob.kolahghermezi.link/";
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: getBaseURL(),
});

// Get Cloudflare Access credentials - works in both Next.js and React Native
const getCFCredentials = () => {
  // Try Next.js public env vars first (available in browser)
  if (typeof window !== "undefined") {
    return {
      id: process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_ID,
      secret: process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET,
    };
  }
  // Server-side or React Native
  return {
    id: process.env.TC_MAIN_SERVER__CF_ID || process.env.EXPO_PUBLIC_CF_ACCESS_CLIENT_ID,
    secret: process.env.TC_MAIN_SERVER__CF_TOKEN || process.env.EXPO_PUBLIC_CF_ACCESS_CLIENT_SECRET,
  };
};

// Add Cloudflare Access headers to all requests
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const { id: cfId, secret: cfSecret } = getCFCredentials();

  if (cfId && cfSecret) {
    config.headers = config.headers || {};
    config.headers["CF-Access-Client-Id"] = cfId;
    config.headers["CF-Access-Client-Secret"] = cfSecret;
  }

  return config;
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export default customInstance;

