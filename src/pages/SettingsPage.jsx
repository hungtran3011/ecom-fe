import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';
import * as Tabs from '@radix-ui/react-tabs';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useUserContext();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('account');
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    emailPromotions: true,
    emailOrderUpdates: true,
    emailNewsletter: false,
    pushOrderUpdates: true,
    pushPromotions: false
  });
  
  // Account deletion state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Fetch notification preferences
  useEffect(() => {
    if (isLoggedIn) {
      // Here you would typically fetch the user's notification preferences
      // For now, we'll use default values
    }
  }, [isLoggedIn]);
  
  // Password form handlers
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    
    try {
      await axiosInstance.put('/user/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        type: "success"
      });
    } catch (error) {
      console.error('Error changing password:', error);
      
      // Show appropriate error message
      if (error.response?.status === 401) {
        setPasswordErrors({
          currentPassword: "Current password is incorrect"
        });
      } else {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to change password. Please try again.",
          type: "error"
        });
      }
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  // Notification preferences handlers
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSaveNotifications = async () => {
    try {
      await axiosInstance.put('/user/notification-settings', notifications);
      
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
        type: "success"
      });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        type: "error"
      });
    }
  };
  
  // Account deletion handlers
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setPasswordErrors({
        deleteConfirm: "Please type DELETE to confirm"
      });
      return;
    }
    
    setIsDeletingAccount(true);
    
    try {
      await axiosInstance.delete('/user/account');
      
      // Log out the user
      logout();
      
      // Show success message and redirect
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        type: "success"
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete your account. Please try again.",
        type: "error"
      });
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">Settings</h1>
      
      <div className="max-w-3xl mx-auto bg-[var(--md-sys-color-surface-container)] rounded-lg shadow-sm overflow-hidden">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex border-b border-[var(--md-sys-color-outline-variant)]">
            <Tabs.Trigger
              value="account"
              className={`px-6 py-4 transition-colors ${
                activeTab === 'account'
                  ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]'
                  : 'text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
              }`}
            >
              Account
            </Tabs.Trigger>
            
            <Tabs.Trigger
              value="notifications"
              className={`px-6 py-4 transition-colors ${
                activeTab === 'notifications'
                  ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]'
                  : 'text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
              }`}
            >
              Notifications
            </Tabs.Trigger>
          </Tabs.List>
          
          {/* Account Settings */}
          <Tabs.Content value="account" className="p-6">
            <h2 className="text-xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
              Account Settings
            </h2>
            
            {/* Change Password Form */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-[var(--md-sys-color-on-surface)]">
                Change Password
              </h3>
              
              <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Enter current password"
                  />
                  {passwordErrors.currentPassword && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">
                      {passwordErrors.currentPassword}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Enter new password"
                  />
                  {passwordErrors.newPassword && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">
                      {passwordErrors.newPassword}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Confirm new password"
                  />
                  {passwordErrors.confirmPassword && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">
                      {passwordErrors.confirmPassword}
                    </span>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 disabled:opacity-70"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
            
            {/* Delete Account */}
            <div className="pt-4 border-t border-[var(--md-sys-color-outline-variant)]">
              <h3 className="text-lg font-medium mb-4 text-[var(--md-sys-color-on-surface)]">
                Delete Account
              </h3>
              
              <p className="text-[var(--md-sys-color-on-surface-variant)] mb-4">
                Once you delete your account, there is no going back. This action is permanent.
              </p>
              
              {!showDeleteConfirmation ? (
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="px-6 py-2 bg-[var(--md-sys-color-error)] text-[var(--md-sys-color-on-error)] rounded-full hover:opacity-90"
                >
                  Delete Account
                </button>
              ) : (
                <div className="space-y-4 max-w-md p-4 border border-[var(--md-sys-color-error-container)] rounded-lg bg-[var(--md-sys-color-error-container)] bg-opacity-20">
                  <p className="font-medium text-[var(--md-sys-color-error)]">
                    Are you sure you want to delete your account?
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--md-sys-color-error)]">
                      Type DELETE to confirm
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    />
                    {passwordErrors.deleteConfirm && (
                      <span className="text-[var(--md-sys-color-error)] text-sm">
                        {passwordErrors.deleteConfirm}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirmation(false)}
                      className="px-6 py-2 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full"
                      disabled={isDeletingAccount}
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-2 bg-[var(--md-sys-color-error)] text-[var(--md-sys-color-on-error)] rounded-full hover:opacity-90 disabled:opacity-70"
                      disabled={isDeletingAccount}
                    >
                      {isDeletingAccount ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Tabs.Content>
          
          {/* Notification Settings */}
          <Tabs.Content value="notifications" className="p-6">
            <h2 className="text-xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
              Notification Settings
            </h2>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[var(--md-sys-color-on-surface)]">
                  Email Notifications
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="emailOrderUpdates"
                      name="emailOrderUpdates"
                      checked={notifications.emailOrderUpdates}
                      onChange={handleNotificationChange}
                      className="rounded text-[var(--md-sys-color-primary)]"
                    />
                    <label htmlFor="emailOrderUpdates" className="text-[var(--md-sys-color-on-surface)]">
                      Order updates
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="emailPromotions"
                      name="emailPromotions"
                      checked={notifications.emailPromotions}
                      onChange={handleNotificationChange}
                      className="rounded text-[var(--md-sys-color-primary)]"
                    />
                    <label htmlFor="emailPromotions" className="text-[var(--md-sys-color-on-surface)]">
                      Promotions and deals
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="emailNewsletter"
                      name="emailNewsletter"
                      checked={notifications.emailNewsletter}
                      onChange={handleNotificationChange}
                      className="rounded text-[var(--md-sys-color-primary)]"
                    />
                    <label htmlFor="emailNewsletter" className="text-[var(--md-sys-color-on-surface)]">
                      Newsletter
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Push Notifications */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[var(--md-sys-color-on-surface)]">
                  Push Notifications
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pushOrderUpdates"
                      name="pushOrderUpdates"
                      checked={notifications.pushOrderUpdates}
                      onChange={handleNotificationChange}
                      className="rounded text-[var(--md-sys-color-primary)]"
                    />
                    <label htmlFor="pushOrderUpdates" className="text-[var(--md-sys-color-on-surface)]">
                      Order updates
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pushPromotions"
                      name="pushPromotions"
                      checked={notifications.pushPromotions}
                      onChange={handleNotificationChange}
                      className="rounded text-[var(--md-sys-color-primary)]"
                    />
                    <label htmlFor="pushPromotions" className="text-[var(--md-sys-color-on-surface)]">
                      Promotions and deals
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSaveNotifications}
                  className="px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}