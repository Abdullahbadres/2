"use client"

import { useState, useEffect } from "react"
import { getActivities } from "../api"
import ActivityCard from "../components/ActivityCard"
import toast from "react-hot-toast"

const Destination = () => {
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [provinces, setProvinces] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [maxPrice, setMaxPrice] = useState(10000)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await getActivities()
        const activitiesData = response.data.data
        setActivities(activitiesData)
        setFilteredActivities(activitiesData)

        // Extract unique provinces
        const uniqueProvinces = [...new Set(activitiesData.map((activity) => activity.province))]
        setProvinces(uniqueProvinces)

        // Find max price for range slider
        const highestPrice = Math.max(...activitiesData.map((activity) => activity.price), 1000)
        setMaxPrice(highestPrice)
        setPriceRange([0, highestPrice])
      } catch (error) {
        console.error("Error fetching activities:", error)
        toast.error("Failed to fetch destinations")
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  useEffect(() => {
    // Filter activities based on search term, selected province, and price range
    const filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.province.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProvince = selectedProvince ? activity.province === selectedProvince : true

      const matchesPrice = activity.price >= priceRange[0] && activity.price <= priceRange[1]

      return matchesSearch && matchesProvince && matchesPrice
    })

    setFilteredActivities(filtered)
  }, [searchTerm, selectedProvince, priceRange, activities])

  const handlePriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    const index = e.target.name === "min" ? 0 : 1
    const newRange = [...priceRange]
    newRange[index] = value
    setPriceRange(newRange)
  }

  const handleReset = () => {
    setSearchTerm("")
    setSelectedProvince("")
    setPriceRange([0, maxPrice])
  }

  return (
    // ADDED: Attractive gradient background
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Destinations</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7757]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7757]"
              >
                <option value="">All Provinces</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="min"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  min={0}
                  max={priceRange[1]}
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                />
                <span>to</span>
                <input
                  type="number"
                  name="max"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  min={priceRange[0]}
                  max={maxPrice}
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={handleReset} className="px-4 py-2 text-[#FF7757] hover:text-[#ff6242]">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No destinations found matching your criteria.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-[#FF7757] text-white rounded-md hover:bg-[#ff6242]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Destination
