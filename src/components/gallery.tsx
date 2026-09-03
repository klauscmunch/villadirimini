export function Gallery({
  imagens,
}: {
  imagens: { src: string; alt: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {imagens.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-black/5"
        />
      ))}
    </div>
  );
}
