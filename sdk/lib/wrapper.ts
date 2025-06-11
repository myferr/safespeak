import { isProfane } from "./isProfane";

class safespeak {
  static isProfane(message: string, threshold: number) {
    if (threshold > 1) {
      console.error("The maximum threshold is 1.");
    }
    return isProfane(message, threshold);
  }
  static async getScore(message: string) {
    function sanitizeString(originalMessage: string) {
      let sanitizedMessage = originalMessage.toLowerCase();
      sanitizedMessage = sanitizedMessage.replace(/[^a-z0-9\s]/g, "");
      sanitizedMessage = sanitizedMessage.replace(/\s/g, "+");
      return sanitizedMessage;
    }

    const sanitizedMessage = sanitizeString(message);
    try {
      const res = await fetch(
        `https://safespeak-api.vercel.app/api?message=${sanitizedMessage}`
      );
      const data = await res.json();

      return data.score;
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

export { safespeak };
