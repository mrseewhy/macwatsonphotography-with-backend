import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// Define the type for a gallery item
interface GalleryItem {
    id: number;
    imageUrl: string;
}

const galleryData: GalleryItem[] = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432434/dji_fly_20241119_142052_108_1732047499230_photo_x04pgu.jpg',
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432433/dji_fly_20241120_180354_127_1732170382814_photo_giczxl.jpg',
    },
    {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432433/dji_fly_20241121_123650_141_1732466191209_photo_d7ehdf.jpg',
    },
    {
        id: 4,
        imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432431/dji_fly_20241120_153842_121_1732170544059_photo_2_g4xmit.jpg',
    },
    //   {
    //     id: 5,
    //     imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367323/PRINTS_behphu.jpg',
    //   },
    //   {
    //     id: 6,
    //     imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367323/PRINTS_behphu.jpg',
    //   },
    //   {
    //     id: 7,
    //     imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367323/PRINTS_behphu.jpg',
    //   },
    //   {
    //     id: 8,
    //     imageUrl: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367323/PRINTS_behphu.jpg',
    //   },
];

const Drone: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        // Simulate a 2-second loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const openGallery = (image: GalleryItem) => {
        setSelectedImage(image);
    };

    const closeGallery = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
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
                <title>Drone Shots</title>
            </Head>
            <>
                <div className="p-4">
                    <h2 className="font-exo text-3xl font-bold">Drone Shots</h2>
                </div>
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
                                            <img src={image.imageUrl} alt={`Gallery Image ${image.id}`} className="object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Gallery Popup */}
                        {selectedImage && (
                            <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                                <div className="relative w-full max-w-4xl">
                                    {/* Close Button */}
                                    <span
                                        onClick={closeGallery}
                                        className="absolute top-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600"
                                    >
                                        <button className="cursor-pointer text-3xl text-white">&times;</button>
                                    </span>

                                    {/* Image */}
                                    <div className="relative h-[80vh]">
                                        <img src={selectedImage.imageUrl} alt={`Gallery Image ${selectedImage.id}`} className="object-contain" />
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
        </>
    );
};

// Drone.layout = (page: React.ReactNode): React.ReactElement => <MyLayout>{page}</MyLayout>;

type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Drone as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Drone;
