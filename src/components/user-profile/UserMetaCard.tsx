"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { User } from "@/utils/types/user";

interface UserMetaCardProps {
  user: User | null;
}

export default function UserMetaCard({ user }: UserMetaCardProps) {
  const { isOpen, closeModal } = useModal();
  const router = useRouter();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const handleDepositCredit = () => {
    router.push('/dashboard/deposit-credit');
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src="/images/user/unknown.jpg"
                alt="user"
              />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.fullName || `${user?.firstName} ${user?.lastName}`}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kullanıcı
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          
          {/* Jeton Bilgisi - En sağda */}
          <div className="flex items-center gap-2 justify-center xl:justify-end">
            <div className="flex items-center justify-center text-gray-700 transition-all bg-gradient-to-r from-amber-50 to-orange-50 border border-gray-200 rounded-full hover:from-amber-100 hover:to-orange-100 h-11 px-4 hover:border-orange-200 hover:shadow-md dark:from-gray-800 dark:to-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:from-gray-700 dark:hover:to-orange-900">
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 rounded-full dark:from-amber-900 dark:to-orange-900 dark:text-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .964.4 1.856 1.112 2.422.502.4 1.102.647 1.72.756V18a.75.75 0 001.5 0v-.816a3.836 3.836 0 001.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.112-2.178a3.836 3.836 0 00-1.72-.756V9.5c.568.059 1.068.24 1.414.502.427.32.579.686.579.991a.75.75 0 001.5 0c0-.964-.4-1.856-1.112-2.422A3.836 3.836 0 0012.75 6.816V6z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="font-medium">Jeton: <span className="text-orange-600 dark:text-orange-400 font-bold">{user?.balance || 0}</span></span>
              </span>
            </div>
            
            {/* Jeton Yükle Butonu */}
            <button
              onClick={handleDepositCredit}
              className="flex items-center justify-center gap-1 h-9 px-3 text-orange-600 transition-all bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full hover:from-orange-100 hover:to-amber-100 hover:border-orange-300 hover:shadow-md dark:from-orange-900/20 dark:to-amber-900/20 dark:border-orange-700 dark:text-orange-400 dark:hover:from-orange-800/30 dark:hover:to-amber-800/30"
              title="Jeton Yükle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Jeton Yükle</span>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Kişisel Bilgileri Düzenle
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Profilinizi güncel tutmak için bilgilerinizi güncelleyin.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Kişisel Bilgiler
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input type="text" defaultValue="Musharof" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input type="text" defaultValue="Chowdhury" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="text" defaultValue="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" defaultValue="+09 363 398 46" />
                  </div>

                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Kapat
              </Button>
              <Button size="sm" onClick={handleSave}>
                Değişiklikleri Kaydet
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
