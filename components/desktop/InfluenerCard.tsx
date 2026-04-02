import Image from "next/image";

type Props = {
    image: string;
    name: string;
    type: string;
    bgColor?: string;
};

export default function InfluencerCard({
    image,
    name,
    type,
    bgColor = "bg-gray-200",
}: Props) {
    return (
        <div className="group shrink-0">
            <div className="relative h-[518px] w-[376px] overflow-hidden rounded-[32px]">

                {/* Image */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Tag */}
                <div className={`absolute right-5 top-5 rounded-full px-6 py-2 ${bgColor}`}>
                    <span className="text-[14px] font-medium uppercase text-black">
                        {type}
                    </span>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">

                    {/* Name */}
                    <div className="flex items-center gap-3 rounded-full bg-[#063746B2]/80 px-4 py-2 backdrop-blur-md">
                        <span className="text-[16px] text-white">{name}</span>
                        <img
                            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c6dfd82-c580-49a7-be40-a53090c65400/public"
                            alt="flag"
                            className="h-5 w-5 rounded-sm object-cover"
                        />
                    </div>

                    {/* Plus */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80">
                        <svg
                            className="h-5 w-5 text-[#012F3B]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    );
}