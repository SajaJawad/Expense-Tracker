import React, { useState, useContext, useRef } from 'react';
import DashboardLayout from '../../componants/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';
import { useUserAuth } from '../../hooks/useUserAuth';
import CharAvatar from '../../componants/Inputs/CharAvatar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { LuCamera, LuUser, LuMail, LuLock, LuSave, LuLoader } from 'react-icons/lu';

const Settings = () => {
  useUserAuth();

  const { user, updateUser } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
  const [previewImage, setPreviewImage] = useState(user?.profileImageUrl || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync when user loads
  React.useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setProfileImageUrl(user.profileImageUrl || '');
      setPreviewImage(user.profileImageUrl || '');
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileImageUrl(res.data.imageUrl);
      toast.success('Image uploaded! Click Save to apply changes.');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        fullName: fullName.trim(),
        profileImageUrl: profileImageUrl || null
      });

      updateUser(res.data.user);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="max-w-2xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Top gradient banner */}
          <div className="h-24 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          {/* Avatar section */}
          <div className="px-8 pb-8">
            <div className="flex items-end gap-5 -mt-12 mb-8">
              <div className="relative group">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md overflow-hidden">
                    <CharAvatar fullName={user?.fullName} width="w-full" hight="h-full" style="text-2xl" />
                  </div>
                )}

                {/* Camera overlay */}
                <button
                  onClick={handleImageClick}
                  disabled={uploading}
                  className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  {uploading ? (
                    <LuLoader className="text-white text-xl animate-spin" />
                  ) : (
                    <LuCamera className="text-white text-xl" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900">{user?.fullName}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-gray-400 font-normal text-xs">(cannot be changed)</span>
                </label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profile Image URL <span className="text-gray-400 font-normal text-xs">(or upload above)</span>
                </label>
                <div className="relative">
                  <LuCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={profileImageUrl}
                    onChange={(e) => {
                      setProfileImageUrl(e.target.value);
                      setPreviewImage(e.target.value);
                    }}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <LuLoader className="animate-spin text-base" />
                ) : (
                  <LuSave className="text-base" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="mt-5 bg-violet-50 border border-violet-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <LuLock className="text-violet-500 text-lg mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-violet-800">Password & Security</p>
              <p className="text-xs text-violet-600 mt-0.5">Password change feature coming soon. Your data is secured with JWT authentication.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
