export async function get(url, params = {}) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {    
    return e;
  }
}

export async function post(url, data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (e) {    
    return e;
  }
}