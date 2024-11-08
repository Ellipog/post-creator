"use client";

import {
  HeaderModule,
  ParagraphModule,
  ImageModule,
  QuoteModule,
  CodeBlockModule,
} from "@/components/post/modules";

export default function Post() {
  const posts = [
    {
      postId: 1,
      postModules: [
        {
          module: HeaderModule,
          data: "Hot Springs in Iceland",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: ParagraphModule,
          data: "Iceland has over 45 active hot springs scattered across the country. These geothermal pools naturally stay warm year-round, with temperatures ranging from 36-40°C (96-104°F).",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: ImageModule,
          data: "https://picsum.photos/1920/1080",
          moduleProps: {
            position: "left",
            alt: "Picture of a massive hot spring in Iceland, with a clear blue sky and a few clouds.",
          },
        },
        {
          module: ParagraphModule,
          data: "https://www.youtube.com/watch?v=ICEzGr7x3t4 The Blue Lagoon, Iceland's most famous hot spring, gets its distinctive milky-blue color from silica and sulfur compounds in the water.",
          moduleProps: {
            position: "left",
          },
        },
      ],
    },
    {
      postId: 2,
      postModules: [
        {
          module: HeaderModule,
          data: "The Philosophical Idea of Love",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: ParagraphModule,
          data: "Love is a philosophical concept that has been debated for centuries. It is often defined as a feeling of deep affection and attachment, but it can also be seen as a force that drives human behavior.",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: QuoteModule,
          data: "'At the touch of love everyone becomes a poet.'",
          moduleProps: {
            position: "left",
            author: "Plato",
          },
        },
        {
          module: ParagraphModule,
          data: "Aristotle believed that 'Love is composed of a single soul inhabiting two bodies.' And that is why we are here. To find our soulmate.",
          moduleProps: {
            position: "left",
          },
        },
      ],
    },
    {
      postId: 3,
      postModules: [
        {
          module: HeaderModule,
          data: "Hay Fields in the Netherlands",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: ImageModule,
          data: "https://picsum.photos/1200/700",
          moduleProps: {
            position: "left",
            alt: "Picture of hay fields in the Netherlands.",
          },
        },
        {
          module: ParagraphModule,
          data: "The Netherlands is known for its vast hay fields, which are used to feed livestock during the winter months.",
          moduleProps: {
            position: "left",
          },
        },
      ],
    },
    {
      postId: 4,
      postModules: [
        {
          module: HeaderModule,
          data: "How to make cool code in TypeScript",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: CodeBlockModule,
          data: "const [copied, setCopied] = useState(false);\nconst [isClient, setIsClient] = useState(false);\nconst codeRef = useRef<HTMLElement>(null);\n\nuseEffect(() => {\n  setIsClient(true);\n}, []);\n\nuseEffect(() => {\n  if (isClient && codeRef.current) {\n    Prism.highlightElement(codeRef.current);\n  }\n}, [isClient, data]);",
          moduleProps: {
            language: "typescript",
            position: "left",
          },
        },
      ],
    },
  ];

  return (
    <>
      {posts.map((post, i) => (
        <div className="w-full bg-gray-100 rounded-lg p-4 mb-10" key={i}>
          {post.postModules.map((module, i) => {
            return module.module({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(module.moduleProps as any),
              data: module.data,
              postLength: post.postModules.length,
              postIndex: i,
            });
          })}
        </div>
      ))}
    </>
  );
}
