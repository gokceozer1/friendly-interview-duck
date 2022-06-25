import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ArticleService from "../services/ArticleServices";

export default function Article(props){
    const [article, setArticle] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        retrieveQuestion();
      }, []);
    
    const retrieveQuestion = () => {
        ArticleService.get(id)
        .then(response => {
        setArticle(response.data[0]);
        })
        .catch(e => {
        console.log(e);
        });
        
    };

    return(
        <div>
        <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4 px-10">

            <div
            key={article.id}
            className="shadow-lg bg-blue-100 text-blue-500 text-lg font-bold text-center p-10 rounded-lg row-span-3 col-span-1"                
            >
                
            <div
                className={`todo-title mr-2`}
                title={article.headline}                
                style={{ textDecoration: 'none' }}
            >
                <h2 className="break-after-column text-blue-900">{article.headline}<br /><br /></h2>
                <p className="question-answer line-clamp-5">{article.text}</p>
            </div>

                </div>

        </div>

      </div>
    )
}