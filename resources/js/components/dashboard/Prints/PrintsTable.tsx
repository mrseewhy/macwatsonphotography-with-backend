import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import ModifiedResourceForm from './EditPrints';

type Print = {
    id: number;
    title: string;
    size: string;
    range: string;
    amount: number;
    type: 'link' | 'Upload';
    path: string;
};

const PrintsTable: React.FC = ({ allPrints }) => {
    const [loading, setLoading] = useState(true);
    const [selectedPrintId, setSelectedPrintId] = useState<number | null>(null);
    const [showEdit, setShowEdit] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<number | null>(null);
    const [chosenPrint, setChosenPrint] = useState<Print | null>(null);
    const prints = allPrints.data;
    const [printToDelete, setPrintToDelete] = useState<Print | {}>({});
    const { data, delete: destroy, setData, errors, processing, reset } = useForm(printToDelete);

    // Simulate loading state
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);
    // Get the selected drone based on ID
    const selectedPrint = prints.find((print) => print.id === selectedPrintId);

    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleEdit = (id: number) => {
        const printToEdit = prints.find((print) => print.id === id);
        if (printToEdit) {
            setChosenPrint(printToEdit);
            setShowEdit(id);
        }
    };

    const handleDelete = (id: number) => {
        const foundPrint = prints.find((print) => print.id === id);
        setPrintToDelete(foundPrint);
        setShowDelete(foundPrint.id);
        setData({
            ...foundPrint,
        });
    };

    const confirmDelete = () => {
        // Perform delete action here
        destroy(
            route('prints.destroy', printToDelete.id),

            {
                preserveState: true,
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

                    setPrintToDelete({});
                    reset();
                    setShowDelete(null);
                    router.reload();
                    return;
                },
                onError: (error) => {
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
            },
        );
    };

    return (
        <div className="w-full overflow-x-auto">
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : prints.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No Prints Images Were Found.</div>
            ) : (
                <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-300">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Range | Number </th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {prints.map((print, index) => (
                                <tr key={print.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3">{print.title || 'No title'}</td>
                                    <td className="px-4 py-3">{print.size || 'N/A'}</td>
                                    <td className="px-4 py-3">{print.range || 'N/A'}</td>
                                    <td className="px-4 py-3">{formatAmount(print.amount) || '$0'}</td>
                                    <td className="px-4 py-3">{print.type}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            onClick={() => setSelectedPrintId(print.id)}
                                            src={print.path}
                                            alt={print.title}
                                            className="h-24 w-24 cursor-pointer rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleEdit(print.id)} className="mr-4 text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(print.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Image Modal */}
            {selectedPrint && (
                <Modal show={selectedPrintId !== null} onClose={() => setSelectedPrintId(null)}>
                    <div className="flex h-[80vh] w-full items-center justify-center">
                        <img src={selectedPrint.path} alt={selectedPrint.title} className="max-h-full max-w-full object-cover" />
                    </div>
                </Modal>
            )}

            {/* Edit Modal */}
            <Modal show={showEdit !== null} onClose={() => setShowEdit(null)}>
                <ModifiedResourceForm
                    chosenPrint={chosenPrint}
                    print={prints.find((print) => print.id === showEdit)}
                    onClose={() => setShowEdit(null)}
                />
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDelete !== null} onClose={() => setShowDelete(null)}>
                <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
                    <h2 className="text-lg font-bold">Confirm Delete?</h2>
                    <p>Are you sure you want to delete the selected print image?</p>
                    <p className="text-lg font-bold">{printToDelete.title}</p>

                    <p className="text-sm text-red-600"> This step cannot be reversed </p>

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
            {/* Pagination */}
            {!loading && allPrints && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {allPrints.links.map((link, index) => (
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
        </div>
    );
};

export default PrintsTable;
