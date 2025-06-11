import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

interface ApiReferenceProps {
  endpoint: ApiEndpoint;
  className?: string;
}

export function ApiReference({ endpoint, className }: ApiReferenceProps) {
  const methodColors = {
    GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge className={methodColors[endpoint.method]}>
            {endpoint.method}
          </Badge>
          <code className="text-sm font-mono">{endpoint.path}</code>
        </div>
        <CardDescription>{endpoint.description}</CardDescription>
      </CardHeader>
      {endpoint.parameters && (
        <CardContent>
          <h4 className="font-semibold mb-2">Parameters</h4>
          <div className="space-y-2">
            {endpoint.parameters.map((param) => (
              <div key={param.name} className="flex items-start gap-2 text-sm">
                <code className="bg-muted px-1 rounded">{param.name}</code>
                <Badge variant="outline" className="text-xs">
                  {param.type}
                </Badge>
                {param.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
                <span className="text-muted-foreground">
                  {param.description}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
