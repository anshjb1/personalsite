import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, Video, FileText, ExternalLink, Calendar, Users } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'publication' | 'blog' | 'video' | 'other';
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  doi?: string;
  url?: string;
  video_url?: string;
  external_url?: string;
  content_description?: string;
  abstract?: string;
  created_at: string;
}

const WritingPage = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = filter === 'all'
    ? content
    : content.filter(item => item.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'blog':
        return <FileText className="w-6 h-6" />;
      case 'publication':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'blog':
        return 'bg-blue-100 text-blue-700';
      case 'publication':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const extractVideoId = (url: string) => {
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (youtubeMatch) return { platform: 'youtube', id: youtubeMatch[1] };

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] };

    return null;
  };

  const renderContent = (item: ContentItem) => {
    return (
      <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </div>
            {item.year && (
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {item.year}
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {item.title}
          </h3>

          {item.type === 'publication' && (
            <>
              {item.authors && (
                <div className="flex items-start text-gray-600 mb-2">
                  <Users className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item.authors}</span>
                </div>
              )}
              {item.journal && (
                <p className="text-sm text-gray-500 italic mb-3">{item.journal}</p>
              )}
            </>
          )}

          {item.content_description && (
            <p className="text-gray-600 mb-4 line-clamp-3">{item.content_description}</p>
          )}

          {item.abstract && (
            <p className="text-gray-600 mb-4 line-clamp-3">{item.abstract}</p>
          )}

          {item.type === 'video' && item.video_url && (
            <div className="mt-4 mb-4">
              {(() => {
                const videoInfo = extractVideoId(item.video_url);
                if (videoInfo?.platform === 'youtube') {
                  return (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${videoInfo.id}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                } else if (videoInfo?.platform === 'vimeo') {
                  return (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://player.vimeo.com/video/${videoInfo.id}`}
                        title={item.title}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
            {item.doi && (
              <a
                href={`https://doi.org/${item.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View DOI
              </a>
            )}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read More
              </a>
            )}
            {item.external_url && (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {item.type === 'video' ? 'Watch Video' : 'View Article'}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Writing & Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Academic publications, blog posts, videos, and other featured content
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({content.length})
          </button>
          <button
            onClick={() => setFilter('publication')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'publication'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Publications ({content.filter(i => i.type === 'publication').length})
          </button>
          <button
            onClick={() => setFilter('blog')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'blog'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Blog Posts ({content.filter(i => i.type === 'blog').length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'video'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Videos ({content.filter(i => i.type === 'video').length})
          </button>
        </div>

        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No content available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredContent.map(renderContent)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingPage;
