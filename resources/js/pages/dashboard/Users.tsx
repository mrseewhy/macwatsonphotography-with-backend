import Modal from '@/components/dashboard/Modal';
import RegistrationForm from '@/components/dashboard/Users/CreateUser';
import UserTable from '@/components/dashboard/Users/UsersTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/dashboard/users',
    },
];

export default function Users({ users }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Create new user
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <RegistrationForm setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <UserTable users={users} />
                </div>
            </div>
        </AppLayout>
    );
}
