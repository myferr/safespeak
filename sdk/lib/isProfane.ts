function sanitizeString(originalMessage: string) {
  let sanitizedMessage = originalMessage.toLowerCase();
  sanitizedMessage = sanitizedMessage.replace(/[^a-z0-9\s]/g, "");
  sanitizedMessage = sanitizedMessage.replace(/\s/g, "+");
  return sanitizedMessage;
}

async function profanityCheck(message: string) {
  const sanitizedMessage = sanitizeString(message);
  try {
    const res = await fetch(
      `https://safespeak-api.vercel.app/api?message=${sanitizedMessage}`
    );
    const data = await res.json();

    return {
      score: data.score,
      tags: data.tags,
    };
  } catch (err) {
    throw new Error(String(err));
  }
}

async function isProfane(msg: string, threshold: number) {
  const out = await profanityCheck(msg);
  return out.score > threshold;
}

export { isProfane };
