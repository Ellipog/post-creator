import { useState } from "react";
import { X } from "lucide-react";
import { PostModule } from "./Creator";

interface ModuleConfigPopupProps {
  moduleType: NonNullable<PostModule["type"]>;
  onClose: () => void;
  onSubmit: (config: {
    data: string;
    moduleProps: PostModule["moduleProps"];
  }) => void;
  module?: PostModule;
}

export function ModuleConfigPopup({
  moduleType,
  onClose,
  onSubmit,
  module,
}: ModuleConfigPopupProps) {
  const [data, setData] = useState(module?.data || "");
  const [position, setPosition] = useState<"left" | "center" | "right">(
    module?.moduleProps.position ?? "left"
  );
  const [language, setLanguage] = useState(
    module?.moduleProps.language ?? "typescript"
  );
  const [alt, setAlt] = useState(module?.moduleProps.alt || "");
  const [author, setAuthor] = useState(module?.moduleProps.author || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const moduleProps: PostModule["moduleProps"] = {
      position,
      ...(moduleType === "code" && { language }),
      ...(moduleType === "image" && { alt }),
      ...(moduleType === "quote" && { author }),
    };
    onSubmit({ data: data ?? "", moduleProps });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 capitalize">
          {moduleType} Module
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          {moduleType !== "code" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as typeof position)}
                className="w-full p-2 border rounded-md"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}

          {moduleType === "code" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
              </select>
            </div>
          )}

          {moduleType === "image" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}

          {moduleType === "quote" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Create Module
          </button>
        </form>
      </div>
    </div>
  );
}
