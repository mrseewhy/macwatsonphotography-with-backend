import CreateResourceForm from '@/components/dashboard/Drones/CreateDrone';
import DroneTable from '@/components/dashboard/Drones/DronesTable';
import Modal from '@/components/dashboard/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Drone Shots',
        href: '/dashboard/drones',
    },
];

export default function Users({ drones }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Drone Shots" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Add New Image To Drone Shots
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <CreateResourceForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <DroneTable drones={drones} />
                </div>
            </div>
        </AppLayout>
    );
}
