export class FetchHelper {

    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    fetch(url, params = {}) {
        return fetch(`${this.serviceUrl}${url}${this.queryString(params)}`, {
          method: 'GET',
          headers: this.headers(),
        })
        .then(this.parseResponse);
      }
    
    post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${this.serviceUrl}${url}`, {
        method: 'POST',
        headers: this.headers(),
        body,
    })
    .then(this.parseResponse);
    }
    
    patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${this.serviceUrl}${url}`, {
        method: 'PATCH',
        headers: this.headers(),
        body,
    })
    .then(this.parseResponse);
    }
    
    delete(url) {
    return fetch(`${this.serviceUrl}${url}`, {
        method: 'DELETE',
        headers: this.headers(),
    })
    .then(this.parseResponse);
    }

    queryString(params) {
        const query = Object.keys(params)
                            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                            .join('&');
        return `${query.length ? '?' : ''}${query}`;
    }
    
    headers() {
        const token = JSON.parse(localStorage.getItem('token'));
      
        return {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token}`,
        };
    }
      
    parseResponse(response) {
        return response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        });
    }
    
  }
  