import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap | PriceSyncPro - Dashboard Erişimi",
  description: "PriceSyncPro dashboard'una giriş yapın ve fiyat takip araçlarınıza erişin",
};

export default function SignIn() {
  return <SignInForm />;
}