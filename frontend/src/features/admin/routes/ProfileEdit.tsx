import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentWrapper from "@/components/Layout/AdminLayout/ContentWrapper";
import { Button } from "@/components/Elements";
import { Spinner } from "@/components/Elements/Spinner";
import { useUser } from "@/lib/auth";
import { useUpdateProfile, useChangePassword } from "../hooks/useProfile";

type TabType = "profile" | "password";

export const ProfileEdit = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = useUser();
    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    const [activeTab, setActiveTab] = useState<TabType>("profile");

    // Profile form state
    const [profileData, setProfileData] = useState({
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [profileErrors, setProfileErrors] = useState<{ [key: string]: string }>({});

    // Password form state
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({});
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    // Set active tab from URL params
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "password") {
            setActiveTab("password");
        }
    }, [searchParams]);

    // Populate form when user data is loaded
    useEffect(() => {
        if (user?.data) {
            setProfileData({
                name: user.data.name || "",
                firstName: user.data.firstName || "",
                lastName: user.data.lastName || "",
                email: user.data.email || "",
                phone: user.data.phone || "",
                address: user.data.address || "",
            });
        }
    }, [user?.data]);

    const validateProfileForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!profileData.name.trim() && !profileData.firstName.trim()) {
            newErrors.name = "Name is required";
        }
        if (!profileData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
            newErrors.email = "Invalid email format";
        }

        setProfileErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePasswordForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!passwordData.oldPassword) {
            newErrors.oldPassword = "Current password is required";
        }
        if (!passwordData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (passwordData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        } else if (!/\d/.test(passwordData.newPassword) || !/[a-zA-Z]/.test(passwordData.newPassword)) {
            newErrors.newPassword = "Password must contain at least one letter and one number";
        }
        if (!passwordData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password";
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (passwordData.oldPassword === passwordData.newPassword && passwordData.oldPassword) {
            newErrors.newPassword = "New password cannot be the same as the current password";
        }

        setPasswordErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateProfileForm()) return;

        try {
            await updateProfileMutation.mutateAsync({
                name: profileData.name,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                phone: profileData.phone,
                address: profileData.address,
            });
            navigate("/admin/profile");
        } catch (error) {
            // Error is handled in hook
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePasswordForm()) return;

        try {
            await changePasswordMutation.mutateAsync({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            });
            // Reset password form on success
            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            navigate("/admin/profile");
        } catch (error) {
            // Error is handled in hook
        }
    };

    const handleProfileInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
        if (profileErrors[name]) {
            setProfileErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handlePasswordInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
        if (passwordErrors[name]) {
            setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    if (user?.isLoading) {
        return (
            <ContentWrapper title="Edit Profile">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "400px" }}
                >
                    <Spinner size="lg" />
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper title="Edit Profile">
            <div className="profile-edit">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => navigate("/admin/profile")}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h2 className="text-white f-24 semi-bold mb-0">Edit Profile</h2>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="cardbg rounded-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="profile-tabs d-flex border-btm">
                        <button
                            className={`tab-btn px-4 py-3 ${activeTab === "profile" ? "active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            <i className="fa-solid fa-user me-2"></i>
                            Profile Information
                        </button>
                        <button
                            className={`tab-btn px-4 py-3 ${activeTab === "password" ? "active" : ""}`}
                            onClick={() => setActiveTab("password")}
                        >
                            <i className="fa-solid fa-key me-2"></i>
                            Change Password
                        </button>
                    </div>

                    {/* Profile Tab Content */}
                    {activeTab === "profile" && (
                        <div className="p-4">
                            <form onSubmit={handleProfileSubmit}>
                                {/* Profile Picture Section */}
                                <div className="text-center mb-4">
                                    <div className="profile-avatar-edit mx-auto mb-3">
                                        {user?.data?.image ? (
                                            <img
                                                src={user.data.image}
                                                alt={user.data.name}
                                                className="rounded-circle"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div
                                                className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                    fontSize: "3rem",
                                                    color: "#fff",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {user?.data?.name?.charAt(0)?.toUpperCase() || "A"}
                                            </div>
                                        )}
                                    </div>
                                    <p className="lighttxt small mb-0">Profile photo is managed through account settings</p>
                                </div>

                                <div className="row g-4">
                                    {/* Name Field */}
                                    <div className="col-md-12">
                                        <label className="form-label text-white">
                                            Display Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${profileErrors.name ? "is-invalid" : ""}`}
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter your display name"
                                        />
                                        {profileErrors.name && (
                                            <div className="invalid-feedback">{profileErrors.name}</div>
                                        )}
                                    </div>

                                    {/* First Name */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={profileData.firstName}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={profileData.lastName}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter last name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${profileErrors.email ? "is-invalid" : ""}`}
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter email address"
                                        />
                                        {profileErrors.email && (
                                            <div className="invalid-feedback">{profileErrors.email}</div>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="col-12">
                                        <label className="form-label text-white">Address</label>
                                        <textarea
                                            className="form-control"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleProfileInputChange}
                                            placeholder="Enter your address"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-3 justify-content-end mt-4 pt-4 border-top" style={{ borderColor: "rgba(255,255,255,0.1) !important" }}>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => navigate("/admin/profile")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        isLoading={updateProfileMutation.isLoading}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Password Tab Content */}
                    {activeTab === "password" && (
                        <div className="p-4">
                            <div className="security-info mb-4 p-3 rounded" style={{ background: "rgba(102, 126, 234, 0.1)", border: "1px solid rgba(102, 126, 234, 0.3)" }}>
                                <div className="d-flex align-items-start gap-3">
                                    <i className="fa-solid fa-shield-halved" style={{ color: "#667eea", fontSize: "1.5rem" }}></i>
                                    <div>
                                        <h5 className="text-white f-16 mb-1">Password Requirements</h5>
                                        <ul className="lighttxt mb-0 ps-3" style={{ fontSize: "0.875rem" }}>
                                            <li>Minimum 8 characters long</li>
                                            <li>Must contain at least one letter</li>
                                            <li>Must contain at least one number</li>
                                            <li>Cannot be the same as your current password</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordSubmit}>
                                <div className="row g-4">
                                    {/* Current Password */}
                                    <div className="col-12">
                                        <label className="form-label text-white">
                                            Current Password <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.old ? "text" : "password"}
                                                className={`form-control ${passwordErrors.oldPassword ? "is-invalid" : ""}`}
                                                name="oldPassword"
                                                value={passwordData.oldPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => togglePasswordVisibility("old")}
                                            >
                                                <i className={`fa-solid ${showPasswords.old ? "fa-eye-slash" : "fa-eye"}`}></i>
                                            </button>
                                            {passwordErrors.oldPassword && (
                                                <div className="invalid-feedback">{passwordErrors.oldPassword}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">
                                            New Password <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.new ? "text" : "password"}
                                                className={`form-control ${passwordErrors.newPassword ? "is-invalid" : ""}`}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => togglePasswordVisibility("new")}
                                            >
                                                <i className={`fa-solid ${showPasswords.new ? "fa-eye-slash" : "fa-eye"}`}></i>
                                            </button>
                                            {passwordErrors.newPassword && (
                                                <div className="invalid-feedback">{passwordErrors.newPassword}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="col-md-6">
                                        <label className="form-label text-white">
                                            Confirm New Password <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.confirm ? "text" : "password"}
                                                className={`form-control ${passwordErrors.confirmPassword ? "is-invalid" : ""}`}
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => togglePasswordVisibility("confirm")}
                                            >
                                                <i className={`fa-solid ${showPasswords.confirm ? "fa-eye-slash" : "fa-eye"}`}></i>
                                            </button>
                                            {passwordErrors.confirmPassword && (
                                                <div className="invalid-feedback">{passwordErrors.confirmPassword}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-3 justify-content-end mt-4 pt-4 border-top" style={{ borderColor: "rgba(255,255,255,0.1) !important" }}>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => navigate("/admin/profile")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        isLoading={changePasswordMutation.isLoading}
                                    >
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .profile-edit .tab-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    font-weight: 500;
                    position: relative;
                    transition: all 0.3s ease;
                }
                .profile-edit .tab-btn:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.05);
                }
                .profile-edit .tab-btn.active {
                    color: #fff;
                }
                .profile-edit .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 3px 3px 0 0;
                }
                .profile-edit .form-control {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    color: #fff;
                }
                .profile-edit .form-control:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: #667eea;
                    color: #fff;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                }
                .profile-edit .form-control::placeholder {
                    color: rgba(255,255,255,0.4);
                }
                .profile-edit .input-group .btn-outline-secondary {
                    border-color: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.6);
                }
                .profile-edit .input-group .btn-outline-secondary:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }
                .profile-edit .border-top {
                    border-color: rgba(255,255,255,0.1) !important;
                }
            `}</style>
        </ContentWrapper>
    );
};
