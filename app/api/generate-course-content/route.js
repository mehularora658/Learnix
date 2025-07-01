import { NextResponse } from "next/server"
import { ai } from '../generate-course-layout/route';
import axios from "axios";
import { coursesTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const PROMPT = `Based on the chapter name and topic, generate HTML content for each topic and respond in **strict JSON format only**.
Make sure:
- All strings are double-quoted
- No control characters (like newlines) are unescaped
- JSON should be parsable by JSON.parse()

Schema:
{
  chapterName: "<string>",
  topics: [
    {
      topic: "<string>",
      content: "<HTML content as string>"
    }
  ]
}

User Input:
`


export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json()

    const promises = courseJson?.chapters?.map(async (chapter) => {
        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.5-pro';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';


        const rawJson = rawText.replace(/```json|```/g, '').trim();
        const jsonResp = JSON.parse(rawJson);

        //get yt videos
        const youtubeData = await GetYoutubeVideo(chapter?.chapterName)


        return {
            youtubeVideo: youtubeData,
            courseData: jsonResp
        };
    })

    const CourseContent = await Promise.all(promises)

    // save to db

    const dbResp = await db.update(coursesTable).set({
        courseContent: CourseContent
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        courseName: courseTitle,
        CourseContent: CourseContent
    })
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo = async (topic) => {
    const params = {
        part: 'snippet',
        q: topic,
        maxResult: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
    }
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = response.data.items
    const youtubeVideoList = [];
    youtubeVideoListResp.forEach(item => {
        const data = {
            videoId: item.id?.videoId,
            title: item?.snippet?.title
        }
        youtubeVideoList.push(data);
    });


    return youtubeVideoList;
}