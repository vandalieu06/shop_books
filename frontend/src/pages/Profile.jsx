import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, X } from "lucide-react";
import { useAuth } from "../contexts/authHooks";

const Profile = () => {
	const { user } = useAuth();
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (user) {
			setProfileData(user);
			setLoading(false);
		} else {
			setError("No hay sesión activa");
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse space-y-6">
						<div className="h-8 bg-gray-100 w-48" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{[...Array(6)].map((_, i) => (
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
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Error loading
					</h2>
					<p className="text-gray-500 text-sm">{error}</p>
				</div>
			</div>
		);
	}

	const data = profileData || {};

	const InfoItem = ({ icon: Icon, label, value }) => (
		<div className="flex items-start gap-3 p-4 bg-gray-50">
			<Icon className="w-5 h-5 text-red-700 mt-0.5" />
			<div>
				<p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
				<p className="text-sm font-medium text-gray-900 mt-0.5">
					{value || "—"}
				</p>
			</div>
		</div>
	);

	return (
		<div className="h-max bg-white pb-10">
			<div className="bg-gray-50 border-b border-gray-200">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
					<p className="text-gray-500 text-sm mt-1">
						Manage your account information
					</p>
				</div>
			</div>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InfoItem icon={User} label="First Name" value={data.first_name} />
					<InfoItem icon={User} label="Last Name" value={data.last_name} />
					<InfoItem icon={Mail} label="Email" value={data.email} />
					<InfoItem
						icon={Phone}
						label="Phone"
						value={data.phone || data.telephone}
					/>
					<InfoItem
						icon={MapPin}
						label="Address"
						value={
							data.address
								? `${data.address.street || ""}, ${data.address.city || ""}, ${data.address.postal_code || ""}`
								: data.address
						}
					/>
					<InfoItem
						icon={Calendar}
						label="Birth Date"
						value={data.birth_date || data.birthday}
					/>
					<InfoItem icon={BookOpen} label="Username" value={data.username} />
					<InfoItem icon={User} label="Role" value={data.role} />
				</div>

				{data.createdAt && (
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
