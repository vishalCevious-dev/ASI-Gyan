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
  iconSrc
}) => <div className="border relative w-full gap-[15.125px] p-[25px] rounded-2xl border-solid border-[#666] max-md:px-5">
    <div className="z-0 w-full text-base text-white font-semibold max-md:max-w-full">
      <h4 className="text-base font-semibold leading-6 max-md:max-w-full">{name}</h4>
    </div>
    <div className="z-0 w-full text-sm text-gray-300 font-normal leading-[23px] mt-[15px] pb-px max-md:max-w-full">
      <p className="text-sm font-normal leading-[23px] max-md:max-w-full">{content}</p>
    </div>
    {hasIcon && iconSrc && <div className="absolute z-0 w-[42px] right-px top-px">
        <div className="min-h-[42px] w-full overflow-hidden max-w-[42px]">
          <div className="flex min-h-[42px] w-full flex-col overflow-hidden items-center justify-center">
            <img src={iconSrc} alt="Social media icon" className="aspect-[1] object-contain w-full" />
          </div>
        </div>
      </div>}
  </div>;
const Testimonials: React.FC = () => {
  const testimonials = [{
    name: "Chetan Sharma",
    content: "Team Outskill for the Generative AI Mastermind. It helped me open up\nto AI as tool for everyday life. Also thanks for all the resources that\nyou've provided, so that we can continue to explore and learn more.\nThank you so much.",
    hasIcon: true,
    iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/1fd16a8353d4937f3c22d02935da9ca4f248bef7?placeholderIfAbsent=true"
  }, {
    name: "Kamal Kanagat",
    content: "This has been a phenomenal session. Thank you so much for sharing all\nthe information and knowledge. It was indeed an eye opener.\nImmensely Useful. Thanks a ton."
  }, {
    name: "Jyoti Sunit Shukla",
    content: "Thank you for sharing this knowledge. You guys are doing fantastic job.\nBeing non techie I still got to learn how to prepare PPT, how to get\nprepared for interview and how to create blog and posts :)",
    hasIcon: true,
    iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/d6f84fd6aa29343e089905aedce69d13fd49ed1c?placeholderIfAbsent=true"
  }, {
    name: "Twinkle Soni",
    content: "Thank you. The last two days have been incredible and today towards\nthe end the things did become overwhelming. The sessions were great\nand quite valuable."
  }];
  return <section className="w-full pl-48 pr-[190px] pt-16 pb-9 max-md:px-5">
      <div className="w-full max-w-screen-2xl pb-[54px] max-md:max-w-full">
        <div className="w-full text-white font-medium gap-2 max-md:max-w-full">
          <div className="w-full text-base uppercase tracking-[0.4px] max-md:max-w-full">
            <p className="text-base font-medium leading-6 tracking-[0.4px] max-md:max-w-full">
              Hear it From Them
            </p>
          </div>
          <div className="flex w-full items-center text-[42px] flex-wrap mt-2 max-md:max-w-full">
            <div className="self-stretch flex min-w-60 items-center gap-2.5 w-[368px] my-auto">
              <h2 className="text-[42px] font-medium leading-[63px] self-stretch my-auto">
                Ambitious people
              </h2>
            </div>
            <span className="text-[42px] font-medium leading-[63px] self-stretch my-auto">
              ASI Gyan{" "}
            </span>
          </div>
        </div>
        
        <div className="justify-center items-stretch z-10 flex gap-6 flex-wrap mt-[33px]">
          <div className="min-w-60 grow shrink w-[397px] gap-6 max-md:max-w-full">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/8b8d4846f79b0b1a9e5902781d972ddeebe09b68?placeholderIfAbsent=true" alt="Testimonial image" className="aspect-[1.24] object-contain w-full min-h-[400px] max-md:max-w-full" />
            {testimonials.slice(0, 4).map((testimonial, index) => <div key={index} className="mt-6">
                <TestimonialCard {...testimonial} />
              </div>)}
          </div>
          
          <div className="min-w-60 grow shrink w-[397px] gap-6 max-md:max-w-full rounded-sm">
            <TestimonialCard name="Ashwath BM" content="Immense gratitude to the Outskill team, phenomenal mentors, and the\npowerhouse community for an electrifying Generative AI Mastermind\njourney! The past 3 days have been a whirlwind of insights, innovation,\nand unmatched energy. This is just the beginning—let's stay\nconnected and build the future together!" />
            <div className="mt-6">
              <TestimonialCard name="Yasmin Niazi" content="I had a fantastic experience at the two-day AI Mastermind event. It was\nan incredible opportunity to learn, connect, and explore the future of\nAI. I truly appreciated the generosity of knowledge and insights shared\nby Om, Uttam, Vaibhav, and Michele, making the sessions both\nengaging and impactful. Looking forward to applying what I've learned\nand continuing this journey in AI!" hasIcon={true} iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/ea4ec06768c3163b6b5e3346d658c81a3bd9e61b?placeholderIfAbsent=true" />
            </div>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/5b246e0afb3a7b2a0cebc4294b7c5f126d30f258?placeholderIfAbsent=true" alt="Testimonial image" className="aspect-[1.24] object-contain w-full min-h-[400px] mt-6 max-md:max-w-full" />
            <div className="mt-6">
              <TestimonialCard name="Shashank Aeligala" content="Thank you Outskill team. I've learnt a lot in these 2 days and looking\nforward to learn more about AI this year!" />
            </div>
          </div>
          
          <div className="min-w-60 grow shrink w-[397px] gap-6 max-md:max-w-full">
            <TestimonialCard name="Parin Patel" content="A huge thank you to the entire Outskill Team and my fellow attendees\nfor an incredible 2 Day AI Mastermind! It was a fantastic experience\nthat opened my mind to new possibilities and a brighter future.\nGrateful for the knowledge, connections, and inspiration!" hasIcon={true} iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/fe2137467fae4db3828da8fd9c3ce0986e1930b1?placeholderIfAbsent=true" />
            <div className="mt-6">
              <TestimonialCard name="Bhawna Mehra" content="First of all, I, thank to the entire Outskill and Outshine team and then to\nA big thank you to myself for keeping patience for this long in last\nthree days and also for having a new perspective of this new world.\nHats off Team... Blessings" hasIcon={true} iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/80446e8cb44773744235d0bb8bc19b49fc8a1427?placeholderIfAbsent=true" />
            </div>
            <div className="mt-6">
              <TestimonialCard name="Jay" content="Hello Outskill team Thank you guys for a fantastic 1+2 days. This was a\nweekend very well spent with great learning. Appreciate the effort, the\nintensity, the seamless delivery and the way you guys engaged.\nBlessings & thank you" />
            </div>
            <div className="mt-6">
              <TestimonialCard name="Subhashini Nachimuthu" content="Thank you, divij. It was really very insightful. Especially for a beginner\nlike me, helped me a lot to understand the basics of AI & prompting\ntechniques! I'm sure i will use this to enhance my performance at work!" hasIcon={true} iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/f8643c0824cb50a555c34a717f1e9956891f438c?placeholderIfAbsent=true" />
            </div>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/4ad3dd476ca99eead404c26ed67720622d0f0c26?placeholderIfAbsent=true" alt="Testimonial image" className="aspect-[1.24] object-contain w-full min-h-[400px] mt-6 max-md:max-w-full" />
          </div>
        </div>
        
        <div className="flex mt-[-83px] text-base text-white font-normal text-center justify-center max-md:max-w-full">
          <button className="justify-center items-center border border-gray-600 flex flex-col px-[33px] py-[13px] rounded-lg border-solid max-md:px-5">
            <span className="text-base font-normal leading-6">See more</span>
          </button>
        </div>
      </div>
    </section>;
};
export default Testimonials;