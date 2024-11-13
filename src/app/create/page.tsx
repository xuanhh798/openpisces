"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  goal: string;
  description: string;
  images: string[];
  category: string;
}

export default function CreateFundPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    goal: "",
    description: "",
    images: [],
    category: "education",
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviewImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewImages.push(reader.result as string);
        if (newPreviewImages.length === files.length) {
          setPreviewImages(newPreviewImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to create the fundraiser
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/"); // Redirect to home page after success
    } catch (error) {
      console.error("Error creating fundraiser:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-12 mt-4">
      <h1 className="text-3xl md:mb-8 mb-4">Create a Fundraiser</h1>

      <form onSubmit={handleSubmit} className="md:space-y-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fundraiser Title
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter a clear, descriptive title"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <optgroup label="Charitable Causes">
              <option value="medical">Medical & Health</option>
              <option value="emergency">Emergency Relief</option>
              <option value="education">Education</option>
              <option value="nonprofit">Nonprofit</option>
              <option value="animals">Animals & Pets</option>
              <option value="environment">Environment</option>
              <option value="community">Community Projects</option>
              <option value="memorial">Memorial & Funeral</option>
            </optgroup>

            <optgroup label="Creative Projects">
              <option value="art">Art</option>
              <option value="music">Music</option>
              <option value="film">Film & Video</option>
              <option value="publishing">Publishing</option>
              <option value="photography">Photography</option>
              <option value="dance">Dance</option>
              <option value="theater">Theater</option>
              <option value="fashion">Fashion & Design</option>
            </optgroup>

            <optgroup label="Technology & Innovation">
              <option value="tech">Technology</option>
              <option value="software">Software & Apps</option>
              <option value="hardware">Hardware & Gadgets</option>
              <option value="ai">AI & Machine Learning</option>
              <option value="blockchain">Web3 & Blockchain</option>
              <option value="robotics">Robotics</option>
              <option value="science">Science & Research</option>
            </optgroup>

            <optgroup label="Business & Entrepreneurship">
              <option value="startup">Startup</option>
              <option value="smallbusiness">Small Business</option>
              <option value="social">Social Enterprise</option>
              <option value="food">Food & Beverages</option>
              <option value="retail">Retail</option>
            </optgroup>

            <optgroup label="Sports & Activities">
              <option value="sports">Sports</option>
              <option value="fitness">Fitness & Wellness</option>
              <option value="recreation">Recreation</option>
              <option value="adventure">Adventure & Travel</option>
              <option value="gaming">Gaming</option>
            </optgroup>

            <optgroup label="Other">
              <option value="events">Events & Festivals</option>
              <option value="family">Family & Personal</option>
              <option value="crafts">Crafts & DIY</option>
              <option value="other">Other</option>
            </optgroup>
          </select>
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tell Your Story
          </label>
          <textarea
            required
            className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Explain your cause and why it matters..."
          />
        </div>

        {/* Goal Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fundraising Goal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
            <input
              type="number"
              required
              min="1"
              className="w-full p-3 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Images
          </label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="mt-2 text-sm text-gray-500">
                Click to upload images
              </span>
            </label>
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? "Creating..." : "Create Fundraiser"}
        </button>
      </form>
    </div>
  );
}
