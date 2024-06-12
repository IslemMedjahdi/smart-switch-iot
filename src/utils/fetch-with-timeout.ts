export function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 100
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch(url, { ...options, signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          reject(new Error("Request timed out"));
        } else {
          reject(error);
        }
      });
  });
}
