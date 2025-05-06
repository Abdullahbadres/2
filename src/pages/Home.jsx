"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Banner from "../components/Banner"
import PopularDestination from "../components/PopularDestination"
import ActivityCard from "../components/ActivityCard"
import PromoCard from "../components/PromoCard"
import { getPromos, getActivities, getCategories } from "../api"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Budget Travel in Southeast Asia",
    excerpt:
      "Discover how to explore Southeast Asia on a budget with these essential tips for accommodation, food, and transportation.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Hiking in the Swiss Alps",
    excerpt:
      "Everything you need to know about planning a hiking trip in the Swiss Alps, from trail selection to equipment.",
    image:
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "July 22, 2023",
    author: "Michael Chen",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 3,
    title: "5 Hidden Beaches in Bali You Need to Visit",
    excerpt:
      "Escape the crowds and discover these secluded beaches in Bali that offer pristine sands and crystal-clear waters.",
    image:
      "https://images.unsplash.com/photo-1502208327471-d5dde4d78995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "August 5, 2023",
    author: "Emma Rodriguez",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 4,
    title: "A Food Lover's Journey Through Italy",
    excerpt:
      "Follow this culinary adventure through Italy's regions, exploring traditional dishes and local ingredients.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "September 12, 2023",
    author: "David Kim",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 5,
    title: "How to Pack for a Year-Long Trip Around the World",
    excerpt: "Essential packing tips and strategies for long-term travelers embarking on a global adventure.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "October 3, 2023",
    author: "Jessica Taylor",
    authorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    id: 6,
    title: "The Best Time to Visit Japan's Cherry Blossoms",
    excerpt:
      "Plan your trip to Japan with this guide to cherry blossom season, including the best viewing spots and festivals.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "November 18, 2023",
    author: "Thomas Wilson",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
]

// Destination categories
const destinationCategories = [
  {
    id: 1,
    name: "Beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    count: 45,
  },
  {
    id: 2,
    name: "Mountains",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    count: 32,
  },
  {
    id: 3,
    name: "Cities",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    count: 28,
  },
  {
    id: 4,
    name: "Historical",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFK-xuYnW3GQjGKd_Ikr4iNyzUU9yCYJCyQ&s",
    count: 19,
  },
  {
    id: 5,
    name: "Islands",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    count: 23,
  },
  {
    id: 6,
    name: "Adventure",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    count: 36,
  },
]

// Traveler experiences
const travelerExperiences = [
  {
    id: 1,
    name: "Emily Johnson",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    rating: 5,
    comment:
      "My trip to Bali was absolutely magical! The beaches were pristine, the local culture was fascinating, and the food was incredible. I can't wait to go back!",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    rating: 4.5,
    comment:
      "Exploring the temples and gardens of Kyoto was a life-changing experience. The attention to detail in Japanese culture is truly remarkable.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    location: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    rating: 5,
    comment:
      "The white buildings against the blue sea in Santorini created the most breathtaking views I've ever seen. Every sunset was like a painting!",
  },
  {
    id: 4,
    name: "David Chen",
    location: "Machu Picchu, Peru",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    rating: 4.8,
    comment:
      "Hiking to Machu Picchu was challenging but absolutely worth it. Standing among those ancient ruins with the mountains all around was unforgettable.",
  },
]

// Custom arrow components for sliders
const NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} z-10 bg-white rounded-full shadow-md p-2 flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100`}
      style={{ ...style, display: "block", width: "40px", height: "40px" }}
      onClick={onClick}
    >
      <ChevronRightIcon className="h-6 w-6 text-[#FF7757]" />
    </div>
  )
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} z-10 bg-white rounded-full shadow-md p-2 flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100`}
      style={{ ...style, display: "block", width: "40px", height: "40px" }}
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-6 w-6 text-[#FF7757]" />
    </div>
  )
}

const Home = () => {
  const [promos, setPromos] = useState([])
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [provinces, setProvinces] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch promos
        const promosResponse = await getPromos()
        setPromos(promosResponse.data.data)

        // Fetch activities
        const activitiesResponse = await getActivities()
        const activitiesData = activitiesResponse.data.data
        setActivities(activitiesData)
        setFilteredActivities(activitiesData)

        // Extract unique provinces
        const uniqueProvinces = [...new Set(activitiesData.map((activity) => activity.province))]
        setProvinces(uniqueProvinces)

        // Fetch categories
        const categoriesResponse = await getCategories()
        setCategories(categoriesResponse.data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter activities based on search term and selected province
    const filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.province.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProvince = selectedProvince ? activity.province === selectedProvince : true

      return matchesSearch && matchesProvince
    })

    setFilteredActivities(filtered)
  }, [searchTerm, selectedProvince, activities])

  // Settings for blog slider
  const blogSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  // Settings for destination categories slider
  const categorySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  // Settings for traveler experiences slider
  const experienceSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
      {/* Banner Section */}
      <Banner />

      {/* Destination Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#FF7757] mb-2 text-left">Destination Categories</h2>
            <p className="text-gray-600 text-left max-w-2xl">
              Explore destinations by category and find your perfect travel experience.
            </p>
          </div>

          <div className="category-slider px-4">
            <Slider {...categorySliderSettings}>
              {destinationCategories.map((category) => (
                <div key={category.id} className="px-2">
                  <div className="relative rounded-lg overflow-hidden h-64 group">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm">{category.count} Destinations</p>
                    </div>
                    <Link
                      to={`/category/${category.id}`}
                      className="absolute inset-0"
                      aria-label={`View ${category.name} destinations`}
                    ></Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <PopularDestination />

      {/* Promos Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-[#FF7757] mb-2">Special Promos</h2>
            <p className="text-gray-600 max-w-2xl text-left">
              Discover our special promos and get the best deals for your next adventure.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promos.slice(0, 6).map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-right mb-12">
            <h2 className="text-3xl font-bold text-[#FF7757] mb-2">Popular Activities</h2>
            <p className="text-gray-600 max-w-2xl ml-auto text-right">
              Explore the most popular activities from around the world.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7757]"
              />
            </div>

            <div className="w-full md:w-64">
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
          </div>

          {/* Activities Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {filteredActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredActivities.slice(0, 8).map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No activities found matching your criteria.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-10">
            <Link to="/destination" className="px-6 py-3 bg-[#FF7757] text-white rounded-md hover:bg-[#ff6242] transition-colors">
              View All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Tips & Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-[#FF7757] mb-2">Travel Tips & Articles</h2>
            <p className="text-gray-600 max-w-2xl text-left">
              Discover travel tips, inspiration, and guides to help you plan your next adventure.
            </p>
          </div>

          <div className="blog-slider px-4">
            <Slider {...blogSliderSettings}>
              {blogPosts.map((post) => (
                <div key={post.id} className="px-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-full">
                    <div className="relative h-48">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <img
                          src={post.authorImage || "/placeholder.svg"}
                          alt={post.author}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link to={`/blog/${post.id}`} className="text-[#FF7757] font-medium text-sm hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Traveler's Experience Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-right mb-12">
            <h2 className="text-3xl font-bold text-[#FF7757] mb-2">Traveler's Experiences</h2>
            <p className="text-gray-600 max-w-2xl ml-auto text-right">
              Read about the amazing experiences of travelers from around the world.
            </p>
          </div>

          <div className="experience-slider px-4">
            <Slider {...experienceSliderSettings}>
              {travelerExperiences.map((experience) => (
                <div key={experience.id} className="px-3">
                  <div className="bg-white rounded-lg shadow-md p-6 h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src={experience.image || "/placeholder.svg"}
                        alt={experience.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{experience.name}</h3>
                        <p className="text-sm text-gray-500">{experience.location}</p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(experience.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{experience.rating}</span>
                    </div>

                    <p className="text-gray-700 italic">"{experience.comment}"</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172432] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#FF7757] mb-6">Traveloke</h3>
              <img src="https://i.ibb.co.com/ZpJKSvDB/traveloke-removebg-preview.png" alt="Traveloke Logo" className="w-25 h-20 mr-4" />
              <p className="text-gray-300 mb-6">Book your trip in minutes, get full control for much longer.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#FF7757]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF7757]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF7757]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Legal Notice
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter to get travel tips and special offers!</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
                />
                <button type="submit" className="bg-[#FF7757] text-white px-4 py-2 rounded-r-md hover:bg-[#ff6242]">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Traveloke. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
