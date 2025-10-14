import React from "react";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => (
  <section className="bg-white rounded-xl border border-gray-200 p-5 mb-5 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
    </div>
    {children}
  </section>
);

export default SectionCard;
