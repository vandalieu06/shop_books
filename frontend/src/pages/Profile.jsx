import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, X, Pencil, Save, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/authHooks";
import { usersApi } from "../api/users";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50">
    <Icon className="w-5 h-5 text-red-700 mt-0.5" />
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-0.5">{value || "—"}</p>
    </div>
  </div>
);

const EditField = ({ label, field, type = "text", formData, onChange }) => {
  const inputId = `edit-${field.replace(/\./g, '-')}`;
  if (field.startsWith("address.")) {
    const key = field.split(".")[1];
    return (
      <div className="p-4 bg-gray-50">
        <label htmlFor={inputId} className="text-xs text-gray-500 uppercase tracking-wide">{label}</label>
        <input
          id={inputId}
          type={type}
          value={formData.address?.[key] || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-red-700"
        />
      </div>
    );
  }
  return (
    <div className="p-4 bg-gray-50">
      <label htmlFor={inputId} className="text-xs text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        id={inputId}
        type={type}
        value={formData[field] || ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-red-700"
      />
    </div>
  );
};

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || user.telephone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          postal_code: user.address?.postal_code || "",
        },
        birth_date: user.birth_date || user.birthday || "",
      });
      setLoading(false);
    } else {
      setError("No hay sesión activa");
      setLoading(false);
    }
  }, [user]);

  const handleChange = (field, value) => {
    if (field.startsWith("address.")) {
      const key = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        birth_date: formData.birth_date,
      };
      const response = await usersApi.updateMe(payload);
      setProfileData(response.data);
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.response?.data?.message || err.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || profileData?.telephone || "",
      address: {
        street: profileData?.address?.street || "",
        city: profileData?.address?.city || "",
        postal_code: profileData?.address?.postal_code || "",
      },
      birth_date: profileData?.birth_date || profileData?.birthday || "",
    });
    setIsEditing(false);
    setSaveError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-100 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8 bg-gray-50 border border-gray-100 max-w-md">
          <div className="w-12 h-12 bg-red-50 flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-red-700" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error loading</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const data = profileData || {};

  return (
    <div className="h-max bg-white pb-10">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 text-sm border border-red-200">
            {saveError}
          </div>
        )}

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditField label="First Name" field="first_name" formData={formData} onChange={handleChange} />
              <EditField label="Last Name" field="last_name" formData={formData} onChange={handleChange} />
              <EditField label="Email" field="email" type="email" formData={formData} onChange={handleChange} />
              <EditField label="Phone" field="phone" type="tel" formData={formData} onChange={handleChange} />
              <EditField label="Street" field="address.street" formData={formData} onChange={handleChange} />
              <EditField label="City" field="address.city" formData={formData} onChange={handleChange} />
              <EditField label="Postal Code" field="address.postal_code" formData={formData} onChange={handleChange} />
              <EditField label="Birth Date" field="birth_date" type="date" formData={formData} onChange={handleChange} />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 text-sm hover:bg-red-800 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={User} label="First Name" value={data.first_name} />
            <InfoItem icon={User} label="Last Name" value={data.last_name} />
            <InfoItem icon={Mail} label="Email" value={data.email} />
            <InfoItem icon={Phone} label="Phone" value={data.phone || data.telephone} />
            <InfoItem
              icon={MapPin}
              label="Address"
              value={
                data.address
                  ? `${data.address.street || ""}, ${data.address.city || ""}, ${data.address.postal_code || ""}`
                  : ""
              }
            />
            <InfoItem icon={Calendar} label="Birth Date" value={data.birth_date || data.birthday} />
            <InfoItem icon={BookOpen} label="Username" value={data.username} />
            <InfoItem icon={User} label="Role" value={data.role} />
          </div>
        )}

        {data.createdAt && !isEditing && (
          <div className="mt-6 p-4 bg-gray-50">
            <p className="text-xs text-gray-500">
              Member since:{" "}
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
