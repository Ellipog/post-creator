"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { ModuleConfigPopup } from "./ModuleConfigPopup";

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
  const [showConfigPopup, setShowConfigPopup] = useState(false);
  const [selectedModuleType, setSelectedModuleType] =
    useState<ModuleType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleModuleSelect = (type: ModuleType) => {
    setSelectedModuleType(type);
    setShowModuleSelector(false);
    setShowConfigPopup(true);
  };

  const handleModuleCreate = (config: {
    data: string;
    moduleProps: PostModule["moduleProps"];
  }) => {
    const newModule: PostModule = {
      id: crypto.randomUUID(),
      type: selectedModuleType!,
      data: config.data,
      moduleProps: config.moduleProps,
    };
    setModules([...modules, newModule]);
    setShowConfigPopup(false);
    setSelectedModuleType(null);
  };

  const deleteModule = (id: string) => {
    setModules(modules.filter((module) => module.id !== id));
  };
  console.log(modules);

  return (
    <div className="w-[600px] bg-gray-100 rounded-md p-4 relative">
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
                  setModules={setModules}
                  modules={modules}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={() => setShowModuleSelector(true)}
          className={`w-full py-2 flex items-center justify-center gap-2 
            text-slate-500 hover:text-slate-700 hover:bg-slate-200 
            rounded-md transition-colors duration-200 ${
              modules.length > 0 ? "mt-4" : ""
            }`}
        >
          <Plus size={20} />
          Add Module
        </button>

        {showModuleSelector && (
          <div className="left-0 right-0 mx-4 bg-white rounded-lg shadow-lg p-2 space-y-1">
            <button
              onClick={() => handleModuleSelect("header")}
              className="w-full p-2 text-left hover:bg-slate-100 rounded"
            >
              Header
            </button>
            <button
              onClick={() => handleModuleSelect("paragraph")}
              className="w-full p-2 text-left hover:bg-slate-100 rounded"
            >
              Paragraph
            </button>
            <button
              onClick={() => handleModuleSelect("image")}
              className="w-full p-2 text-left hover:bg-slate-100 rounded"
            >
              Image
            </button>
            <button
              onClick={() => handleModuleSelect("quote")}
              className="w-full p-2 text-left hover:bg-slate-100 rounded"
            >
              Quote
            </button>
            <button
              onClick={() => handleModuleSelect("code")}
              className="w-full p-2 text-left hover:bg-slate-100 rounded"
            >
              Code Block
            </button>
          </div>
        )}
      </div>

      {showConfigPopup && selectedModuleType && (
        <ModuleConfigPopup
          moduleType={selectedModuleType}
          onClose={() => {
            setShowConfigPopup(false);
            setSelectedModuleType(null);
          }}
          onSubmit={handleModuleCreate}
        />
      )}
    </div>
  );
}

function SortableModule({
  module,
  index,
  deleteModule,
  setModules,
  modules,
}: {
  module: PostModule;
  index: number;
  deleteModule: (id: string) => void;
  setModules: Dispatch<SetStateAction<PostModule[]>>;
  modules: PostModule[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfigPopup, setShowConfigPopup] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: module.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const handleModuleUpdate = (config: {
    data: string;
    moduleProps: PostModule["moduleProps"];
  }) => {
    setModules(
      modules.map((m) => (m.id === module.id ? { ...m, ...config } : m))
    );
    setShowConfigPopup(false);
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
      <div
        className="hover:cursor-pointer w-full hover:bg-gray-200/50 rounded-md transition-colors duration-200"
        onClick={() => setShowConfigPopup(true)}
      >
        {renderModule(module, index)}
      </div>
      {showConfigPopup && (
        <ModuleConfigPopup
          moduleType={module.type}
          onClose={() => setShowConfigPopup(false)}
          onSubmit={handleModuleUpdate}
          module={module}
        />
      )}
    </div>
  );
}
