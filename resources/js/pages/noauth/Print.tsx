import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// Define the type for a single card object
interface CardData {
    title: string;
    price: string;
    number: string;
    inches: string;
    imageUrl: string;
}

// Define the type for the cards data array
const cardsData: CardData[] = [
    {
        title: 'It takes a village',
        price: '$80',
        number: '0-10',
        inches: '12 by 15 inches',
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433584/DSC_0170_rmtktc.jpg',
    },
    {
        title: 'TIRED BODY, VIBRANT SOUL',
        price: '$80',
        number: '0-10',
        inches: '12 by 15 inches',
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433567/IMG_3816_lnuxnh.jpg',
    },
    {
        title: 'HIGH FASHION',
        price: '$80',
        number: '0-10',
        inches: '12 by 15 inches',
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433582/DSC_0205_2_p0cdbi.jpg',
    },
    {
        title: 'SOLACE',
        price: '$80',
        number: '0-10',
        inches: '12 by 15 inches',
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433564/DSC_0077_3_2_qigdlb.jpg',
    },
    {
        title: 'OLOKUN',
        price: '$80',
        number: '0-10',
        inches: '12 by 15 inches',
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433569/_ARW7736_2_uxwe2k.jpg',
    },
];

// Define the type for ImageModal props
interface ImageModalProps {
    imageUrl: string | null; // imageUrl can be null when not selected
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    // Only render if imageUrl is provided
    if (!imageUrl) {
        return null;
    }

    return (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={onClose}>
            <div className="relative h-[96vh]">
                <span
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600"
                >
                    <button className="cursor-pointer text-3xl text-white">&times;</button>
                </span>
                <img src={imageUrl} alt="Full size" className="h-[90vh] object-cover" />
            </div>
        </div>
    );
};

const Print: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Prints</title>
            </Head>
            <>
                <div className="mb-12 p-4">
                    {/* Section with Image and Text */}
                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* Image on the Left (Top on Mobile) */}
                        <div className="flex-1">
                            <img
                                src="/images/1.JPG" // Replace with your image path
                                alt="MacWatson"
                                className="h-auto w-full rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Text on the Right (Bottom on Mobile) */}
                        <div className="flex flex-1 items-center">
                            <div className="text-left">
                                <h2 className="font-exo mb-4 text-3xl font-bold">Buy or gift a friend a print.</h2>

                                <p className="font-lato mb-4 text-gray-800">
                                    {' '}
                                    This are handpicked fine art portrait, limited edition, carefully selected Each print will be signed and assigned
                                    a certificate of authenticity. If you want your prints framed, that will be done for free.{' '}
                                </p>

                                <p className="font-lato mb-4 text-gray-800">Print material : Art - Archival Matte Paper</p>

                                <h2 className="font-exo mb-4 text-2xl font-bold">To order a print</h2>
                                <p className="font-lato mb-4 text-gray-800">Send a mail to macwatsonphotos@gmail.com</p>

                                <p className="font-lato mb-4 text-gray-800">or Contact +2348021063688</p>

                                <p className="font-lato mb-4 text-gray-800">Kindly note that shipping isn&#39;t free.</p>

                                <p className="font-lato mb-4 text-gray-800">Delivery within Nigeria takes between 2 - 7 days.</p>

                                <p className="font-lato mb-4 text-gray-800">Have a custom print request? Send a mail.</p>

                                <p className="font-lato mb-4 text-gray-800">Thank you!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <>
                <div className="mb-12 p-4">
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="animate-pulse rounded-lg bg-gray-200 shadow-md">
                                    <div className="h-96 rounded-t-lg bg-gray-300"></div>
                                    <div className="p-4">
                                        <div className="h-6 w-3/4 rounded bg-gray-300"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {cardsData.map((card, index) => (
                                <div key={index} className="block">
                                    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
                                        <div className="relative h-96 cursor-pointer" onClick={() => setSelectedImage(card.imageUrl)}>
                                            <img src={card.imageUrl} alt={card.title} className="h-96 w-full object-cover" />
                                        </div>
                                        <div className="bg-gray-100 p-4">
                                            <h3 className="font-exo text-xl font-semibold text-black uppercase transition-colors duration-300 hover:text-gray-800">
                                                {card.title}
                                            </h3>
                                            <p className="font-lato text-black">{card.inches}</p>
                                            <p className="font-lato text-black">{card.number}</p>
                                            <p className="font-lato text-black">{card.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Render ImageModal only if selectedImage is not null */}
                    {selectedImage !== null && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
                </div>
            </>
        </>
    );
};

// Define the type for the layout function expected by Inertia.js
// Assuming MyLayout is a React component that accepts children
type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Print as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Print;
