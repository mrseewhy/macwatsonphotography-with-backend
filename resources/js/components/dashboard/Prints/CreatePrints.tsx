import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModifiedResourceForm = ({ setShowCreate }) => {
    const { data, post, setData, errors, processing, reset } = useForm({
        title: '',
        size: '',
        range: '',
        amount: '',
        type: 'link',
        link: '',
        file: null,
    });

    // State for preview
    const [preview, setPreview] = useState(null);
    const [isValidImage, setIsValidImage] = useState(true);

    // Update preview when link or file changes
    useEffect(() => {
        if (data.type === 'link' && data.link) {
            // For link preview - validate if it's an image
            const isImageUrl = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(data.link);
            setIsValidImage(isImageUrl);

            if (isImageUrl) {
                setPreview(data.link);
            } else {
                setPreview(null);
            }
        } else if (data.type === 'Upload' && data.file) {
            // For file upload preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(data.file);
            setIsValidImage(true);
        } else {
            setPreview(null);
        }
    }, [data.link, data.file, data.type]);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                setIsValidImage(false);
                setPreview(null);
            } else {
                setIsValidImage(true);
            }
            setData('file', file);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (isValidImage) {
            // Submit the form data
            post(route('prints.store'), {
                onSuccess: () => {
                    toast.success('Image uploaded Successfully', {
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
                    setShowCreate(false);
                    router.reload();
                    return;
                },
                onError: (error) => {
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
        } else {
            toast.error('Please provide a valid image URL or upload an image file.', {
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
        }
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-800">Add New Image To Prints</h2>
            <form onSubmit={handleSubmitForm} className="space-y-6">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter a title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Size Field */}
                <div>
                    <label htmlFor="size" className="mb-1 block text-sm font-medium text-gray-700">
                        Size
                    </label>
                    <input
                        id="size"
                        type="text"
                        value={data.size}
                        onChange={(e) => setData('size', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.size ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter size 12 by 15 inches"
                    />
                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                </div>

                {/* Rang Field */}
                <div>
                    <label htmlFor="rang" className="mb-1 block text-sm font-medium text-gray-700">
                        Range
                    </label>
                    <input
                        id="range"
                        type="text"
                        value={data.range}
                        onChange={(e) => setData('range', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.range ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter range 0 - 10"
                    />
                    {errors.range && <p className="mt-1 text-sm text-red-600">{errors.range}</p>}
                </div>

                {/* Amount Field */}
                <div>
                    <label htmlFor="amount" className="mb-1 block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.amount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter amount"
                    />
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                </div>

                {/* Type Select Field */}
                <div>
                    <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
                        Type <span className="text-xs"> Paste URL or upload image (max 3MB)</span>
                    </label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => {
                            setData('type', e.target.value);
                            setPreview(null); // Clear preview when switching types
                        }}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="link">Link</option>
                        <option value="upload">Upload</option>
                    </select>
                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                </div>

                {/* Conditional Field Based on Type */}
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
                            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                errors.link ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.link && <p className="mt-1 text-sm text-red-600">{errors.link}</p>}
                        {data.link && !isValidImage && (
                            <p className="mt-1 text-sm text-yellow-600">Link doesn't appear to be an image. Please enter a valid image URL.</p>
                        )}
                    </div>
                )}

                {data.type === 'upload' && (
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Upload File</label>
                        <div className="flex items-center space-x-2 rounded-md outline-1 outline-gray-300">
                            {/* Hidden Native Input */}
                            <input id="file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                            {/* Custom Styled Button */}
                            <button
                                type="button"
                                onClick={() => document.getElementById('file')?.click()}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Browse
                            </button>

                            {/* Display Selected File Name */}
                            <span className="text-sm text-gray-600">{data.file ? data.file.name : 'No file chosen'}</span>
                        </div>
                        {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                        {data.file && !isValidImage && <p className="mt-1 text-sm text-yellow-600">Please select an image file.</p>}
                    </div>
                )}

                {/* Image Preview */}
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

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifiedResourceForm;
