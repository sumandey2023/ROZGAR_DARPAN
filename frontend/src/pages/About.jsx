const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            About Rozgar Darpan
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Overview
              </h2>
              <p className="leading-relaxed">
                Rozgar Darpan is a comprehensive portal for accessing and
                analyzing MGNREGA (Mahatma Gandhi National Rural Employment
                Guarantee Act) district-wise data at a glance. This platform
                provides insights into employment statistics, expenditure,
                workers' information, and works undertaken across various
                districts in India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Features
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>District-wise MGNREGA data access</li>
                <li>Real-time data fetching from official sources</li>
                <li>Historical data tracking by financial year</li>
                <li>Monthly and yearly data analysis</li>
                <li>Comprehensive statistics on employment and expenditure</li>
                <li>Worker demographics and participation data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Data Sources
              </h2>
              <p className="leading-relaxed">
                The data is sourced from the official Government of India
                dataset available on data.gov.in, maintained by the Ministry of
                Rural Development and Department of Land Resources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Contact
              </h2>
              <p className="leading-relaxed">
                For any queries or support, please reach out through the contact
                information provided on the main portal.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
