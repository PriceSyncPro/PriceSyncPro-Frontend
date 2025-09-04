'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Avatar from "@/components/ui/avatar/Avatar";
import React from "react";

export default function AvatarPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Avatar" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          {/* Default Avatar (No Status) */}
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar name="John Doe" src="/images/user/user-01.jpg" size="sm" />
<Avatar name="John Doe" src="/images/user/user-01.jpg" size="md" />
<Avatar name="John Doe" src="/images/user/user-01.jpg" size="lg" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with online indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
  <Avatar
    name="John Doe"
    src="/images/user/user-01.jpg"
    size="sm"
  />
  <Avatar
    name="John Doe"
    src="/images/user/user-01.jpg"
    size="md"
  />
  <Avatar
    name="John Doe"
    src="/images/user/user-01.jpg"
    size="lg"
  />
</div>
        </ComponentCard>
        <ComponentCard title="Avatar with Offline indicator">
  <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="sm"
    />
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="md"
    />
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="lg"
    />
  </div>
</ComponentCard>

<ComponentCard title="Avatar with busy indicator">
  <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="sm"
    />
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="md"
    />
    <Avatar
      name="John Doe"
      src="/images/user/user-01.jpg"
      size="lg"
    />
  </div>
</ComponentCard>
      </div>
    </div>
  );
}
