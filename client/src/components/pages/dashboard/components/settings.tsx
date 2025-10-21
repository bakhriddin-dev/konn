import { Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { logout, useGetProfileQuery } from "@/features";
import { useDeleteAccountMutation, useUpdateMeMutation } from "@/features/api/api-slice";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const SettingsTab = () => {
  const { data: user, isLoading } = useGetProfileQuery("");
  const [updateMe, { isLoading: updateLoading }] = useUpdateMeMutation();
  const [deleteAccount, { isLoading: deleteLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.username.trim()) {
      toast.error("Ism va foydalanuvchi nomi bo'sh bo'lishi mumkin emas");
      return;
    }

    updateMe(formData);
    toast.success("Sozlamalar saqlandi");
  };

  const handleDelete = async () => {
    if (confirm("Hisobingizni o'chirmoqchimisiz? Bu jarayonni orqaga qaytarib bo'lmaydi!")) {
      try {
        await deleteAccount("").unwrap();
        localStorage.removeItem("jwt");
        window.location.href = "/";
      } catch {
        toast.error("Hisobni o'chirib bo'lmadi!");
      }
    }
  };

  const handleLogout = () => {
    if (confirm("Hisobdan chiqasizmi?")) {
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        bio: user.bio || "",
        avatar: user.avatar,
      });
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Sozlamalar</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile section */}
        <Card className="p-6 border-border gap-0">
          <h3 className="text-lg font-semibold mb-4">Profil ma'lumotlari</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center text-4xl overflow-hidden">
                  {user?.avatar === "" ? <img src={user?.avatar} /> : <>{user?.name[0]}</>}
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" className="text-xs max-w-max">
                    O'zgartirish
                  </Button>
                  <Button type="button" variant="destructive" size="sm" className="text-xs max-w-max hover:!bg-destructive/50">
                    O'chirish
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Ko'rinadigan ism</Label>
              <Input
                id="displayName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ismingiz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">konn.uz/</span>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username"
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Sizning noyob havolangiz: konn.uz/{formData.username}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="O'zingiz haqingizda qisqacha..."
                maxLength={160}
                className="min-h-32 max-h-32 resize-none"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">{formData.bio.length}/160 belgi</p>
            </div>
          </div>
        </Card>

        {/* Account section */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold">Hisob ma'lumotlari</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email} disabled />
            </div>
          </div>
        </Card>

        {/* Danger zone */}
        <Card className="p-6 border-destructive/50 bg-red-500/10">
          <h3 className="text-lg font-semiboldtext-destructive">Xavfli zona</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Hisobingizni o'chirish barcha ma'lumotlaringizni butunlay o'chiradi. Bu amalni bekor
                qilib bo'lmaydi.
              </p>
              <Button onClick={handleDelete} variant="default" type="button">
                {deleteLoading ? "O'chirilayapti..." : "Hisobni o'chirish"}
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-gradient-to-r text-white from-green-700 to-cyan-700 hover:from-green-800 hover:to-cyan-800"
          >
            {updateLoading ? "Saqlanyapti..." : "O'zgarishlarni saqlash"}
          </Button>
          <Button onClick={handleLogout} type="button" variant="outline">
            <LogOut />
            Hisobdan chiqish
          </Button>
        </div>
      </form>
    </div>
  );
};
