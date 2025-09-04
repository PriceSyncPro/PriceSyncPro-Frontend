import SignUpForm from "@/components/auth/SignUpForm";
import AuthGuard from "@/utils/components/AuthGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol | PriceSyncPro - Dashboard Hesabı Oluştur",
  description: "PriceSyncPro'ya kayıt olun ve fiyat takip dashboard'una erişim sağlayın",
};

export default function SignUp() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <SignUpForm />
    </AuthGuard>
  );
}
