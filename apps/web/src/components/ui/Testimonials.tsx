import React from "react";

interface TestimonialProps {
  name: string;
  content: string;
  hasIcon?: boolean;
  iconSrc?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  content,
  hasIcon,
  iconSrc,
}) => (
  <div className="relative border border-[#666] rounded-2xl p-6 bg-[#0a0f1c] text-white">
    <h4 className="text-base font-semibold">{name}</h4>
    <p className="text-sm text-gray-300 mt-3 leading-relaxed">{content}</p>

    {hasIcon && iconSrc && (
      <div className="absolute top-3 right-3 w-6 h-6">
        <img
          src={iconSrc}
          alt="icon"
          className="w-full h-full object-contain"
        />
      </div>
    )}
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Chetan Sharma",
      content:
        "Team Outskill for the Generative AI Mastermind. It helped me open up to AI as tool for everyday life. Also thanks for all the resources...",
      hasIcon: true,
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/1fd16a8353d4937f3c22d02935da9ca4f248bef7?placeholderIfAbsent=true",
    },
    {
      name: "Kamal Kanagat",
      content:
        "This has been a phenomenal session. Thank you so much for sharing all the information and knowledge. It was indeed an eye opener.",
    },
    {
      name: "Jyoti Sunit Shukla",
      content:
        "Thank you for sharing this knowledge. You guys are doing fantastic job. Being non techie I still got to learn how to prepare PPT, create blog & posts :)",
      hasIcon: true,
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/d6f84fd6aa29343e089905aedce69d13fd49ed1c?placeholderIfAbsent=true",
    },
    {
      name: "Twinkle Soni",
      content:
        "Thank you. The last two days have been incredible and today towards the end the things did become overwhelming. The sessions were great and valuable.",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-32 py-16 bg-[#081121]">
      {/* Heading */}
      <div className="text-white">
        <p className="uppercase tracking-wide text-sm">Hear it From Them</p>
        <h2 className="text-[42px] font-medium mt-2 flex flex-wrap items-center">
          Ambitious people <span className="ml-2">ASI Gyan</span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Column 1 */}
        <div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8b8d4846f79b0b1a9e5902781d972ddeebe09b68?placeholderIfAbsent=true"
            alt="video placeholder"
            className="rounded-xl w-full min-h-[250px] object-cover"
          />
          {testimonials.map((t, i) => (
            <div key={i} className="mt-6">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div>
          <TestimonialCard
            name="Ashwath BM"
            content="Immense gratitude to the Outskill team, phenomenal mentors, and the powerhouse community..."
          />
          <div className="mt-6">
            <TestimonialCard
              name="Yasmin Niazi"
              content="I had a fantastic experience at the two-day AI Mastermind event. It was an incredible opportunity..."
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/ea4ec06768c3163b6b5e3346d658c81a3bd9e61b?placeholderIfAbsent=true"
            />
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/5b246e0afb3a7b2a0cebc4294b7c5f126d30f258?placeholderIfAbsent=true"
            alt="testimonial img"
            className="rounded-xl w-full min-h-[250px] object-cover mt-6"
          />
          <div className="mt-6">
            <TestimonialCard
              name="Shashank Aeligala"
              content="Thank you Outskill team. I've learnt a lot in these 2 days and looking forward to learn more about AI this year!"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <TestimonialCard
            name="Parin Patel"
            content="A huge thank you to the entire Outskill Team and my fellow attendees for an incredible 2 Day AI Mastermind!"
            hasIcon
            iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/fe2137467fae4db3828da8fd9c3ce0986e1930b1?placeholderIfAbsent=true"
          />
          <div className="mt-6">
            <TestimonialCard
              name="Bhawna Mehra"
              content="First of all, I thank the entire Outskill and Outshine team and then to myself for keeping patience for this long..."
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/80446e8cb44773744235d0bb8bc19b49fc8a1427?placeholderIfAbsent=true"
            />
          </div>
          <div className="mt-6">
            <TestimonialCard
              name="Jay"
              content="Hello Outskill team Thank you guys for a fantastic 1+2 days. This was a weekend very well spent with great learning..."
            />
          </div>
          <div className="mt-6">
            <TestimonialCard
              name="Subhashini Nachimuthu"
              content="Thank you, divij. It was really very insightful. Especially for a beginner like me, helped me understand basics of AI & prompting techniques!"
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/f8643c0824cb50a555c34a717f1e9956891f438c?placeholderIfAbsent=true"
            />
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4ad3dd476ca99eead404c26ed67720622d0f0c26?placeholderIfAbsent=true"
            alt="testimonial img"
            className="rounded-xl w-full min-h-[250px] object-cover mt-6"
          />
        </div>
      </div>

      {/* See more button */}
      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 border border-gray-600 text-white rounded-lg">
          See more
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
