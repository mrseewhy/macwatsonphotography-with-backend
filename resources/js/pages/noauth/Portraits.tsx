import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// Define the type for a gallery image object
interface GalleryImage {
    id: number;
    imageUrl: string;
}

const galleryData: GalleryImage[] = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738366433/macwatson/twsdyvfwphntz3c40kvs.jpg',
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367306/PRINTS_2_iaatwf.jpg',
    },
    {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367317/PRINTS_1_rioaiv.jpg',
    },
    {
        id: 4,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367323/PRINTS_behphu.jpg',
    },
    {
        id: 5,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367589/Image_07-01-2025_at_06.58_vjeqtb.jpg',
    },
    {
        id: 6,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367590/Image_07-01-2025_at_06.55_ukltnp.jpg',
    },
    {
        id: 7,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367595/Image_10-12-2024_at_23.48_cnelfc.jpg',
    },
    {
        id: 8,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367786/PRINTS_4_gkoiis.jpg',
    },
    {
        id: 9,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431612/DSC_0090_1_2_jwla2n.jpg',
    },
    {
        id: 10,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738433564/DSC_0077_3_2_qigdlb.jpg',
    },
];

const Portraits: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        // Simulate a 2-second loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const openGallery = (image: GalleryImage): void => {
        setSelectedImage(image);
    };

    const closeGallery = (): void => {
        setSelectedImage(null);
    };

    const navigateImage = (direction: 'prev' | 'next'): void => {
        // Ensure selectedImage is not null before proceeding
        if (!selectedImage) {
            return;
        }

        const currentIndex = galleryData.findIndex((img) => img.id === selectedImage.id);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? galleryData.length - 1 : currentIndex - 1;
        } else {
            // direction === 'next'
            newIndex = currentIndex === galleryData.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedImage(galleryData[newIndex]);
    };

    return (
        <>
            <Head>
                <title>Portraits</title>
            </Head>
            <>
                <div className="p-4">
                    <h2 className="font-exo text-3xl font-bold">Portraits</h2>
                </div>
            </>
            <>
                <div className="mb-12 p-4">
                    {/* Skeleton Loader or Gallery Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="animate-pulse rounded-lg bg-gray-200 shadow-md">
                                    <div className="h-96 rounded-t-lg bg-gray-300"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {galleryData.map((image) => (
                                <div
                                    key={image.id}
                                    className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                                    onClick={() => openGallery(image)}
                                >
                                    {/* Image */}
                                    <div className="relative h-96">
                                        <img src={image.imageUrl} alt={`Gallery Image ${image.id}`} className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Gallery Popup */}
                    {selectedImage && (
                        <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                            <div className="relative flex items-center justify-center">
                                {/* Close Button */}
                                <span
                                    onClick={closeGallery}
                                    className="absolute top-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600"
                                >
                                    <button className="cursor-pointer text-3xl text-white">&times;</button>
                                </span>

                                {/* Image */}
                                <div className="relative flex items-center justify-center">
                                    <img src={selectedImage.imageUrl} alt={`Gallery Image ${selectedImage.id}`} className="h-[90vh] object-cover" />
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={() => navigateImage('prev')}
                                    className="bg-opacity-50 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-2xl text-black"
                                >
                                    &#10094;
                                </button>
                                <button
                                    onClick={() => navigateImage('next')}
                                    className="bg-opacity-50 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-2xl text-black"
                                >
                                    &#10095;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </>
    );
};

// Portraits.layout = (page: React.ReactNode): JSX.Element => <MyLayout>{page}</MyLayout>;
type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Portraits as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Portraits;
