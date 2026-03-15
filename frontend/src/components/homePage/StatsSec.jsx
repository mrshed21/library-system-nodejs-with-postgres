export default function StatsSec() {
  const stats = [
    { label: "Total Books", value: "10,000+" },
    { label: "Active Members", value: "5,000+" },
    { label: "Categories", value: "50+" },
    { label: "Daily Loans", value: "200+" },
  ];

  return (
    <section className="bg-white dark:bg-slate-800 py-12 border-y border-gray-100 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </span>
              <span className="text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
