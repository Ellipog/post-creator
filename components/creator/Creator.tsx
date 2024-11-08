"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { renderModule } from "./RenderModule";

type ModuleType = "header" | "paragraph" | "image" | "quote" | "code";

export interface PostModule {
  id: string;
  type: ModuleType;
  data: string;
  moduleProps: {
    position: "left" | "center" | "right";
    language?: string;
    alt?: string;
    author?: string;
  };
}

export default function Creator() {
  const [modules, setModules] = useState<PostModule[]>([]);
  const [showModuleSelector, setShowModuleSelector] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addModule = (type: ModuleType) => {
    const newModule: PostModule = {
      id: crypto.randomUUID(),
      type,
      data: "Hei",
      moduleProps: {
        position: "left",
      },
    };
    setModules([...modules, newModule]);
    setShowModuleSelector(false);
  };

  const deleteModule = (id: string) => {
    setModules(modules.filter((module) => module.id !== id));
  };
  console.log(modules);

  return (
    <div className="w-[600px] h-[600px] bg-gray-100 rounded-md p-4 relative">
      <div className="h-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={modules.map((module) => module.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {modules.map((module, index) => (
                <SortableModule
                  key={module.id}
                  module={module}
                  index={index}
                  deleteModule={deleteModule}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={() => setShowModuleSelector(true)}
          className="w-full py-2 mt-4 flex items-center justify-center gap-2 
            text-slate-500 hover:text-slate-700 hover:bg-slate-200 
            rounded-md transition-colors duration-200"
        >
          <Plus size={20} />
          Add Module
        </button>
      </div>

      {showModuleSelector && (
        <div className="absolute bottom-20 left-0 right-0 mx-4 bg-white rounded-lg shadow-lg p-2 space-y-1">
          <button
            onClick={() => addModule("header")}
            className="w-full p-2 text-left hover:bg-slate-100 rounded"
          >
            Header
          </button>
          <button
            onClick={() => addModule("paragraph")}
            className="w-full p-2 text-left hover:bg-slate-100 rounded"
          >
            Paragraph
          </button>
          <button
            onClick={() => addModule("image")}
            className="w-full p-2 text-left hover:bg-slate-100 rounded"
          >
            Image
          </button>
          <button
            onClick={() => addModule("quote")}
            className="w-full p-2 text-left hover:bg-slate-100 rounded"
          >
            Quote
          </button>
          <button
            onClick={() => addModule("code")}
            className="w-full p-2 text-left hover:bg-slate-100 rounded"
          >
            Code Block
          </button>
        </div>
      )}
    </div>
  );
}

function SortableModule({
  module,
  index,
  deleteModule,
}: {
  module: PostModule;
  index: number;
  deleteModule: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: module.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 rounded-md transition-colors duration-200 ${
        isHovered ? "bg-gray-300/30" : ""
      }`}
    >
      <button
        className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing relative -left-[3.5rem] -mr-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={24} />
      </button>
      <button
        className="text-slate-400 hover:text-slate-600 cursor-pointer relative -left-[5.5rem] -mr-7"
        onClick={() => deleteModule(module.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Trash2 size={24} />
      </button>
      {renderModule(module, index)}
    </div>
  );
}
