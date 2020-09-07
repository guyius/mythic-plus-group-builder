export async function get(url, params = {}) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {    
    return e;
  }
}

export async function httpPut(url, body = {}) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (e) {    
    return e;
  }
}