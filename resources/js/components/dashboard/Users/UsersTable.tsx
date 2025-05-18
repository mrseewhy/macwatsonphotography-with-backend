import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import RegistrationForm from './EditUser';
type User = {
    name: string;
    email: string;
};

const UserTable: React.FC = ({ users }) => {
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userToDelete, setUserToDelete] = useState<{}>({});
    const [userToEdit, setUserToEdit] = useState<{}>({});

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const { props } = usePage();
    const authUser = props.auth.user;
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const handleEdit = (id) => {
        setShowEdit(1);
        const user = users.data.find((user: User) => user.id === id);
        if (user) {
            setUserToEdit(user);
        }
    };

    const handleDelete = (id: number) => {
        setUserId(id);
        const user = users.data.find((user: User) => user.id === id);
        if (user) {
            setUserToDelete(user);
        }
        setShowDelete(1);
    };

    const confirmDelete = () => {
        // Logic to delete the user
        if (userId === authUser.id) {
            toast.error('You cannot delete yourself!', {
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
            return;
        }

        destroy(route('users.destroy', { user: userId }), {
            preserveState: true,
            onSuccess: () => {
                toast.success('User Deleted Successfully', {
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
                router.reload();
                return;
            },
            onError: (errors) => {
                toast.error('Something Went Wrong Went Deleting User! Try Again!', {
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
            ) : users.data.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No users found.</div>
            ) : (
                <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-300">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.data.map((user, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleEdit(user.id)} className="mr-4 text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <Modal show={showEdit} onClose={() => setShowEdit(false)}>
                                            <RegistrationForm user={userToEdit} setShowEdit={setShowEdit} />
                                        </Modal>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                        <Modal show={showDelete !== null} onClose={() => setShowDelete(null)}>
                                            <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
                                                <h2 className="text-lg font-bold">Confirm Delete</h2>
                                                <p>Are you sure you want to delete this User?</p>
                                                <p className="text-lg font-bold">{userToDelete.name}</p>
                                                <div className="mt-4 flex justify-end space-x-3">
                                                    <button
                                                        onClick={() => setShowDelete(null)}
                                                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={confirmDelete}
                                                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Pagination */}
            {!loading && users && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {users.links.map((link, index) => (
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

export default UserTable;
