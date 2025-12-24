import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorDisplay({ error }: { error: string }) {
  const isCityNotFound = 
    error.toLowerCase().includes("not found") || 
    error.toLowerCase().includes("404") ||
    error.toLowerCase().includes("city");

  const isNetworkError = 
    error.toLowerCase().includes("network") || 
    error.toLowerCase().includes("connect") ||
    error.toLowerCase().includes("econnrefused");

  return (
    <Card className="w-full max-w-md mt-4 border-red-300 bg-red-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-red-700 flex items-center gap-2 text-lg">
          <span className="text-2xl">❌</span>
          {isCityNotFound ? "City Not Found" : isNetworkError ? "Connection Error" : "Error"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-red-600 font-medium">{error}</p>
        
        {isCityNotFound && (
          <div className="bg-red-100 p-2 rounded text-red-700 text-xs">
            <p className="font-semibold mb-1">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Check the spelling of the city name</li>
              <li>Try the full city name (e.g., "New York")</li>
              <li>Make sure the city exists</li>
            </ul>
          </div>
        )}

        {isNetworkError && (
          <div className="bg-red-100 p-2 rounded text-red-700 text-xs">
            <p className="font-semibold mb-1">🔌 Connection Issue:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Make sure the backend server is running</li>
              {/* <li>Check if API URL is correct (http://localhost:5000)</li> */}
              <li>Try refreshing the page</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
