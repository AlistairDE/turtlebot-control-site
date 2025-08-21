import React from 'react';

const sources = [
    { name: "LinkedIn Logo", url: "https://blog.waalaxy.com/logo-linkedin/", credit: "LinkedIn Brand Guidelines" },
    { name: "Home image", url: "/image/home_image.png", credit: "Image générée par DALL-E modifié avec Canva" },
    { name: "Fatima Azeroual", url: "/images/team/fatima.jpeg", credit: "Personal Photo" },
    { name: "Alistair Dreux-Egger", url: "/images/team/alistair.jpeg", credit: "Personal Photo" },
    { name: "Mélia Enilorac", url: "/images/team/melia.jpg", credit: "Personal Photo" },
    { name: "Clara Kampetenga", url: "/images/team/clara.jpeg", credit: "Personal Photo" },
    { name: "Arthur Meunier", url: "/images/team/arthur.jpeg", credit: "Personal Photo" },
    { name: "Philippe Mocquery", url: "/images/team/philippe.jpeg", credit: "Personal Photo" },
    { name: "Ouessant Sourget--Langlois", url: "/images/team/ouessant.jpeg", credit: "Personal Photo" },
    { name: "Richardson Tabopda Yemele", url: "/images/team/richardson.jpeg", credit: "Personal Photo" },
];

const bibliography = [
    { name: "ReactJS", url: "https://reactjs.org/" },
    { name: "Lucide Icons", url: "https://lucide.dev/" },
    { name: "Turtlebot3 Waffle Pi e-Manual", url: "https://emanual.robotis.com/docs/en/platform/turtlebot3/features/" },
];

const Source = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Sources & Bibliography
            </h1>

            {/* Section Sources */}
            <div className="bg-gray-900 rounded-lg p-8 neon-border mb-8">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Sources</h2>
                <p className="text-gray-300 mb-4">Here are the sources for the images used on our site.</p>
                <ul className="text-gray-300 list-disc pl-5 space-y-2">
                    {sources.map((source, index) => (
                        <li key={index}>
                            {/* Si la photo est personnelle ou si c'est "Home image", on affiche du texte simple */}
                            {source.credit === "Personal Photo" || source.name === "Home image" ? (
                                <>
                                    {source.name} - {source.credit}
                                </>
                            ) : (
                                <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:underline"
                                >
                                    {source.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Section Bibliography */}
            <div className="bg-gray-900 rounded-lg p-8 neon-border">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Bibliography</h2>
                <p className="text-gray-300 mb-4">These are the resources and tools we used to develop our project.</p>
                <ul className="text-gray-300 list-disc pl-5 space-y-2">
                    {bibliography.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Source;
