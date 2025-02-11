import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
    const { category } = useParams(); // Get the category from the URL
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/questions/questions/${category}`);
                setQuestions(res.data); // Set the fetched questions
                console.log(res.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [category]);

    

    return (
        <div className="questions-container">
            <h1>Questions for {category}</h1>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={index} className="question-card">
                        <h2>{question.title}</h2>
                        <ul>
                            {question.options.map((option, idx) => (
                                <li key={idx}>{option}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No questions available for this category.</p>
            )}
        </div>
    );
};

export default Questions;
