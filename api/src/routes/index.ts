import express from 'express'
import { getRideController, rideConfirmController, rideEstimateController } from '../controllers/ride'
import { chatbotController } from '../controllers/chatbot'

const router = express.Router()

router.post('/ride/estimate', rideEstimateController)

router.patch('/ride/confirm', rideConfirmController)

router.get('/ride/:customer_id/:driverId?', getRideController)

router.post('/chat', chatbotController)

export default router