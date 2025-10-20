import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
import { Plus, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  useCreateLinkMutation,
  useDeleteLinkMutation,
  useEditLinkMutation,
  useGetProfileQuery,
  useUpdateLinksOrderMutation,
} from "@/features/api/api-slice";
import { Loader } from "@/components/common";
import { iconOptions } from "@/constants/icons";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";

export const LinksTab = () => {
  const [createLink, { isLoading: createLinkLoading }] = useCreateLinkMutation();
  const [editLink, { isLoading: editLinkLoading }] = useEditLinkMutation();
  const [updateLinksOrder] = useUpdateLinksOrderMutation();
  const [deleteLink] = useDeleteLinkMutation();
  const { data, isLoading } = useGetProfileQuery("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "Globe",
  });
  const [links, setLinks] = useState(data?.links || []);

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((link) => link.id === active.id);
    const newIndex = links.findIndex((link) => link.id === over.id);

    const newLinks = arrayMove(links, oldIndex, newIndex);
    setLinks(newLinks);

    await updateLinksOrder(newLinks).unwrap();
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  useEffect(() => {
    if (data) {
      setLinks(data?.links);
    }
  }, [data]);

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
        {links?.length === 0 ? (
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={links} strategy={verticalListSortingStrategy}>
              {links?.map((link, index) => {
                return (
                  <SortableItem
                    key={link.id}
                    link={link}
                    index={index}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleToggle={handleToggle}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
