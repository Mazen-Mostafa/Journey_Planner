const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2:
    "font-poppins font-semibold xs:text-[48px] text-[30px] text-white xs:leading-[50.8px] leading-[30.8px] w-full",
  paragraph:
    "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  myPadding: "py-3 sm:py-8",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  inputStyle:
    "p-[10px] border-solid border-b-[1px] border-[grey] focus:outline-none",

  buttonStyle:
    "px-[20px] py-[8px] text-center rounded-[30px] font-bold text-[white]",

  linkStyle:
    "px-[16px] w-[120px] text-[18px] text-center py-[8px] cursor-pointer hover:bg-second-color hover:text-main-color transition-colors",

  linksStyle2: "px-[16px] w-fit mb-4 text-[18px] py-[6px] cursor-pointer ",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
