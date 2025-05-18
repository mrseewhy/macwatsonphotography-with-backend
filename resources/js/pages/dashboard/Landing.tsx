import Modal from '@/components/dashboard/Modal';

import RegistrationForm from '@/components/dashboard/Landing/CreateLanding';
import LandingTable from '@/components/dashboard/Landing/LandingTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Landing Page Images',
        href: '/dashboard/landing',
    },
];

export default function Landing({ LandingImages }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Add New Image To Landing Page
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <RegistrationForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <LandingTable LandingImages={LandingImages} />
                </div>
            </div>
        </AppLayout>
    );
}
