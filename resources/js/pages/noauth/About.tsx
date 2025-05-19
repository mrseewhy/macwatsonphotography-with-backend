import MyLayout from '@/layouts/my-layout';
import { Head } from '@inertiajs/react';
import React from 'react'; // Import React for typing ReactNode

// Define the type for the functional component
const About: () => JSX.Element = () => {
    return (
        <>
            {/* Head component for setting page metadata */}
            <Head>
                <title>About Me</title>
            </Head>
            <>
                {/* Main content container with padding and margin */}
                <div className="mb-12 p-4">
                    {/* Section with Image and Text, using flexbox for layout */}
                    {/* flex-col on mobile, md:flex-row on medium screens and up */}
                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* Image container */}
                        {/* flex-1 allows it to grow and shrink */}
                        <div className="flex-1">
                            {/* Image element */}
                            <img
                                src="/images/11.jpg" // Replace with your image path
                                alt="MacWatson" // Alt text for accessibility
                                className="h-auto w-full rounded-lg shadow-lg" // Styling classes
                            />
                        </div>

                        {/* Text container */}
                        {/* flex-1 allows it to grow and shrink */}
                        {/* flex items-center vertically centers the content */}
                        <div className="flex flex-1 items-center">
                            {/* Text content wrapper */}
                            <div className="text-left">
                                {/* Section heading */}
                                <h2 className="font-exo mb-4 text-3xl font-bold">About Me</h2>
                                {/* Paragraph 1 */}
                                <p className="font-lato mb-4 text-gray-800">
                                    <strong>ADEDOYIN ADEROMOLA MACWATSON</strong> is an accomplished documentary and Fine art photographer, hailing
                                    from Lagos, Nigeria. With a solid academic foundation in Dramatic Arts attained from the prestigious{' '}
                                    <strong>OBAFEMI AWOLOWO UNIVERSITY, ILE IFE</strong>, she exhibits a profound passion for her craft.
                                    Adedoyin&#39;s unwavering dedication lies in the exploration and portrayal of Humanism, Africanism, and the
                                    diverse narratives of people of color.
                                </p>
                                {/* Paragraph 2 */}
                                <p className="font-lato mb-4 text-gray-800">
                                    In addition to her formal education, Adedoyin has undergone specialized training in Textile Design and canvas
                                    priming, honing her skills under the tutelage of the renowned artist, Dotun Popoola. The recognition of her
                                    exceptional talent is evident through the inclusion of her works in esteemed competitions such as the &#39;500
                                    px&#39; Portrait competition in 2023 and the prestigious <strong>&#39;CAP PRIZE 2023.&#39;</strong>
                                </p>
                                {/* Paragraph 3 */}
                                <p className="font-lato mb-4 text-gray-800">
                                    Adedoyin&#39;s artistic prowess has garnered considerable acclaim, with her captivating works being sought after
                                    by private galleries both at home and abroad. Currently operating from her studio in Lagos, she not only produces
                                    remarkable pieces but also engages in the noble task of imparting knowledge and fostering creativity through her
                                    training and educational endeavors.{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

// Setting the layout for this page using Inertia.js pattern
// Define the type for the layout function
// About.layout = (page: React.ReactNode): React.ReactNode => <MyLayout>{page}</MyLayout>;

type LayoutFn = (page: React.ReactElement) => React.ReactNode;

(About as any).layout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;

// Export the component as the default export
export default About;
