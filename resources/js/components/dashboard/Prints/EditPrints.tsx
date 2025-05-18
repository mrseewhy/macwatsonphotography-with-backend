import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModifiedResourceForm = ({ print, onClose }) => {
    const { data, post, setData, errors, processing, reset } = useForm({
        _method: 'put',
        title: print?.title || '',
        size: print?.size || '',
        range: print?.range || '',
        amount: print?.amount || '',
        type: print?.type || '',
        link: print?.type === 'link' ? print.path : '',
        file: null,
    });

    const [preview, setPreview] = useState(null);
    const [isValidImage, setIsValidImage] = useState(true);
    const [userModifiedImage, setUserModifiedImage] = useState(false);

    // Initial preview setup - only runs if user hasn't modified the image
    useEffect(() => {
        if (!print || userModifiedImage) return;

        // Set initial preview based on print data
        if (print.type === 'link' && print.path) {
            const isImageUrl = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(print.path);
            setIsValidImage(isImageUrl);
            if (isImageUrl) {
                setPreview(print.path);
            }
        } else if (print.type === 'upload' && print.path) {
            setPreview(print.path);
            setIsValidImage(true);
        }
    }, [print, userModifiedImage]); // Depends on userModifiedImage flag

    // Update preview on input changes
    useEffect(() => {
        if (data.type === 'link' && data.link) {
            const isImageUrl = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(data.link);
            setIsValidImage(isImageUrl);
            setPreview(isImageUrl ? data.link : null);
            setUserModifiedImage(true);
        } else if (data.type === 'upload' && data.file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(data.file);
            setIsValidImage(true);
            setUserModifiedImage(true);
        }
    }, [data.link, data.file, data.type]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (!file.type.startsWith('image/')) {
                setIsValidImage(false);
                setPreview(null);
            } else {
                setIsValidImage(true);
            }
            setData('file', file);
            setUserModifiedImage(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('prints.update', print.id), {
            preserveState: true,
            forceFormData: true,
            _method: 'put',
            onSuccess: () => {
                toast.success('Image Edited Successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                setPreview(null);
                reset();
                onClose();
                router.reload();
                return;
            },
            onError: (errors) => {
                toast.error(`Something Happened! Try again`, {
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
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-800">Edit Image in Prints</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter a title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Size */}
                <div>
                    <label htmlFor="size" className="mb-1 block text-sm font-medium text-gray-700">
                        Size
                    </label>
                    <input
                        id="size"
                        type="text"
                        value={data.size}
                        onChange={(e) => setData('size', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.size ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter size"
                    />
                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                </div>

                {/* Range */}
                <div>
                    <label htmlFor="range" className="mb-1 block text-sm font-medium text-gray-700">
                        Range
                    </label>
                    <input
                        id="range"
                        type="text"
                        value={data.range}
                        onChange={(e) => setData('range', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.range ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter range"
                    />
                    {errors.range && <p className="mt-1 text-sm text-red-600">{errors.range}</p>}
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="mb-1 block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter amount"
                    />
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                </div>

                {/* Type */}
                <div>
                    <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => {
                            setData('type', e.target.value);
                            setPreview(null);
                        }}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="link">Link</option>
                        <option value="upload">Upload</option>
                    </select>
                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                </div>

                {/* Link */}
                {data.type === 'link' && (
                    <div>
                        <label htmlFor="link" className="mb-1 block text-sm font-medium text-gray-700">
                            Link URL
                        </label>
                        <input
                            id="link"
                            type="url"
                            value={data.link}
                            onChange={(e) => setData('link', e.target.value)}
                            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.link ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.link && <p className="mt-1 text-sm text-red-600">{errors.link}</p>}
                        {data.link && !isValidImage && (
                            <p className="mt-1 text-sm text-yellow-600">Link doesn't appear to be an image. Please enter a valid image URL.</p>
                        )}
                    </div>
                )}

                {/* File Upload */}
                {data.type === 'upload' && (
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Upload File</label>
                        <div className="flex items-center space-x-2 rounded-md outline-1 outline-gray-300">
                            <input id="file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <button
                                type="button"
                                onClick={() => document.getElementById('file')?.click()}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Browse
                            </button>
                            <span className="text-sm text-gray-600">{data.file ? data.file.name : 'No file chosen'}</span>
                        </div>
                        {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                        {data.file && !isValidImage && <p className="mt-1 text-sm text-yellow-600">Please select an image file.</p>}
                    </div>
                )}

                {/* Preview */}
                {preview && (
                    <div className="mt-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">Preview</h3>
                        <div className="relative overflow-hidden rounded-md border border-gray-300 bg-gray-100">
                            <img
                                src={preview}
                                alt="Preview"
                                className="mx-auto max-h-52 w-auto object-contain p-2"
                                onError={() => {
                                    setIsValidImage(false);
                                    setPreview(null);
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifiedResourceForm;
