function getTopNews({ page }) {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/top?page=${page}`);
}
function getDateNews({ page }) {
  return fetch(`${process.env.REACT_APP_BACKEND}/news?page=${page}`);
}

const getNewsById = (idNews) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/${idNews}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getCarouselTopNews = () => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/carouselTop`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const getCarouselDateNews = () => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/carouselDate`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const postRegister = (requestBody) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
};

const postLogin = (requestBody) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
};

const getProfile = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getOtherUserProfile = (idUser) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/${idUser}/profile`, {
    method: "GET",
  });
};

const getUsers = () => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/`, {
    method: "GET",
  });
};

const getSingleNewsComments = (idNews) => {
  return fetch(`http://localhost:3000/api/v1/news/${idNews}/comments`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const updateProfile = (requestBody, token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/update/profile`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });
};

const updateNewsPartner = (requestBody, token, idNews) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/${idNews}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
};

const postFileImage = (requestBody, token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/users/upload/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
};

const createNews = (requestBody, token) => {
  console.dir(requestBody);
  return fetch(`${process.env.REACT_APP_BACKEND}/news/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });
};

const createPartnerNews = (requestBody, token) => {
  console.dir(requestBody);
  return fetch(`${process.env.REACT_APP_BACKEND}/news/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
};

const postComment = (requestBody, id, token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });
};

const postReactionComment = (requestBody, idComment, token) => {
  return fetch(
    `${process.env.REACT_APP_BACKEND}/comments/opinion/${idComment}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );
};

const deleteNews = (idNews, token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/news/${idNews}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteComment = (idComment, token) => {
  return fetch(`${process.env.REACT_APP_BACKEND}/comments/${idComment}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getSingleNewsComments,
  getTopNews,
  postRegister,
  getDateNews,
  postLogin,
  getProfile,
  createNews,
  updateProfile,
  postFileImage,
  postComment,
  postReactionComment,
  deleteNews,
  createPartnerNews,
  deleteComment,
  getNewsById,
  updateNewsPartner,
  getOtherUserProfile,
  getUsers,
  getCarouselTopNews,
  getCarouselDateNews,
};
