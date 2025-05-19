import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                    <div className="">
                        <div>
                            <p className="text-lg font-bold text-red-500"> Important Notice!!!</p>
                        </div>
                        <p>There are two was to upload images,</p>
                        <ol className="text-sm font-semibold">
                            <li>Via Direct Upload - Maximum 3MB</li>
                            <li>Via Link</li>
                        </ol>
                        <p>
                            I don't recommend direct upload because it makes the site larger -For Instance if you have 12 images that are 3mb each on
                            the homepage, asides the code it means the site will be 36mb.{' '}
                        </p>{' '}
                        <p className="mb-6">
                            So, I recommend using the link method. . Sign up at Cloudinary - They give free 25 gig of space specifically for
                            photography
                        </p>
                        <p className="mb-4">
                            <a
                                className="rounded-3xl bg-indigo-900 px-10 py-3 text-sm font-bold text-white"
                                href="https://cloudinary.com/"
                                target="_blank"
                            >
                                {' '}
                                Join Cloudinary Here{' '}
                            </a>{' '}
                        </p>
                    </div>

                    <div>
                        <div>
                            <p className="mb-4 font-semibold">For Stories, Publish Works, Portraits, Drone Shots.</p>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                If you had title and description you get this
                                <img src="/images/with-card.png" className="h-48" />
                            </div>
                            <div>
                                With no title or description you get
                                <img src="/images/no-title.png" className="h-48" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <ul className="text-sm">
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/users"> Add New User</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/landing"> Add New Image To Landing page (Home Page)</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/stories"> Add New Images To Stories</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/published"> Add new Image To Published Works</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/portraits"> Add new Image To Portraits</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/drones"> Add new Image To Drone Shots</Link>
                            </li>
                            <li className="font-semibold transition-all duration-300 hover:translate-x-2">
                                {' >'} <Link href="/dashboard/prints"> Add new Image To Prints</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
