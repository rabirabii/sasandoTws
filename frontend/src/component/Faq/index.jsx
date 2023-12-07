import React from "react";
import AnimationList from "../../ui/AnimationList";
import {
  FaqArtist,
  FaqCopyright,
  FaqRegistration,
  FaqSubscribe,
} from "../../utilities/FaqList";
import Faq from "../../ui/Faq";

const FaqComponent = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-black uppercase border rounded-full hover:text-white hover:bg-purple-800">
              Welcome to FAQ Page
            </p>
          </div>
        </div>

        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-wlg mb-6 text-3xl font-bold leading-none tracking-tight text-purple-800 sm:text-4xl md:mx-auto ">
              <span className="relative inline-block">
                <span className="relative">The</span>
              </span>{" "}
              FAQ Category: Copyright and Intellectual Property
            </h2>
            <p className="text-base md:text-lg">
              {" "}
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </p>
          </div>
        </div>
        {/* List of Questions Start Here */}
        <AnimationList>
          {FaqCopyright.map((question1) => (
            <Faq
              key={question1.id}
              question={question1.question}
              answer={question1.answer}
            />
          ))}
        </AnimationList>
        <br />
      </div>
    </div>
  );
};

export default FaqComponent;
