/**
 * Paciolify API helper functions
 */

const API_ENDPOINT = "http://localhost:3000/api";

class PaciolifyAPIHelper {
  // Check if there if the endpoint is reachable
  static checkConnectivity() {
    return fetch(`${API_ENDPOINT}/status`, {
      method: "HEAD"
    }).catch(err => {
      console.log("You are offline");
      //Alert.throwWarning("You are offline!");
      return err;
    });
  }

  // Fetch balance given the priodRange (i.e. span)
  static fetchBalance(userID, span) {
    const URL = `${API_ENDPOINT}/user/${userID}/balance?span=${span}`;
    return fetch(URL)
      .then(res => res.json())
      .catch(err => {
        console.log(err, "connectivity error");
        return { message: "connectivity error" };
      });
  }
}
