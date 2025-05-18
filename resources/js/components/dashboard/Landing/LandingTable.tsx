import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import ModifiedImageForm from './EditLanding';

type LandingImage = {
    id: number;
    category: string;
    size: string;
    type: 'Link' | 'Upload';
    file: File | null;
    path: string;
};

const LandingTable: React.FC = ({ LandingImages }) => {
    const [loading, setLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const [showEdit, setShowEdit] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<number | null>(null);
    const images = LandingImages.data;
    const [imageToDelete, setImageToDelete] = useState<LandingImage | {}>({});
    const [imageToEdit, setImageToEdit] = useState<LandingImage | {}>({});
    const { data, delete: destroy, setData, errors, processing, reset } = useForm(imageToDelete);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // Get the selected image based on ID
    const selectedImage = images.find((image) => image.id === selectedImageId) ?? null;

    const handleEdit = (id: number) => {
        const imageToEdit = images.find((image) => image.id === id);
        if (imageToEdit) {
            setImageToEdit(imageToEdit);
            setShowEdit(id);
        }
    };

    const handleDelete = (id: number) => {
        const foundImage = images.find((image) => image.id === id);
        setImageToDelete(foundImage);
        setShowDelete(foundImage.id);
    };
    const confirmDelete = () => {
        destroy(route('landing.destroy', imageToDelete.id), {
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
                reset();
                setShowDelete(null);
                setImageToDelete({});
                router.reload();
                return;
            },
            onError: () => {
                toast.error(`Problem Deleting Image`, {
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
            ) : images.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No Landing Page Image Found .</div>
            ) : (
                <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-300">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {images.map((image, index) => (
                                <tr key={image.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3 capitalize">{image.category}</td>
                                    <td className="px-4 py-3 capitalize">{image.size}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            onClick={() => setSelectedImageId(image.id)}
                                            src={image.path}
                                            alt={`${image.category} - ${image.size}`}
                                            className="h-24 w-24 cursor-pointer rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleEdit(image.id)} className="mr-4 text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(image.id)} className="text-red-600 hover:underline">
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
            {!loading && LandingImages && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {LandingImages.links.map((link, index) => (
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
            {/* Image Modal */}
            {selectedImage && (
                <Modal show={selectedImageId !== null} onClose={() => setSelectedImageId(null)}>
                    <div className="flex h-[80vh] w-full items-center justify-center">
                        <img
                            src={selectedImage.path}
                            alt={`${selectedImage.category} - ${selectedImage.size}`}
                            className="max-h-full max-w-full object-cover"
                        />
                    </div>
                </Modal>
            )}

            {/* Edit Modal */}
            <Modal show={showEdit !== null} onClose={() => setShowEdit(null)}>
                {/* <ModifiedImageForm image={images.find((image) => image.id === showEdit)} onClose={() => setShowEdit(null)} /> */}
                <ModifiedImageForm onClose={() => setShowEdit(null)} imageToEdit={imageToEdit} setShowEdit={setShowEdit} />
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDelete !== null} onClose={() => setShowDelete(null)}>
                <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
                    <h2 className="text-lg font-bold">Confirm Delete</h2>
                    <p>Are you sure you want to delete this item?</p>
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
        </div>
    );
};

export default LandingTable;
