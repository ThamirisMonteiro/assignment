import express from 'express';
import { getBalance } from '../controllers/assignmentController.js';

const router = express.Router();

router.get('/balance', async (req, res) => {
  try {
    res.send(await getBalance(req.query.account_id));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
