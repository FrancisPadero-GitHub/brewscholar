async function getStatus() {
  const res = await fetch("http://localhost:3000/api/status", {
    cache: "no-store",
  });
  // If the API returns an error, handle it
  if (!res.ok) {
    return { status: "error", message: "Failed to fetch status" };
      <h1 className="text-2xl font-bold mb-4">Service Status</h1>
      <pre className="bg-gray-900 text-white p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div className="mt-4">
        <div>Status: {data.status}</div>
        <div>Service: {data.service}</div>
        <div>Timestamp: {data.timestamp}</div>
        {data.message && (
          <div className="text-red-500">Message: {data.message}</div>
        )}
      </div>
    </main>
  );
}
