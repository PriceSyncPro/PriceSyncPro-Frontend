"use client";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import UserSellerInfoCard from "@/components/user-profile/UserSellerInfoCard";
import { useAuth } from "@/context/AuthContext";
import { UserMarketplacesService } from "@/utils/api/services";
import { UserMarketplace } from "@/utils/types/userMarketplaces";
import React, { useState, useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [marketplaces, setMarketplaces] = useState<UserMarketplace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplaces = async () => {
      try {
        const data = await UserMarketplacesService.getAll();
        setMarketplaces(data);
      } catch (error) {
        console.error('Failed to fetch marketplaces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaces();
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profilim
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
          {/* <UserAddressCard /> */}
          <UserSellerInfoCard marketplaces={marketplaces} loading={loading} />
        </div>
      </div>
    </div>
  );
}
