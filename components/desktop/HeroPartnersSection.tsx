const heroPartners = [
  { name: "Vesta Global", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df6e0710-2d50-486d-5f59-5e751559e900/public" },
  { name: "Brother", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/86b61c21-9a9c-439a-317a-85b52a8e1200/public" },
  { name: "Mediterra", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c4b8d5eb-29a6-4b39-cf0e-bcb6da555800/public" },
  { name: "Bizim Mutfak", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fd4760d4-1dac-4f11-1800-7c8f7e1dfa00/public" },
  { name: "Optimum", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b22ddb7-f87d-499e-df17-ae9efd2e5200/public" },
  { name: "CollaSel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e47e5b16-132e-40ee-537a-2d44a3283d00/public" },
  { name: "SelJel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4c453b6d-12e2-4fb3-f7d3-75d85e1a5200/public" },
];

export default function HeroPartnersSection() {
  return (
    <section className="bg-[#F8F9F8] py-16 px-[75px]">
      <div className="">
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
