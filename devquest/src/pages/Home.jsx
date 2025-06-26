import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Welcome to DevQuest</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        Track your developer habits, build consistency, and level up your skills with our simple and effective habit tracker.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
      >
        Start Tracking
      </Link>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Track Your Progress</h3>
          <p className="text-gray-600 dark:text-gray-300">Monitor your daily coding habits and see your consistency improve over time.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Build Better Habits</h3>
          <p className="text-gray-600 dark:text-gray-300">Create and maintain positive developer habits with our simple tracking system.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visualize Your Growth</h3>
          <p className="text-gray-600 dark:text-gray-300">See your progress with beautiful visualizations and streak counters.</p>
        </div>
      </div>
    </div>
  );
}
