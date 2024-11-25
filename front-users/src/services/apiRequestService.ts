export async function sendRequest(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 
    path: string, 
    body: any = null
  ) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log('Authorization token is missing');
    }
  
    const requestOptions: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    if (body !== null) {
      requestOptions.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(path, requestOptions);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Request failed: ${error.message}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }