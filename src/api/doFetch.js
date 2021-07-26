export const API_SERVER_URL = `${
  window.location.host.includes("propdo.ai")
    ? "https://api.propdo.ai"
    : "https://api.propdodev.ai"
}`;

const TOKEN_EXPIRED_MSG = "Token has expired";
export const IMAGES_LINK = `${
  window.location.host.includes("propdo.ai")
    ? "https://propdo.ai/images/dashboard/"
    : "https://propdodev.ai/images/dashboard/"
}`;

export const IMAGES_LINK_LP = `${
  window.location.host.includes("propdo.ai")
    ? "https://propdo.ai/images/landing-page/"
    : "https://propdodev.ai/images/landing-page/"
}`;


export function doFetch(uri, options) {
  console.debug(`Fetching ${uri}`);
  if (!options) {
    options = {};
  }
  if (!uri.startsWith("/")) {
    uri = "/" + uri; // prepend leading slash in case it isn't there.
  }
  async function _doFetch() {
    try {
      const response = await fetch(`${API_SERVER_URL}${uri}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        ...options,
      });
      const data = await response.json();
      if (data.msg === TOKEN_EXPIRED_MSG) {
        try {
          await refreshToken(); //wait for token to re-fresh
          return _doFetch(); //then re-try the fetch.
        } catch (error) {
          //todo: if refresh not successfully
          console.error(error);
          window.location.replace(`${window.location.origin}/dashboard`);
        }
      } else {
        return data;
      }
    } catch (err) {
      //log the error and re-throw for further handling.
      console.error("Failed to fetch: ", err);
      throw err;
    }
  }

  return _doFetch();
}

/**
 * Refresh access token using the refresh token.
 */
export async function refreshToken() {
  try {
    const response = await fetch(`${API_SERVER_URL}/user/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refresh")}`,
      },
    });
    const data = await response.json();
    localStorage.setItem("access", data["access token"]);
    return data;
  } catch (err) {
    //log the error and re-throw for further handling.
    console.error("Failed to get refresh token.", err);
    throw err;
  }
}
