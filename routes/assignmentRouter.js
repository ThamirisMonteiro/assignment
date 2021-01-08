import express from 'express';
import { getBalance, postEvent } from '../controllers/assignmentController.js';

const router = express.Router();

router.get('/balance', async (req, res) => {
  try {
    res.status(200).send([await getBalance(req.query.account_id)]);
  } catch (err) {
    res.status(404).send("0");
  }
});

router.post('/event', async (req, res) => {
  try {
    res.send(await postEvent(req.body));
  } catch (err) {
    res.status(400);
  }
});

export default router;
