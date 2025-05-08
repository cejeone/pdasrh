"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcode user admin
    if (email === "admin@kemenhut.go.id" && password === "Admin#123") {
      router.push("/cms");
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri: Gambar */}
      <div className="w-[80%] relative hidden md:block">
        <Image src="/img/login.png" alt="login" layout="fill" objectFit="cover" />
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-bg-card px-8 py-12">
        <div className="w-full max-w-md space-y-6 border rounded-sm p-8">
          {/* Logo dan Judul */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image src="/KEMENHUT.svg" alt="Logo" width={40} height={40} className="object-contain" />
            <h1 className="text-2xl font-semibold text-secondary-green">SSO PDASRH</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Kata Sandi</label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"} // Tergantung showPassword
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Ikon Eye diklik untuk toggle */}
                <div className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-secondary-green hover:bg-hover-base-green text-white">
              Login
            </Button>
          </form>

          {/* Garis dan Teks "atau" */}
          <div className="flex items-center gap-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-sm text-base-green">atau</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Tombol Google dan Registrasi */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full font-semibold text-base-green">
              Masuk dengan Google
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Tidak punya akun?{" "}
              <a href="#" className="text-secondary-green font-medium underline">
                Registrasi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
