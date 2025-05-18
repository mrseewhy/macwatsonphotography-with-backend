import Modal from '@/components/dashboard/Modal';
import ModifiedResourceForm from '@/components/dashboard/Prints/CreatePrints';
import PrintsTable from '@/components/dashboard/Prints/PrintsTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Prints',
        href: '/dashboard/prints',
    },
];

export default function Prints({ prints }) {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        + Add New Image To Prints
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <ModifiedResourceForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <PrintsTable allPrints={prints} />
                </div>
            </div>
        </AppLayout>
    );
}
