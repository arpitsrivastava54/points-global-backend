// import axios from 'axios';
// // import Redis from 'ioredis';
// import { config } from '../configs/config';

// // const redis = new Redis(config.redis.url);

// const evaluateWithGemini = async (data: any, questionPaperType: string) => {
//   // Rate limiting
//   const rateLimitKey = 'gemini:rate_limit';
//   const rpmLimit = 60; // Adjust based on Gemini plan
//   const tpmLimit = 1000000; // Adjust based on Gemini plan

//   // const requests = await redis.get(`${rateLimitKey}:requests`) || 0;
//   // const tokens = await redis.get(`${rateLimitKey}:tokens`) || 0;
//   if (requests >= rpmLimit || tokens >= tpmLimit) throw new Error('Rate limit exceeded');

//   // Mock Gemini API call (replace with actual endpoint)
//   const response = await axios.post(
//     'https://api.gemini.google.com/v1/evaluate', // Check actual Gemini API endpoint
//     { data, questionPaperType },
//     { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
//   );

//   const { score, feedback, inputTokens, outputTokens } = response.data;

//   // Update rate limit counters
//   await redis.multi()
//     .incr(`${rateLimitKey}:requests`)
//     .incrby(`${rateLimitKey}:tokens`, inputTokens + outputTokens)
//     .expire(`${rateLimitKey}:requests`, 60) // Reset every minute
//     .expire(`${rateLimitKey}:tokens`, 60)
//     .exec();

//   return { score, feedback, inputTokens, outputTokens };
// };