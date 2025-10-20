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
import {
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Music,
  Github,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Twitch,
  Dribbble,
  Figma,
  Gitlab,
  Slack,
  Chrome,
  Codepen,
  Cloud,
  MapPin,
  Camera,
  Calendar,
  Coffee,
  ShoppingCart,
  FileText,
  Heart,
  Star,
  Play,
  Send,
  MessageCircle,
  Book,
  Cpu,
  Shield,
  User,
  Users,
  Briefcase,
  Building,
  Radio,
  Monitor,
  Smartphone,
  Wifi,
  Rss,
  Zap,
  Rocket,
  Globe2,
  Plus,
  Link2,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const iconOptions = [
  { value: "Telegram", label: "Telegram", Icon: Send },
  { value: "Instagram", label: "Instagram", Icon: Instagram },
  { value: "Youtube", label: "YouTube", Icon: Youtube },
  { value: "Twitter", label: "Twitter/X", Icon: Twitter },
  { value: "Globe", label: "Website", Icon: Globe },
  { value: "Music", label: "Music", Icon: Music },
  { value: "Github", label: "GitHub", Icon: Github },
  { value: "Facebook", label: "Facebook", Icon: Facebook },
  { value: "Linkedin", label: "LinkedIn", Icon: Linkedin },
  { value: "Mail", label: "Email", Icon: Mail },
  { value: "Phone", label: "Phone", Icon: Phone },
  { value: "Twitch", label: "Twitch", Icon: Twitch },
  { value: "Dribbble", label: "Dribbble", Icon: Dribbble },
  { value: "Figma", label: "Figma", Icon: Figma },
  { value: "Gitlab", label: "GitLab", Icon: Gitlab },
  { value: "Slack", label: "Slack", Icon: Slack },
  { value: "Chrome", label: "Chrome", Icon: Chrome },
  { value: "Codepen", label: "CodePen", Icon: Codepen },
  { value: "Cloud", label: "Cloud", Icon: Cloud },
  { value: "MapPin", label: "Location", Icon: MapPin },
  { value: "Camera", label: "Camera", Icon: Camera },
  { value: "Calendar", label: "Calendar", Icon: Calendar },
  { value: "Coffee", label: "Coffee", Icon: Coffee },
  { value: "ShoppingCart", label: "Shop", Icon: ShoppingCart },
  { value: "FileText", label: "Document", Icon: FileText },
  { value: "Heart", label: "Like / Love", Icon: Heart },
  { value: "Star", label: "Favorite / Star", Icon: Star },
  { value: "Play", label: "Play", Icon: Play },
  { value: "MessageCircle", label: "Chat", Icon: MessageCircle },
  { value: "Book", label: "Book / Article", Icon: Book },
  { value: "Cpu", label: "Tech / CPU", Icon: Cpu },
  { value: "Shield", label: "Security", Icon: Shield },
  { value: "User", label: "User", Icon: User },
  { value: "Users", label: "Users", Icon: Users },
  { value: "Briefcase", label: "Work / Business", Icon: Briefcase },
  { value: "Building", label: "Company / Building", Icon: Building },
  { value: "Radio", label: "Podcast / Radio", Icon: Radio },
  { value: "Monitor", label: "Monitor", Icon: Monitor },
  { value: "Smartphone", label: "Mobile", Icon: Smartphone },
  { value: "Wifi", label: "Wi-Fi", Icon: Wifi },
  { value: "Rss", label: "RSS Feed", Icon: Rss },
  { value: "Zap", label: "Zap / Lightning", Icon: Zap },
  { value: "Rocket", label: "Startup / Rocket", Icon: Rocket },
  { value: "Globe2", label: "Global", Icon: Globe2 },
];

const links = [
  {
    id: "1",
    title: "Telegram",
    url: "https://t.me/for",
    icon: Send,
    enabled: true,
    clicks: 8,
  },
  {
    id: "1",
    title: "Instagram",
    url: "https://instagram.com/for",
    icon: Instagram,
    enabled: false,
    clicks: 8,
  },
];

export const LinksTab = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "Globe",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingLink) {
      // updateLink(editingLink, formData);
      toast.success("Havola yangilandi");
    } else {
      // addLink({...formData, enabled: true})
      toast.success("Havola qo'shildi");
    }

    setIsAddOpen(false);
    setEditingLink(null);
    setFormData({ title: "", url: "", icon: "Globe" });
  };

  const handleToggle = (linkId: string, enabled: boolean) => {
    // updateLink(linkId, { enabled });
    toast.success(enabled ? "Havola yoqildi" : "Havola o'chirildi");
  };

  const handleEdit = (linkId: string) => {
    //
    console.log(linkId);
  };

  const handleDelete = (linkId: string) => {
    //
    console.log(linkId);
  };

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
                <Button type="submit" className="flex-1">
                  {editingLink ? "Saqlash" : "Qo'shish"}
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
        {links.length === 0 ? (
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
          links.map((link, index) => {
            const Icon = link.icon;
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

                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
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
                        onClick={() => handleEdit(link.id)}
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
