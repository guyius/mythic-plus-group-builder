export async function get(url, params = {}) {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (e) {    
    return e;
  }
}