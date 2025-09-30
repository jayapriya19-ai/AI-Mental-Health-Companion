
import React from 'react';

const ResourceCard: React.FC<{ title: string; description: string; link?: string; phone?: string; }> = ({ title, description, link, phone }) => (
  <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
    <h3 className="font-bold text-lg text-primary mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {phone && (
      <a href={`tel:${phone}`} className="font-semibold text-secondary hover:underline">
        Call Now: {phone}
      </a>
    )}
    {link && (
      <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary hover:underline">
        Learn More
      </a>
    )}
  </div>
);

const ResourcesView: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-text-main">Help is Available</h1>
        <p className="text-lg text-gray-500">You are not alone. Reach out if you need to talk.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-main border-b-2 border-primary-light pb-2">Crisis Helplines (India)</h2>
        <ResourceCard 
          title="KIRAN - National Helpline"
          description="A 24/7 national helpline by the Ministry of Social Justice and Empowerment for anyone experiencing anxiety, stress, depression, or other mental health concerns."
          phone="1800-599-0019"
        />
        <ResourceCard 
          title="Vandrevala Foundation"
          description="A non-profit organization providing free psychological counseling and crisis mediation to anyone in need."
          phone="9999666555"
        />
        <ResourceCard 
          title="AASRA"
          description="Provides confidential support to people in emotional crisis or those who are feeling suicidal. Available 24/7."
          phone="91-9820466726"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-main border-b-2 border-primary-light pb-2">Self-Help Articles</h2>
         <ResourceCard 
          title="Understanding Cognitive Behavioral Therapy (CBT)"
          description="Learn about the core principles of CBT and how you can apply them to challenge negative thought patterns."
          link="#"
        />
        <ResourceCard 
          title="5-Minute Mindfulness Exercises"
          description="Simple exercises you can do anywhere to bring your attention to the present moment and reduce stress."
          link="#"
        />
        <ResourceCard 
          title="Building a Healthy Routine"
          description="Discover the importance of routine for mental well-being and get tips on how to create one that works for you."
          link="#"
        />
      </section>
    </div>
  );
};

export default ResourcesView;
