import {
  HeaderModule,
  ParagraphModule,
  ImageModule,
  QuoteModule,
  CodeBlockModule,
} from "@/components/post/modules";
import { PostModule } from "@/components/creator/Creator";

export function renderModule(module: PostModule, index: number) {
  const commonProps = {
    data: module.data,
    position: module.moduleProps.position,
    postLength: 0,
    postIndex: index,
    editing: true,
  };

  switch (module.type) {
    case "header":
      return <HeaderModule {...commonProps} />;
    case "paragraph":
      return <ParagraphModule {...commonProps} />;
    case "image":
      return (
        <ImageModule {...commonProps} alt={module.moduleProps.alt || ""} />
      );
    case "quote":
      return (
        <QuoteModule
          {...commonProps}
          author={module.moduleProps.author || ""}
        />
      );
    case "code":
      return (
        <CodeBlockModule
          {...commonProps}
          language={module.moduleProps.language || "typescript"}
        />
      );
  }
}
