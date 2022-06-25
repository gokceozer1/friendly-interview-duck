import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import QuestionService from "../services/QuestionServices";

export default function Question(props){
    const [question, setQuestion] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        retrieveQuestion();
      }, []);
    
    const retrieveQuestion = () => {
    QuestionService.get(id)
        .then(response => {
        setQuestion(response.data[0]);
        })
        .catch(e => {
        console.log(e);
        });
        
    };

    return(
        <div>
        <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4 px-10">

            <div
            key={question.id}
            className="shadow-lg bg-blue-100 text-blue-500 text-lg font-bold text-center p-10 rounded-lg row-span-3 col-span-1"                
            >
                
            <div
                className={`todo-title mr-2`}
                title={question.question}                
                style={{ textDecoration: 'none' }}
            >
                <h2 className="break-after-column text-blue-900">{question.company + " | " + question.question}<br /><br /></h2>
                <p className="question-answer line-clamp-5">{question.answer}</p>
            </div>

                {question.articles?.map((article, question_index) => (
                <div key = {article.id}
                className="list"      >
                    <Link
                    to={"/articles/" + article.id}
                    className="badge text-blue-700"
                    key={question_index}
                    style={{ textDecoration: 'none' }}
                    >
                    {article.headline}
                    </Link>
                
                </div>
                ))}

                </div>

        </div>

      </div>
    )
}