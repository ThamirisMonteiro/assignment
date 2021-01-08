import express from 'express';

const router = express.Router();

router.get('/balance', async (req, res) => {
  try {
    res.send(req.query.account_id);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
