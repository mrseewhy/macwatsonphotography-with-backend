import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import EditDrone from './EditDrone';

const DronesTable = ({ drones }) => {
    const [loading, setLoading] = useState(true);
    const [selecteddroneId, setSelecteddroneId] = useState<number | null>(null);
    const [showEdit, setShowEdit] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<number | null>(null);
    const [expandeddroneIds, setExpandeddroneIds] = useState<number[]>([]);
    const [idToDelete, setIdToDelete] = useState();
    const [idToEdit, setIdToEdit] = useState();
    const [imageToEdit, setImageToEdit] = useState({});

    const { data, delete: destroy, setData, errors, processing, reset } = useForm();

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    const selecteddrone = drones.data.find((drone) => drone.id === selecteddroneId) ?? null;

    const handleEdit = (id: number) => {
        const mydrone = drones.data.find((drone) => drone.id === id);
        setIdToEdit(mydrone.id);
        setImageToEdit(mydrone);
        setShowEdit(mydrone.id);
    };
    const handleDelete = (id: number) => {
        const mydrone = drones.data.find((drone) => drone.id === id);
        setIdToDelete(mydrone.id);
        setShowDelete(mydrone.id);
    };

    const confirmDelete = () => {
        destroy(route('drones.destroy', idToDelete), {
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
            ) : drones.data.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No Drone Shot Image found.</div>
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
                            {drones.data.map((drone, index) => (
                                <tr key={drone.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3">{drone.title ?? 'No title'}</td>
                                    <td className="px-4 py-3">
                                        {drone.description ? (
                                            <>
                                                {drone.description.length > 50 && !expandeddroneIds.includes(drone.id)
                                                    ? `${drone.description.slice(0, 50)}... `
                                                    : drone.description}

                                                {drone.description.length > 50 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setExpandeddroneIds((prev) =>
                                                                prev.includes(drone.id) ? prev.filter((id) => id !== drone.id) : [...prev, drone.id],
                                                            )
                                                        }
                                                        className="ml-1 text-sm text-blue-500 hover:underline"
                                                    >
                                                        {expandeddroneIds.includes(drone.id) ? '[-]' : '[+]'}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-gray-500">No description</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <img
                                            onClick={() => setSelecteddroneId(drone.id)}
                                            src={drone.path}
                                            alt={drone.title ?? 'drone image'}
                                            className="h-24 w-24 cursor-pointer rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleEdit(drone.id)} className="mr-4 text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(drone.id)} className="text-red-600 hover:underline">
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
            {!loading && drones && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {drones.links.map((link, index) => (
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

            {selecteddrone && (
                <Modal show={selecteddroneId !== null} onClose={() => setSelecteddroneId(null)}>
                    <div className="flex h-[80vh] w-full items-center justify-center">
                        <img src={selecteddrone.path} alt={selecteddrone.title ?? 'drone image'} className="max-h-full max-w-full object-cover" />
                    </div>
                </Modal>
            )}

            {showEdit !== null && drones.data.find((drone) => drone.id === showEdit) && (
                <Modal show={true} onClose={() => setShowEdit(null)}>
                    <EditDrone
                        drone={drones.data.find((drone) => drone.id === showEdit)!}
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
                        <p>Are you sure you want to delete this drone image?</p>
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

export default DronesTable;
