import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Clock } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-[#A50034] to-[#720231]">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <div className="size-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-white hover:bg-gray-100
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-md
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-[#A50034]" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{authUser?.fullName}</h1>
              <p className="text-gray-500">Your profile information</p>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#A50034]/10 rounded-lg">
                    <User className="w-5 h-5 text-[#A50034]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Full Name</h3>
                </div>
                <p className="text-gray-600">{authUser?.fullName}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#A50034]/10 rounded-lg">
                    <Mail className="w-5 h-5 text-[#A50034]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Email Address</h3>
                </div>
                <p className="text-gray-600">{authUser?.email}</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#A50034]" />
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Member Since</span>
                  </div>
                  <span className="text-gray-800 font-medium">{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Account Status</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
