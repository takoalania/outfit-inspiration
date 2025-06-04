import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stylingRoutes from './routes/styling';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/styling', stylingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
