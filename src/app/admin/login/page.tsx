import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login — Perfetto" };

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[var(--color-forest-deep)] py-16">
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.15),transparent_50%)]" />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  );
}
