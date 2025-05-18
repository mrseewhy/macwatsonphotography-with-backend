import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditStory = ({ editPortrait, setShowEdit }) => {
    const { data, setData, errors, processing, post, reset } = useForm({
        _method: 'PUT',
        title: editPortrait.title || '',
        description: editPortrait.description || '',
        type: editPortrait.type || 'link',
        link: editPortrait.type === 'link' ? editPortrait.path : '',
        file: null,
        id: editPortrait.id,
        path: editPortrait.path || '',
    }); // State for preview
    const [preview, setPreview] = useState(null);
    const [isValidImage, setIsValidImage] = useState(true);

    // Initialize preview with existing image
    useEffect(() => {
        // Set initial preview for existing image
        if (editPortrait.type === 'link' && editPortrait.link) {
            setPreview(editPortrait.link);
        } else if (editPortrait.type === 'upload' && editPortrait.path) {
            setPreview(editPortrait.path);
        }
    }, [editPortrait]);

    // Update preview when link or file changes
    useEffect(() => {
        if (data.type === 'link') {
            if (data.link) {
                // For link preview - validate if it's an image
                const isImageUrl = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(data.link);
                setIsValidImage(isImageUrl);

                if (isImageUrl) {
                    setPreview(data.link);
                } else {
                    setPreview(null);
                }
            } else if (editPortrait.type === 'link' && editPortrait.link) {
                // Fall back to original link if no new link is provided
                setPreview(editPortrait.link);
                setIsValidImage(true);
            }
        } else if (data.type === 'upload') {
            if (data.file) {
                // For new file upload preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(data.file);
                setIsValidImage(true);
            } else if (editPortrait.type === 'upload' && editPortrait.path && !preview) {
                // Fall back to original path if no new file is provided
                setPreview(editPortrait.path);
                setIsValidImage(true);
            }
        }
    }, [data.link, data.file, data.type, editPortrait]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('portraits.update', data.id), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Image Updated Successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                reset();
                setShowEdit(null);
                router.reload();
                return;
            },
            onError: () => {
                toast.error('Error Updating Image...', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
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
            <h2 className="mb-8 text-2xl font-bold text-gray-800">Edit Image in Portraits</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter a description"
                        rows={4}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Type Select Field */}
                <div>
                    <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => {
                            const newType = e.target.value;
                            setData('type', newType);

                            // Preserve existing image preview when switching types
                            if (newType === 'link' && editPortrait.link) {
                                setPreview(editPortrait.link);
                            } else if (newType === 'upload' && editPortrait.path) {
                                setPreview(editPortrait.path);
                            }
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
                            value={data.link || ''}
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
                            <span className="text-sm text-gray-600">{data.file ? data.file.name : 'No new file chosen'}</span>
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
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStory;
