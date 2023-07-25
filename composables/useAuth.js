import jwt_decode from "jwt-decode";
import useFetchApi from "./useFetchApi";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => false);

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
  };

  const registerUser = ({
    username,
    email,
    password,
    repeatPassword,
    name,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/register", {
          method: "POST",
          body: { username, email, password, repeatPassword, name },
        });

        setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: { username, password },
        });

        setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi("/api/auth/logout", {
          method: "POST",
        });

        setToken(null);
        setUser(null);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");
        setUser(data.user);
        resolve({ data, puk: 1234 });
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();
    if (!authToken.value) return;

    const jwt = jwt_decode(authToken.value);

    const newRefreshTime = jwt.exp - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true);
      try {
        await refreshToken();
        let a = await getUser();

        reRefreshAccessToken();

        resolve(a);
      } catch (error) {
        reject(error);
      } finally {
        setIsAuthLoading(false);
      }
    });
  };

  return {
    login,
    logout,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
    registerUser,
  };
};
