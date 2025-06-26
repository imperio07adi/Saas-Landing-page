import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('devquest-habits')) || [];
    setHabits(savedHabits);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('devquest-habits', JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      completed: false,
      streak: 0,
      lastCompleted: null,
      history: {}
    };
    setHabits([...habits, newHabit]);
    setIsModalOpen(false);
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toDateString();
        const wasCompletedToday = habit.lastCompleted === today;
        
        if (!wasCompletedToday) {
          // Increment streak if habit wasn't completed today
          const newStreak = habit.completed ? habit.streak : habit.streak + 1;
          return {
            ...habit,
            completed: !habit.completed,
            streak: newStreak,
            lastCompleted: today,
            history: {
              ...habit.history,
              [today]: !habit.completed
            }
          };
        } else {
          // Toggle completion status for today
          return {
            ...habit,
            completed: !habit.completed,
            history: {
              ...habit.history,
              [today]: !habit.completed
            }
          };
        }
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Habits</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Habit</span>
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No habits yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first habit</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addHabit}
      />
    </div>
  );
}
