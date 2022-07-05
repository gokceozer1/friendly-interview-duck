import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionService from "../services/QuestionServices";
import DrowpDown from "../components/Dropdown"

export default function Questions() {

  const [questions, setQuestions] = useState([]);
  const [dropDownValue, setDropDownValue] = useState('company');
  const [filteredResults, setFilteredResults] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    retrieveQuestions();
  }, []);

  const retrieveQuestions = () => {
    QuestionService.getAll()
      .then(response => {
        setQuestions(response.data);
        setFilteredResults(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    if (searchTitle !== '') {
      const filteredResults = questions.filter((item) => {
        return Object.values(item[dropDownValue]).join('').toLowerCase().includes(searchTitle.toLowerCase())
      })
      setFilteredResults(filteredResults)
    }
    else{
        setFilteredResults(questions)
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
                <input onChange={onChangeSearchTitle} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`Search by ${dropDownValue}`} required/>
                {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                <div className="absolute right-2.5 bottom-2.5"> 
                 <DrowpDown value={dropDownValue} setValue={setDropDownValue} />
                </div>
            </div>
        </form>
        <ul className="grid grid-rows-3 grid-cols-3 gap-4 my-5 px-10">
            {filteredResults.map((question, index) => (
                <li
                key={question.id}
                className="shadow-lg bg-blue-100 text-blue-500 text-lg font-bold text-center p-10 rounded-lg row-span-3 col-span-1"                
                >
                
                <Link
                    className={`todo-title mr-2`}
                    title={question.question}
                    to = {{
                      pathname:`${question.id}`, 
                      query: {id: question.id }}
                    }
                    
                    style={{ textDecoration: 'none' }}
                >
                    <h2 className="break-after-column text-blue-900">{question.company + " | " + question.question}<br /><br /></h2>
                    <p className="question-answer line-clamp-5">{question.answer}<br /><br /></p>
                    
                </Link>
                
                {question.articles.map((article, question_index) => (
                <>
                <p className="question-answer text-blue-700 line-clamp-5"><br /><br />Related Articles:</p>
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
                </>
                ))}

                </li>
            ))}
        </ul>

      </div>


    
  );
}
   

