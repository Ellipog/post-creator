import {
  HeaderModule,
  ParagraphModule,
  ImageModule,
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
          data: "https://picsum.photos/700/400",
          moduleProps: {
            position: "left",
            alt: "Picture of a massive hot spring in Iceland, with a clear blue sky and a few clouds.",
          },
        },
        {
          module: ParagraphModule,
          data: "The Blue Lagoon, Iceland's most famous hot spring, gets its distinctive milky-blue color from silica and sulfur compounds in the water.",
          moduleProps: {
            position: "right",
          },
        },
      ],
    },
    {
      postId: 2,
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
            position: "right",
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
      postId: 3,
      postModules: [
        {
          module: HeaderModule,
          data: "The perfect road trip van",
          moduleProps: {
            position: "left",
          },
        },
        {
          module: ImageModule,
          data: "https://picsum.photos/1000/600",
          moduleProps: {
            position: "right",
            alt: "Picture of a blue van viewed from the side.",
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
              ...module.moduleProps,
              data: module.data,
              alt: module.moduleProps.alt || "",
              postLength: post.postModules.length,
              postIndex: i,
            });
          })}
        </div>
      ))}
    </>
  );
}
