import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// Define the type for a gallery item
interface GalleryItem {
    id: number;
    path: string;
    type: 'link' | 'upload';
    title?: string;
    description?: string;
}

const Drone: React.FC = ({ drones: galleryData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

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

    const toggleDescription = (id: number) => {
        setExpandedDescriptions((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
    };

    // Function to get the correct image path based on type
    const getImagePath = (item: GalleryItem) => {
        return item.path;
    };

    // Function to check if a description is expanded
    const isDescriptionExpanded = (id: number) => {
        return expandedDescriptions.includes(id);
    };

    // Function to truncate description text
    const getTruncatedDescription = (description: string, id: number) => {
        if (isDescriptionExpanded(id) || !description) {
            return description;
        }

        // Limit description to 30 characters to keep "View More" on same line
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
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
            </>
            <>
                <div className="mb-12 p-4">
                    {/* Skeleton Loader or Gallery Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="h-96 animate-pulse rounded-lg bg-gray-200 shadow-md">
                                    <div className="h-full rounded-t-lg bg-gray-300"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {galleryData.map((image) => (
                                <div
                                    key={image.id}
                                    className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg ${isDescriptionExpanded(image.id) ? '' : 'h-96'}`}
                                >
                                    {image.title ? (
                                        // Card with text (expands downward when "View More" is clicked)
                                        <div className="flex flex-col">
                                            {/* Image section - fixed height regardless of expansion */}
                                            <div className="relative h-80" onClick={() => openGallery(image)}>
                                                <img src={getImagePath(image)} alt={image.title} className="h-full w-full object-cover" />
                                            </div>

                                            {/* Text section - always keeps the same initial height */}
                                            <div className="bg-white p-3">
                                                {/* Title - now text-base */}
                                                <h3 className="truncate text-base font-semibold">{image.title}</h3>

                                                {/* Description + toggle button */}
                                                {image.description && (
                                                    <div className="mt-1 flex items-center justify-between">
                                                        <div
                                                            className={`text-sm break-all text-gray-700 ${isDescriptionExpanded(image.id) ? '' : 'max-w-[75%]'}`}
                                                        >
                                                            {isDescriptionExpanded(image.id)
                                                                ? image.description
                                                                : getTruncatedDescription(image.description, image.id)}
                                                        </div>

                                                        {image.description.length > 50 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleDescription(image.id);
                                                                }}
                                                                className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                                                            >
                                                                {isDescriptionExpanded(image.id) ? 'View Less' : 'View More'}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        // Image only - fixed height
                                        <div className="h-96" onClick={() => openGallery(image)}>
                                            <img src={getImagePath(image)} alt={`Gallery Image ${image.id}`} className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Gallery Popup - Images Only */}
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

                                {/* Image Only */}
                                <div className="relative flex items-center justify-center">
                                    <img
                                        src={getImagePath(selectedImage)}
                                        alt={selectedImage.title || `Gallery Image ${selectedImage.id}`}
                                        className="max-h-[90vh] max-w-full object-contain"
                                    />
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('prev');
                                    }}
                                    className="bg-opacity-50 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 text-2xl text-black"
                                >
                                    &#10094;
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImage('next');
                                    }}
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

// Define the type for the layout function

type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Drone as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Drone;
