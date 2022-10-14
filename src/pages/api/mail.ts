import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_URL = process.env.CONVERTKIT_API_URL
    const API_KEY = process.env.CONVERTKIT_API_KEY
    // ConvertKit
    const data = {
      api_key: API_KEY,
      email,
    }

    const convertKitRes = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    return convertKitRes.ok
      ? res.status(201).json({ error: '' })
      : res.status(400).json({ error: 'Something went wrong' })
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() })
  }
}
