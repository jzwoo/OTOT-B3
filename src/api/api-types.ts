declare namespace API {
  type Response<T> = {
    status: number;
    statusText: string;
    data: T;
  };

  type Contact = {
    _id: number;
    name: string;
    contact: number;
  }

  type Message = {
    message: string;
  }
}

export default API;