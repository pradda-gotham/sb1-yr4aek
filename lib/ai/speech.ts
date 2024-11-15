import { AssemblyAI } from 'assemblyai';

const assemblyai = process.env.NODE_ENV === 'development'
  ? null
  : new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    });

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a mock transcription of the audio recording for development purposes.");
      }, 1000);
    });
  }

  try {
    const buffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(buffer).toString('base64');

    const transcript = await assemblyai!.transcripts.create({
      audio_data: base64Audio,
      speech_to_text: true,
      format_text: true,
    });

    return transcript.text || '';
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}