import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">Page not found</p>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
