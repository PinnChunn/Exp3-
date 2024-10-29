import React, { useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, Tag, Users, ExternalLink, Check } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  tags: string[];
  description: string;
  imageUrl: string;
  onRegister: () => void;
  requiresAuth?: boolean;
  externalLink?: string;
  isAuthenticated?: boolean;
  isRegistered?: boolean;
}

export default function EventCard({
  title,
  date,
  time,
  tags,
  description,
  imageUrl,
  onRegister,
  requiresAuth,
  externalLink,
  isAuthenticated,
  isRegistered
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const getButtonConfig = () => {
    if (isRegistered) {
      return {
        text: 'Registered',
        icon: Check,
        className: 'bg-purple-100 text-purple-600 cursor-default',
        disabled: true
      };
    }

    if (externalLink) {
      return {
        text: 'Register on Lu.ma',
        icon: ExternalLink,
        className: 'bg-purple-600 hover:bg-purple-700 text-white',
        disabled: false
      };
    }

    if (requiresAuth && !isAuthenticated) {
      return {
        text: 'Connect to Register',
        icon: Users,
        className: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        disabled: false
      };
    }

    return {
      text: 'Register Now',
      icon: Calendar,
      className: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      disabled: false
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div 
      ref={cardRef}
      className="relative"
    >
      <div 
        className={`bg-white rounded-xl shadow-lg transition-all duration-300 ${
          isExpanded ? 'ring-1 ring-purple-100 shadow-xl' : 'hover:shadow-xl hover:-translate-y-1'
        }`}
      >
        <div className="relative h-48 overflow-hidden group rounded-t-xl">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm flex items-center gap-1 hover:bg-indigo-100 transition-colors cursor-default group"
              >
                <Tag className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-3 text-gray-800">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="text-sm">{time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors group px-2 py-1 rounded-md hover:bg-indigo-50"
            >
              <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                } group-hover:translate-y-0.5`} 
              />
            </button>

            <button
              onClick={onRegister}
              disabled={buttonConfig.disabled}
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2 ${buttonConfig.className}`}
            >
              <buttonConfig.icon className={`w-4 h-4 ${isRegistered ? '' : 'group-hover:rotate-12 transition-transform'}`} />
              {buttonConfig.text}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`absolute left-0 right-0 mt-2 transition-all duration-300 rounded-lg bg-white shadow-lg overflow-hidden ${
          isExpanded ? 'opacity-100 max-h-96 z-10' : 'opacity-0 max-h-0 -z-10'
        }`}
      >
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}