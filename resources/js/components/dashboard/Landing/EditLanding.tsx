import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModifiedImageForm = ({ imageToEdit, setShowEdit }) => {
    console.log('Image to edit:', imageToEdit);

    const { data, setData, post, errors, processing, reset } = useForm({
        _method: 'put',
        type: imageToEdit.type || '',
        link: imageToEdit.type === 'link' ? imageToEdit.path : '',
        file: null,
        id: imageToEdit.id,
        path: imageToEdit.path || '',
        category: imageToEdit.category || '',
        size: imageToEdit.size || '',
    });

    // State for preview
    const [preview, setPreview] = useState(null);
    const [isValidImage, setIsValidImage] = useState(true);

    // Initial setup - load preview based on existing data
    useEffect(() => {
        if (!imageToEdit) return;

        // Set preview based on image type
        if (imageToEdit.type === 'link') {
            setPreview(imageToEdit.path);
        } else if (imageToEdit.type === 'upload' && imageToEdit.path) {
            // For uploaded files, use the stored path
            setPreview(imageToEdit.path);
        }
    }, [imageToEdit]);

    // Update preview when form data changes
    useEffect(() => {
        // Handle link-type images
        if (data.type === 'link') {
            if (data.link) {
                const isImageUrl = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(data.link);
                setIsValidImage(isImageUrl);
                setPreview(isImageUrl ? data.link : null);
            } else {
                setPreview(null);
            }
        }
        // Handle file uploads
        else if (data.type === 'upload' && data.file) {
            try {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setPreview(reader.result);
                    setIsValidImage(true);
                };

                reader.onerror = () => {
                    setPreview(null);
                    setIsValidImage(false);
                };

                reader.readAsDataURL(data.file);
            } catch (error) {
                console.error('Error handling file preview:', error);
                setIsValidImage(false);
            }
        }
        // Keep existing preview if we're in upload mode but no new file selected
        else if (data.type === 'upload' && !data.file && imageToEdit.type === 'upload' && imageToEdit.path) {
            setPreview(imageToEdit.path);
            setIsValidImage(true);
        }
    }, [data.link, data.file, data.type, imageToEdit]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (!file.type.startsWith('image/')) {
                setIsValidImage(false);
                setPreview(null);
            } else {
                setIsValidImage(true);
                // File is valid, update the form data
                setData('file', file);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('landing.update', imageToEdit.id), {
            preserveState: true,
            forceFormData: true,
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
                setShowEdit(null);
                reset();
                router.reload();
            },
            onError: () => {
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
            },
        });
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-800">Edit Image on Landing Page</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                {/* Category Dropdown Field */}
                <div>
                    <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="stories">Stories</option>
                        <option value="published">Published</option>
                        <option value="portraits">Portraits</option>
                        <option value="drone-shots">Drone Shots</option>
                        <option value="prints">Prints</option>
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                {/* Size Dropdown Field */}
                <div>
                    <label htmlFor="size" className="mb-1 block text-sm font-medium text-gray-700">
                        Size
                    </label>
                    <select
                        id="size"
                        value={data.size}
                        onChange={(e) => setData('size', e.target.value)}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.size ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
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
                            // Reset type-specific data when changing types
                            if (e.target.value === 'link') {
                                setData((prev) => ({
                                    ...prev,
                                    type: 'link',
                                    file: null,
                                    link: prev.type === 'link' ? prev.link : '',
                                }));
                            } else {
                                setData((prev) => ({
                                    ...prev,
                                    type: 'upload',
                                    link: '',
                                    file: null,
                                }));

                                // When switching to upload, show the existing uploaded image if available
                                if (imageToEdit.type === 'upload' && imageToEdit.path) {
                                    setPreview(imageToEdit.path);
                                } else {
                                    setPreview(null);
                                }
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

                            {/* Display Selected File Name or Current File Path */}
                            <span className="text-sm text-gray-600">
                                {data.file ? data.file.name : imageToEdit.type === 'upload' && !data.file ? 'Current image' : 'No file chosen'}
                            </span>
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
                        disabled={processing || !isValidImage}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ModifiedImageForm;
