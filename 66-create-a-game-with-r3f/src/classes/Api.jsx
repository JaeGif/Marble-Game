export default class Api {
  constructor(url) {
    this.url = url;
  }
  isLoading = false;
  isSuccess = false;
  data = null;
  err = null;

  post(path, jsonData, headers, options) {
    const sendPost = async () => {
      this.isLoading = true;
      this.isSuccess = false;

      try {
        const res = await fetch(`${API_STRING}${path}`, {
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
      if (!err) this.isSuccess = true;
    };
    sendPost();

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  }

  get(path, headers, options) {
    const sendGet = async () => {
      this.isLoading = true;
      this.isSuccess = false;

      try {
        const res = await fetch(`${API_STRING}${path}`, {
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
      if (!err) this.isSuccess = true;
    };
    sendGet();

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  }

  put(path, jsonData, id, headers, options) {
    const sendPut = async () => {
      this.isLoading = true;
      this.isSuccess = false;

      try {
        const res = await fetch(`${API_STRING}${path}`, {
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
      if (!err) this.isSuccess = true;
    };
    sendPut();

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  }

  del(path, headers, options) {
    const sendDel = async () => {
      this.isLoading = true;
      this.isSuccess = false;

      try {
        const res = await fetch(`${API_STRING}${path}`, {
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
      if (!err) this.isSuccess = true;
    };
    sendDel();

    return {
      data: this.data,
      isLoading: this.isLoading,
      isSuccess: this.isSuccess,
      err: this.err,
    };
  }
}
