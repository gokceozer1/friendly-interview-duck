import http from "../http-common";
const getAll = () => {
  return http.get("/articles");
};
const get = id => {
  return http.get(`/articles/${id}`);
};
const create = data => {
  return http.post("/articles", data);
};
const update = (id, data) => {
  console.log(id)
  console.log(`/articles/${id}`)
  return http.put(`/articles/${id}`, data);
};
const remove = id => {
  return http.delete(`/articles/${id}`);
};
const removeAll = () => {
  return http.delete(`/articles`);
};
const findByTitle = title => {
  return http.get(`/articles?title=${title}`);
};
const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default exportedObject;