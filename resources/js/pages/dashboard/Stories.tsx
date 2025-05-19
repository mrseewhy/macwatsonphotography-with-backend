import Modal from '@/components/dashboard/Modal';
import CreateResourceForm from '@/components/dashboard/Stories/CreateStory';
import StoriesTable from '@/components/dashboard/Stories/StoriesTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stories',
        href: '/dashboard/stories',
    },
];

export default function Users({ stories }) {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stories" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div>
                    <Button onClick={() => setShowCreate(true)} className="bg-black px-6 py-2 font-semibold text-white">
                        {' '}
                        + Add New Image To Stories
                    </Button>
                    <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                        <CreateResourceForm stories={stories} setShowCreate={setShowCreate} />
                    </Modal>
                </div>
                <div>
                    <StoriesTable stories={stories} />
                </div>
            </div>
        </AppLayout>
    );
}
