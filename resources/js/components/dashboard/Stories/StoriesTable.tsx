import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import EditStory from './EditStory';

interface Story {
    id: number;
    title?: string;
    description?: string;
    type?: string;
    path: string;
}

interface StoryPagination {
    data: Story[];
}

const StoriesTable: React.FC<{ stories: StoryPagination }> = ({ stories }) => {
    const [loading, setLoading] = useState(true);
    const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
    const [showEdit, setShowEdit] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<number | null>(null);
    const [expandedStoryIds, setExpandedStoryIds] = useState<number[]>([]);
    const [idToDelete, setIdToDelete] = useState();
    const [idToEdit, setIdToEdit] = useState();
    const [imageToEdit, setImageToEdit] = useState<Story | {}>({});

    const {
        data,
        delete: destroy,
        setData,
        errors,
        processing,
        reset,
    } = useForm<Story>({
        id: null,
        title: '',
        description: '',
        type: '',
        path: '',
    });

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    const selectedStory = stories.data.find((story) => story.id === selectedStoryId) ?? null;

    const handleEdit = (id: number) => {
        const mystory = stories.data.find((story) => story.id === id);
        setIdToEdit(mystory.id);
        setImageToEdit(mystory);
        setShowEdit(mystory.id);
    };
    const handleDelete = (id: number) => {
        const mystory = stories.data.find((story) => story.id === id);
        setIdToDelete(mystory.id);
        setShowDelete(mystory.id);
    };

    const confirmDelete = () => {
        destroy(route('stories.destroy', idToDelete), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Image Deleted Successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                setShowDelete(null);
                reset();
                router.reload();
                return;
            },
            onError: () => {
                toast.error('Error Deleting Image', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                return;
            },
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : stories.data.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No Stories Image found.</div>
            ) : (
                <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-300">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {stories.data.map((story, index) => (
                                <tr key={story.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3">{story.title ?? 'No title'}</td>
                                    <td className="px-4 py-3">
                                        {story.description ? (
                                            <>
                                                {story.description.length > 50 && !expandedStoryIds.includes(story.id)
                                                    ? `${story.description.slice(0, 50)}... `
                                                    : story.description}

                                                {story.description.length > 50 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setExpandedStoryIds((prev) =>
                                                                prev.includes(story.id) ? prev.filter((id) => id !== story.id) : [...prev, story.id],
                                                            )
                                                        }
                                                        className="ml-1 text-sm text-blue-500 hover:underline"
                                                    >
                                                        {expandedStoryIds.includes(story.id) ? '[-]' : '[+]'}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-gray-500">No description</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <img
                                            onClick={() => setSelectedStoryId(story.id)}
                                            src={story.path}
                                            alt={story.title ?? 'Story image'}
                                            className="h-24 w-24 cursor-pointer rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleEdit(story.id)} className="mr-4 text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(story.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Pagination */}
            {!loading && stories && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {stories.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`rounded-lg px-3 py-1 text-sm ${
                                link.active
                                    ? 'bg-indigo-600 text-white'
                                    : link.url
                                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                      : 'cursor-not-allowed text-gray-400'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {selectedStory && (
                <Modal show={selectedStoryId !== null} onClose={() => setSelectedStoryId(null)}>
                    <div className="flex h-[80vh] w-full items-center justify-center">
                        <img src={selectedStory.path} alt={selectedStory.title ?? 'Story image'} className="max-h-full max-w-full object-cover" />
                    </div>
                </Modal>
            )}

            {showEdit !== null && stories.data.find((story) => story.id === showEdit) && (
                <Modal show={true} onClose={() => setShowEdit(null)}>
                    <EditStory
                        story={stories.data.find((story) => story.id === showEdit)!}
                        onClose={() => setShowEdit(null)}
                        imageToEdit={imageToEdit}
                        setShowEdit={setShowEdit}
                    />
                </Modal>
            )}

            {showDelete !== null && (
                <Modal show={true} onClose={() => setShowDelete(null)}>
                    <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
                        <h2 className="text-lg font-bold">Confirm Delete</h2>
                        <p>Are you sure you want to delete this story image?</p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button onClick={() => setShowDelete(null)} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default StoriesTable;
