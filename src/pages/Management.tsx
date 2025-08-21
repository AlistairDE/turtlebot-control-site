import React from 'react';
import OBS from '../assets/images/OBS.png';
import PBS from '../assets/images/PBS.png';
import WBS from '../assets/images/WBS.png';
import RACI from '../assets/images/raci.png';

interface ManagementItem {
    title: string;
    description: string;
    image: string;
    alt: string;
}

const managementData: ManagementItem[] = [
    {
        "title": "Gantt Chart",
        "description": "The Gantt chart visually represents the different phases of the project and their progression over time.",
        "image": OBS,
        "alt": "Gantt Chart"
    },
    {
        "title": "OBS (Organizational Breakdown Structure)",
        "description": "The OBS details the project organization by structuring the responsibilities of different entities hierarchically.",
        "image": OBS,
        "alt": "Organizational Breakdown Structure"
    },
    {
        "title": "PBS (Product Breakdown Structure)",
        "description": "The PBS divides the project into deliverable components, allowing for better task management.",
        "image": PBS,
        "alt": "Product Breakdown Structure"
    },
    {
        "title": "WBS (Work Breakdown Structure)",
        "description": "The WBS breaks down the project into achievable sub-tasks, facilitating planning and tracking.",
        "image": WBS,
        "alt": "Work Breakdown Structure"
    },
    {
        "title": "RACI Matrix",
        "description": "The RACI matrix defines roles and responsibilities in a project, ensuring clarity in task ownership.",
        "image": RACI,
        "alt": "Work Breakdown Structure"
    }
];

const ManagementCard: React.FC<ManagementItem> = ({ title, description, image, alt }) => (
    <div className="neon-border p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl font-semibold text-white mb-3 text-center">{title}</h2>
        <p className="text-gray-300 text-center mb-3">{description}</p>
        <img src={image} alt={alt} className="w-full rounded-lg" />
    </div>
);

const Management: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Project Management
            </h1>

            <div className="flex flex-col items-center">
                {managementData.map((item, index) => (
                    <div className="bg-gray-900 rounded-lg p-8 neon-border mb-8">
                        <ManagementCard key={index} {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Management;
