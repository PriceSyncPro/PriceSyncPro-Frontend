import SignInForm from "@/components/auth/SignInForm";
import AuthGuard from "@/utils/components/AuthGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap | PriceSyncPro - Dashboard Erişimi",
  description: "PriceSyncPro dashboard'una giriş yapın ve fiyat takip araçlarınıza erişin",
};

export default function SignIn() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <SignInForm />
    </AuthGuard>
  );
}
