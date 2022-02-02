const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: payload,
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [...state.articles, payload],
      };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map((element) => {
          if (payload.id === element.id) return payload;
          return element;
        }),
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter((element) => {
          return element.id != payload;
        }),
      };

    default:
      return state;
  }
};

export default articlesReducer;

// Actions:

export const setArticles = (articles) => {
  return { type: "SET_ARTICLES", payload: articles };
};

export const addArticle = (article) => {
  return { type: "ADD_ARTICLE", payload: article };
};

export const updateArticleById = (updatedArticle) => {
  return { type: "UPDATE_ARTICLE", payload: updatedArticle };
};

export const deleteArticleById = (id) => {
  return { type: "DELETE_ARTICLE", payload: id };
};
