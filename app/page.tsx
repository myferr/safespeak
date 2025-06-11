"use client";

import { ApiReference } from "@/components/api-reference";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const apiEndpoint = {
  method: "GET" as const,
  path: "/api/",
  description:
    "Generate a numeric score on toxic content, the higher the more profane it is.",
  parameters: [
    {
      name: "message",
      type: "string",
      required: true,
      description: "Content that need's reviewing/moderating.",
    },
    {
      name: "showMessage",
      type: "string",
      required: false,
      description:
        "Show the message/content in the message parameter in the API's JSON output.",
    },
  ],
};

const sampleCode = `  let score: number | null;

  const profanityCheck = (message: string) => {
    fetch(\`https://safespeak-api.vercel.app/api?message=\${message.replaceAll(" ", "+")}\`)
      .then(async (res) => {
        const data = await res.json();
        if (data.score) {
          score = data.score;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
`;

export default function Home() {
  const [score, setScore] = useState<number | null>(null);

  const profanityCheck = (message: string) => {
    fetch(`/api?message=${message.replaceAll(" ", "+")}`)
      .then(async (res) => {
        const data = await res.json();
        if (data.score) setScore(data.score);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen gap-6 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex justify-between items-center px-8 py-2 gap-3 border bg-muted/20">
        <div>
          <p className="text-xl">SafeSpeak</p>
        </div>
        <div className="flex gap-3">
          {[
            {
              label: "GitHub",
              href: "https://github.com/myferr/safespeak",
              target: "_blank",
            },
          ].map((i) => (
            <Link href={i.href} target={i.target} key={i.href}>
              <Button variant={"ghost"} className="py-0.5 font-mono">
                {i.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
      <div className="p-20">
        <div className="flex flex-row gap-12 flex-1">
          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-5xl max-w-lg font-bold">
              Build fast.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-white">
                Moderate Faster.
              </span>
            </h1>
            <p className="max-w-xs mt-4">
              SafeSpeak is a developer-first API to numerically score profane
              and toxic content.
            </p>
          </div>
          <div className="flex flex-col max-w-full items-center justify-center flex-1">
            <Tabs defaultValue="code">
              <TabsList>
                <TabsTrigger value="code">Sample Code</TabsTrigger>
                <TabsTrigger value="api-reference">API Reference</TabsTrigger>
              </TabsList>
              <TabsContent value="api-reference">
                <ApiReference endpoint={apiEndpoint} />
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={sampleCode} title="index.ts" language="ts" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Separator className="mt-22 mb-11" />
        <div className="justify-center flex max-w-full">
          <Card className="w-xl">
            <CardHeader className="flex gap-2">
              <Badge>GET</Badge>
              <p className="text-muted">|</p>
              <p>{"https://safespeak-api.vercel.app/api?message="}</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1">
                <Input id="input" />
                <Button
                  onClick={() => {
                    const content = (
                      document.getElementById("input") as HTMLInputElement
                    )?.value;

                    profanityCheck(content);
                  }}
                >
                  Profanity check!
                </Button>
              </div>

              <div className="mt-3">
                {typeof score === "number" && (
                  <p
                    className={`text-sm font-medium ${
                      score > 0.8
                        ? "text-red-500"
                        : score > 0.5
                        ? "text-orange-400"
                        : score > 0.2
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {score > 0.8
                      ? "⚠️ Highly Profane"
                      : score > 0.5
                      ? "🚨 Moderately Profane"
                      : score > 0.2
                      ? "⚠️ Mild Language"
                      : score < 0.2
                      ? "✅ Clean"
                      : null}
                  </p>
                )}

                {score === null && (
                  <p className="text-sm text-muted-foreground">
                    Please input something ^
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
