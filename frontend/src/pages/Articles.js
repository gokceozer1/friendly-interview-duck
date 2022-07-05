import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleService from "../services/ArticleServices";
import DrowpDown from "../components/Dropdown"

export default function Articles() {

  const [articles, setArticles] = useState([]);
  const [filteredResults, setFilteredResults] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    retrieveArticles();
  }, []);

  const retrieveArticles = () => {
    ArticleService.getAll()
      .then(response => {
        setArticles(response.data);
        setFilteredResults(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleArticleClick = (e) =>{ 
    let path = "/questions/" + e.id; 
    navigate(path);
  }

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    if (searchTitle !== '') {
      const filteredResults = articles.filter((item) => {
        return Object.values(item['headline']).join('').toLowerCase().includes(searchTitle.toLowerCase())
      })
      setFilteredResults(filteredResults)
    }
    else{
        setFilteredResults(articles)
    }
    };

  return (
    <div>
        <form className="p-10">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={onChangeSearchTitle} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by headline" required/>
            </div>
        </form>
        <ul className="grid grid-rows-3 grid-cols-3 gap-4 mt-4 px-10">
            {filteredResults.map((article, index) => (
                <li
                key={article.id}
                className="shadow-lg bg-blue-100 text-blue-500 text-lg font-bold text-center p-10 rounded-lg row-span-3 col-span-1"                
                >
                <a className = "mt-4 px-10" href={`/articles/${article.id}`}>
                  <img className="rounded-t-lg" src={article.image} alt="" />
                </a>
                <Link
                    className={`todo-title mr-2`}
                    title={article.headline}
                    to = {`/articles/${article.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <h2 className="break-after-column text-blue-900">{article.headline}<br /><br /></h2>
                    <p className="question-answer line-clamp-5">{article.text}</p>
                </Link>
                </li>
            ))}
        </ul>

      </div>


    
  );
}
   

