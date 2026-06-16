import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* export const getGPTAnalysis = async (resumeText: string, jobDescription: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a senior recruiter. Analyse CV vs job description and return structured JSON only.",
        },
        {
          role: "user",
          content: `
  RESUME:
  ${resumeText}
  
  JOB DESCRIPTION:
  ${jobDescription}
  
  Return JSON with:
  - atsScore (0-100)
  - missingSkills (array)
  - strengths (array)
  - improvements (array)
  - summary (string)
          `,
        },
      ],
    });
  
    return JSON.parse(response.choices[0].message.content || "{}");
  }; */

  export const getClaudeAnalysis = async (resumeText: string, jobDescription: string) => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `
  You are a UK tech recruiter.
  
  Analyse this CV against job description.
  
  Return JSON only:
  
  RESUME:
  ${resumeText}
  
  JOB DESCRIPTION:
  ${jobDescription}
          `,
        },
      ],
    });
  
    const text = response.content[0].type === "text"
      ? response.content[0].text
      : "";
  
    return JSON.parse(text);
  };

  /* export const analyzeResume = async (resumeText: string, jobDescription: string) => {
    const [gpt, claude] = await Promise.all([
      getGPTAnalysis(resumeText, jobDescription),
      getClaudeAnalysis(resumeText, jobDescription),
    ]);
  
    // simple merge logic
    const finalScore = Math.round((gpt.atsScore + claude.atsScore) / 2);
  
    return {
      atsScore: finalScore,
      gptAnalysis: gpt,
      claudeAnalysis: claude,
      recommendation:
        finalScore > 75
          ? "Strong match for role"
          : "Needs improvement to match job requirements",
    }; 
  }; */