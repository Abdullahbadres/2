"use client"

import { useState, useEffect } from "react"
import { getCategories, getActivitiesByCategory } from "../api"
import ActivityCard from "../components/ActivityCard"
import toast from "react-hot-toast"

const Category = () => {
  const [categories, setCategories] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await getCategories()
        setCategories(response.data.data)

        // Select the first category by default if available
        if (response.data.data.length > 0) {
          setSelectedCategory(response.data.data[0])
          fetchActivitiesByCategory(response.data.data[0].id)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast.error("Failed to fetch categories")
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const fetchActivitiesByCategory = async (categoryId) => {
    try {
      setLoading(true)
      const response = await getActivitiesByCategory(categoryId)
      setActivities(response.data.data)
    } catch (error) {
      console.error("Error fetching activities:", error)
      toast.error("Failed to fetch activities")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    fetchActivitiesByCategory(category.id)
  }

  return (
    // ADDED: Attractive gradient background
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Categories</h1>

        {/* Categories List */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`flex items-center px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory?.id === category.id
                    ? "bg-[#FF7757] text-white border-[#FF7757]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#FF7757]"
                }`}
              >
                {category.imageUrl && (
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none"
                      }}
                    />
                  </div>
                )}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div>
          {selectedCategory && <h2 className="text-xl font-semibold mb-4">Activities in {selectedCategory.name}</h2>}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No activities found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Category
