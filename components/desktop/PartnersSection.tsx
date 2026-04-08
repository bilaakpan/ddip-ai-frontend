const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eebd38e3-7038-4900-5397-fe58af26e000/public" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

export default function PartnersSection() {
  return (
    <section className="bg-light-bg py-20">
      <div className="px-[60px]">
        <h2 className="font-heading text-[80px] font-medium uppercase leading-[0.99] text-[#063746]">
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
                  className="max-h-[80px] max-w-[180px] object-contain"
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
