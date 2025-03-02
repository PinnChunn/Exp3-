import React from 'react';
import { Palette, TrendingUp, Brain, ArrowRight } from 'lucide-react';

const paths = [
  {
    title: 'Product Designer',
    description: 'Master the art of creating intuitive and beautiful product experiences.',
    icon: Palette,
    skills: ['UI Design', 'UX Research', 'Prototyping', 'User-Centered Design'],
    tags: ['Design Systems', 'AI', 'Web3']
  },
  {
    title: 'Growth Designer',
    description: 'Learn to design products that drive user engagement and business growth.',
    icon: TrendingUp,
    skills: ['A/B Testing', 'User Acquisition', 'Retention Design', 'Analytics'],
    tags: ['Behavioral Psychology']
  },
  {
    title: 'AI/UX Designer',
    description: 'Explore the intersection of artificial intelligence and user experience design.',
    icon: Brain,
    skills: ['AI Integration', 'Conversational UI', 'Predictive UX'],
    tags: ['Ethical AI Design', 'Data Visualization']
  }
];

export default function SkillPaths() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-16">
          Designer Skill Paths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="p-8">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <path.icon className="w-full h-full" />
                </div>

                <h3 className="text-xl font-bold mb-4">{path.title}</h3>
                <p className="text-gray-600 mb-6">{path.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {path.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {path.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={`/events?path=${path.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 group"
                >
                  <span>Explore Path</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}