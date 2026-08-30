import React, { useState, useContext, useRef, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';
import { useUserAuth } from '../../hooks/useUserAuth';
import CharAvatar from '../../components/Inputs/CharAvatar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { LuCamera, LuUser, LuMail, LuLock, LuSave, LuLoader } from 'react-icons/lu';
import { getProfileImageUrl } from '../../utils/helper';

const Settings = () => {
  useUserAuth();

  const { user, updateUser } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
  const [previewImage, setPreviewImage] = useState(getProfileImageUrl(user?.profileImageUrl));
  const [imgError, setImgError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync when user loads
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setProfileImageUrl(user.profileImageUrl || '');
      setPreviewImage(getProfileImageUrl(user.profileImageUrl));
      setImgError(false);
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
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setProfileImageUrl(reader.result); // Base64 data URL
      setImgError(false);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.imageUrl) {
        setProfileImageUrl(res.data.imageUrl);
        setPreviewImage(res.data.imageUrl);
        setImgError(false);
      }
      toast.success('Image uploaded! Click Save to apply changes.');
    } catch {
      toast.error('Failed to upload image. Local preview ready to save.');
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

  const activeImage = getProfileImageUrl(previewImage || profileImageUrl);

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="max-w-2xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Profile Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Manage your personal account details and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="card p-0 overflow-hidden">
          {/* Top gradient banner */}
          <div className="h-28 bg-gradient-to-r from-purple-600 via-indigo-600 to-slate-900" />

          {/* Avatar section */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-5 -mt-12 mb-6">
              <div className="relative group">
                {activeImage && !imgError ? (
                  <img
                    src={activeImage}
                    alt="Profile"
                    onError={() => setImgError(true)}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 shadow-md overflow-hidden bg-purple-100 dark:bg-purple-950">
                    <CharAvatar fullName={user?.fullName} width="w-full" hight="h-full" style="text-2xl font-bold" />
                  </div>
                )}

                {/* Camera overlay */}
                <button
                  onClick={handleImageClick}
                  disabled={uploading}
                  className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
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
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.fullName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="input-box mb-0 mt-0">
                  <LuUser className="text-slate-400 text-lg" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal text-xs">(read-only)</span>
                </label>
                <div className="input-box mb-0 mt-0 bg-slate-100 dark:bg-slate-800/40 opacity-70">
                  <LuMail className="text-slate-400 text-lg" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full bg-transparent outline-none text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Profile Image URL
                </label>
                <div className="input-box mb-0 mt-0">
                  <LuCamera className="text-slate-400 text-lg" />
                  <input
                    type="url"
                    value={profileImageUrl}
                    onChange={(e) => {
                      setProfileImageUrl(e.target.value);
                      setPreviewImage(e.target.value);
                      setImgError(false);
                    }}
                    placeholder="https://example.com/photo.jpg or upload photo above"
                    className="w-full bg-transparent outline-none text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="add-btn add-btn-fill flex items-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
              >
                {saving ? (
                  <LuLoader className="animate-spin text-base" />
                ) : (
                  <LuSave className="text-base" />
                )}
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Info Card */}
        <div className="mt-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 flex items-start gap-3">
          <LuLock className="text-purple-600 dark:text-purple-400 text-lg mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-purple-900 dark:text-purple-200">Security & Authentication</p>
            <p className="text-xs text-purple-700 dark:text-purple-300/80 mt-0.5">
              Your profile data is protected with JWT token authentication and bank-grade data isolation.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
