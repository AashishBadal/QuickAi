import { Quote, Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "John Doe",
    title: "Marketing Director, TechCorp",
    content:
      "QuickAI has completely revolutionized our content workflow. The quality of the articles is outstanding, and it saves our team hours of work every single week. It's become the backbone of how we ship content.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Jane Smith",
    title: "Content Creator, Studio Nine",
    content:
      "Content creation is genuinely effortless now. The AI tools help us produce high-quality work faster than we ever thought possible.",
    rating: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: "David Lee",
    title: "Content Writer, Northwind",
    content:
      "From titles to images, everything lives in one fast, beautiful workspace. It transformed our entire process.",
    rating: 4,
  },
];

const SmallCard = ({ t }) => (
  <div className="glass hover:glass-strong transition-colors rounded-2xl p-5 flex-1">
    <div className="flex gap-1 mb-3">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < t.rating ? "fill-primary-soft text-primary-soft" : "text-low/40"
            }`}
          />
        ))}
    </div>
    <p className="text-mid text-sm leading-relaxed line-clamp-3">"{t.content}"</p>
    <div className="flex items-center gap-2.5 mt-4">
      <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
      <div>
        <h3 className="text-xs font-medium text-hi">{t.name}</h3>
        <p className="text-[11px] text-low">{t.title}</p>
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  const [featured, ...rest] = testimonials;

  return (
    <section className="px-4 sm:px-12 xl:px-24 py-16 max-w-6xl mx-auto">
      <Reveal className="mb-14" selector=".rv">
        <p className="rv inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-4">
          <span className="font-display text-low">03</span>
          <span className="w-8 h-px bg-primary/50" /> Loved by creators
        </p>
        <h2 className="rv font-display text-4xl sm:text-6xl font-semibold text-hi leading-[0.95] max-w-2xl">
          Don't just take our word for it.
        </h2>
      </Reveal>

      <Reveal className="grid lg:grid-cols-5 gap-5" y={40} stagger={0.12}>
        {/* featured */}
        <div className="lg:col-span-3 ring-gradient rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/15" />
          <div className="flex gap-1 mb-6">
            {Array(featured.rating)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary-soft text-primary-soft" />
              ))}
          </div>
          <p className="font-display text-2xl sm:text-3xl text-hi leading-snug max-w-xl">
            "{featured.content}"
          </p>
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-line">
            <img
              src={featured.image}
              alt={featured.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div>
              <h3 className="font-medium text-hi">{featured.name}</h3>
              <p className="text-sm text-low">{featured.title}</p>
            </div>
          </div>
        </div>

        {/* supporting column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {rest.map((t, i) => (
            <SmallCard key={i} t={t} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default Testimonial;
