export default function apiCaller<T>(
  method: string,
  path: string
): Promise<T | { imageUrl: string } | null> {
  return fetch("https://source.unsplash.com/" + path, {
    method,
    headers: {
      Accept: "image/jpeg",
      "Content-Type": "image/jpeg"
    }
  }).then(res => {
    return { imageUrl: res.url };
  });
}
