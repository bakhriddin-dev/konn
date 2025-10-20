import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Link2, GripVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  useCreateLinkMutation,
  useDeleteLinkMutation,
  useEditLinkMutation,
  useGetProfileQuery,
} from "@/features/api/api-slice";
import { Loader } from "@/components/common";
import { IconRenderer } from "@/components/common/icon-renderer/icon-renderer";
import { iconOptions } from "@/constants/icons";

export const LinksTab = () => {
  const [createLink, { isLoading: createLinkLoading }] = useCreateLinkMutation();
  const [editLink, { isLoading: editLinkLoading }] = useEditLinkMutation();
  const [deleteLink] = useDeleteLinkMutation();
  const { data, isLoading } = useGetProfileQuery("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "Globe",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingLink) {
      try {
        await editLink({ id: editingLink, ...formData }).unwrap();
        toast.success("Havola yangilandi");
      } catch {
        toast.error("Havola yangilashda xatolik");
      }
    } else {
      try {
        await createLink({ ...formData, enabled: true }).unwrap();
        toast.success("Havola qo'shildi");
      } catch {
        toast.error("Havola qo'shishda xatolik");
      }
    }

    setIsAddOpen(false);
    setEditingLink(null);
    setFormData({ title: "", url: "", icon: "Globe" });
  };

  const handleToggle = async (linkId: string, enabled: boolean) => {
    try {
      await editLink({ id: linkId, enabled }).unwrap();
      toast.success(enabled ? "Havola yoqildi" : "Havola o'chirildi");
    } catch {
      toast.error("Havola yangilashda xatolik");
    }
  };

  const handleEdit = async (link) => {
    setIsAddOpen(true);
    setEditingLink(link.id);
    setFormData({ title: link.title, url: link.url, icon: link.icon });
  };

  const handleDelete = (linkId: string) => {
    if (confirm("Linkni o'chirasizmi?")) {
      deleteLink(linkId);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Havolalar</h1>
          <p className="text-muted-foreground">Havolalaringizni boshqaring va tahrirlang</p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-gren-600 hover:to-cyan-600">
              <Plus className="w-4 h-4" />
              Havola qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLink ? "Havolani tahrirlash" : "Yangi havola qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Sarlavha</Label>
                <Input
                  id="title"
                  placeholder="Masalan: Mening YouTube kanalim"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://..."
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.Icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  disabled={createLinkLoading || editLinkLoading}
                  type="submit"
                  className="flex-1"
                >
                  {editingLink ? (
                    <>{editLinkLoading ? "Saqlanyapti..." : "Saqlash"}</>
                  ) : (
                    <>{createLinkLoading ? "Qo'shilyapti..." : "Qo'shish"}</>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingLink(null);
                    setFormData({ title: "", url: "", icon: "Globe" });
                  }}
                  type="button"
                  variant="outline"
                >
                  Bekor qilish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {data?.links?.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Link2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Hali havolalar yo'q</h3>
            <p className="text-muted-foreground mb-4">
              Birinchi havolangizni qo'shish uchun yuqoridagi tugmani bosing
            </p>
          </Card>
        ) : (
          data?.links?.map((link, index) => {
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 border-border hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <button className="cursor-move text-muted-foreground hover:text-foreground">
                      <GripVertical className="w-5 h-5" />
                    </button>

                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center flex-shrink-0">
                      <IconRenderer iconName={link.icon} className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{link.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{link.url}</div>
                    </div>

                    <div className="text-sm text-muted-foreground">{link.clicks} clicks</div>

                    <Switch
                      checked={link.enabled}
                      onCheckedChange={(checked) => handleToggle(link.id, checked)}
                    />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:bg-accent-300"
                        onClick={() => handleEdit(link)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:bg-accent-300"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
