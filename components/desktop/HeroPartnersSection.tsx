const heroPartners = [
  { name: "Vesta Global", logo: "/images/partners/partner_vg.png" },
  { name: "Brother", logo: "/images/partners/partner_brother.png" },
  { name: "Mediterra", logo: "/images/partners/partner_meditera.png" },
  { name: "Bizim Mutfak", logo: "/images/partners/partner_bizim.png" },
  { name: "Optimum", logo: "/images/partners/partner_optimum.png" },
  { name: "CollaSel", logo: "/images/partners/partner_collasel.png" },
  { name: "SelJel", logo: "/images/partners/partner_seljel.png" },
];

export default function HeroPartnersSection() {
  return (
    <section className="bg-[#F8F9F8] py-16 px-[75px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#2D4A4B] font-heading text-xl font-semibold mb-12">
          Partners
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-60">
          {heroPartners.map((partner, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
