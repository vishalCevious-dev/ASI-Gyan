import React from "react";

const About: React.FC = () => {
  const benefits = [
    {
      title: "Certificate of Completion",
      description: "Receive a recognized credential that significantly boosts your resume.",
      position: "top-left"
    },
    {
      title: "Networking Opportunities", 
      description: "Connect with peers and valuable industry professionals for growth.",
      position: "bottom-left"
    },
    {
      title: "Comprehensive Curriculum",
      description: "Master essential topics and practical skills effectively and thoroughly.",
      position: "top-right"
    },
    {
      title: "Expert Guidance",
      description: "Learn from experienced instructors for personalized and effective support.",
      position: "bottom-right"
    }
  ];

  return (
    <section className="relative bg-white py-16 px-5 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* About tag */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-medium text-black">About Me</span>
          </div>
          
          {/* Main heading with decorative elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-purple-300 rounded-full mr-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              But Why CourseSite ?
            </h2>
            <div className="w-4 h-4 bg-purple-300 rounded-full ml-4"></div>
          </div>
          
          {/* Description */}
          <p className="text-lg text-black max-w-3xl mx-auto leading-relaxed">
            Explore the incredible advantages of enrolling in our courses and enhancing your skills for the ultimate career success.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="relative">
          {/* Central Instructor Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-100 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              {/* Instructor Photo */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                </div>
              </div>
              
              {/* Instructor Info */}
              <div className="space-y-4 text-left">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">I started my journey:</span> In web design and development in 2010 at the age of 24. I transitioned into a full-time instructor and mentor in 2018
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">Through hands-on:</span> project-based courses, I simplify challenging topics and make them accessible to everyone.
                  </p>
                </div>
              </div>
              
              {/* Signature */}
              <div className="mt-6 text-right">
                <div className="inline-block text-purple-600 font-cursive text-lg">
                  Aanay
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow duration-300 ${
                  benefit.position === 'top-left' || benefit.position === 'bottom-left' 
                    ? 'md:justify-self-end' 
                    : 'md:justify-self-start'
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-white rounded-lg mb-4 flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-purple-300 rounded"></div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
