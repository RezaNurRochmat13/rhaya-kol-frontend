import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Post } from './types/dashboard';
import { EngagementChart } from './components/EngagementChart';
import { Video, ExternalLink, Activity } from 'lucide-react';
import { Instagram } from './components/icons/Instagram';

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/posts/summary');
        setPosts(response.data.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">KOL Management System</h1>
        <p className="text-gray-500">Monitoring performance and engagement harian</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row gap-6">
              {/* Post Info */}
              <div className="md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  {post.platform === 'Instagram' ? <Instagram size={18} className="text-pink-600" /> : <Video size={18} className="text-black" />}
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{post.platform}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{post.kolName}</h2>
                <a 
                  href={post.url} 
                  target="_blank" 
                  className="text-blue-500 text-sm flex items-center gap-1 hover:underline mb-4"
                >
                  View Post <ExternalLink size={14} />
                </a>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-xs text-blue-600 uppercase font-bold tracking-wide">Likes</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">
                      {post.engagementLogs[post.engagementLogs.length - 1]?.likes || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-xs text-green-600 uppercase font-bold tracking-wide">Comments</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">
                      {post.engagementLogs[post.engagementLogs.length - 1]?.comments || 0}
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <p className="text-xs text-amber-600 uppercase font-bold tracking-wide">Shares</p>
                    <p className="text-2xl font-bold text-amber-900 mt-1">
                      {post.engagementLogs[post.engagementLogs.length - 1]?.shares || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="md:w-2/3">
                <EngagementChart logs={post.engagementLogs} />
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed">
            <Activity className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Belum ada postingan yang di-submit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
