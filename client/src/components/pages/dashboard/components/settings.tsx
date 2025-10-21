import { Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { logout, useGetProfileQuery } from "@/features";
import { useDeleteAccountMutation, useUpdateMeMutation } from "@/features/api/api-slice";
import { useTranslation } from "@/hooks";
import { Language } from "@/types";
import { cn } from "@/utils/utils";
import { Globe, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const SettingsTab = () => {
  const { data: user, isLoading } = useGetProfileQuery("");
  const [updateMe, { isLoading: updateLoading }] = useUpdateMeMutation();
  const [deleteAccount, { isLoading: deleteLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();
  const { t, setLanguage, currentLanguage } = useTranslation();
  const fileInputRef = useRef(null);

  const languages = [
    { code: "uz" as Language, label: "O'zbekcha" },
    { code: "en" as Language, label: "English" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.username.trim()) {
      toast.error(t("dashboard.settings.notempty"));
      return;
    }

    updateMe(formData);
    toast.success(t("dashboard.settings.saved"));
  };

  const handleInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    if (confirm(t("dashboard.settings.deletetext"))) {
      try {
        await deleteAccount("").unwrap();
        localStorage.removeItem("jwt");
        window.location.href = "/";
      } catch {
        toast.error(t("dashboard.settings.deletetexterror"));
      }
    }
  };

  const handleLogout = () => {
    if (confirm(t("dashboard.settings.logouttext"))) {
      dispatch(logout());
    }
  };

  const handleDeleteAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
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
      <h1 className="text-3xl font-bold mb-4">{t("dashboard.sidebar.settings")}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile section */}
        <Card className="p-6 border-border gap-0">
          <h3 className="text-lg font-semibold mb-4">{t("dashboard.settings.profileinfo")}</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-900 flex items-center justify-center text-4xl overflow-hidden">
                  {formData?.avatar !== "" ? (
                    <img className="w-full h-full object-cover" src={formData?.avatar} />
                  ) : (
                    <>{user?.name[0]}</>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs max-w-max"
                    onClick={handleInputClick}
                  >
                    {t("dashboard.settings.edit")}
                    <input
                      onChange={handleFileInputChange}
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </Button>
                  <Button
                    onClick={handleDeleteAvatar}
                    type="button"
                    variant="default"
                    size="sm"
                    className="text-xs max-w-max text-white !bg-red-500 hover:!bg-red-500/80"
                  >
                    {t("dashboard.settings.delete")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">{t("dashboard.settings.dname")}</Label>
              <Input
                id="displayName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ismingiz"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t("dashboard.settings.username")}</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">konn.uz/</span>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username"
                  className="flex-1"
                  maxLength={50}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.settings.yourlink")} konn.uz/{formData.username}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder={t("dashboard.settings.bio")}
                maxLength={160}
                className="min-h-32 max-h-32 resize-none"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                {formData.bio.length}/160 {t("dashboard.settings.character")}
              </p>
            </div>
          </div>
        </Card>

        {/* Account section */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold">{t("dashboard.settings.account")}</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email} disabled />
            </div>
          </div>
        </Card>

        {/* Language section */}
        <Card className="p-6 border-border flex items-center flex-row justify-between">
          <h3 className="text-lg font-semibold">{t("dashboard.settings.changelang")}</h3>
          <div className="border max-w-max rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 h-9 rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languages.find((l) => l.code === currentLanguage)?.label}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      currentLanguage === lang.code ? "bg-accent" : ""
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>

        {/* Danger zone */}
        <Card className="p-6 border-destructive/50 bg-red-500/10">
          <h3 className="text-lg font-semiboldtext-destructive">
            {t("dashboard.settings.danger")}
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {t("dashboard.settings.dangerdelete")}
              </p>
              <Button onClick={handleDelete} variant="default" type="button">
                {deleteLoading
                  ? t("dashboard.settings.deletingaccount")
                  : t("dashboard.settings.deleteaccount")}
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            disabled={updateLoading}
            type="submit"
            className="bg-gradient-to-r text-white from-green-700 to-cyan-700 hover:from-green-800 hover:to-cyan-800"
          >
            {updateLoading ? t("dashboard.settings.saving") : t("dashboard.settings.save")}
          </Button>
          <Button onClick={handleLogout} type="button" variant="outline">
            <LogOut />
            {t("dashboard.settings.logout")}
          </Button>
        </div>
      </form>
    </div>
  );
};
