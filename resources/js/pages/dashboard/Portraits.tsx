import Modal from '@/components/dashboard/Modal';
import CreateResourceForm from '@/components/dashboard/Portraits/CreatePortrait';
import PortraitTable from '@/components/dashboard/Portraits/PortraitsTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Portraits',
        href: '/dashboard/portraits',
    },
];

export default function Users({ portraits }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portraits" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Add New Image To Portraits
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <CreateResourceForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <PortraitTable portraits={portraits} />
                </div>
            </div>
        </AppLayout>
    );
}
