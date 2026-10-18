import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { me } from "./api";
import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";

export default function AccountDashboard() {
  const user = useQuery({ queryKey: ["me"], queryFn: me, retry: false });
  if (user.isLoading) return <div className="page loading">Loading your workspace…</div>;
  if (!user.data) return <div className="page state"><h3>Please sign in to continue.</h3><Link to="/auth/login" className="button">Sign in</Link></div>;
  return user.data.user.role === "admin" ? <AdminDashboard /> : <OwnerDashboard />;
}
