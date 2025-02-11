import express from 'express'
const router = express.Router();
import { Question } from '../models/questionModel.js';
router.post('/addqst', async (req, res) => {
    try {
        const questions = req.body; // Assume body is an array of questions

        // Validate each question
        for (const question of questions) {
            const { options } = question;

            // Validate options array
            if (!options || options.length === 0) {
                return res.status(400).json({ error: "Options are required for all questions" });
            }

            // Ensure at least one option is marked as correct
            const hasCorrectOption = options.some(option => option.isCorrect);
            if (!hasCorrectOption) {
                return res.status(400).json({ error: "Each question must have at least one correct option" });
            }
        }

        // Insert all questions into the database
        const newQuestions = await Question.insertMany(questions);

        res.status(201).json({
            message: "Questions created successfully",
            questions: newQuestions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the questions" });
    }
});
// Route to get questions by category
router.get('/questions/:category', async (req, res) => {
    try {

        const category = req.params.category;
        const questions = await Question.find({ category: category });
       

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;