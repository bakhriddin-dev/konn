import { IconRenderer } from "@/components/common/icon-renderer/icon-renderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ link, index, handleEdit, handleToggle, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div ref={setNodeRef} style={style}>
        <Card className="p-3 md:p-4 border-border hover:border-green-500/50 transition-colors">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              {...attributes}
              {...listeners}
              className="cursor-move text-muted-foreground hover:text-foreground"
            >
              <GripVertical className="w-5 h-5" />
            </button>

            <div className="hidden md:flex w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 items-center justify-center flex-shrink-0">
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
      </div>
    </motion.div>
  );
};
