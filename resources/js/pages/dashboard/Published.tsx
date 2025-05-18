import Modal from '@/components/dashboard/Modal';
import CreateResourceForm from '@/components/dashboard/Published/CreatePublished';
import PublishedTable from '@/components/dashboard/Published/PublishedTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Published Works',
        href: '/dashboard/published',
    },
];

export default function Users({ publisheds }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Published Works" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Add New Image To Published Works
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <CreateResourceForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <PublishedTable allPublished={publisheds} />
                </div>
            </div>
        </AppLayout>
    );
}
