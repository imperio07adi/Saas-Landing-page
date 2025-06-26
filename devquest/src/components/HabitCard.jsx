import { useState } from 'react';
import { CheckCircleIcon, XMarkIcon, FireIcon } from '@heroicons/react/24/solid';

export default function HabitCard({ habit, onToggle, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const today = new Date().toDateString();
  const isCompletedToday = habit.lastCompleted === today && habit.completed;
  
  return (
    <div 
      className={`relative p-6 rounded-xl shadow-md transition-all duration-200 ${
        isCompletedToday ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete button */}
      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(habit.id);
          }}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete habit"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {habit.name}
        </h3>
        {habit.streak > 0 && (
          <div className="flex items-center text-amber-500">
            <FireIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">{habit.streak}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          isCompletedToday 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {isCompletedToday ? 'Completed today' : 'Not completed today'}
        </span>
        
        <button
          onClick={() => onToggle(habit.id)}
          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
            isCompletedToday
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-transparent'
          }`}
          aria-label={isCompletedToday ? 'Mark as not done' : 'Mark as done'}
        >
          <CheckCircleIcon className="h-4 w-4" />
        </button>
      </div>
      
      {/* Weekly progress */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>This week</span>
          <span>{getCompletedThisWeek(habit.history)}/7</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getWeekDays().map((day, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full ${
                isDayCompleted(day, habit.history) 
                  ? 'bg-green-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              title={`${getDayName(day)}: ${
                isDayCompleted(day, habit.history) ? 'Completed' : 'Not completed'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getWeekDays() {
  const today = new Date();
  const days = [];
  
  // Get the last 7 days including today
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date.toDateString());
  }
  
  return days;
}

function getDayName(dateString) {
  const date = new Date(dateString);
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (dateString === today) return 'Today';
  if (dateString === yesterday.toDateString()) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function isDayCompleted(day, history) {
  return !!history[day];
}

function getCompletedThisWeek(history) {
  const weekDays = getWeekDays();
  return weekDays.filter(day => history[day]).length;
}
