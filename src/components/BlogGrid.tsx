import React from 'react';

const BlogGrid: React.FC = () => {
  // Example posts data
  const posts = [
    {
      title: "Understanding WordPress Themes",
      description: "An in-depth look at how WordPress themes work and how to customize them.",
      imageUrl: "https://picsum.photos/400/300?random=1",
      date: "August 22, 2024",
      author: "Jane Doe",
    },
    {
      title: "Top 10 WordPress Plugins for SEO",
      description: "Discover the best plugins to optimize your WordPress site for search engines.",
      imageUrl: "https://picsum.photos/400/300?random=2",
      date: "August 20, 2024",
      author: "John Smith",
    },
    {
      title: "How to Secure Your WordPress Site",
      description: "Essential tips and plugins to keep your WordPress site secure from threats.",
      imageUrl: "https://picsum.photos/400/300?random=3",
      date: "August 18, 2024",
      author: "Emily Johnson",
    },
    {
      title: "Speeding Up Your WordPress Site",
      description: "Techniques and plugins to enhance the performance of your WordPress website.",
      imageUrl: "https://picsum.photos/400/300?random=4",
      date: "August 15, 2024",
      author: "Michael Brown",
    },
  ];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post, index) => (
        <div key={index} className="border rounded-md shadow-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold  mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-2">{post.date}</span> 
              <span>&bull;</span> 
              <span className="ml-2">by {post.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
