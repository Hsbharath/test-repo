import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  question: string;
  children: ReactNode;
}

const PageLayout = ({ title, question, children }: PageLayoutProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <section className="w-full shrink-0 overflow-y-auto border-b border-gray-200 bg-white px-6 py-6 md:h-full md:w-[380px] md:border-b-0 md:border-r">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{question}</p>
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto bg-gray-50 px-6 py-6 text-left">
        {children}
      </section>
    </div>
  );
};

export default PageLayout;
