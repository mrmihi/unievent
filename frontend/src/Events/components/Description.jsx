import Title from './Title';

const Description = (props) => {
  return (
    <div className="flex flex-col items-center px-7 pt-[50px]" id="description">
      <Title title="About This Event" aos="fade-left" />
      <div className="flex flex-col md:flex-row justify-between px-3 md:px-12 xl:px-20">
        <div
          className="flex flex-row mt-[60px] w-full md:w-1/2"
          data-aos="fade-right"
        >
          <div className="lg:text-right mx-2 md:text-left">
            <h1 className="text-black mb-[18px]">Description</h1>
            <p className="text-[#888888]">
              <span>{props.description}</span>
            </p>
          </div>
        </div>
        <div className="w-2" />
        <div
          className="flex flex-row mt-12 md:mt-[20rem] xl:mt-[15rem] w-full md:w-1/2"
          data-aos="fade-left"
        >
          <div className="text-left mx-2">
            <h1 className="text-black mb-[18px]">Categories</h1>
            <p className="text-[#888888]"></p>
            {/* {props.categories.map((category) => () => {
              return (
                <p className="text-[#888888]">
                  <span>{category}</span>
                  <br></br>
                </p>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
