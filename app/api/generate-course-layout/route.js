
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
    GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';


const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}
, User Input:
`
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
    try {
        const { courseId, ...formData } = await req.json();


        const user = await currentUser();

        const { has } = await auth()
        const hasPremiumAccess = has({ plan: 'starter' })




        const contents = [{
            role: 'user',
            parts: [{ text: PROMPT + JSON.stringify(formData) }],
        }];

        // if user already 
        if (!hasPremiumAccess) {
            const result = await db.select().from(coursesTable)
                .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

            if (result.length >= 1) {
                return NextResponse.json({ 'resp': 'limit exceed' })
            }
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            config: {
                thinkingConfig: {
                    thinkingBudget: -1,
                },
                responseMimeType: 'text/plain',
            },
            contents,
        });

        const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';


        const rawJson = rawText.replace(/```json|```/g, '').trim();
        const jsonResp = JSON.parse(rawJson); // ⚠️ This line can still throw!
        const ImagePrompt = jsonResp.course?.bannerImagePrompt;
        // generate image

        const bannerImageUrl = await GenerateImage(ImagePrompt)

        const result = await db.insert(coursesTable).values({
            ...formData,
            noOfChapters: formData.noOfChapters,
            courseJson: jsonResp,
            userEmail: user?.primaryEmailAddress?.emailAddress || 'unknown@unknown.com',
            cid: courseId,
            bannerImageUrl: bannerImageUrl
        });

        return NextResponse.json({ courseId });

    } catch (err) {
        console.error('🔥 API Error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error', details: err.message },
            { status: 500 }
        );
    }
}

const GenerateImage = async (imagePrompt) => {
    const BASE_URL = 'https://aigurulab.tech';
    const result = await axios.post(BASE_URL + '/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//'flux'
            aspectRatio: "16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURULAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })

    //Output Result: Base 64 Image

    return result.data.image
}