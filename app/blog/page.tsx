import Post from "../_components/Post";
import MarketingPage from "../(marketing)/page";

export default function BlogPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <Post />
      <MarketingPage />
    </div>
  );
}
