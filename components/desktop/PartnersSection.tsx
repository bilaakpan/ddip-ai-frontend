const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "/images/partners/google.svg" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

export default function PartnersSection() {
  return (
    <section className="bg-light-bg py-20">
      <div className="px-[60px]">
        <h2 className="font-heading text-[65px] font-medium uppercase leading-[0.99] text-[#063746]">
          Partners
        </h2>

        <div className="mt-12 grid grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-[240px] items-center justify-center border border-[#C3C3C3]"
            >
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-[60px] max-w-[140px] object-contain"
                />
              ) : (
                <span className="font-heading text-2xl font-semibold tracking-wide text-[#063746]/40 transition-colors hover:text-[#063746]">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
