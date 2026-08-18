import AdminDashboard from "@/components/AdminDashboard";
 import AuthGuard from "@/components/AuthGuard";
  export default function AdminPage()
   { 
    return (
    <AuthGuard> <AdminDashboard /> </AuthGuard>
); 
}