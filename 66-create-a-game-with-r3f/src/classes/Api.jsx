export default class Api {
  constructor(url) {
    this.url = url;
    Api.instanceCount += 1;
  }
  static instanceCount = 0;
  isLoading = false;
  isSuccess = false;
  data = null;
  err = null;

  post = async (path, jsonData, headers, options) => {
    this.isLoading = true;
    this.isSuccess = false;

    try {
      const res = await fetch(`${this.url}${path}`, {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      });

      const resData = await res.json();
      this.data = resData;
    } catch (err) {
      this.err = err;
    }
    this.isLoading = false;
    if (!this.err) this.isSuccess = true;

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  };

  get = async (path, headers, options) => {
    this.isLoading = true;
    this.isSuccess = false;

    try {
      const res = await fetch(`${this.url}${path}`, {
        method: 'GET',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      });

      const resData = await res.json();
      this.data = resData;
    } catch (err) {
      this.err = err;
    }
    this.isLoading = false;
    if (!this.err) this.isSuccess = true;

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  };

  put = async (path, jsonData, id, headers, options) => {
    this.isLoading = true;
    this.isSuccess = false;

    try {
      const res = await fetch(`${this.url}${path}`, {
        method: 'PUT',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      });

      const resData = await res.json();
      this.data = resData;
    } catch (err) {
      this.err = err;
    }
    this.isLoading = false;
    if (!this.err) this.isSuccess = true;

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  };

  del = async (path, headers, options) => {
    this.isLoading = true;
    this.isSuccess = false;

    try {
      const res = await fetch(`${this.url}${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      });

      const resData = await res.json();
      this.data = resData;
    } catch (err) {
      this.err = err;
    }
    this.isLoading = false;
    if (!this.err) this.isSuccess = true;

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  };
}
