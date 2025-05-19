import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import { Instagram, MailCheck, Phone, PhoneCall, Twitter } from 'lucide-react';
import React from 'react';

const Contact: React.FC = () => {
    return (
        <>
            <Head>
                <title>Contact Me</title>
            </Head>
            <>
                <div className="mb-12 p-4">
                    {/* Section with Image and Contact Info */}
                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* Image on the Left (Top on Mobile) */}
                        <div className="flex-1">
                            <img
                                src="/images/11.jpg" // Replace with your image path
                                alt="MacWatson"
                                className="h-auto w-full rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Contact Info on the Right (Bottom on Mobile) */}
                        <div className="flex flex-1 items-center">
                            <div className="w-full text-left">
                                {/* Header */}
                                <h2 className="font-exo mb-6 text-3xl font-bold">Contact Me</h2>
                                <p className="font-lato mb-4 text-gray-800">
                                    MacWatson Photography is based in Lagos, Nigeria, and available for local & international assignments.
                                </p>
                                {/* Social Media Icons */}
                                <div className="mb-8 flex space-x-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                                        <a
                                            href="mailto:macwatsonphotos@gmail.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white transition-colors hover:text-pink-600"
                                            aria-label="Email"
                                        >
                                            <MailCheck size={28} />
                                        </a>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                                        <a
                                            href="https://x.com/macwatson20"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white transition-colors hover:text-blue-500"
                                            aria-label="Twitter (X)"
                                        >
                                            <Twitter size={28} />
                                        </a>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                                        <a
                                            href="https://www.instagram.com/macwatsonphotography"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white transition-colors hover:text-blue-700"
                                            aria-label="Instagram"
                                        >
                                            <Instagram size={28} />
                                        </a>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                                        <a
                                            href="https://www.instagram.com/aduke_films"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white transition-colors hover:text-red-600"
                                            aria-label="Instagram"
                                        >
                                            <Instagram size={28} />
                                        </a>
                                    </div>
                                </div>

                                {/* Cards for Contact Information */}
                                <div className="space-y-4">
                                    {/* Email Card */}

                                    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
                                        {/* Lucide Mail Icon */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                                            <MailCheck className="h-6 w-6 text-gray-50" />
                                        </div>
                                        {/* Email Text */}
                                        <div>
                                            <h3 className="font-exo mb-1 text-xl font-semibold">Email</h3>
                                            <p className="font-lato text-gray-800">
                                                <a href="mailto:macwatsonphotos@gmail.com" className="hover:underline">
                                                    macwatsonphotos@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone Card */}
                                    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
                                        {/* Lucide Phone Icon */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                                            <PhoneCall className="h-6 w-6 text-gray-50" />
                                        </div>
                                        {/* Phone Text */}
                                        <div>
                                            <h3 className="font-exo mb-1 text-xl font-semibold">Phone</h3>
                                            <p className="font-lato text-gray-800">
                                                <a href="tel:2348021063688" className="hover:underline">
                                                    +234 802 106 3688
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* WhatsApp Card */}
                                    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
                                        {/* Lucide Phone Icon */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                                            <Phone className="h-6 w-6 text-gray-50" />
                                        </div>
                                        {/* Phone Text */}
                                        <div>
                                            <h3 className="font-exo mb-1 text-xl font-semibold">WhatsApp</h3>
                                            <p className="font-lato text-gray-800">
                                                <a href="tel:2348021063688" className="hover:underline">
                                                    +234 802 106 3688
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

// Contact.layout = (page: React.ReactNode) => <MyLayout>{page}</MyLayout>;
type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(Contact as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

export default Contact;
