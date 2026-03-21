export default function MarketingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Marketing Page</h1>
      <p>This page is inside a route group (marketing), so the URL is just /, not /marketing.</p>
      <p>Route groups help organize code without affecting the URL structure.</p>
    </div>
  );
}
