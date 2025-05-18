import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React, { FC, KeyboardEvent, useEffect, useState } from 'react';

// Define types for image data
interface ImageItem {
    id: number;
    src: string;
    alt: string;
    category: string;
    size: 'small' | 'medium' | 'large'; // Assuming these are the only possible sizes
}

// Define props for ImageSkeleton component
interface ImageSkeletonProps {
    className?: string;
}

// Custom Skeleton Component
const ImageSkeleton: FC<ImageSkeletonProps> = ({ className = '' }) => (
    <div className={`animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`} />
);

const images: ImageItem[] = [
    {
        id: 1,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367317/PRINTS_1_rioaiv.jpg',
        alt: 'Image 1',
        category: 'Portraits',
        size: 'small',
    },
    {
        id: 2,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432434/dji_fly_20241119_142052_108_1732047499230_photo_x04pgu.jpg',
        alt: 'Image 2',
        category: 'Drone shots',
        size: 'large',
    },
    {
        id: 3,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367306/PRINTS_2_iaatwf.jpg',
        alt: 'Image 3',
        category: 'Portraits',
        size: 'small',
    },
    {
        id: 4,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367590/Image_07-01-2025_at_06.55_ukltnp.jpg',
        alt: 'Image 3',
        category: 'Portraits',
        size: 'small',
    },
    {
        id: 5,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431629/DSC_0041_2_sosoeu.jpg',
        alt: 'Image 4',
        category: 'Stories',
        size: 'small',
    },
    {
        id: 6,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367786/PRINTS_4_gkoiis.jpg',
        alt: 'Image 5',
        category: 'Portraits',
        size: 'large',
    },
    // { id: 7, src: 'https://res.cloudinary.com/dvmobuvar/image/upload/w_1000/q_auto/f_auto/v1738367595/Image_10-12-2024_at_23.48_cnelfc.jpg', alt: 'Image 6', category: 'Drone shots', size: 'small' },
    {
        id: 8,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738366433/macwatson/twsdyvfwphntz3c40kvs.jpg',
        alt: 'Image 6',
        category: 'Portraits',
        size: 'small',
    },
    {
        id: 9,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431620/DSC_0091_dxkmqt.jpg',
        alt: 'Image 7',
        category: 'Stories',
        size: 'small',
    },
    {
        id: 10,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738367589/Image_07-01-2025_at_06.58_vjeqtb.jpg',
        alt: 'Image 8',
        category: 'Portraits',
        size: 'small',
    },
    {
        id: 11,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432433/dji_fly_20241120_180354_127_1732170382814_photo_giczxl.jpg',
        alt: 'Image 9',
        category: 'Drone shots',
        size: 'small',
    },
    {
        id: 12,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432433/dji_fly_20241121_123650_141_1732466191209_photo_d7ehdf.jpg',
        alt: 'Image 9',
        category: 'Drone shots',
        size: 'small',
    },
    {
        id: 13,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738432431/dji_fly_20241120_153842_121_1732170544059_photo_2_g4xmit.jpg',
        alt: 'Image 11',
        category: 'Drone shots',
        size: 'large',
    },
    {
        id: 14,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431619/_ARW7750_2_prghjn.jpg',
        alt: 'Image 12',
        category: 'Published works',
        size: 'small',
    },
    {
        id: 15,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431612/DSC_0090_1_2_jwla2n.jpg',
        alt: 'Image 12',
        category: 'Published works',
        size: 'small',
    },
    {
        id: 16,
        src: 'https://res.cloudinary.com/dvmobuvar/image/upload/v1738431611/IMG_3888_nexoiq.jpg',
        alt: 'Image 12',
        category: 'Stories',
        size: 'small',
    },
];

const categories: string[] = ['all', 'Stories', 'Published works', 'Portraits', 'Drone shots', 'Prints'];

const Home: FC = () => {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (imageId: number) => {
        setLoadedImages((prev) => ({
            ...prev,
            [imageId]: true,
        }));
    };

    const openPopup = (image: ImageItem) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        // Ensure selectedImage is not null before proceeding
        if (!selectedImage) return;

        const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter);
        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
        let newIndex: number;

        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedImage(filteredImages[newIndex]);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!selectedImage) return;

        if (e.key === 'Escape') closePopup();
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
    };

    useEffect(() => {
        // Add event listener to the window
        window.addEventListener('keydown', handleKeyPress as any); // Type assertion needed for event listener

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyPress as any); // Type assertion needed for event listener
        };
    }, [selectedImage]); // Dependency array includes selectedImage

    const filteredImages: ImageItem[] = filter === 'all' ? images : images.filter((img) => img.category === filter);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <>
                <section className="mt-6 flex items-center justify-center pl-6 lg:pr-24">
                    <div className="text-left">
                        <p className="font-lato text-sm tracking-wide text-gray-500 uppercase">Macwatson Photography</p>
                        <h1 className="font-exo mt-2 text-3xl leading-[48px] font-bold text-black lg:text-5xl">
                            Photography is the poetry of vision. <br />
                            <span className="font-medium text-gray-400"> Where light and time shape fleeting moments into timeless art.</span>
                        </h1>
                    </div>
                </section>
            </>
            <>
                <div className="mt-16 mb-12 p-4">
                    {/* Filter Section - Updated for better mobile responsiveness */}
                    <div className="mb-8">
                        <div className="font-lato flex flex-wrap gap-2 text-sm">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`rounded-full px-4 py-2 whitespace-nowrap transition-all duration-300 ${
                                        filter === category ? 'bg-black text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {category === 'all' ? 'All' : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rest of the component remains the same */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredImages.map((image) => (
                            <div
                                key={image.id}
                                className={`group relative aspect-square cursor-pointer ${
                                    image.size === 'large' ? 'md:col-span-2 md:row-span-2' : image.size === 'medium' ? 'md:row-span-2' : ''
                                }`}
                                onClick={() => openPopup(image)}
                            >
                                {(loading || !loadedImages[image.id]) && <ImageSkeleton className="absolute inset-0" />}
                                <div className="relative h-full w-full overflow-hidden rounded-lg">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className={`h-full w-full rounded-lg object-cover shadow-lg transition-all duration-500 group-hover:scale-105 ${
                                            loadedImages[image.id] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        onLoad={() => handleImageLoad(image.id)}
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal remains the same */}
                    {selectedImage && (
                        <div
                            className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) closePopup();
                            }}
                        >
                            <div className="h-90[vh] relative aspect-video">
                                <span
                                    onClick={closePopup}
                                    className="absolute top-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600"
                                >
                                    <button
                                        className="z-50 cursor-pointer text-3xl text-white transition-colors hover:text-gray-300"
                                        aria-label="Close"
                                    >
                                        &times;
                                    </button>
                                </span>

                                <div className="relative flex h-[90vh] items-center justify-center">
                                    <img src={selectedImage.src} alt={selectedImage.alt} className="h-full w-full rounded-lg object-cover" />
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('prev');
                                    }}
                                    className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-2xl text-black transition-all"
                                    aria-label="Previous image"
                                >
                                    &#10094;
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('next');
                                    }}
                                    className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-2xl text-black transition-all"
                                    aria-label="Next image"
                                >
                                    &#10095;
                                </button>
                            </div>
                        </div>
                    )}

                    <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
                </div>
            </>
        </>
    );
};

// Home.layout = (page: React.ReactNode) => <MyLayout>{page}</MyLayout>;

type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Home as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Home;
